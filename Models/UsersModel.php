<?php 
	class UsersModel extends Mysql
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function selectUsers(){
			$sql = "SELECT id_usuario, id_unidad, nombres, apellidos, DATE_FORMAT(fecha_nacimiento, '%d-%m-%Y') AS fecha_nacimiento_formateada, telefono, cargo, sexo, discapacidad, email, nivel FROM usuario WHERE status = 1";

			$request = $this->select_all($sql);

			return $request;
		}

		public function selectUser($id){
			$sql = "SELECT id_usuario, id_unidad, nombres, apellidos, fecha_nacimiento, telefono, cargo, sexo, discapacidad, email, nivel FROM usuario WHERE id_usuario = '$id'";

			$request = $this->select($sql);

			return $request;
		}

		public function selectDisabled(){
			$sql = "SELECT 
					SUM(discapacidad = 'Ninguna') AS Ninguna,
					SUM(discapacidad = 'Física') AS Fisica,
					SUM(discapacidad = 'Intelectual') AS Intelectual,
					SUM(discapacidad = 'Mental') AS Mental,
					SUM(discapacidad = 'Sensorial') AS Sensorial
				FROM usuario;
				";

			$request = $this->select($sql);

			return $request;
		}


		public function updateStatus($id_usuario, $status){
			$sql = "SELECT * FROM usuario WHERE id_usuario = '$id_usuario' AND status = 1";
	
			$request = $this->select($sql);
	
			if (!$request) return false;

			$sql = "UPDATE usuario SET status = ? WHERE id_usuario = '$id_usuario'";
			
			$arrData = array($status);

			$request = $this->update($sql,  $arrData);

			return $request;
		}

		public function idExist($id_usuario) {
			$sql = "SELECT * FROM usuario WHERE id_usuario = '$id_usuario'";
	
			$request = $this->select($sql);
	
			if ($request) return false;
			else return true;
		}

		public function userRegister($nombre, $apellido, $fechaNac, $sexo, $dicapacidad, $telefono, $email, $cedula, $clave, $nivel, $unidad, $cargo){
			$sql = "SELECT * FROM usuario WHERE id_usuario = '$cedula'";
	
			$request = $this->select($sql);
	
			if ($request) return false;
	
			$sql = "INSERT INTO usuario (id_usuario, 
										 nombres, 
										 apellidos, 
										 fecha_nacimiento, 
										 telefono, 
										 sexo,
										 discapacidad,
										 email,
										 clave,
										 nivel,
										 id_unidad,
										 cargo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
	
			$arrData = array($cedula, $nombre, $apellido, $fechaNac, $telefono, $sexo, $dicapacidad,$email, $clave, $nivel, $unidad, $cargo);

	
			$insert  = $this->insert($sql, $arrData); 
	
			return true;
		}

		public function userUpdate($nombre, $apellido, $fechaNac, $sexo, $discapacidad, $telefono, $email, $id_usuario, $unidad, $cargo) {
			$sql = "UPDATE usuario SET nombres = ?, apellidos = ?, fecha_nacimiento = ?, sexo = ?, discapacidad = ?, telefono = ?, email = ?, id_unidad = ?, cargo = ? WHERE id_usuario  = '$id_usuario'";

			$arrData = array($nombre, $apellido, $fechaNac,  $sexo, $discapacidad, $telefono, $email, $unidad, $cargo);

			$request = $this->update($sql, $arrData);

			return $request;
		}

    }