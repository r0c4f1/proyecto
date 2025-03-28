<?php 
	class SettingsModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function selectGraficos(){
			$sql = "SELECT * FROM graficos";

			$request = $this->select_all($sql);

			return $request;
		}

        public function insertGrafico($id_grafico, $status){
            if($_SESSION['nivel'] != 2) return false;
            
			$sql = "UPDATE graficos SET status = ? WHERE id_graficos = $id_grafico";
			
			$arrData = array($status);

			$request = $this->update($sql,  $arrData);

			return $request;
		}

        public function deleteGrafico($id_grafico, $status){
            if($_SESSION['nivel'] != 2) return false;
            
			$sql = "UPDATE graficos SET status = ? WHERE id_graficos = $id_grafico";
			
			$arrData = array($status);

			$request = $this->update($sql,  $arrData);

			return $request;
		}

		// ======================= HISTORICO DE OPERACIONES ========================

		public function selectHistorico(){
			$sql = "SELECT 
			DATE_FORMAT(fecha_operacion, '%d-%m-%Y %H:%i:%s') as fecha_operacion_formateada, 
			nombres, 
			tipo_operacion, 
			descripcion_operacion, 
			estado 
			FROM historico_operaciones INNER JOIN usuario ON historico_operaciones.id_usuario = usuario.id_usuario";

			$request = $this->select_all($sql);

			return $request;
		}

		public function insertOperation($id_usuario, $tipoOperacion, $descripcionOperacion, $estadoOperacion) {
			$sql = "INSERT INTO historico_operaciones (id_usuario, tipo_operacion, descripcion_operacion, estado)
					VALUES (?, ?, ?, ?)";
		
			$arrData = array($id_usuario, $tipoOperacion, $descripcionOperacion, $estadoOperacion);
		
			$request = $this->insert($sql, $arrData);
		
			return $request;
		}
		
    }