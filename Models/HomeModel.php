<?php
class HomeModel extends Mysql
{
	public function __construct()
	{
		parent::__construct();
	}

	public function selectGenderIndicator()
	{
		$sql = "SELECT sexo, COUNT(sexo) AS cantidad FROM usuario WHERE status = 1 GROUP BY sexo";

		$request = $this->select_all($sql);

		return $request;
	}

public function selectProjectIndicator($nivel, $unidad = null)
{
    if ($nivel == 0) {
        return false; // Nivel 0: Retorna false (no tiene permisos)
    }
    elseif ($nivel == 1) {
        // Nivel 1: Filtra por unidad
        $sql = "SELECT p.id_proyecto, a.estado, COUNT(p.id_proyecto) AS cantidad 
                FROM proyecto p 
                INNER JOIN asignacion a ON a.id_asignacion = p.id_asignacion 
                INNER JOIN equipo_usuario eu ON eu.id_equipo = a.id_equipo
                INNER JOIN usuario u ON u.id_usuario = eu.id_usuario
                WHERE a.status = 1 
                AND u.id_unidad = $unidad
                GROUP BY a.estado, p.id_proyecto";
    }
    elseif ($nivel == 2) {
        // Nivel 2: Consulta sin filtrar por unidad (acceso total)
        $sql = "SELECT p.id_proyecto, a.estado, COUNT(p.id_proyecto) AS cantidad 
                FROM proyecto p 
                INNER JOIN asignacion a ON a.id_asignacion = p.id_asignacion 
                WHERE a.status = 1 
                GROUP BY a.estado, p.id_proyecto";
    }
    else {
        return false; // Si el nivel no es 0, 1 o 2, retorna false
    }

    $request = $this->select_all($sql);
    return $request;
}

public function selectProjectStates($nivel, $unidad = null, $id_proyecto = null)
{
    // Si el nivel es 0, no tiene permisos
    if ($nivel == 0) {
        return false;
    }

    // Consulta base para obtener proyectos y su estado
    $sql = "SELECT p.id_proyecto, p.nombre, p.descripcion, 
                   p.fecha_inicio, p.fecha_fin, a.estado, e.nombre_equipo 
            FROM proyecto p 
            INNER JOIN asignacion a ON a.id_asignacion = p.id_asignacion 
            INNER JOIN equipo e ON e.id_equipo = a.id_equipo 
            WHERE a.status = 1";

    // Si es nivel 1 (filtro por unidad), añadimos JOIN con usuario
    if ($nivel == 1 && $unidad) {
        $sql .= " AND EXISTS (
                    SELECT 1 FROM equipo_usuario eu
                    INNER JOIN usuario u ON eu.id_usuario = u.id_usuario
                    WHERE eu.id_equipo = e.id_equipo
                    AND u.id_unidad = $unidad
                )";
    }

    // Si se pasa un ID de proyecto, filtramos por él
    if ($id_proyecto) {
        $sql .= " AND p.id_proyecto = '$id_proyecto'";
    }

    $arrData = $this->select_all($sql);

    // Si hay datos y se pidió un proyecto específico, buscamos sus usuarios
        $sqlUsuarios = "SELECT u.* FROM proyecto p
				INNER JOIN asignacion_equipo ae ON ae.id_asignacion = p.id_asignacion
				INNER JOIN equipo_usuario eu ON ae.id_equipo = eu.id_equipo
				INNER JOIN usuario u ON eu.id_usuario = u.id_usuario
				WHERE ae.id_equipo = eu.id_equipo  AND p.id_proyecto = '$id_proyecto';";

	$usuarios = $this->select_all($sqlUsuarios);
	for ($i=0; $i < count($usuarios); $i++) { 
		$arrData[$i]["datosUsuariosEquipo"] = $usuarios;
	}

	// foreach ($arrData as &$proyecto) {
	// 	$proyecto['datosUsuariosEquipo'] = $usuarios;
	// }
	
	// header('Content-Type: application/json; charset=utf-8');
	return $arrData;
}

		public function selectProjectPerUserStates($id_proyecto = null)
	{
		$idUsuario = $_SESSION['id_usuario'];
		$sql = "SELECT p.id_proyecto, p.nombre, 
				p.descripcion, p.fecha_inicio, 
				p.fecha_fin, a.estado, e.nombre_equipo 
				FROM proyecto p 
				INNER JOIN asignacion a ON a.id_asignacion = p.id_asignacion 
				INNER JOIN equipo e ON e.id_equipo = a.id_equipo 
				INNER JOIN equipo_usuario eu ON e.id_equipo = eu.id_equipo 
				WHERE a.status = 1 AND eu.id_usuario = $idUsuario;";

		if ($id_proyecto) {
			$sql .= " AND p.id_proyecto = '$id_proyecto'"; // Incluyendo el nombre directamente
		}

		$arrData =  $this->select_all($sql); 
		
		$sqlUsuario = "SELECT u.* FROM proyecto p
				INNER JOIN asignacion_equipo ae ON ae.id_asignacion = p.id_asignacion
				INNER JOIN equipo_usuario eu ON ae.id_equipo = eu.id_equipo
				INNER JOIN usuario u ON eu.id_usuario = u.id_usuario
				WHERE ae.id_equipo = eu.id_equipo  AND p.id_proyecto = '$id_proyecto';";

		$dataUsuario = $this->select_all($sqlUsuario);

		for ($i=0; $i < count($arrData); $i++) { 
			$arrData[$i]['datosUsuariosEquipo'] = $dataUsuario;
		}

		return $arrData;

	}


	// public function selectProjectPerTeams(){
	// 	$sql = "SELECT
	// 		p.id_proyecto,
	// 		e.id_equipo,
	// 		e.nombre_equipo,
	// 		SUM(CASE WHEN a.estado = 'pendiente' THEN 1 ELSE 0 END) AS total_pendiente,
	// 		SUM(CASE WHEN a.estado = 'en proceso' THEN 1 ELSE 0 END) AS total_en_proceso,
	// 		SUM(CASE WHEN a.estado = 'finalizado' THEN 1 ELSE 0 END) AS total_finalizado
	// 		FROM proyecto p 
	// 		INNER JOIN asignacion a ON a.id_asignacion = p.id_asignacion INNER JOIN equipo e ON e.id_equipo = a.id_equipo
	// 		WHERE a.status = 1 GROUP BY e.id_equipo ORDER BY e.id_equipo;			
	// 		";

	// 	$request = $this->select_all($sql);

	// 	return $request;
	// }



	public function selectTasksPerUserIndicator($userId)
	{
		$sql = "SELECT a.id_asignacion, a.estado, COUNT(a.id_asignacion) AS cantidad FROM asignacion a 
			INNER JOIN equipo_usuario eu ON a.id_equipo = eu.id_equipo WHERE eu.id_usuario = $userId AND eu.tipo_equipo = 1 GROUP BY estado";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectProjectPerUserIndicator($userId)
	{
		$sql = "SELECT a.id_asignacion, a.estado, COUNT(a.id_asignacion) AS cantidad FROM asignacion a 
			INNER JOIN equipo_usuario eu ON a.id_equipo = eu.id_equipo WHERE eu.id_usuario = $userId AND eu.tipo_equipo = 0 GROUP BY estado";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectMonthIncident($mes, $nivel, $unidad) {

		if($nivel == 2){
			$sql = "SELECT i.*, a.estado, a.fecha_asignacion, e.nombre_equipo, u.nombres FROM incidencias i 
			INNER JOIN asignacion a ON i.id_asignacion = a.id_asignacion
			INNER JOIN equipo e ON e.id_equipo = a.id_equipo
			INNER JOIN usuario u on u.id_usuario = i.reportado_por 
			WHERE MONTH(fecha_reporte) = $mes AND i.id_asignacion != 0";

			$request = $this->select_all($sql);

		}elseif($nivel == 1){
			$sql = "SELECT i.*, a.estado, a.fecha_asignacion, e.nombre_equipo, u.nombres FROM incidencias i 
			INNER JOIN asignacion a ON i.id_asignacion = a.id_asignacion
			INNER JOIN equipo e ON e.id_equipo = a.id_equipo
			INNER JOIN equipo_usuario eu ON eu.id_equipo = a.id_equipo
			INNER JOIN usuario u on u.id_usuario = i.reportado_por 
			WHERE MONTH(fecha_reporte) = $mes AND i.id_asignacion != 0 AND u.id_unidad = $unidad";

			$request = $this->select_all($sql);
		}else{
			$sql = "SELECT i.*, a.estado, a.fecha_asignacion, e.nombre_equipo, u.nombres FROM incidencias i 
			INNER JOIN asignacion a ON i.id_asignacion = a.id_asignacion
			INNER JOIN equipo e ON e.id_equipo = a.id_equipo
			INNER JOIN equipo_usuario eu ON eu.id_equipo = a.id_equipo
			INNER JOIN usuario u on u.id_usuario = i.reportado_por 
			WHERE MONTH(fecha_reporte) = $mes AND i.id_asignacion != 0 AND u.id_unidad = $unidad";
			
			$request = $this->select_all($sql);
		}

		return $request;
	}

	public function selectTasksFinalizedPerUserIndicator($userId)
	{
		$sql = "SELECT COUNT(a.id_asignacion) AS cantidad 
					FROM asignacion a 
					INNER JOIN equipo_usuario eu ON a.id_equipo = eu.id_equipo 
					WHERE eu.id_usuario = $userId 
					AND a.estado = 'finalizado' 
					AND DATE(a.fecha_asignacion) = CURDATE() ";

		$request = $this->select($sql);

		return $request;
	}

	public function selectTasksNumberPerUserIndicator($userId)
	{
		$sql = "SELECT COUNT(a.id_asignacion) AS cantidad FROM asignacion a 
			INNER JOIN equipo_usuario eu ON a.id_equipo = eu.id_equipo 
			WHERE eu.id_usuario = $userId AND DATE(a.fecha_asignacion) = CURDATE() ";

		$request = $this->select($sql);

		return $request;
	}

	public function selectAvgIncidentsPerUserIndicator($userId)
	{
		$sql = "SELECT 
					SUM(segundos_diferencia) AS Sumatoria, 
					COUNT(v.id_asignacion) AS Cantidad,
					ROUND(SUM(segundos_diferencia) / COUNT(v.id_asignacion) / 3600, 2) AS promedio
					FROM `equipo_usuario` eu 
					INNER JOIN `asignacion` a ON eu.id_equipo = a.id_equipo
					INNER JOIN `view_diferencia_seg_incidencias` v ON a.id_asignacion = v.id_asignacion 
					WHERE eu.id_usuario = $userId ";

		$request = $this->select($sql);


		return $request;
	}

	public function selectAvgIncidentsIndicatorGroupByTeam($nivel,$unidad)
	{
		if($nivel == 2){
			$sql = "SELECT 	
			e.nombre_equipo,
			SUM(segundos_diferencia) AS Sumatoria, 
			COUNT(a.id_asignacion) AS Cantidad,
			ROUND(SUM(segundos_diferencia) / COUNT(a.id_asignacion) / 3600, 2) AS promedio
			FROM `equipo_usuario` eu
			INNER JOIN equipo e ON e.id_equipo = eu.id_equipo
			INNER JOIN `asignacion` a ON eu.id_equipo = a.id_equipo
			INNER JOIN `view_diferencia_seg_incidencias` v ON a.id_asignacion = v.id_asignacion 
			GROUP BY e.nombre_equipo";

			$request = $this->select_all($sql);
		}elseif($nivel == 1){
			$sql = "SELECT 	
			e.nombre_equipo,
			SUM(segundos_diferencia) AS Sumatoria, 
			COUNT(a.id_asignacion) AS Cantidad,
			ROUND(SUM(segundos_diferencia) / COUNT(a.id_asignacion) / 3600, 2) AS promedio
			FROM `equipo_usuario` eu
			INNER JOIN equipo e ON e.id_equipo = eu.id_equipo
			INNER JOIN `asignacion` a ON eu.id_equipo = a.id_equipo
			INNER JOIN `view_diferencia_seg_incidencias` v ON a.id_asignacion = v.id_asignacion 
            INNER JOIN usuario u ON u.id_usuario = eu.id_usuario
            WHERE u.id_unidad = $unidad
			GROUP BY e.nombre_equipo";

			$request = $this->select_all($sql);

		}else{
			return false;
		}

		return $request;
	}

	public function selectTotalAvgIncidentsIndicator()
	{
		$sql = "SELECT 
						SUM(segundos_diferencia) AS Sumatoria, 
						COUNT(id_asignacion) AS Cantidad,
						ROUND(SUM(segundos_diferencia) / COUNT(id_asignacion) / 3600, 2) AS promedio
						FROM `view_diferencia_seg_incidencias`
					";

		$request = $this->select($sql);


		return $request;
	}

	public function selectUserTasksPerMonthIndicator($userId)
	{
		$sql = "SELECT 
					MONTH(fecha_asignacion) AS mes, 
					SUM(CASE WHEN estado = 'Pendiente' THEN 1 ELSE 0 END) AS pendiente, 
					SUM(CASE WHEN estado = 'En Proceso' THEN 1 ELSE 0 END) AS en_proceso, 
					SUM(CASE WHEN estado = 'Finalizado' THEN 1 ELSE 0 END) AS finalizado 
					FROM asignacion INNER JOIN equipo_usuario ON asignacion.id_equipo = equipo_usuario.id_equipo
					WHERE YEAR(fecha_asignacion) = YEAR(CURDATE()) 
					AND tipo_asignacion = 1 
					AND status = 1 
					AND equipo_usuario.id_usuario = $userId
					GROUP BY MONTH(fecha_asignacion) 
					ORDER BY mes
					";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectTasksPerMonthIndicator($nivel,$unidad)
	{
		if($nivel == 2){
			$sql = "SELECT 
			MONTH(fecha_asignacion) AS mes, 
			SUM(CASE WHEN estado = 'Pendiente' THEN 1 ELSE 0 END) AS pendiente, 
			SUM(CASE WHEN estado = 'En Proceso' THEN 1 ELSE 0 END) AS en_proceso, 
			SUM(CASE WHEN estado = 'Finalizado' THEN 1 ELSE 0 END) AS finalizado 
			FROM asignacion
			WHERE YEAR(fecha_asignacion) = YEAR(CURDATE()) AND tipo_asignacion = 1 AND status = 1
			GROUP BY MONTH(fecha_asignacion) 
			ORDER BY mes
			";

			$request = $this->select_all($sql);

		}else if( $nivel == 1){
			$sql = "SELECT 
			MONTH(fecha_asignacion) AS mes, 
			SUM(CASE WHEN estado = 'Pendiente' THEN 1 ELSE 0 END) AS pendiente, 
			SUM(CASE WHEN estado = 'En Proceso' THEN 1 ELSE 0 END) AS en_proceso, 
			SUM(CASE WHEN estado = 'Finalizado' THEN 1 ELSE 0 END) AS finalizado 
			FROM asignacion a INNER JOIN equipo_usuario eu ON a.id_equipo = eu.id_equipo
			INNER JOIN usuario u ON u.id_usuario = eu.id_usuario 
			WHERE YEAR(fecha_asignacion) = YEAR(CURDATE()) AND tipo_asignacion = 1 AND a.status = 1 AND u.id_unidad = $unidad
			GROUP BY MONTH(fecha_asignacion) 
			ORDER BY mes
			";

			$request = $this->select_all($sql);
		}else{ 
			return false;
		}

		return $request;
	}

	public function selectAllTasksIndicator($nivel,$unidad)
	{
		if($nivel == 2){
			$sql = "SELECT id_asignacion, estado, COUNT(id_asignacion) AS cantidad FROM asignacion 
			WHERE status = 1 AND tipo_asignacion = 1 GROUP BY estado";

			$request = $this->select_all($sql);

		}else if($nivel == 1){
			$sql = "SELECT id_asignacion, estado, COUNT(id_asignacion) AS cantidad FROM asignacion a
			INNER JOIN equipo_usuario eu ON eu.id_equipo = a.id_equipo
			INNER JOIN usuario u ON u.id_usuario = eu.id_usuario
			WHERE a.status = 1 AND tipo_asignacion = 1 AND u.id_unidad = $unidad GROUP BY estado";

			$request = $this->select_all($sql);

		}else{
			return false;
		}

		return $request;
	}

	public function selectAvgResourses()
	{
		$sql = "SELECT v.id_recurso,
        v.suma_recursos_iguales AS numero_recursos_utilizados,
        r.nombre,
        r.cantidad,
        ROUND((v.suma_recursos_iguales + r.cantidad), 2) AS total,
        ROUND((v.suma_recursos_iguales / (v.suma_recursos_iguales + r.cantidad)) * 100, 2) AS porcentaje_asignado
FROM `view_suma_recursos_iguales` v
INNER JOIN recursos r ON v.id_recurso = r.id_recurso
ORDER BY porcentaje_asignado DESC

					";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectMostDepletedResource()
	{
		$sql = "SELECT nombre, cantidad
			FROM recursos
			WHERE status = 1
			ORDER BY ABS(cantidad) ASC";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectTeamTopIncidents()
	{
		$sql = "SELECT e.nombre_equipo, MAX(v.finalizado) AS max_finalizado 
			FROM view_cantidad_incidencias v 
			INNER JOIN equipo e ON v.id_equipo = e.id_equipo 
			GROUP BY e.nombre_equipo ORDER BY max_finalizado 
			DESC LIMIT 1";

		$request = $this->select($sql);

		return $request;
	}

	public function selectTeamsPerIncidents($nivel,$unidad)
	{
		if($nivel == 2){
			$sql = "SELECT e.nombre_equipo, v.pendiente, v.en_proceso, v.finalizado
			FROM view_cantidad_incidencias v 
			INNER JOIN equipo e ON v.id_equipo = e.id_equipo 
			ORDER BY v.finalizado DESC
			";

			$request = $this->select_all($sql);
		}elseif ($nivel == 1) {
			$sql = "SELECT DISTINCT e.nombre_equipo, v.pendiente, v.en_proceso, v.finalizado
					FROM view_cantidad_incidencias v
					INNER JOIN equipo e ON v.id_equipo = e.id_equipo
					INNER JOIN equipo_usuario eu ON v.id_equipo = eu.id_equipo
					INNER JOIN usuario u ON u.id_usuario = eu.id_usuario
					WHERE u.id_unidad = 1
					ORDER BY v.finalizado DESC;
			";

			$request = $this->select_all($sql);
		}else{
			return false;
		}

		return $request;
	}

	public function selectJob()
	{
		$sql = "SELECT cargo,
    				SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as Masculino,
    				SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as Femenino
					FROM usuario GROUP BY cargo;
					";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectUserInJob($cargo)
	{
		$sql = "SELECT id_usuario, nombres, apellidos, sexo 
					FROM `usuario` WHERE cargo = '$cargo'
					";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectAvgTraining()
	{
		$sql = "WITH CapacitacionCantidad AS (
					SELECT c.tema, c.id_capacitacion, COUNT(uc.id_usuario) AS cantidad
					FROM capacitacion c
					INNER JOIN usuario_capacitacion uc ON c.id_capacitacion = uc.id_capacitacion
					GROUP BY c.tema
					), 
					TotalUsuarios AS (
						SELECT COUNT(id_usuario) AS cantidad_total FROM usuario
					), 
					TotalAsistencias AS (
						SELECT SUM(cantidad) AS suma_cantidad FROM CapacitacionCantidad
					), 
					UsuariosSexo AS (
						SELECT c.id_capacitacion,
							SUM(CASE WHEN u.sexo = 'M' THEN 1 ELSE 0 END) AS cantidad_hombres,
							SUM(CASE WHEN u.sexo = 'F' THEN 1 ELSE 0 END) AS cantidad_mujeres
						FROM capacitacion c
						INNER JOIN usuario_capacitacion uc ON c.id_capacitacion = uc.id_capacitacion
						INNER JOIN usuario u ON uc.id_usuario = u.id_usuario
						GROUP BY c.id_capacitacion
					)
					SELECT cc.tema, cc.id_capacitacion, cc.cantidad, tu.cantidad_total,
						ROUND((cc.cantidad / tu.cantidad_total * 100), 2) AS porcentaje,
						ta.suma_cantidad,
						(tu.cantidad_total * (SELECT COUNT(DISTINCT id_capacitacion) FROM capacitacion)) AS suma_cantidad_total,
						ROUND((ta.suma_cantidad / (tu.cantidad_total * (SELECT COUNT(DISTINCT id_capacitacion) FROM capacitacion)) * 100), 2) AS porcentaje_total,
						us.cantidad_hombres, us.cantidad_mujeres,
						ROUND((us.cantidad_hombres / cc.cantidad * 100), 2) AS porcentaje_hombres,
						ROUND((us.cantidad_mujeres / cc.cantidad * 100), 2) AS porcentaje_mujeres
					FROM CapacitacionCantidad cc
					JOIN TotalUsuarios tu ON 1=1
					JOIN TotalAsistencias ta ON 1=1
					JOIN UsuariosSexo us ON cc.id_capacitacion = us.id_capacitacion
					";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectUserInTraining($id_capacitacion)
	{
		$sql = "SELECT c.tema, u.id_usuario, u.nombres, u.apellidos, u.sexo 
			FROM `usuario_capacitacion` uc INNER JOIN usuario u ON u.id_usuario = uc.id_usuario
			INNER JOIN 	capacitacion c ON c.id_capacitacion = uc.id_capacitacion 
			WHERE uc.id_capacitacion = $id_capacitacion
			";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectIncidenceVariance()
	{
		$sql = "WITH meses AS (
					    SELECT 1 AS mes UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION 
					    SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION 
					    SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
					),
					incidencias_mes AS (
					    SELECT 
					        DATE_FORMAT(i.fecha_reporte, '%m') AS mes, 
					        COUNT(*) AS incidencias_finalizadas 
					    FROM 
					        incidencias i 
					    JOIN 
					        asignacion a ON i.id_asignacion = a.id_asignacion 
					    WHERE 
					        a.estado = 'Finalizado' 
					        AND YEAR(i.fecha_reporte) = YEAR(CURDATE()) 
					    GROUP BY 
					        DATE_FORMAT(i.fecha_reporte, '%m')
					),
					meses_con_incidencias AS (
					    SELECT 
					        m.mes, 
					        COALESCE(im.incidencias_finalizadas, 0) AS incidencias_finalizadas 
					    FROM 
					        meses m 
					    LEFT JOIN 
					        incidencias_mes im ON m.mes = im.mes
					),
					varianza_meses AS (
					    SELECT 
					        m1.mes, 
					        m1.incidencias_finalizadas, 
					        m2.incidencias_finalizadas AS incidencias_mes_anterior,
					        CASE 
					            WHEN m2.incidencias_finalizadas = 0 THEN 0
					            ELSE ROUND(((m1.incidencias_finalizadas - m2.incidencias_finalizadas) / m2.incidencias_finalizadas) * 100, 2)
					        END AS varianza_porcentual
					    FROM 
					        meses_con_incidencias m1 
					    LEFT JOIN 
					        meses_con_incidencias m2 ON m1.mes = m2.mes + 1
					)
					SELECT 
					    mes, 
					    incidencias_finalizadas, 
					    COALESCE(varianza_porcentual, 0) AS varianza_porcentual 
					FROM 
					    varianza_meses 
					ORDER BY 
					    mes;
					";




		$request = $this->select_all($sql);

		return $request;
	}



	public function selectIncidenceVarianceYear()
	{
		$sql = "WITH
				-- Obtenemos los años presentes en la tabla de incidencias
				años AS (
				    SELECT DISTINCT YEAR(fecha_reporte) AS anio
				    FROM incidencias
				),
				-- Contamos las incidencias finalizadas por año
				incidencias_anio AS (
				    SELECT 
				        YEAR(i.fecha_reporte) AS anio,
				        COUNT(*) AS incidencias_finalizadas
				    FROM 
				        incidencias i
				    JOIN 
				        asignacion a ON i.id_asignacion = a.id_asignacion
				    WHERE 
				        a.estado = 'Finalizado'
				    GROUP BY 
				        YEAR(i.fecha_reporte)
				),
				-- Combinamos todos los años con sus incidencias (si no hay incidencias se pone 0)
				años_con_incidencias AS (
				    SELECT 
				        a.anio,
				        COALESCE(ia.incidencias_finalizadas, 0) AS incidencias_finalizadas
				    FROM 
				        años a
				    LEFT JOIN 
				        incidencias_anio ia ON a.anio = ia.anio
				),
				-- Calculamos la varianza porcentual comparando el año actual con el anterior
				varianza_años AS (
				    SELECT 
				        a1.anio,
				        a1.incidencias_finalizadas,
				        a2.incidencias_finalizadas AS incidencias_anio_anterior,
				        CASE
				            WHEN a2.incidencias_finalizadas = 0 THEN
				                CASE 
				                    WHEN a1.incidencias_finalizadas = 0 THEN 0
				                    ELSE a1.incidencias_finalizadas * 100
				                END
				            ELSE 
				                ROUND(
				                    (
				                        (a1.incidencias_finalizadas - a2.incidencias_finalizadas)
				                        / a2.incidencias_finalizadas
				                    ) * 100,
				                    2
				                )
				        END AS varianza_porcentual
				    FROM 
				        años_con_incidencias a1
				    LEFT JOIN 
				        años_con_incidencias a2 ON a1.anio = a2.anio + 1
				)
				SELECT 
				    anio, 
				    incidencias_finalizadas, 
				    COALESCE(varianza_porcentual, 0) AS varianza_porcentual 
				FROM 
				    varianza_años 
				ORDER BY 
				    anio;
				";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectCapacitacionVariance()
	{
		$sql = "WITH meses AS (
				    SELECT 1 AS mes UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION 
				    SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION 
				    SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
				),
				participacion_por_mes AS (
				    SELECT
				        DATE_FORMAT(c.fecha, '%m') AS mes, -- Extraemos el mes de la fecha
				        COUNT(uc.id_usuario) AS total_participantes -- Contamos participantes
				    FROM
				        usuario_capacitacion uc
				    JOIN
				        capacitacion c ON uc.id_capacitacion = c.id_capacitacion
				    WHERE
				        YEAR(c.fecha) = YEAR(CURDATE()) -- Filtramos por el año actual
				    GROUP BY
				        DATE_FORMAT(c.fecha, '%m')
				),
				meses_con_participacion AS (
				    SELECT
				        m.mes,
				        COALESCE(p.total_participantes, 0) AS total_participantes -- Mostrar 0 si no hay datos
				    FROM
				        meses m
				    LEFT JOIN
				        participacion_por_mes p ON m.mes = p.mes
				),
				varianza_meses AS (
				    SELECT
				        m1.mes,
				        m1.total_participantes AS participacion_actual,
				        COALESCE(m2.total_participantes, 0) AS participacion_anterior, -- Mostrar 0 si no hay datos anteriores
				        CASE
				            WHEN m2.total_participantes = 0 THEN 0 -- Si no hay datos anteriores, la variación es 0
				            ELSE ROUND(((m1.total_participantes - m2.total_participantes) / m2.total_participantes * 100), 2) -- Tasa de variación
				        END AS tasa_variacion_porcentual
				    FROM
				        meses_con_participacion m1
				    LEFT JOIN
				        meses_con_participacion m2 ON m1.mes = m2.mes + 1 -- Comparar con el mes anterior
				)
				SELECT
				    mes,
				    participacion_actual,
				    participacion_anterior,
				    COALESCE(tasa_variacion_porcentual, 0) AS tasa_variacion_porcentual -- Mostrar 0 si no hay variación
				FROM
				    varianza_meses
				ORDER BY
				    mes;";

		$request = $this->select_all($sql);

		return $request;
	}


	public function selectTimeIncidentsVariance()
	{
				$sql = "WITH meses AS (
		    SELECT 1 AS mes UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION 
		    SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION 
		    SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
		),
		tiempos_por_mes AS (
		    SELECT
		        MONTH(fecha_solucion) AS mes,
		        SUM(TIMESTAMPDIFF(SECOND, fecha_inicio, fecha_solucion)) AS tiempo_total_segundos
		    FROM incidencias
		    WHERE 
		        status = 0 
		        AND fecha_inicio > '2000-01-01'
		        AND YEAR(fecha_solucion) = YEAR(CURDATE())  -- Se usa fecha_solucion para considerar solo las cerradas
		    GROUP BY MONTH(fecha_solucion)
		),
		meses_con_tiempos AS (
		    SELECT
		        m.mes,
		        COALESCE(t.tiempo_total_segundos, 0) AS tiempo_total_segundos,
		        -- Convertir segundos a horas, minutos y segundos
		        COALESCE(FLOOR(t.tiempo_total_segundos / 3600), 0) AS horas,
		        COALESCE(FLOOR((t.tiempo_total_segundos % 3600) / 60), 0) AS minutos,
		        COALESCE(ROUND(t.tiempo_total_segundos % 60, 2), 0) AS segundos
		    FROM meses m
		    LEFT JOIN tiempos_por_mes t ON m.mes = t.mes
		),
		varianza_meses AS (
		    SELECT
		        m1.mes,
		        CONCAT(m1.horas, 'h ', m1.minutos, 'm ', m1.segundos, 's') AS tiempo_actual_formateado,
		        CONCAT(m2.horas, 'h ', m2.minutos, 'm ', m2.segundos, 's') AS tiempo_anterior_formateado,
		        CASE
		            WHEN m2.tiempo_total_segundos = 0 THEN 0
		            ELSE ROUND(
		                ((m1.tiempo_total_segundos - m2.tiempo_total_segundos) / m2.tiempo_total_segundos) * 100, 
		                2
		            )
		        END AS tasa_variacion_porcentual
		    FROM meses_con_tiempos m1
		    LEFT JOIN meses_con_tiempos m2 ON m1.mes = m2.mes + 1
		)
		SELECT
		    mes,
		    tiempo_actual_formateado AS tiempo_total,
		    tiempo_anterior_formateado AS tiempo_total_anterior,
		    COALESCE(tasa_variacion_porcentual, 0) AS tasa_variacion_porcentual
		FROM varianza_meses
		ORDER BY mes;
		";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectTimeIncidentsVarianceYear()
	{
		$sql = "WITH AniosRegistrados AS (
				    -- Obtener todos los años distintos donde hubo incidencias solucionadas
				    SELECT DISTINCT YEAR(fecha_solucion) AS Anio
				    FROM incidencias
				    WHERE fecha_solucion IS NOT NULL
				),
				TiemposPorAnio AS (
				    -- Calcular la suma total de tiempo de solución por año
				    SELECT
				        YEAR(fecha_solucion) AS Anio,
				        SUM(TIMESTAMPDIFF(SECOND, fecha_inicio, fecha_solucion)) AS tiempo_total_segundos
				    FROM incidencias
				    WHERE 
				        status = 0 
				        AND fecha_inicio > '2000-01-01'
				        AND fecha_solucion IS NOT NULL
				    GROUP BY YEAR(fecha_solucion)
				),
				AniosConTiempos AS (
				    -- Unir los años registrados con los tiempos calculados
				    SELECT
				        a.Anio,
				        COALESCE(t.tiempo_total_segundos, 0) AS tiempo_total_segundos,
				        -- Convertir segundos a horas, minutos y segundos
				        COALESCE(FLOOR(t.tiempo_total_segundos / 3600), 0) AS horas,
				        COALESCE(FLOOR((t.tiempo_total_segundos % 3600) / 60), 0) AS minutos,
				        COALESCE(ROUND(t.tiempo_total_segundos % 60, 2), 0) AS segundos
				    FROM AniosRegistrados a
				    LEFT JOIN TiemposPorAnio t ON a.Anio = t.Anio
				),
				VarianzaAnios AS (
				    -- Calcular la tasa de variación de un año con respecto al anterior
				    SELECT
				        a1.Anio,
				        CONCAT(a1.horas, 'h ', a1.minutos, 'm ', a1.segundos, 's') AS tiempo_actual_formateado,
				        CONCAT(a2.horas, 'h ', a2.minutos, 'm ', a2.segundos, 's') AS tiempo_anterior_formateado,
				        CASE
				            WHEN a2.tiempo_total_segundos = 0 THEN 0
				            ELSE ROUND(
				                ((a1.tiempo_total_segundos - a2.tiempo_total_segundos) / a2.tiempo_total_segundos) * 100, 
				                2
				            )
				        END AS tasa_variacion_porcentual
				    FROM AniosConTiempos a1
				    LEFT JOIN AniosConTiempos a2 ON a1.Anio = a2.Anio + 1
				)
				SELECT
				    Anio AS 'Año',
				    tiempo_actual_formateado AS 'tiempo_total_solucionado',
				    tiempo_anterior_formateado AS 'tiempo_anio_anterior',
				    COALESCE(tasa_variacion_porcentual, 0) AS 'tasa_de_variación'
				FROM VarianzaAnios
				ORDER BY Anio;
				";

		$request = $this->select_all($sql);

		return $request;
	}


	public function selectCapacitacionVarianceYear()
	{
		$sql = "WITH años AS (
			    SELECT DISTINCT YEAR(c.fecha) AS año -- Extraemos todos los años únicos de la tabla
			    FROM capacitacion c
			),
			participacion_por_año AS (
			    SELECT
			        YEAR(c.fecha) AS año, -- Agrupamos por año
			        COUNT(uc.id_usuario) AS total_participantes -- Contamos participantes
			    FROM
			        usuario_capacitacion uc
			    JOIN
			        capacitacion c ON uc.id_capacitacion = c.id_capacitacion
			    GROUP BY
			        YEAR(c.fecha)
			),
			años_con_participacion AS (
			    SELECT
			        a.año,
			        COALESCE(p.total_participantes, 0) AS total_participantes -- Mostrar 0 si no hay datos
			    FROM
			        años a
			    LEFT JOIN
			        participacion_por_año p ON a.año = p.año
			),
			varianza_años AS (
			    SELECT
			        a1.año,
			        a1.total_participantes AS participacion_actual,
			        COALESCE(a2.total_participantes, 0) AS participacion_anterior, -- Mostrar 0 si no hay datos anteriores
			        CASE
			            WHEN a2.total_participantes = 0 THEN 0 -- Si no hay datos anteriores, la variación es 0
			            ELSE ROUND(((a1.total_participantes - a2.total_participantes) / a2.total_participantes * 100), 2) -- Tasa de variación
			        END AS tasa_variacion_porcentual
			    FROM
			        años_con_participacion a1
			    LEFT JOIN
			        años_con_participacion a2 ON a1.año = a2.año + 1 -- Comparar con el año anterior
			)
			SELECT
			    año,
			    participacion_actual,
			    participacion_anterior,
			    COALESCE(tasa_variacion_porcentual, 0) AS tasa_variacion_porcentual -- Mostrar 0 si no hay variación
			FROM
			    varianza_años
			ORDER BY
			    año;";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectTimeAsignacionIncident()
	{
				$sql = "WITH meses AS (
		    SELECT 1 AS mes UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION 
		    SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION 
		    SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
		),
		tiempos_por_mes AS (
		    SELECT
		        MONTH(i.fecha_reporte) AS mes,
		        SUM(
		            TIMESTAMPDIFF(SECOND, i.fecha_reporte, a.fecha_asignacion)
		        ) AS tiempo_total_segundos  -- SUMAMOS en lugar de promediar
		    FROM incidencias i
		    JOIN asignacion a ON i.id_asignacion = a.id_asignacion
		    WHERE 
		        i.status = 0 
		        AND i.fecha_reporte IS NOT NULL 
		        AND a.fecha_asignacion IS NOT NULL
		        AND a.fecha_asignacion >= i.fecha_reporte  -- Asegurar valores positivos
		        AND YEAR(i.fecha_reporte) = YEAR(CURDATE())  -- Solo del año actual
		    GROUP BY MONTH(i.fecha_reporte)
		),
		meses_con_tiempos AS (
		    SELECT
		        m.mes,
		        COALESCE(t.tiempo_total_segundos, 0) AS tiempo_total_segundos,
		        -- Convertir segundos a horas, minutos y segundos
		        FLOOR(COALESCE(t.tiempo_total_segundos, 0) / 3600) AS horas,
		        FLOOR((COALESCE(t.tiempo_total_segundos, 0) % 3600) / 60) AS minutos,
		        ROUND(COALESCE(t.tiempo_total_segundos, 0) % 60, 2) AS segundos
		    FROM meses m
		    LEFT JOIN tiempos_por_mes t ON m.mes = t.mes
		),
		varianza_meses AS (
		    SELECT
		        m1.mes,
		        CONCAT(m1.horas, 'h ', m1.minutos, 'm ', m1.segundos, 's') AS tiempo_actual_formateado,
		        CONCAT(m2.horas, 'h ', m2.minutos, 'm ', m2.segundos, 's') AS tiempo_anterior_formateado,
		        CASE
		            WHEN m2.tiempo_total_segundos = 0 THEN 0  -- Evita división por cero
		            ELSE ROUND(
		                ((m1.tiempo_total_segundos - m2.tiempo_total_segundos) / m2.tiempo_total_segundos) * 100, 
		                2
		            )
		        END AS tasa_variacion_porcentual
		    FROM meses_con_tiempos m1
		    LEFT JOIN meses_con_tiempos m2 ON m1.mes = m2.mes + 1  -- Comparar con el mes anterior
		)
		SELECT
		    mes,
		    tiempo_actual_formateado AS tiempo_total_asignacion,
		    tiempo_anterior_formateado AS tiempo_total_anterior,
		    COALESCE(tasa_variacion_porcentual, 0) AS tasa_variacion_porcentual
		FROM varianza_meses
		ORDER BY mes;
		";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectTimeAsignacionIncidentYear()
	{
		$sql = "WITH anios AS (
    SELECT DISTINCT YEAR(fecha_reporte) AS anio
    FROM incidencias
    WHERE fecha_reporte IS NOT NULL
),
tiempos_por_anio AS (
    SELECT
        YEAR(i.fecha_reporte) AS anio,
        SUM(TIMESTAMPDIFF(SECOND, i.fecha_reporte, a.fecha_asignacion)) AS tiempo_total_segundos
    FROM incidencias i
    JOIN asignacion a ON i.id_asignacion = a.id_asignacion
    WHERE 
        i.status = 0
        AND i.fecha_reporte IS NOT NULL 
        AND a.fecha_asignacion IS NOT NULL
        AND a.fecha_asignacion >= i.fecha_reporte  -- Asegurar valores positivos
    GROUP BY YEAR(i.fecha_reporte)
),
anios_con_tiempos AS (
    SELECT
        a.anio,
        COALESCE(t.tiempo_total_segundos, 0) AS tiempo_total_segundos,
        -- Convertir segundos a horas, minutos y segundos
        FLOOR(COALESCE(t.tiempo_total_segundos, 0) / 3600) AS horas,
        FLOOR((COALESCE(t.tiempo_total_segundos, 0) % 3600) / 60) AS minutos,
        ROUND(COALESCE(t.tiempo_total_segundos, 0) % 60, 2) AS segundos
    FROM anios a
    LEFT JOIN tiempos_por_anio t ON a.anio = t.anio
),
varianza_anios AS (
    SELECT
        a1.anio,
        CONCAT(a1.horas, 'h ', a1.minutos, 'm ', a1.segundos, 's') AS tiempo_actual_formateado,
        CONCAT(a2.horas, 'h ', a2.minutos, 'm ', a2.segundos, 's') AS tiempo_anterior_formateado,
        CASE
            WHEN a2.tiempo_total_segundos = 0 THEN 0  -- Evita división por cero
            ELSE ROUND(
                ((a1.tiempo_total_segundos - a2.tiempo_total_segundos) / a2.tiempo_total_segundos) * 100, 
                2
            )
        END AS tasa_variacion_porcentual
    FROM anios_con_tiempos a1
    LEFT JOIN anios_con_tiempos a2 ON a1.anio = a2.anio + 1  -- Comparar con el año anterior
)
SELECT
    anio,
    tiempo_actual_formateado AS tiempo_total_asignacion,
    tiempo_anterior_formateado AS tiempo_total_anterior,
    COALESCE(tasa_variacion_porcentual, 0) AS tasa_variacion_porcentual
FROM varianza_anios
ORDER BY anio;
";

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectMantenimientoVariance()
	{
		$sql = 'WITH 
				Meses AS (
				    SELECT 1 AS Mes UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 
				    UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
				),
				MantenimientosPorMes AS (
				    SELECT
				        MONTH(i.fecha_solucion) AS Mes,  -- Se usa fecha_solucion en lugar de fecha_reporte
				        COUNT(*) AS TotalMantenimientos
				    FROM incidencias i
				    JOIN tipo_incidencia ti ON i.id_tipo = ti.id_tipo
				    WHERE 
				        ti.subtipo = 0  -- Solo incidencias de subtipo mantenimiento
				        AND i.fecha_solucion IS NOT NULL  -- Solo mantenimientos finalizados
				        AND YEAR(i.fecha_solucion) = YEAR(CURDATE())  -- Año actual
				    GROUP BY Mes
				),
				DatosCompletos AS (
				    SELECT
				        m.Mes,
				        COALESCE(mp.TotalMantenimientos, 0) AS TotalMantenimientos
				    FROM Meses m
				    LEFT JOIN MantenimientosPorMes mp ON m.Mes = mp.Mes
				),
				CalculoTasa AS (
				    SELECT
				        Mes,
				        TotalMantenimientos,
				        COALESCE(LAG(TotalMantenimientos) OVER (ORDER BY Mes), 0) AS MantenimientosAnteriores
				    FROM DatosCompletos
				)
				SELECT
				    Mes AS "Mes",
				    TotalMantenimientos AS "mantenimientos_finalizados",
				    MantenimientosAnteriores AS "mantenimientos_mes_anterior",
				    CASE
				        WHEN MantenimientosAnteriores = 0 THEN 0
				        ELSE ROUND(
				            (TotalMantenimientos - MantenimientosAnteriores) / MantenimientosAnteriores * 100, 
				            2
				        )
				    END AS "tasa_de_variación"
				FROM CalculoTasa
				ORDER BY Mes;
				';

		$request = $this->select_all($sql);

		return $request;
	}

	public function selectMantenimientoVarianceYear()
	{
		$sql = 'WITH 
				Anios AS (
				    SELECT DISTINCT YEAR(fecha_solucion) AS Anio
				    FROM incidencias
				    WHERE fecha_solucion IS NOT NULL
				),
				MantenimientosPorAnio AS (
				    SELECT
				        YEAR(i.fecha_solucion) AS Anio,
				        COUNT(*) AS TotalMantenimientos
				    FROM incidencias i
				    JOIN tipo_incidencia ti ON i.id_tipo = ti.id_tipo
				    WHERE 
				        ti.subtipo = 0  -- Solo incidencias de subtipo mantenimiento
				        AND i.fecha_solucion IS NOT NULL  -- Solo mantenimientos finalizados
				    GROUP BY YEAR(i.fecha_solucion)
				),
				DatosCompletos AS (
				    SELECT
				        a.Anio,
				        COALESCE(mp.TotalMantenimientos, 0) AS TotalMantenimientos
				    FROM Anios a
				    LEFT JOIN MantenimientosPorAnio mp ON a.Anio = mp.Anio
				),
				CalculoTasa AS (
				    SELECT
				        Anio,
				        TotalMantenimientos,
				        COALESCE(LAG(TotalMantenimientos) OVER (ORDER BY Anio), 0) AS MantenimientosAnteriores
				    FROM DatosCompletos
				)
				SELECT
				    Anio AS "Anio",
				    TotalMantenimientos AS "mantenimientos_finalizados",
				    MantenimientosAnteriores AS "mantenimientos_anio_anterior",
				    CASE
				        WHEN MantenimientosAnteriores = 0 THEN 0
				        ELSE ROUND(
				            (TotalMantenimientos - MantenimientosAnteriores) / MantenimientosAnteriores * 100, 
				            2
				        )
				    END AS "tasa_de_variación"
				FROM CalculoTasa
				ORDER BY Anio;
				';

		$request = $this->select_all($sql);

		return $request;
	}
}