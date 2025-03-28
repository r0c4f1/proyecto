<?php 
	class AuthModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function sessionLogin($cedula, $clave){
			$sql = "SELECT * FROM usuario WHERE id_usuario = '$cedula' AND clave = '$clave' AND status = 1";

			$request = $this->select($sql);

			return $request;
		}

		

	}
 ?>