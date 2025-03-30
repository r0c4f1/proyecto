<?php

class Teams extends Controllers{

    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Auth');
			die();
		}
    }

    public function teams(){

        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Equipos";
        $data['page_functions'] = functions($this, "teams");

		$this->views->getView($this,"teams",$data);
    }

    public function getTeams($id = ""){
        if ($_GET) {
            
            $requestUser = $this->model->selectTeams($id);

            if ($id != 	"") {
                echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
                return;
            }
            
            for ($i=0; $i < count($requestUser); $i++) { 
                $ver="<button class='btn btn-outline-primary' onclick='modalViewUser(".$requestUser[$i]["id_equipo"].")'id='btnViewUser'><i class='fa-regular fa-eye'></i></button>";


                if (isset($_SESSION['nivel']) && ($_SESSION['nivel'] == 1 || $_SESSION['nivel'] == 2))  {
                $editar = "<button class='btn btn-outline-success' onclick='modalEditarEquipo(".$requestUser[$i]["id_equipo"].")'><i class='fa-regular fa-pen-to-square'></i></button>";
                
                $eliminar = "<button class='btn btn-outline-danger' onclick='confirmed(".$requestUser[$i]["id_equipo"].")'><i class='fa-solid fa-trash'></i></button>";
                $requestUser[$i]['opc'] =  $ver . " " . $editar . " " . $eliminar ;
            } else {
                $requestUser[$i]['opc'] =  $ver;
            }
                if ( $requestUser[$i]['tipo_equipo'] == 0) {
                    $requestUser[$i]['tipo_equipo'] = "Proyecto";
                }else {
                    $requestUser[$i]['tipo_equipo'] = "Trabajo";
                }
            }

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getTeamsForIncident($type){ //VERIFICAR XQ ESTO TIENE UNOS BOTONES SI SOLO ESTAN DE ADORNOS
        $type = intval($type);
        if ($_GET) {
            
            $requestUser = $this->model->selectTeamsForIncident($type);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getUserForTeam($id = ""){ // Estoy aqui
        if ($_GET) {
            
            $requestUser = $this->model->selectUserForTeam($id);
            
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function getRegisteredUsers($id_equipo){
        if ($_GET) {
            $requestUser = $this->model->selectRegisteredUsers($id_equipo);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function registerTeamsUser(){
        if ($_POST) {
            $id_usuario = strClean($_POST['id_usuario']);
            $id_equipo= strClean($_POST['id_equipo']);
            
            $requestUser = $this->model->insertRegisterTeamsUser($id_usuario, $id_equipo);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Usuario ya registrado en este equipo");
            }


            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function addTeams(){
        if ($_POST) {
            $nombre = strClean($_POST['nombre']);
            $tipo_equipo = strClean($_POST['tipo_equipo']);
            
            $requestUser = $this->model->insertTeams($nombre, $tipo_equipo);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error o Nombre Duplicado");
            }


            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function editTeams(){
        if ($_POST) {
            $id_equipo = strClean($_POST['id_equipo']);
            $nombre = strClean($_POST['nombre']);
            $tipo_equipo = strClean($_POST['tipo_equipo']);
            
            $requestUser = $this->model->updateTeams($id_equipo, $nombre, $tipo_equipo);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error o Nombre Duplicado");
            }


            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function cancelTeams($id){
        if ($_GET) {
            $requestUser = $this->model->deleteTeams($id);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error o Equipo No Encontrado");
            }


            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }
    public function cancelTeamsUser($parametros) {
        $datos = explode("," , $parametros);
        $id_equipo= $datos[0];
        $id_usuario = $datos[1];

            $requestUser = $this->model->deleteTeamUser($id_equipo, $id_usuario);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error o Usuario No Encontrado");
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
    }

    public function TeamsActivos($id_equipo) {
        if($_GET) {
            
            $requestUser = $this->model->selectTeamsActivos($id_equipo);

            if($requestUser){
                $arrResponse = array("status" => true, "data" => $requestUser);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Equipo activo");
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

        
}