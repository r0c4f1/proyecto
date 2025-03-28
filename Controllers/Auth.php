<?php

class Auth extends Controllers{
    public function __construct(){
        parent::__construct();
        session_start();
        if (isset($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Home');
			die();
		}
    }
    // Views
    public function auth(){
        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Auth";
        $data['page_functions'] = functions($this, "auth");
		$this->views->getView($this,"auth",$data);
    }

    // Methods
    public function loginUser(){
        if($_POST){
            $cedula = strtolower(strClean($_POST["cedula"]));
            $clave = hash("md5", $_POST["clave"]);

            if(empty($cedula) || empty($clave)){
                $arrResponse = array('status' => false, "title" => "Error!", "msg" => "Revise los campos!");
                echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
                die();
            }

            $requestUser = $this->model->sessionLogin($cedula, $clave);

            if($requestUser){
                $nombreUsuario = "";
                $_SESSION['login'] = true;
                $_SESSION['id_usuario'] = $requestUser['id_usuario'];

                $nombre = explode(" ", $requestUser['nombres']);
                $apellido = explode(" ", $requestUser['apellidos']);
                
                $_SESSION['nameUser'] = "{$nombre[0]} {$apellido[0]}";
                $_SESSION['id_unidad'] = $requestUser['id_unidad'];
                $_SESSION['status'] = $requestUser['status'];
                $_SESSION['nivel'] = $requestUser['nivel'];
                $_SESSION['id_unidad'] = $requestUser['id_unidad'];

                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Cedula o Contraseña Incorrecto", "msg" => "Revise sus datos");
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        die();
    }

    
}