<?php

class Training extends Controllers {
    
    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Home');
			die();
		}
    }
    
    // Views
    public function training(){
        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Users";
        $data['page_functions'] = functions($this, "training");
		$this->views->getView($this,"training",$data);
    }

    public function getTraining($id = ""){
        if ($_GET) {
            
            $requestUser = $this->model->selectTraining($id);

            if ($id != 	"") {
                echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
                return;
            }
            
            for ($i=0; $i < count($requestUser); $i++) { 
                $editar = "<button class='btn btn-outline-success' onclick='modalEditarCapacitacion(".$requestUser[$i]["id_capacitacion"].")'><i class='fa-regular fa-pen-to-square'></i></button>";
                $eliminar = "<button class='btn btn-outline-danger' onclick='confirmed(".$requestUser[$i]["id_capacitacion"].")'><i class='fa-solid fa-trash'></i></button>";
                $requestUser[$i]['opc'] =  $editar . " " . $eliminar;
                $requestUser[$i]['duracion'] =  "{$requestUser[$i]['duracion']} Horas";
            }

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function getRegisteredUsers($idCapacitacion){
        if ($_GET) {
            $requestUser = $this->model->selectRegisteredUsers($idCapacitacion);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function registerTrainingUser(){
        if ($_POST) {
            $id_usuario = strClean($_POST['id_usuario']);
            $id_capacitacion = strClean($_POST['id_capacitacion']);
            
            $requestUser = $this->model->insertRegisterTrainingUser($id_usuario, $id_capacitacion);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Cédula No Encontrada");
            }


            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    // ================================ PERMITE REGISTRAR A TODO EL PERSONAL EN LA CAPACITACION ============================
    public  function registerAllUsers($id){
        if ($_GET) {
            $requestUser = $this->model->insertRegisterAllUsers($id);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Todas las personas ya estan registradas");
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function registerAllUsersUnid(){
        if ($_POST) {

            $id_unidad = strClean($_POST['unidad']);
            $id_capacitacion = strClean($_POST['id_capacitacion']);
            
            $requestUser = $this->model->insertRegisterAllUsersUnid($id_unidad, $id_capacitacion);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Ya ingresaste a todos los de esta unidad");
            }


            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function addTraining(){
        if ($_POST) {
            $tema = strClean($_POST['tema']);
            $tipo = strClean($_POST['tipo']);
            $fecha = strClean($_POST['fecha']);
            $duracion = strClean($_POST['duracion']);
            
            $requestUser = $this->model->insertTraining($tema, $tipo, $fecha, $duracion);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error o Capacitacion Duplicada");
            }


            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function editTraining(){
        if ($_POST) {
            $tema = strClean($_POST['tema']);
            $tipo = strClean($_POST['tipo']);
            $fecha = strClean($_POST['fecha']);
            $duracion = strClean($_POST['duracion']);
            $id_usuario = strClean($_POST['id_usuario']);
            
            $requestUser = $this->model->updateTraining($tema, $tipo, $fecha, $duracion, $id_usuario);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Cedula No Encontrada");
            }


            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function cancelTraining($id_capacitacion){
        if ($_GET) {
            $requestUser = $this->model->deleteTraining($id_capacitacion);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Capacitación No Encontrada");
            }


            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public function cancelTrainingUser($parametros) {
        $datos = explode("," , $parametros);
        $id_usuario= $datos[0];
        $id_capacitacion = $datos[1];

            $requestUser = $this->model->deleteTrainingUser($id_usuario, $id_capacitacion);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Usuario No Encontrado");
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
    }
}