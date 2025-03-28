<?php
class UnitsModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
		}

        public function selectUnits($id) {
           if($id == ""){ 
            $sql = "SELECT id_unidad, nombre FROM unidad WHERE status = 1";
            $request = $this->select_all($sql);
            }
            else{
                $sql = "SELECT id_unidad, nombre FROM unidad WHERE status = 1 AND id_unidad = $id";
                $request = $this->select($sql);
                

            }
            return $request;
          }
          
          public function insertUnit($nombre){
            $sql =  "INSERT INTO `unidad`(`nombre`, `status`) VALUES (?,?)";
        
            $arrData = array($nombre, 1);
        
            $request = $this->insert($sql, $arrData);
        
            return $request;
        }
        public function updateUnit($nombre, $id) {
            $sql = "UPDATE unidad SET nombre = ? WHERE id_unidad = $id";
            $arrData = array($nombre); // Incluye $id en $arrData
        
            $request = $this->update($sql, $arrData);
        
            return $request;
        }

        public function cancelUnit($id) {
            $sql = "UPDATE unidad SET status = ? WHERE id_unidad = $id";
            $arrData = array(0); // Incluye $id en $arrData
        
            $request = $this->update($sql, $arrData);
        
            return $request;
        }
        
    }