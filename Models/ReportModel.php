<?php
class ReportModel extends Mysql
{
	public function __construct()
	{
		parent::__construct();
	}


//REPORTE DE EMPLEADOS
	public function ReportUsers($sexo, $fechaNacimiento)
	{
		$sql = "SELECT id_usuario, id_unidad, nombres, apellidos, fecha_nacimiento, telefono, cargo, sexo, discapacidad, email, nivel FROM usuario WHERE 1=1";

		if ($sexo != "x" && $fechaNacimiento != "x") {
			$sql .= " AND sexo = '$sexo' AND YEAR(fecha_nacimiento) = '$fechaNacimiento' ";
		} elseif ($fechaNacimiento != "x") {
			$sql .= " AND YEAR(fecha_nacimiento) = '$fechaNacimiento' ";
		} elseif ($sexo != "x") {
			$sql .= " AND sexo = '$sexo' ";
		}
		


		$request = $this->select_all($sql);

		return $request;
	}

	//REPORTE DE RECURSOS 
	public function ReportResources($opcion)
{   
    if ($opcion == 'x') {
        // Consulta para recursos disponibles
        $sql = "SELECT nombre, tipo, cantidad 
                FROM recursos 
                WHERE status = 1";

        $request = $this->select_all($sql); // Ejecutar consulta
    } else {
        // Construir la consulta para recursos asignados
        $sql = "SELECT ar.id_asignacion, 
                       CASE 
                           WHEN a.tipo_asignacion = 0 THEN p.nombre 
                          WHEN a.tipo_asignacion = 1 THEN CONCAT(ti.nombre_tipo, ' (', i.descripcion, ')')
                       END AS nombre_asignado,
                       a.tipo_asignacion, 
                       r.nombre AS recurso_nombre, 
                       r.tipo AS recurso_tipo, 
                       ar.cantidad_asignada 
                FROM asignacion_recurso ar
                INNER JOIN recursos r ON ar.id_recurso = r.id_recurso
                INNER JOIN asignacion a ON ar.id_asignacion = a.id_asignacion
                LEFT JOIN proyecto p ON a.id_asignacion = p.id_asignacion
                LEFT JOIN incidencias i ON a.id_asignacion = i.id_asignacion
                LEFT JOIN tipo_incidencia ti ON i.id_tipo = ti.id_tipo
                WHERE a.tipo_asignacion = " . intval($opcion);

        $request = $this->select_all($sql); // Ejecutar consulta
    }

    return $request;
}


	public function reportAchievedGoals($fecha1, $fecha2)
	{
		$sql = "SELECT 
            m.meta, 
            md.fecha_creacion, 
            md.fecha_limite, 
            md.cantidad_progreso, 
            md.cantidad_objetivo,
            ROUND((md.cantidad_progreso / md.cantidad_objetivo) * 100, 2) AS porcentaje_cumplimiento
        FROM metas_dinamicas md
        INNER JOIN metas m ON md.id_metas = m.id_metas
        WHERE estado = 0";

if ($fecha1 !== 'x' && $fecha2 !== 'x') {
    $fecha1 .= " 00:00:00"; 
    $fecha2 .= " 23:59:59"; 
    $sql .= " AND md.fecha_limite BETWEEN '$fecha1' AND '$fecha2'";
} elseif ($fecha1 !== 'x') {
    $fecha1 .= " 00:00:00"; 
    $sql .= " AND md.fecha_limite >= '$fecha1'";
}

error_log("Consulta generada: " . $sql);
		$request = $this->select_all($sql);
		return $request;
	}

//REPORTE HISTORICO
	public function ReportOperations($estado, $fecha1, $fecha2)
{
    // Asignar valores predeterminados ("x") si los parámetros son NULL
    $estado = $_POST['estado'] ?? 'x'; // Toma el valor de $_POST['estado'], o 'x' si no está definido

    $fecha1 = $fecha1 ?? 'x';
    $fecha2 = $fecha2 ?? 'x';

    $sql = "SELECT 
            fecha_operacion, 
            nombres, 
            tipo_operacion, 
            descripcion_operacion, 
            estado
            FROM historico_operaciones 
            INNER JOIN usuario ON historico_operaciones.id_usuario = usuario.id_usuario WHERE 1=1";

    // Filtrar por estado si no es "x"
    if ($estado !== "x" && in_array($estado, ['0', '1'])) {
        $sql .= " AND estado = '$estado'";
    }

    // Filtrar por rango de fechas si ambas están definidas
    if ($fecha1 !== "x" && $fecha2 !== "x") {
        $fecha1 .= " 00:00:00"; // Hora de inicio del día
        $fecha2 .= " 23:59:59"; // Hora final del día
        $sql .= " AND fecha_operacion BETWEEN '$fecha1' AND '$fecha2'";
    }
    if ($fecha1 !== "x") {
        // Filtrar solo por fecha1 si fecha2 no está definida
        $fecha1 .= " 00:00:00"; // Hora de inicio del día
        $sql .= " AND fecha_operacion >= '$fecha1'";
    }

    // Registrar la consulta generada para depuración
    error_log("Consulta generada: " . $sql);

    $request = $this->select_all($sql);

    // Transformar el estado en el resultado
if (!empty($request)) {
    foreach ($request as &$row) {
        // Convertir el estado a un formato amigable
        $row['estado'] = intval($row['estado']) === 1 ? 'Exitoso' : 'Fallido';
    }
}


    return $request;
}


//REPORTE PROYECTO
	public function ReportProject($estadoP, $fecha1, $fecha2)
{
    $estadoP = $estadoP ?? 'x';
    $fecha1 = $fecha1 ?? 'x';
    $fecha2 = $fecha2 ?? 'x';

    $sql = "SELECT 
                p.id_proyecto, 
                p.nombre, 
                p.descripcion, 
                p.fecha_inicio,
                p.fecha_fin,
                p.status, 
                a.fecha_asignacion,
                a.tipo_asignacion,
                a.estado, 
                e.nombre_equipo
            FROM 
                proyecto p
            INNER JOIN 
                asignacion a ON p.id_asignacion = a.id_asignacion
            INNER JOIN 
                equipo e ON a.id_equipo = e.id_equipo
            WHERE 
                p.status = 0";

    // Filtrar por estado si no es "x"
    if ($estadoP !== "x") {
        $sql .= " AND a.estado = '$estadoP'";
    }

    // Filtrar por rango de fechas si ambas están definidas
    if ($fecha1 !== "x" && $fecha2 !== "x") {
       
        $sql .= " AND a.fecha_asignacion BETWEEN '$fecha1' AND '$fecha2'";
    } elseif ($fecha1 !== "x") {
        
        $sql .= " AND a.fecha_asignacion >= '$fecha1'";
    } elseif ($fecha2 !== "x") {
       
        $sql .= " AND a.fecha_asignacion <= '$fecha2'";
    }

    // Registrar la consulta generada para depuración
    error_log("Consulta generada: " . $sql);

    $request = $this->select_all($sql);
    return $request;
}

//REPORTE INCIDENCIAS
public function ReportIncident($estadoP, $fecha1, $fecha2)
{
    $estadoP = $estadoP ?? 'x';
    $fecha1 = $fecha1 ?? 'x';
    $fecha2 = $fecha2 ?? 'x';

    $sql = "SELECT 
    ti.id_tipo AS id_tipo, 
    ti.categoria AS categoria, 
    ti.nombre_tipo AS nombre_tipo, 
    i.descripcion AS descripcion, 
    i.fecha_reporte AS fecha_reporte,
    i.fecha_solucion AS fecha_solucion, 
    a.fecha_asignacion AS fecha_asignacion,
    a.estado AS estado, 
    e.nombre_equipo AS nombre_equipo, 
    u.nombres AS nombres_usuario, 
    u.apellidos AS apellidos_usuario
FROM 
    tipo_incidencia ti
INNER JOIN 
    incidencias i ON ti.id_tipo = i.id_tipo
INNER JOIN 
    asignacion a ON i.id_asignacion = a.id_asignacion
INNER JOIN 
    equipo e ON a.id_equipo = e.id_equipo
INNER JOIN 
    usuario u ON i.reportado_por = u.id_usuario
WHERE 
    ti.status = 1 
    AND a.status = 1 
    AND e.status = 1 
    AND e.tipo_equipo = 1";

    // Filtrar por estado si no es "x"
    if ($estadoP !== "x") {
        $sql .= " AND a.estado = '$estadoP'";
    }

    // Filtrar por rango de fechas si ambas están definidas
    if ($fecha1 !== "x" && $fecha2 !== "x") {
       
        $sql .= " AND a.fecha_asignacion BETWEEN '$fecha1' AND '$fecha2'";
    } elseif ($fecha1 !== "x") {
        
        $sql .= " AND a.fecha_asignacion >= '$fecha1'";
    } elseif ($fecha2 !== "x") {
       
        $sql .= " AND a.fecha_asignacion <= '$fecha2'";
    }

    // Registrar la consulta generada para depuración
    error_log("Consulta generada: " . $sql);

    $request = $this->select_all($sql);
    return $request;
}


//========================REPORT CUSTOM============================================
	public function ReporteEmpleadosCargoGenero()
	{
		$sql = "SELECT cargo,
			SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) as Masculino,
			SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) as Femenino
			FROM usuario GROUP BY cargo;
			";

		$request = $this->select_all($sql);

		return $request;
	}

	public function ReporteProyectos()
	{
		$sql = "SELECT p.id_proyecto, 
			p.nombre, 
			p.descripcion, p.fecha_inicio, 
			p.fecha_fin, a.estado, e.nombre_equipo 
			FROM proyecto p INNER JOIN asignacion a 
			ON a.id_asignacion = p.id_asignacion 
			INNER JOIN equipo e ON e.id_equipo = a.id_equipo WHERE a.status = 1";

		$request = $this->select_all($sql);

		return $request;
	}

	public function ReporteIncidenciasMesEquipo($userId)
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

	public function ReporteIncidenciasMes()
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
					GROUP BY MONTH(fecha_asignacion) 
					ORDER BY mes		
				";

		$request = $this->select_all($sql);

		return $request;
	}

	public function ReportePorcentajePorCapacitacion()
	{
		$sql = "WITH CapacitacionCantidad AS (
				SELECT c.tema, c.id_capacitacion, COUNT(uc.id_usuario) AS cantidad
				FROM capacitacion c
				INNER JOIN usuario_capacitacion uc ON c.id_capacitacion = uc.id_capacitacion
				GROUP BY c.tema, c.id_capacitacion
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
					ROUND((us.cantidad_mujeres / cc.cantidad * 100), 2) AS porcentaje_mujeres,
					cc.cantidad AS total_participantes_por_curso
				FROM CapacitacionCantidad cc
				JOIN TotalUsuarios tu ON 1=1
				JOIN TotalAsistencias ta ON 1=1
				JOIN UsuariosSexo us ON cc.id_capacitacion = us.id_capacitacion
				";

		$request = $this->select_all($sql);

		return $request;
	}



	public function ReporteUsuariosEnCapacitacion($id_capacitacion)
	{
		$sql = "SELECT c.tema, u.id_usuario, u.nombres, u.apellidos, u.sexo 
			FROM `usuario_capacitacion` uc INNER JOIN usuario u ON u.id_usuario = uc.id_usuario
			INNER JOIN 	capacitacion c ON c.id_capacitacion = uc.id_capacitacion 
			WHERE uc.id_capacitacion = $id_capacitacion
			";

		$request = $this->select_all($sql);

		return $request;
	}

	public function ReporteRecursosUsados()
	{
		$sql = "SELECT 
						v.id_recurso, 
						v.suma_recursos_iguales AS numero_recursos_utilizados, 
						r.nombre, 
						r.cantidad, 
						
						ROUND((r.cantidad - v.suma_recursos_iguales), 2) AS recursos_restantes,
						r.cantidad AS total_recursos,
						ROUND((v.suma_recursos_iguales + r.cantidad), 2) AS total, 
						ROUND((v.suma_recursos_iguales / (v.suma_recursos_iguales + r.cantidad)) * 100, 2) AS porcentaje_asignado
					FROM `view_suma_recursos_iguales` v 
					INNER JOIN recursos r ON v.id_recurso = r.id_recurso 
					ORDER BY porcentaje_asignado DESC";
		$request = $this->select_all($sql);
		return $request;
	}


	public function ReporteRecursosAgotados()
	{
		$sql = "SELECT nombre, cantidad
			FROM `recursos` 
			ORDER BY ABS(cantidad) ASC
			";

		$request = $this->select_all($sql);

		return $request;
	}

	public function ReporteRecursosReciclaje()
	{
		$sql = "SELECT r.nombre, rr.cantidad
			FROM `recursos` r
			INNER JOIN `recursos_reciclados` rr
			ON r.id_recurso = rr.id_recurso
			";

		$request = $this->select_all($sql);

		return $request;
	}
}
