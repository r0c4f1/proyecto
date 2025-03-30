<?php
class TaskListModel extends Mysql
{
	public function __construct()
	{
		parent::__construct();
	}

	//FUNCIÓN PARA OBTENER LOS EQUIPOS DE UN USUARIO EN ESPECÍFICO
	public function selectEquipo($idUsuario)
	{
		$sql = "SELECT id_equipo FROM `equipo_usuario` WHERE id_usuario = $idUsuario ";

		$request = $this->select_all($sql);

		return $request;
	}

	//FUNCIÓN PARA OBTENER LAS INCIDENCIAS PENDIENTES DEL USUARIO
	public function selectIncident($idEquipo)
	{
		$sql = "SELECT 
				tipo_incidencia.*, 
				incidencias.*, 
				asignacion.*, 
				DATE_FORMAT(incidencias.fecha_reporte, '%d-%m-%Y %H:%i:%s') AS fecha_reporte_formateada, 
				DATE_FORMAT(incidencias.fecha_solucion, '%d-%m-%Y %H:%i:%s') AS fecha_solucion_formateada
			FROM 
				tipo_incidencia
			JOIN 
				incidencias ON tipo_incidencia.id_tipo = incidencias.id_tipo
			JOIN 
				asignacion ON incidencias.id_asignacion = asignacion.id_asignacion
			WHERE 
				asignacion.status = 1 
				AND asignacion.estado = 'Pendiente' 
				AND asignacion.id_equipo = $idEquipo
";
		$request = $this->select_all($sql);

		return $request;
	}

	//FUNCIÓN PARA OBTENER LOS PROYECTOS PENDIENTES DEL USUARIO
	public function selectProject($idEquipo)
	{

		$sql = "SELECT *,
		DATE_FORMAT(fecha_inicio, '%d-%m-%Y') as fecha_inicio_formateada
		FROM proyecto
		JOIN asignacion ON proyecto.id_asignacion = asignacion.id_asignacion
		WHERE asignacion.status = 1
  		AND asignacion.estado = 'Pendiente'
  		AND asignacion.id_equipo = $idEquipo";

		$request = $this->select_all($sql);

		return $request;
	}

	//FUNCIÓN PARA OBTENER LAS INDICENCIAS EN PROCESO DEL USUARIO
	public function selectIncidentInProcess($idEquipo)
	{

		$sql = "SELECT asignacion.*, incidencias.*, tipo_incidencia.*,
			DATE_FORMAT(fecha_reporte, '%d-%m-%Y') as fecha_reporte_formateada
			FROM asignacion 
			INNER JOIN incidencias ON asignacion.id_asignacion = incidencias.id_asignacion 
			INNER JOIN tipo_incidencia ON incidencias.id_tipo = tipo_incidencia.id_tipo 
			
			WHERE asignacion.status = 1 AND asignacion.estado = 'En Proceso' AND asignacion.id_equipo = $idEquipo";
		$request = $this->select_all($sql);

		return $request;
	}

	//FUNCIÓN PARA OBTENER LOS PROYECTOS EN PROCESO DEL USUARIO
	public function selectProjectInProcess($idEquipo)
	{

		$sql = "SELECT *,
		DATE_FORMAT(fecha_inicio, '%d-%m-%Y') as fecha_inicio_formateada
		FROM proyecto
		JOIN asignacion ON proyecto.id_asignacion = asignacion.id_asignacion
		WHERE asignacion.status = 1
  		AND asignacion.estado = 'En Proceso'
  		AND asignacion.id_equipo = $idEquipo";
		$request = $this->select_all($sql);

		return $request;
	}

	//FUNCIÓN PARA OBTENER LAS INDICENCIAS FINALIZADAS DEL USUARIO
	public function selectIncidentFinalized($idEquipo)
	{

		$sql = "SELECT asignacion.*, incidencias.*, tipo_incidencia.*,
		DATE_FORMAT(fecha_reporte, '%d-%m-%Y') as fecha_reporte_formateada,
		DATE_FORMAT(fecha_solucion, '%d-%m-%Y') as fecha_solucion_formateada
		FROM asignacion 
		INNER JOIN incidencias ON asignacion.id_asignacion = incidencias.id_asignacion 
		INNER JOIN tipo_incidencia ON incidencias.id_tipo = tipo_incidencia.id_tipo 
		
		WHERE asignacion.status = 1  AND asignacion.estado = 'Finalizado'AND asignacion.id_equipo = $idEquipo";
		$request = $this->select_all($sql);

		return $request;
	}

	//FUNCIÓN PARA OBTENER LOS PROYECTOS FINALIZADOS DEL USUARIO
	public function selectProjectFinalized($idEquipo)
	{

		$sql = "SELECT *,
		DATE_FORMAT(fecha_inicio, '%d-%m-%Y') as fecha_inicio_formateada,
		DATE_FORMAT(fecha_fin, '%d-%m-%Y') as fecha_fin_formateada
		FROM proyecto
		JOIN asignacion ON proyecto.id_asignacion = asignacion.id_asignacion
		WHERE asignacion.status = 1
  		AND asignacion.estado = 'Finalizado'
  		AND asignacion.id_equipo = $idEquipo";
		$request = $this->select_all($sql);

		return $request;
	}

	//FUNCIÓN PARA OBTENER LA INFORMACIÓN DE UN INCIDENTE ESPECÍFICO
	public function selectIncidentForId($id)
	{


		$sql = "SELECT id_incidencia, incidencias.id_asignacion, categoria, nombre_tipo, 
				descripcion, descripcion_solucion,nombres, apellidos, 
				DATE_FORMAT(fecha_reporte, '%d-%m-%Y') as fecha_reporte_formateada, DATE_FORMAT(fecha_solucion, '%d-%m-%Y') as fecha_solucion_formateada ,  
				estado FROM incidencias 
				INNER JOIN tipo_incidencia ON incidencias.id_tipo = tipo_incidencia.id_tipo
				INNER JOIN asignacion ON incidencias.id_asignacion = asignacion.id_asignacion
				INNER JOIN usuario ON incidencias.reportado_por = usuario.id_usuario
				WHERE id_incidencia = $id";


		$request = $this->select_all($sql);

		return $request;
	}

	//FUNCIÓN PARA OBTENER LA INFORMACIÓN DE UN PROYECTO ESPECÍFICO
	public function selectProjectById($id)
	{


		$sql = "SELECT *,
		DATE_FORMAT(fecha_inicio, '%d-%m-%Y') as fecha_inicio_formateada,
		DATE_FORMAT(fecha_fin, '%d-%m-%Y') as fecha_fin_formateada
		FROM proyecto  
		INNER JOIN asignacion ON proyecto.id_asignacion = asignacion.id_asignacion      
        WHERE id_proyecto = $id";



		$request = $this->select_all($sql);

		return $request;
	}

	//FUNCIONES DEL CAMBIO DE ESTATUS EN TASKLIST 
	//PIDE EL ESTADO VARIANDO ENTRE PROYECTO E INCIDENCIA
	public function selectStatus($idCapturado, $tipo)
	{
		if ($tipo == 'incidente') {
			$sql = "SELECT a.estado FROM incidencias i 
					INNER JOIN asignacion a ON i.id_asignacion = a.id_asignacion 
					WHERE i.id_incidencia = $idCapturado;";
		} else if ($tipo == 'proyecto') {
			$sql = "SELECT a.estado FROM proyecto p 
					INNER JOIN asignacion a ON p.id_asignacion = a.id_asignacion 
					WHERE p.id_proyecto = $idCapturado;";
		}

		$request = $this->select_all($sql);
		return $request;
	}

	//CAMBIA EL ESTADO 'PENDIENTE' A 'EN PROCESO'
	public function changeStatusPendiente($idCapturado, $tipo, $fecha_inicio)
	{
		if ($tipo == 'incidente') {
			$sqlUpdate = "UPDATE incidencias i 
					INNER JOIN asignacion a ON i.id_asignacion = a.id_asignacion 
					SET a.estado = ? , i.fecha_inicio = ? 
					WHERE i.id_incidencia = $idCapturado";
					
			$arrDataUpdate = array("En Proceso", $fecha_inicio);
			$updateResult = $this->update($sqlUpdate, $arrDataUpdate);

			return $updateResult;
		} else if ($tipo == 'proyecto') {
			$sqlUpdate = "UPDATE proyecto p 
					INNER JOIN asignacion a ON p.id_asignacion = a.id_asignacion 
					SET a.estado = ?
					WHERE p.id_proyecto = $idCapturado";
			$arrDataUpdate = array("En Proceso");
			$updateResult = $this->update($sqlUpdate, $arrDataUpdate);
			
			return $updateResult;

		}
	}

		//OBTIENE DATOS DE 'PENDIENTE' A 'EN PROCESO' A 'FINALIZADO'
		public function selectedData($idCapturado, $tipo)
		{
			if($tipo == 'incidente'){
				$sqlSelect = "SELECT 
				ti.nombre_tipo, 
				DATE_FORMAT(a.fecha_asignacion, '%d-%m-%Y') as fecha_asignacion_formateada, 
				e.nombre_equipo 
				FROM incidencias i 
				INNER JOIN asignacion a 
				ON i.id_asignacion = a.id_asignacion 
				INNER JOIN tipo_incidencia ti 
				ON i.id_tipo = ti.id_tipo 
				INNER JOIN equipo e 
				ON a.id_equipo = e.id_equipo
				WHERE i.id_incidencia = $idCapturado";
				$selectResult = $this->select_all($sqlSelect);
	
				return $selectResult;
			}else{
				$sqlSelect = "SELECT 
				p.nombre as nombre_proyecto, 
				DATE_FORMAT(a.fecha_asignacion, '%d-%m-%Y') as fecha_asignacion_formateada, 
				e.nombre_equipo 
				FROM proyecto p 
				INNER JOIN asignacion a 
				ON p.id_asignacion = a.id_asignacion  
				INNER JOIN equipo e 
				ON a.id_equipo = e.id_equipo
				WHERE p.id_proyecto = $idCapturado";
				$selectResult = $this->select($sqlSelect);

				return $selectResult;
			}

		}

	//CAMBIA EL ESTADO 'EN PROCESO' A 'FINALIZADO'
	public function changeStatusEnproceso($idCapturado, $tipo, $descripcion_solucion)
	{
		$fechaActual = date('Y-m-d H:i:s');

		if ($tipo == 'incidente') {
			$sql = "UPDATE incidencias i 
					INNER JOIN asignacion a ON i.id_asignacion = a.id_asignacion 
					SET a.estado = ?, i.fecha_solucion = ?, i.descripcion_solucion = ?
					WHERE i.id_incidencia = $idCapturado";
			$arrData = array("Finalizado", $fechaActual, $descripcion_solucion);
		} else if ($tipo == 'proyecto') {
			$sql = "UPDATE proyecto p 
					INNER JOIN asignacion a ON p.id_asignacion = a.id_asignacion 
					SET a.estado = ?, p.fecha_fin = ?
					WHERE p.id_proyecto = $idCapturado";
			$arrData = array("Finalizado", $fechaActual);
		}

		$request = $this->update($sql, $arrData);

		return $request;
	}

}//FIN