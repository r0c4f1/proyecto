<?php 
	class TypeIncidentModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function selectTypeIncident($id){
            if ($id == "") {
                $sql = "SELECT id_tipo, categoria, nombre_tipo, subtipo FROM tipo_incidencia WHERE status = 1";
                $request = $this->select_all($sql);
            }else {
                $sql = "SELECT id_tipo, categoria, nombre_tipo, subtipo FROM tipo_incidencia WHERE id_tipo = $id AND status = 1";
                $request = $this->select($sql);
            }

			return $request;
		}

		public function selectNameTypeIncident(){
            $sql = "SELECT nombre_tipo, id_tipo FROM tipo_incidencia WHERE status = 1 ORDER by nombre_tipo ASC";
            $request = $this->select_all($sql);

			return $request;
		}

		public function selectCategoryTypeIncident($id_tipo){
            $sql = "SELECT categoria FROM tipo_incidencia WHERE id_tipo = $id_tipo AND status = 1";
            $request = $this->select_all($sql);

			return $request;
		}

		public function deleteTypeIncident($id_tipo){
            $sql =  "UPDATE tipo_incidencia SET status = ?  WHERE id_tipo = $id_tipo";

            $arrData = array(0);

			$request = $this->update($sql, $arrData);

			return $request;
		}

        public function insertTypeIncident($nombre_tipo, $categoria, $subtipo){
            $sql =  "INSERT INTO tipo_incidencia (nombre_tipo, categoria, subtipo, status) VALUES (?,?,?,?)";

            $arrData = array($nombre_tipo, $categoria, $subtipo, 1);

			$request = $this->insert($sql, $arrData);

			return $request;
		}

		public function updateTypeIncident($nombre_tipo, $categoria, $subtipo, $id) {
			$sql = "UPDATE tipo_incidencia SET 
			nombre_tipo = ?,
			categoria = ?,
			subtipo = ? 
			WHERE id_tipo  = '$id'";

			$arrData = array($nombre_tipo, $categoria, $subtipo);

			$request = $this->update($sql, $arrData);

			return $request;
		}

    }