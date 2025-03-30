<?php 
	class TrainingModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function selectTraining($id){
            if ($id == "") {
                $sql = "SELECT tema, tipo_capacitacion, DATE_FORMAT(fecha, '%d-%m-%Y') AS fecha_formateada, duracion, id_capacitacion 
						FROM capacitacion WHERE status = 1 AND fecha >= CURDATE()
						";
                $request = $this->select_all($sql);
            }else {
                $sql = "SELECT tema, tipo_capacitacion, fecha, duracion FROM capacitacion WHERE id_capacitacion = $id AND status = 1";
                $request = $this->select($sql);
            }

			return $request;
		}

        public function selectRegisteredUsers($idCapacitacion){
			$sql = "SELECT * FROM usuario_capacitacion uc
                    INNER JOIN usuario u ON uc.id_usuario = u.id_usuario
                    WHERE uc.id_capacitacion = $idCapacitacion AND u.status = 1";


			$request = $this->select_all($sql);

			return $request;
		}

        public function insertRegisterTrainingUser($id_usuario, $id_capacitacion){
			$sql = "SELECT * FROM usuario WHERE id_usuario = '$id_usuario' AND status = 1";
	
			$request = $this->select($sql);
	
			if (!$request) return false;

			// Verificar si el usuario ya está registrado en la capacitación
			$sql = "SELECT * FROM usuario_capacitacion WHERE id_usuario = '$id_usuario' AND id_capacitacion='$id_capacitacion'";
			$request = $this->select($sql);
			if ($request) return false;

            $sql =  "INSERT INTO usuario_capacitacion (id_usuario, id_capacitacion) VALUES (?,?)";

            $arrData = array($id_usuario, $id_capacitacion);

			$request = $this->insert($sql, $arrData);

			return $request;
		}

        public function insertTraining($tema, $tipo, $fecha, $duracion){
            $sql =  "INSERT INTO capacitacion (tema, tipo_capacitacion, fecha, duracion) VALUES (?,?,?,?)";

            $arrData = array($tema, $tipo, $fecha, $duracion);

			$request = $this->insert($sql, $arrData);

			return $request;
		}

		public function insertRegisterAllUsers($id) {
			$sql =  "INSERT INTO usuario_capacitacion (id_usuario, id_capacitacion)
					 SELECT id_usuario, ?
					 FROM usuario
					 WHERE id_usuario NOT IN (
						 SELECT id_usuario 
						 FROM usuario_capacitacion 
						 WHERE id_capacitacion = ?
					 )";
					 
			$arrData = array($id, $id);
		
			$request = $this->insert($sql, $arrData);
		
			return $request;
		}	
		
		public function insertRegisterAllUsersUnid($id_unidad, $id_capacitacion) {
			$sql =  "INSERT INTO usuario_capacitacion (id_usuario, id_capacitacion)
					 SELECT id_usuario, ?
					 FROM usuario
					 WHERE id_unidad = ? AND id_usuario NOT IN (
						 SELECT id_usuario 
						 FROM usuario_capacitacion 
						 WHERE id_capacitacion = ?
					 )";
					 
			$arrData = array($id_capacitacion, $id_unidad, $id_capacitacion);
		
			$request = $this->insert($sql, $arrData);
		
			return $request;
		}
		

        public function updateTraining($tema, $tipo, $fecha, $duracion, $id_usuario){
            $sql =  "UPDATE capacitacion SET tema = ?, tipo_capacitacion = ?, fecha = ?, duracion = ? WHERE  id_capacitacion = $id_usuario";

            $arrData = array($tema, $tipo, $fecha, $duracion);

			$request = $this->update($sql, $arrData);

			return $request;
		}

        public function deleteTraining($id_capacitacion){
            $sql =  "UPDATE capacitacion SET status = ?  WHERE id_capacitacion = $id_capacitacion";

            $arrData = array(0);

			$request = $this->update($sql, $arrData);

			return $request;
		}

		public function deleteTrainingUser($id_usuario, $id_capacitacion){
			$sql="DELETE FROM usuario_capacitacion
			WHERE id_usuario = $id_usuario AND id_capacitacion = $id_capacitacion";

			$request = $this->delete($sql);

			return $request;
		}

    }