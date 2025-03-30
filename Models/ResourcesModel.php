<?php
class ResourcesModel extends Mysql
{
	public function __construct()
	{
		parent::__construct();
	}

	public function selectResources($id)
	{
		if ($id == "") {
			$sql = "SELECT id_recurso, nombre, tipo, cantidad, disponible FROM recursos WHERE status = 1";
			$request = $this->select_all($sql);
		} else {
			$sql = "SELECT id_recurso, nombre, tipo, cantidad, disponible FROM recursos WHERE id_recurso = $id AND status = 1";
			$request = $this->select($sql);
		}

		return $request;
	}

	public function selectResourcesLog($recurso1, $recurso2, $recurso3, $recurso4, $recurso5)
	{
		$sql = "SELECT nombre 
				FROM recursos 
				WHERE status = 1 
				AND (id_recurso = $recurso1
				OR id_recurso = $recurso2 
				OR id_recurso = $recurso3
				OR id_recurso = $recurso4 
				OR id_recurso = $recurso5)";
		$request = $this->select_all($sql);
	
		return $request;
	}

	public function insertResource($nombre, $tipo, $cantidad)
	{

		if ($cantidad > 0) {
			$sql =  "INSERT INTO recursos (nombre, tipo, cantidad, disponible) VALUES (?,?,?,1)";
		} else {
			$sql =  "INSERT INTO recursos (nombre, tipo, cantidad, disponible) VALUES (?,?,?,0)";
		}
		$arrData = array($nombre, $tipo, $cantidad);

		$request = $this->insert($sql, $arrData);

		return $request;
	}

	public function addRecycledResource($id, $cantidad) {
		$request = [];
	
		// Verificar si el recurso existe en 'recursos'
		$sqlCheckRecursos = "SELECT cantidad FROM recursos WHERE id_recurso = $id";
		$resultRecursos = $this->select($sqlCheckRecursos);
	
		if (!$resultRecursos) {
			return ['error' => "Recurso no encontrado en 'recursos'"];
		}
	
		// Actualizar 'recursos'
		$nuevaCantidadRecursos = $resultRecursos['cantidad'] + $cantidad;
		$sqlUpdateRecursos = "UPDATE recursos SET cantidad = ? WHERE id_recurso = $id";
		$arrDataUpdateRecursos = array($nuevaCantidadRecursos);
		$this->update($sqlUpdateRecursos, $arrDataUpdateRecursos);
		$request['recursos_update'] = true;
	
		// Manejar 'recursos_reciclados'
		$sqlCheckReciclados = "SELECT cantidad FROM recursos_reciclados WHERE id_recurso = $id";
		$resultReciclados = $this->select($sqlCheckReciclados);
	
		if ($resultReciclados) {
			$nuevaCantidadReciclados = $resultReciclados['cantidad'] + $cantidad;
			$sqlUpdateReciclados = "UPDATE recursos_reciclados SET cantidad = ? WHERE id_recurso = $id";
			$arrDataUpdateReciclados = array($nuevaCantidadReciclados);
			$this->update($sqlUpdateReciclados, $arrDataUpdateReciclados);
			$request['reciclados_update'] = true;
		} else {
			$sqlInsertReciclados = "INSERT INTO recursos_reciclados (id_recurso, cantidad) VALUES ($id, ?)";
			$arrDataInsertReciclados = array($cantidad);
			$this->insert($sqlInsertReciclados, $arrDataInsertReciclados);
			$request['reciclados_insert'] = true;
		}
	
		return $request;
	}






	public function insertTest($item_1, $item_2, $item_3, $item_4, $item_5)
	{
		$items = array($item_1, $item_2, $item_3, $item_4, $item_5);
		$request = array();

		foreach ($items as $item) {
			if ($item !== null && $item !== '') { // Asegurarse de que el item no esté vacío
				$sql = "INSERT INTO recursos (nombre) VALUES (?)";
				$arrData = array($item);
				$result = $this->insert($sql, $arrData);

				if ($result) {
					$request[] = $result;
				}
			}
		}
		return $request;
	}

	public function resourceUpdate($nombre, $tipo, $cantidad, $id_recurso)
	{
		if ($cantidad > 0) {
			$sql = "UPDATE recursos SET nombre = ?, tipo = ?, cantidad = ?, disponible = 1 WHERE id_recurso = ?";
		} else {
			$sql = "UPDATE recursos SET nombre = ?, tipo = ?, cantidad = ?, disponible = 0 WHERE id_recurso = ?";
		}

		$arrData = array($nombre, $tipo, $cantidad, $id_recurso);

		$request = $this->update($sql, $arrData);

		return $request;
	}


	public function deleteResource($id_recurso, $status)
	{
		$sql =  "UPDATE recursos SET status = ?  WHERE id_recurso = $id_recurso";

		$arrData = array($status);

		$request = $this->update($sql, $arrData);

		return $request;
	}
}
