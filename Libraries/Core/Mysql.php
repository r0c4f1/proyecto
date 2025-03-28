<?php 
	
	class Mysql extends Conexion
	{
		private $conexion;
		private $strQuery;
		private $arrValues;

		public function __construct()
		{
			parent::__construct();
			$this->conexion = $this->conect();
		}

		//Insertar un registro
		public function insert(string $query, array $arrValues)
		{
			$this->strQuery = $query;
			$this->arrValues = $arrValues;
        	$insert = $this->conexion->prepare($this->strQuery);
        	$resInsert = $insert->execute($this->arrValues);
        	if($resInsert)
	        {
	        	$lastInsert = $this->conexion->lastInsertId();
	        }else{
	        	$lastInsert = 0;
	        }
	        return $lastInsert; 
		}
		//Busca un registro
		public function select(string $query)
		{
			$this->strQuery = $query;
        	$result = $this->conexion->prepare($this->strQuery);
			$result->execute();
        	$data = $result->fetch(PDO::FETCH_ASSOC);
        	return $data;
		}
		//Devuelve todos los registros
		public function select_all(string $query)
		{
			$this->strQuery = $query;
        	$result = $this->conexion->prepare($this->strQuery);
			$result->execute();
        	$data = $result->fetchall(PDO::FETCH_ASSOC);
        	return $data;
		}
		//Actualiza registros
		public function update(string $query, array $arrValues)
		{
			$this->strQuery = $query;
			$this->arrValues = $arrValues;
			$update = $this->conexion->prepare($this->strQuery);
			$resExecute = $update->execute($this->arrValues);
	        return $resExecute;
		}
		//Eliminar un registros
		public function delete(string $query)
		{
			$this->strQuery = $query;
        	$result = $this->conexion->prepare($this->strQuery);
			$del = $result->execute();
        	return $del;
		}
	}


 ?>

