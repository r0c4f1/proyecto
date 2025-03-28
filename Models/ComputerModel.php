<?php 
	class ComputerModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function selectComputer($id){
            if ($id == "") {
                $sql = "SELECT id_computadora, codigo, modelo FROM computadoras WHERE status = 1";
                $request = $this->select_all($sql);
            }else {
                $sql = "SELECT id_computadora, codigo, modelo FROM computadoras WHERE id_computadora = $id AND status = 1";
                $request = $this->select($sql);
            }

			return $request;
		}

		public function setComputer($codigo,$modelo){
			$sql = "INSERT INTO computadoras (codigo, modelo, status) VALUES (?,?,?)";

			$arrData = array($codigo, $modelo, 1);

			$request = $this->insert($sql, $arrData);

			return $request;
		}

		public function deleteComputer($id){
			$sql = "UPDATE computadoras SET status = ? WHERE id_computadora = $id";

			$arrData = array(0);

			$request = $this->update($sql, $arrData);

			return $request;
		}

		public function updateComputer($id_computadora, $codigo, $modelo){
			$sql = "UPDATE computadoras SET  codigo = ?, modelo = ? WHERE id_computadora = $id_computadora";

			$arrData = array($codigo, $modelo);

			$request = $this->update($sql, $arrData);

			return $request;
		}

    }