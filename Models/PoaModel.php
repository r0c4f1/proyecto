<?php
class PoaModel extends Mysql
{
	public function __construct()
	{
		parent::__construct();
	}

	public function selectGoals($id){
		if ($id == "") {
			$sql = "SELECT * FROM metas";
			$request = $this->select_all($sql);
		}else {
			$sql = "SELECT * FROM metas WHERE id_metas = $id";
			$request = $this->select($sql);
		}	

		return $request;
	}

	public function selectDinamicGoals($id)
	{
		$sql = "SELECT 
					m.meta AS nombre_meta,
					md.id_metas_dinamicas,
					md.fecha_creacion,
					md.fecha_limite, 
					DATE_FORMAT(md.fecha_creacion, '%d/%m/%Y') AS fecha_creacionFormateada, 
					DATE_FORMAT(md.fecha_limite, '%d/%m/%Y') AS fecha_limiteFormateada, 
					md.cantidad_objetivo,
					md.cantidad_progreso
				FROM metas_dinamicas md
				INNER JOIN metas m ON md.id_metas = m.id_metas 
				WHERE md.id_metas = $id AND estado = 1;";
		$request = $this->select($sql);
	
		return $request;
	}

	public function selectDinamicGoalsAlert()
	{
		$sql = "SELECT 
					m.meta AS nombre_meta,
					m.id_metas,
					md.fecha_limite,
					md.id_metas_dinamicas,
					md.cantidad_objetivo,
					md.cantidad_progreso
				FROM metas_dinamicas md
				INNER JOIN metas m ON md.id_metas = m.id_metas 
				WHERE estado = 1";
		$request = $this->select_all($sql);
	
		return $request;
	}

	public function selectDinamicGoalsForzada($id) // mal optimizado forzado por la hora
	{
		$sql = "SELECT 
					m.meta AS nombre_meta,
					md.id_metas_dinamicas,
					md.fecha_creacion,
					md.fecha_limite, 
					DATE_FORMAT(md.fecha_creacion, '%d/%m/%Y') AS fecha_creacionFormateada, 
					DATE_FORMAT(md.fecha_limite, '%d/%m/%Y') AS fecha_limiteFormateada, 
					md.cantidad_objetivo,
					md.cantidad_progreso
				FROM metas_dinamicas md
				INNER JOIN metas m ON md.id_metas = m.id_metas 
				WHERE md.id_metas_dinamicas = $id AND estado = 1;";
		$request = $this->select($sql);
	
		return $request;
	}

	public function selectDinamicGoalsCompleted()
	{
		$sql = "SELECT 
					m.meta,
					DATE_FORMAT(md.fecha_creacion, '%d/%m/%Y') AS fecha_creacionFormateada, 
					DATE_FORMAT(md.fecha_limite, '%d/%m/%Y') AS fecha_limiteFormateada, 
					md.cantidad_progreso, 
					md.cantidad_objetivo,
					md.estado
				FROM metas_dinamicas md
				INNER JOIN metas m ON md.id_metas = m.id_metas WHERE estado = 0 OR 2;
				";

		$request = $this->select_all($sql);

		return $request;
	}

	public function insertDinamicGoals($meta, $fecha_limite, $cantidad_objetivo)
	{
		$sql = "SELECT * FROM metas_dinamicas WHERE id_metas = '$meta' AND estado = 1";
		$request = $this->select($sql);
		if ($request) return false;

		$sql = "INSERT INTO metas_dinamicas (id_metas, fecha_creacion, fecha_limite, cantidad_progreso, cantidad_objetivo, estado) 
					VALUES (?,NOW(),?,?,?,?)";

		$arrData = array($meta, $fecha_limite, 0, $cantidad_objetivo, 1);

		$request = $this->insert($sql, $arrData);

		return $request;
	}


	public function updateCancelarDinamicGoals($id)
	{
		$sql = "UPDATE metas_dinamicas
					SET estado = ?
					WHERE estado = 1 AND id_metas_dinamicas = ?
			";

		$arrData = array(2, $id);

		$request = $this->update($sql, $arrData);

		return $request;
	}

	// ===================================== CONSULTA METAS REPARACION DE EQUIPOS Y META RESOLUCION DE INCIDENCIAS ============================
	public function selectDataIncidentGoals($id, $fecha_creacion, $fecha_limite)
	{

		if ($id = 1) {
			$sql = "SELECT COUNT(i.id_incidencia) AS cantidad
						FROM incidencias i
						INNER JOIN tipo_incidencia ti ON i.id_tipo = ti.id_tipo
					WHERE ti.id_metas = $id AND i.fecha_solucion BETWEEN '$fecha_creacion' AND '$fecha_limite'";
		} else {
			$sql = "SELECT COUNT(i.id_incidencia) AS cantidad
						FROM incidencias i
						INNER JOIN tipo_incidencia ti ON i.id_tipo = ti.id_tipo
					WHERE i.fecha_solucion BETWEEN '$fecha_creacion' AND '$fecha_limite'";
		}

		$request = $this->select($sql);

		return $request;
	}

	// ===================================== CONSULTA METAS PROYECTOS FINALIZADOS ============================

	public function selectDataProjectGoals($id, $fecha_creacion, $fecha_limite)
	{

		$sql = "SELECT COUNT(*) as cantidad FROM `asignacion` a INNER JOIN proyecto p ON a.id_asignacion = p.id_asignacion 
			WHERE a.estado = 'Finalizado' AND a.status = 1 AND a.tipo_asignacion = 0
			AND p.fecha_fin BETWEEN '$fecha_creacion' AND '$fecha_limite'";

		$request = $this->select($sql);

		return $request;
	}

	// ===================================== CONSULTA METAS PERSONAL CAPACITADO ============================

	public function selectDataTrainingGoals($id, $fecha_creacion, $fecha_limite)
	{

		$sql = "SELECT COUNT(*) as cantidad 
					FROM capacitacion 
					WHERE fecha < CURRENT_DATE() 
					AND tipo_capacitacion BETWEEN 0 AND 1;
					AND fecha BETWEEN '$fecha_creacion' AND '$fecha_limite'";

		$request = $this->select($sql);

		return $request;
	}

	public function selectTrainedPersonnel($id, $fecha_creacion, $fecha_limite)
	{

		$sql = "SELECT COUNT(DISTINCT uc.id_usuario) AS cantidad
				FROM usuario_capacitacion uc
				JOIN capacitacion c ON uc.id_capacitacion = c.id_capacitacion
				WHERE c.fecha BETWEEN '$fecha_creacion' AND '$fecha_limite'";

		$request = $this->select($sql);

		return $request;
	}
	// ============================= CAMBIAR ESTADO ======================
	public function updateDinamicGoalsStatus()
	{

		$sqlSelect = "SELECT *,
		DATE_FORMAT(md.fecha_creacion, '%d/%m/%Y') AS fecha_creacionFormateada, 
		DATE_FORMAT(md.fecha_limite, '%d/%m/%Y') AS fecha_limiteFormateada
		FROM metas_dinamicas md INNER JOIN metas m ON md.id_metas = m.id_metas 
		WHERE estado = 1 AND md.fecha_limite <= CURDATE()";
		$selectResult = $this->select_all($sqlSelect);

		$sqlUpdate = "UPDATE metas_dinamicas
					  SET estado = ?
					  WHERE estado = 1
					  AND fecha_limite <= CURDATE()";
	
		$arrDataUpdate = array(0);
		$updateResult = $this->update($sqlUpdate, $arrDataUpdate);
	
		return array(
			"selectResult" => $selectResult,
			"updateResult" => $updateResult
		);
	}

	public function updateCantidadProgreso($cantidad_progreso, $id, $id_metas_dinamicas)
	{
		$sql = "UPDATE metas_dinamicas
					SET cantidad_progreso = ?
					WHERE estado = 1 
					AND id_metas = ? AND id_metas_dinamicas = ?
			";

		$arrData = array($cantidad_progreso, $id, $id_metas_dinamicas);

		$request = $this->update($sql, $arrData);

		return $request;
	}
}
