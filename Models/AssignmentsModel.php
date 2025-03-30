<?php

use Mpdf\PsrHttpMessageShim\Request;

	class AssignmentsModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function selectAssignments($userLevel, $unidad)
		{
			if ($userLevel == 2) { // Nivel admin: Ver todo sin restricciones por unidad
				$sql = "SELECT 
						ti.id_tipo, 
						ti.categoria, 
						ti.nombre_tipo, 
						i.*, 
						DATE_FORMAT(i.fecha_reporte, '%d-%m-%Y %H:%i:%s') AS fecha_reporte_formateada, 
						DATE_FORMAT(i.fecha_solucion, '%d-%m-%Y %H:%i:%s') AS fecha_solucion_formateada, 
						DATE_FORMAT(a.fecha_asignacion, '%d-%m-%Y') AS fecha_asignacion_formateada, 
						a.estado, 
						a.status, 
						e.nombre_equipo, 
						u.nombres, 
						u.apellidos
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
						AND e.tipo_equipo = 1;
				";
			} else { // Otros niveles: Restringir por unidad
				$sql = "SELECT 
						ti.id_tipo, ti.categoria, ti.nombre_tipo, i.*, 
						a.fecha_asignacion, a.estado, a.status, 
						e.nombre_equipo, u.nombres, u.apellidos
					FROM 
						tipo_incidencia ti
					INNER JOIN 
						incidencias i ON ti.id_tipo = i.id_tipo
					INNER JOIN 
						asignacion a ON i.id_asignacion = a.id_asignacion
					INNER JOIN 
						equipo e ON a.id_equipo = e.id_equipo
					INNER JOIN 
						equipo_usuario eu ON e.id_equipo = eu.id_equipo
					INNER JOIN 
						usuario u ON eu.id_usuario = u.id_usuario
					WHERE 
						ti.status = 1 
						AND a.status = 1 
						AND e.status = 1 
						AND e.tipo_equipo = 1 
						AND u.id_unidad = $unidad
				";
			}
		
			$request = $this->select_all($sql);
			return $request;
		}

		public function selectProjects($userLevel, $unidad){
    if ($userLevel == 2) { // Nivel admin: Ver todo sin restricciones por unidad
        $sql = "SELECT 
				p.id_proyecto, 
				p.nombre, 
				p.id_asignacion,
				p.descripcion, 
				DATE_FORMAT(p.fecha_inicio, '%d-%m-%Y') AS fecha_inicio_formateada, 
				DATE_FORMAT(p.fecha_fin, '%d-%m-%Y') AS fecha_fin_formateada, 
				p.status, 
				DATE_FORMAT(a.fecha_asignacion, '%d-%m-%Y') AS fecha_asignacion_formateada, 
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
				p.status = 0
        ";
    } else { // Otros niveles: Restringir proyectos a la unidad del usuario
        $sql = "SELECT DISTINCT 
				p.id_proyecto, p.nombre, p.descripcion, 
				p.fecha_inicio, p.fecha_fin, p.status,
				a.fecha_asignacion, a.tipo_asignacion,
				e.nombre_equipo
			FROM 
				proyecto p
			INNER JOIN 
				asignacion a ON p.id_asignacion = a.id_asignacion
			INNER JOIN 
				equipo e ON a.id_equipo = e.id_equipo
			INNER JOIN 
				equipo_usuario eu ON e.id_equipo = eu.id_equipo
			INNER JOIN 
				usuario u ON eu.id_usuario = u.id_usuario
			WHERE 
				p.status = 0 
				AND u.id_unidad = $unidad;
        ";
    }

	$request = $this->select_all($sql);
    return $request;
}

		
		
		public function selectResourcesForAssignments($id){

			$sql = "SELECT r.nombre, ar.cantidad_asignada FROM `asignacion_recurso` ar 
			INNER JOIN `recursos` r ON ar.id_recurso = r.id_recurso WHERE ar.id_asignacion = $id";

			$request = $this->select_all($sql);

			return $request;
		}

		public function selectIdTipo($id){

			$sql = "SELECT id_tipo FROM `incidencias`
			WHERE id_incidencia = $id";

			$request = $this->select($sql);

			return $request;
		}

		public function deleteAssignments($id){

			// ELIMINAR EN ASIGNACION

			$sqlAsignacion = "UPDATE asignacion SET status = ? WHERE id_asignacion = $id";

			$arrDataAsignacion = array(0);

			$requestAsignacion = $this->update($sqlAsignacion, $arrDataAsignacion);

			// ELIMINAR EN ASIGNACION EQUIPO

			$sqlAsignacionEquipo = "DELETE FROM asignacion_equipo WHERE id_asignacion = $id";

			$requestAsignacionEquipo = $this->delete($sqlAsignacionEquipo);

			// ELIMINAR EN ASIGNACION RECURSO

			$sqlGetResources = "SELECT id_recurso, cantidad_asignada FROM asignacion_recurso WHERE id_asignacion = $id";
			$resourceValues = $this->select_all($sqlGetResources);

			$request = array();

			if ($resourceValues) {
				// ITERA SOBRE LOS RESULTADOS
				foreach ($resourceValues as $resource) {
					$id_recurso = $resource['id_recurso'];
					$cantidad_asignada = $resource['cantidad_asignada'];

				// OBTENER LA CANTIDAD DE RECURSOS
				$sqlGetCantidadRecurso = "SELECT cantidad FROM recursos WHERE id_recurso = $id_recurso";
				$currentResource = $this->select($sqlGetCantidadRecurso);

				if ($currentResource) {
					$cantidad_actual = $currentResource['cantidad'];
					$nuevaCantidad = $cantidad_actual + $cantidad_asignada;

					// ACTUALIZAR LA CANTIDAD DE RECURSOS
					$sqlUpdate = "UPDATE recursos SET cantidad = ? WHERE id_recurso = ?";
					$arrDataUpdate = array($nuevaCantidad, $id_recurso);
					$result = $this->update($sqlUpdate, $arrDataUpdate);

					if ($result) {
						$request[] = $result;
					}
				}
			}

				// ELIMINAR REGISTRO
				$sqlDeleteAsignacionRecurso = "DELETE FROM `asignacion_recurso` WHERE id_asignacion = $id";
				$requestAsignacionRecurso = $this->delete($sqlDeleteAsignacionRecurso);
				$request[] = $requestAsignacionRecurso;
			}

			// ELIMINAR EN INCIDENCIA

			$sqlIncidencia= "UPDATE incidencias SET status = ? WHERE id_asignacion = $id";

			$arrDataIncidencia = array(1);

			$requestIncidencia = $this->update($sqlIncidencia, $arrDataIncidencia);

			
			return $requestIncidencia;
		}

		// public function deleteAssignmentsProject($id){

		// 	// ELIMINAR EN ASIGNACION

		// 	$sqlProject = "UPDATE proyecto SET status = ? WHERE id_proyecto = $id";

		// 	$arrDataProject = array(1);

		// 	$requestProject = $this->update($sqlProject, $arrDataProject);

		// 	// ELIMINAR EN ASIGNACION EQUIPO

		// 	$sqlAsignacionEquipo = "DELETE FROM asignacion_equipo WHERE id_asignacion = $id";

		// 	$requestAsignacionEquipo = $this->delete($sqlAsignacionEquipo);
			
		// 	return $requestAsignacionEquipo;
		// }

		public function deleteAssignmentsProject($id) {
		    // 1. Desactivar la asignación (marcar como inactiva)
		    $sqlAsignacion = "UPDATE asignacion SET status = ? WHERE id_asignacion = ?";
		    $arrDataAsignacion = array(0, $id);
		    $requestAsignacion = $this->update($sqlAsignacion, $arrDataAsignacion);
				
		    // 2. Eliminar relación con el equipo
		    $sqlAsignacionEquipo = "DELETE FROM asignacion_equipo WHERE id_asignacion = $id";
		    $requestAsignacionEquipo = $this->delete($sqlAsignacionEquipo);
				
		    // 3. Restaurar recursos y eliminar asignaciones
		    $sqlGetResources = "SELECT id_recurso, cantidad_asignada FROM asignacion_recurso WHERE id_asignacion = $id";
		    $resourceValues = $this->select_all($sqlGetResources);
		    $request = array();
				
		    if ($resourceValues) {
		        foreach ($resourceValues as $resource) {
		            $id_recurso = $resource['id_recurso'];
		            $cantidad_asignada = $resource['cantidad_asignada'];
				
		            // Restaurar cantidad en recursos
		            $sqlUpdate = "UPDATE recursos 
		                         SET cantidad = cantidad + ? 
		                         WHERE id_recurso = ?";
		            $this->update($sqlUpdate, array($cantidad_asignada, $id_recurso));
		        }
			
		        // Eliminar registros de asignación de recursos
		        $sqlDeleteAsignacionRecurso = "DELETE FROM asignacion_recurso WHERE id_asignacion = $id";
		        $this->delete($sqlDeleteAsignacionRecurso);
		    }
		
		    // 4. Actualizar el proyecto (marcar como no asignado)
		    $sqlProyecto = "UPDATE proyecto 
		                   SET status = ?
		                   WHERE id_asignacion = $id";
		    $requestProyecto = $this->update($sqlProyecto, array(1));
		
		    return $requestProyecto;
		}

    }