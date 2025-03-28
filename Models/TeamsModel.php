<?php 
	class TeamsModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function selectTeams($id){
            if ($id == "") {
                $sql = "SELECT * FROM equipo WHERE status = 1";
                $request = $this->select_all($sql);
            }else {
                $sql = "SELECT * FROM equipo WHERE id_equipo = $id AND status = 1";
                $request = $this->select($sql);
            }

			return $request;
		}

		public function selectTeamsForIncident($type){

            $sql = "SELECT e.*, eu.*
					FROM `equipo` e
					INNER JOIN `equipo_usuario` eu ON e.id_equipo = eu.id_equipo
					WHERE e.status = 1 AND e.tipo_equipo = $type
					GROUP BY e.id_equipo
					";

            $request = $this->select_all($sql);

			return $request;
		}

		public function selectUserForTeam($id){

            $sql = "SELECT u.id_usuario, u.nombres, u.apellidos, u.cargo 
			FROM `equipo_usuario` eu INNER JOIN `usuario` u ON eu.id_usuario = u.id_usuario
			WHERE eu.id_equipo = $id";

            $request = $this->select_all($sql);

			return $request;
		}

        public function selectRegisteredUsers($id_equipo){
			$sql = "SELECT * FROM equipo_usuario eu
                    INNER JOIN usuario u ON eu.id_usuario = u.id_usuario
                    WHERE eu.id_equipo = $id_equipo AND u.status = 1";


			$request = $this->select_all($sql);

			return $request;
		}

        public function insertRegisterTeamsUser($id_usuario, $id_equipo) {
			// Verificar si el usuario existe
			$sql = "SELECT * FROM usuario WHERE id_usuario = '$id_usuario' AND status = 1";
			$request = $this->select($sql);
			if (!$request) return false;
		
			// Seleccionar tipo de equipo
			$sql = "SELECT tipo_equipo FROM equipo WHERE id_equipo = '$id_equipo' AND status = 1";
			$request = $this->select($sql);
			$tipo_equipo = $request['tipo_equipo'];
		
			// Verificar si el usuario ya pertenece al equipo
			$sql = "SELECT * FROM equipo_usuario WHERE id_usuario = '$id_usuario' AND id_equipo = '$id_equipo'";
			$request = $this->select($sql);
			if ($request) return false; // Si ya pertenece, no se agrega de nuevo
		
			// Insertar el usuario en el equipo
			$sql = "INSERT INTO equipo_usuario (id_equipo, id_usuario, tipo_equipo) VALUES (?,?,?)";
			$arrData = array($id_equipo, $id_usuario, $tipo_equipo);
		
			$request = $this->insert($sql, $arrData);
			return $request;
		}
		
		

        public function insertTeams($nombre, $tipo_equipo){
			$sql = "SELECT * FROM equipo WHERE nombre_equipo = '$nombre' AND status = 1"; //si existe
	
			$request = $this->select($sql);
	
			if ($request) return false; //salir , si no insertar
			
            $sql =  "INSERT INTO equipo (nombre_equipo, tipo_equipo, status) VALUES (?,?,?)";

            $arrData = array($nombre, $tipo_equipo, 1);

			$request = $this->insert($sql, $arrData);

			return $request;
		}

        public function updateTeams($id_equipo, $nombre,  $tipo_equipo){
			$sql = "SELECT * FROM equipo WHERE nombre_equipo = '$nombre' AND id_equipo != $id_equipo AND status = 1"; //si existe
	
			$request = $this->select($sql);
	
			if ($request) return false; //salir, si no insertar

            $sql =  "UPDATE equipo SET nombre_equipo = ? , tipo_equipo = ? WHERE  id_equipo = $id_equipo";

            $arrData = array($nombre, $tipo_equipo);

			$request = $this->update($sql, $arrData);

			return $request;
		}

        public function deleteTeams($id){
            $sql =  "UPDATE equipo SET status = ?  WHERE id_equipo = $id ";

            $arrData = array(0);

			$request = $this->update($sql, $arrData);

			return $request;
		}

		public function deleteTeamUser($id_equipo, $id_usuario){
			$sql="DELETE FROM equipo_usuario
			WHERE id_usuario = $id_usuario AND id_equipo = $id_equipo;
			";

			$request = $this->delete($sql);

			return $request;
		}
		
		public function selectTeamsActivos($id_equipo){
			$sql='SELECT * FROM equipo e INNER JOIN asignacion_equipo ae ON e.id_equipo = ae.id_equipo
			INNER JOIN asignacion a ON ae.id_asignacion = a.id_asignacion WHERE a.estado IN("En proceso", "Pendiente") AND e.id_equipo = 1';

			$request = $this->select_all($sql);

			return $request;
		}
    }