<?php 
	class IncidentsModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function selectIncidents($id){
            if ($id == "") {
                $sql = "SELECT i.*, 
						t.nombre_tipo, 
						t.categoria, 
						t.id_tipo, 
						t.subtipo, 
						s.apellidos, 
						s.nombres, 
						DATE_FORMAT(i.fecha_reporte, '%d-%m-%Y %H:%i:%s') AS fecha_formateada
					FROM incidencias i 
					INNER JOIN tipo_incidencia t ON i.id_tipo = t.id_tipo
					INNER JOIN usuario s ON i.reportado_por = s.id_usuario
					WHERE i.status = 1;";
                $request = $this->select_all($sql);
            }else {
                $sql = "SELECT i.*, t.nombre_tipo,t.categoria, t.id_tipo, t.subtipo FROM incidencias i 
				INNER JOIN tipo_incidencia t ON i.id_tipo = t.id_tipo
				WHERE i.id_incidencia = $id AND i.status = 1";
                $request = $this->select($sql);
            }
            
			return $request;
		}

		public function selectAssignment($id_asignacion){
            $sql = "SELECT *, ar.id AS id_asignacion_recurso FROM asignacion a 
					INNER JOIN equipodetrabajo e ON a.id_equipo = e.id_equipodetrabajo
					INNER JOIN asignacion_recurso ar ON a.id_asignacion = ar.id_asignacion
					INNER JOIN recursos r ON r.id_recurso = ar.id_recurso
					INNER JOIN incidencias i ON i.id_asignacion = a.id_asignacion
					WHERE a.id_asignacion = $id_asignacion AND a.status = 1";
            $request = $this->select($sql);
            
			return $request;
		}


        public function insertIncidents($id_tipo, $id_usuario, $reportado_por){
			$sql = "INSERT INTO incidencias (id_tipo, descripcion, fecha_reporte, reportado_por, status) VALUES (?,?,?,?,?)";
			$fecha_reporte = date('Y-m-d H:i:s');
			$arrData = array($id_tipo, $id_usuario, $fecha_reporte, $reportado_por, 1);

			$request = $this->insert($sql, $arrData);

			return $request;
		}

		public function insertAssign(
			$codigo,
			$id_equipo, 
            $fecha_asignacion, 
            $estado,
            $recurso1,
            $recurso2,
            $recurso3,
            $recurso4,
            $recurso5,
            $cantidad1,
            $cantidad2,
            $cantidad3,
            $cantidad4,
            $cantidad5,
            $id_incidencia){

			// insertar en tabla asignacion

				$sqlAsignacion = "INSERT INTO asignacion (id_equipo, fecha_asignacion, estado, status, tipo_asignacion) VALUES (?,?,?,?,?)";

				$arrDataAsignacion = array($id_equipo, $fecha_asignacion, $estado, 1,1);

				$id_asignacion = $this->insert($sqlAsignacion, $arrDataAsignacion);

			//actualizar la tabla incidencias

				$sqlActualizarIncidencias = "UPDATE incidencias SET id_asignacion = ? , id_computadora = ?, status = 0 WHERE id_incidencia = $id_incidencia";

				$arrDataActualizarIncidencias = array($id_asignacion, $codigo);

				$requestIncidencia = $this->update($sqlActualizarIncidencias, $arrDataActualizarIncidencias);

			//insertar en tabla asignacion equipo

				$sqlAsignacionEquipo = "INSERT INTO asignacion_equipo (id_asignacion, id_equipo) VALUES (?,?)";

				$arrDataAsignacionEquipo = array($id_asignacion, $id_equipo);

				$request = $this->insert($sqlAsignacionEquipo, $arrDataAsignacionEquipo);

				$cantidadValor = array($cantidad1, $cantidad2, $cantidad3, $cantidad4, $cantidad5);
				$recursoValor = array($recurso1, $recurso2, $recurso3, $recurso4, $recurso5);
				$request = array();
			
			// Insertar en tabla asignacion_recurso
				for ($i = 0; $i < count($recursoValor); $i++) {
					$recurso = $recursoValor[$i];
					$cantidad = $cantidadValor[$i];
					
					if ($recurso !== null && $recurso !== '' && $cantidad !== 0 && $cantidad !== '') {
						$sql = "INSERT INTO asignacion_recurso (id_asignacion, id_recurso, cantidad_asignada) VALUES (?,?,?)";
						$arrData = array($id_asignacion, $recurso, $cantidad);
						$result = $this->insert($sql, $arrData);
						if ($result) {
							$request[] = $result;
						}
					}
				}
			
			// Actualizar recursos --- se resta en la cantidad actual del recurso segun lo asignado
			for ($i = 0; $i < count($recursoValor); $i++) {
				$recurso = $recursoValor[$i];
				$cantidad = $cantidadValor[$i];
				
				if ($recurso !== null && $recurso !== '' && $cantidad !== 0 && $cantidad !== '') {
					$sqlRecurso = "SELECT cantidad FROM recursos WHERE disponible = 1 
								AND status = 1 AND id_recurso = $recurso";
					
					$requestCantidad = $this->select($sqlRecurso);
					
					if ($requestCantidad) {
						$nuevacantidad = $requestCantidad['cantidad'] - $cantidad;
			
						// Actualizar el campo cantidad
						$sqlActualizarRecurso = "UPDATE recursos SET cantidad = ? WHERE id_recurso = $recurso";
						$arrDataActualizarRecurso = array($nuevacantidad);
						$resultUpdate = $this->update($sqlActualizarRecurso, $arrDataActualizarRecurso);
			
						if ($resultUpdate) {
							// Comprobar si la nueva cantidad es mayor que 0 para mantener el recurso disponible
							$disponible = $nuevacantidad > 0 ? 1 : 0;
			
							// Actualizar el campo disponible
							$sqlActualizarDisponible = "UPDATE recursos SET disponible = ? WHERE id_recurso = $recurso";
							$arrDataDisponible = array($disponible);
							$this->update($sqlActualizarDisponible, $arrDataDisponible);
			
							$request[] = $resultUpdate;
						}
					}
				}
			}
			
				
				
				return $request;
		}// CIERRE



		public function updateIncidents($id_incidencia, $id_tipo, $descripcion, $fecha_reporte, $reportado_por){
			$sql = "UPDATE incidencias SET  id_tipo = ?, descripcion = ?, fecha_reporte =  ?, reportado_por = ? WHERE id_incidencia = $id_incidencia";

			$arrData = array($id_tipo, $descripcion, $fecha_reporte, $reportado_por);

			$request = $this->update($sql, $arrData);

			return $request;
		}

		public function deleteIncidents($id){
			$sql = "UPDATE incidencias SET status = ? WHERE id_incidencia = $id";

			$arrData = array(0);

			$request = $this->update($sql, $arrData);

			return $request;
		}
    }


// 	SELECT TIMESTAMPDIFF(SECOND, fecha_reporte, fecha_solucion) AS segundos_diferencia
// FROM incidencias WHERE id_incidencia = 49;