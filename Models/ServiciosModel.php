<?php 
	class ServiciosModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function selectUsers(){
			$sql = "SELECT id_usuario, id_unidad, nombres, apellidos, fecha_nacimiento, telefono, cargo, sexo, email, nivel FROM usuario WHERE status = 1";

			$request = $this->select_all($sql);

			return $request;
		}
    }