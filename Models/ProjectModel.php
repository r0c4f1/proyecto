<?php 
	class ProjectModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function selectProject($id){
			if ($id == "") {
				$sql = "SELECT nombre, descripcion, DATE_FORMAT(fecha_inicio, '%d-%m-%Y') AS fecha_formateada, fecha_fin, id_proyecto FROM proyecto WHERE status = 1";
				$request = $this->select_all($sql);
			}else {
				$sql = "SELECT nombre, descripcion, fecha_inicio, fecha_fin FROM proyecto WHERE id_proyecto = $id AND status = 1";
				$request = $this->select($sql);
			}
	
			return $request;
		}
     
        public function insertProject($nombre, $descripcion, $fecha_inicio){
            $sql =  "INSERT INTO proyecto (nombre, descripcion, fecha_inicio) VALUES (?,?,?)";

            $arrData = array($nombre, $descripcion, $fecha_inicio);

			$request = $this->insert($sql, $arrData);

			return $request;
		}

        public function projectUpdate($nombre, $descripcion, $fecha_inicio, $id_proyecto) {
			
			$sql = "UPDATE proyecto SET nombre = ?, descripcion = ?, fecha_inicio = ? WHERE id_proyecto = '$id_proyecto'";
		
		
			$arrData = array($nombre, $descripcion, $fecha_inicio);
					
			$request = $this->update($sql, $arrData);
		
			return $request;
		}
		
		

        public function deleteProject($id_proyecto){
            $sql =  "UPDATE proyecto SET status = ?  WHERE id_proyecto = $id_proyecto";

            $arrData = array(0);

			$request = $this->update($sql, $arrData);

			return $request;
		}

		

		public function insertAssign( 
			$id_equipo, 
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
            $id_proyecto) {

			$fecha_asignacion = date('Y-m-d'); // Obtener la fecha actual
		
			// // Insertar en tabla asignacion
			// $sqlAsignacion = "INSERT INTO asignacion (id_equipo, fecha_asignacion,estado, status, tipo_asignacion) VALUES (?, ?, ?, ?, ?)";
			// $arrDataAsignacion = array($id_equipo, $fecha_asignacion, 'Pendiente', 1, 0);
			// $id_asignacion = $this->insert($sqlAsignacion, $arrDataAsignacion);
		
			// // Actualizar la tabla proyecto
			// $sqlActualizarProyecto = "UPDATE proyecto SET id_asignacion = ?, status = 0 WHERE id_proyecto = $id_proyecto";
			// $arrDataActualizarProyecto = array($id_asignacion);
			// $request = $this->update($sqlActualizarProyecto, $arrDataActualizarProyecto);
		
			// return $request;
			 // 1. Insertar en tabla asignacion (igual para proyectos)
    		$sqlAsignacion = "INSERT INTO asignacion (id_equipo, fecha_asignacion, estado, status, tipo_asignacion) 
    		                  VALUES (?,?,?,?,?)";
    		$arrDataAsignacion = array($id_equipo, $fecha_asignacion, $estado, 1, 1);
    		$id_asignacion = $this->insert($sqlAsignacion, $arrDataAsignacion);

    		// 2. Actualizar la tabla PROYECTO (en lugar de incidencias)
    		$sqlActualizarProyecto = "UPDATE proyecto 
    		                         SET id_asignacion = ?, status = 0 
    		                         WHERE id_proyecto = ?"; // Nueva consulta
    		$arrDataActualizarProyecto = array($id_asignacion, $id_proyecto);
    		$requestProyecto = $this->update($sqlActualizarProyecto, $arrDataActualizarProyecto);

    		// 3. Insertar en tabla asignacion_equipo (igual)
    		$sqlAsignacionEquipo = "INSERT INTO asignacion_equipo (id_asignacion, id_equipo) 
    		                       VALUES (?,?)";
    		$arrDataAsignacionEquipo = array($id_asignacion, $id_equipo);
    		$request = $this->insert($sqlAsignacionEquipo, $arrDataAsignacionEquipo);

    		// 4. Insertar en tabla asignacion_recurso (igual)
    		$cantidadValor = array($cantidad1, $cantidad2, $cantidad3, $cantidad4, $cantidad5);
    		$recursoValor = array($recurso1, $recurso2, $recurso3, $recurso4, $recurso5);
    		$request = array();

    		for ($i = 0; $i < count($recursoValor); $i++) {
    		    $recurso = $recursoValor[$i];
    		    $cantidad = $cantidadValor[$i];
			
    		    if (!empty($recurso) && $cantidad > 0) {
    		        $sql = "INSERT INTO asignacion_recurso (id_asignacion, id_recurso, cantidad_asignada) 
    		               VALUES (?,?,?)";
    		        $arrData = array($id_asignacion, $recurso, $cantidad);
    		        $result = $this->insert($sql, $arrData);
    		        if ($result) $request[] = $result;
    		    }
    		}
		
    		// 5. Actualizar recursos (igual)
    		foreach ($recursoValor as $index => $recurso) {
    		    $cantidad = $cantidadValor[$index];
    		    if (!empty($recurso) && $cantidad > 0) {
    		        $sqlRecurso = "SELECT cantidad FROM recursos 
    		                      WHERE id_recurso = $recurso AND disponible = 1";
    		        $requestCantidad = $this->select($sqlRecurso);
				
    		        if (!empty($requestCantidad)) {
    		            $nuevaCantidad = $requestCantidad['cantidad'] - $cantidad;
    		            $disponible = ($nuevaCantidad > 0) ? 1 : 0;
					
    		            $this->update(
    		                "UPDATE recursos SET cantidad = ?, disponible = ? 
    		                WHERE id_recurso = ?",
    		                array($nuevaCantidad, $disponible, $recurso)
    		            );
    		        }
    		    }
    		}
			
    		return true;
		
		}
		


    }