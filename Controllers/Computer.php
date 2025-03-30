<?php

class Computer extends Controllers {
    
    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Home');
			die();
		}
    }
    
    // Views
    public function computer(){
        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Computer";
        $data['page_functions'] = functions($this, "computer");
		$this->views->getView($this,"computer",$data);
    }

    public function getComputer($id = ""){
        if ($_GET) {
            
            $requestUser = $this->model->selectComputer($id);
            if (empty($requestUser)) {
                echo json_encode(["message" => "No se encontro."], JSON_UNESCAPED_UNICODE);
                return;
            }
            if ($id != 	"") {
                echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
                return;
            }
            
            for ($i=0; $i < count($requestUser); $i++) { 
                $editar = "<button class='btn btn-outline-success' onclick='modalEditComputer(".$requestUser[$i]["id_computadora"].")'><i class='fa-regular fa-pen-to-square'></i></button>";
                $eliminar = "<button class='btn btn-outline-danger' onclick='confirmed(".$requestUser[$i]["id_computadora"].")'><i class='fa-solid fa-trash'></i></button>";
                $requestUser[$i]['opc'] =  $editar . " " . $eliminar;
            }

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function insertComputer(){
        if ($_GET) {
            $codigo = strClean($_POST['codigo']);
            $modelo = strClean($_POST['modelo']);

            $requestUser = $this->model->SetComputer($codigo, $modelo);
            
            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Algo salio mal");
            }
        
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function deleteComputer($id){

            $requestUser = $this->model->deleteComputer($id);
            
            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Algo salio mal");
            }
        
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }

        public  function editComputer(){
            if ($_POST) {
                $id_computadora = strClean($_POST['id_computadora']);
                $codigo = strClean($_POST['codigo']);
                $modelo = strClean($_POST['modelo']);

                $requestUser = $this->model->updateComputer($id_computadora, $codigo, $modelo);
                
                if($requestUser){
                    $arrResponse = array("status" => true);
                }else{
                    $arrResponse = array("status" => false, "title" => "Error!", "msg" => "No Actualizado");
                }
            
            
                echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
            }
        }

}