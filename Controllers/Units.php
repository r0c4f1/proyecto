<?php

class Units extends Controllers{

    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Auth');
			die();
		}
    }

     // Views
    public function units(){
        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Unidades";
        $data['page_functions'] = functions($this, "units");
		$this->views->getView($this,"units",$data);
    }

    public function getUnits($id = "") {
        if ($_GET) {
          $requestUser = $this->model->selectUnits($id);
      
          if ($id != 	"") {
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
            return;
        }
          for ($i = 0; $i < count($requestUser); $i++) {
            $editar = "<button class='btn btn-outline-success' onclick='modalEditUnit(" . $requestUser[$i]["id_unidad"] . ")'><i class='fa-regular fa-pen-to-square'></i></button>";
            $eliminar = "<button class='btn btn-outline-danger' onclick='confirmed(" . $requestUser[$i]["id_unidad"] . ")'><i class='fa-solid fa-trash'></i></button>";
            $requestUser[$i]['opc'] =  $editar . " " . $eliminar;
          }
      
          echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
      }
      
      
      public function registerUnit(){
        if($_POST){
            $nombre = strClean($_POST["nombre"]);
            
    
            $requestUser = $this->model->insertUnit($nombre);
    
            if($requestUser){
                $arrResponse = array("status" => true, "msg" => "Registrado correctamente.");
            }else{
                $arrResponse = array("status" => false, "title" => "Error", "msg" => "Ya está registrado!");
            }
    
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        die();
    }

    public  function updateUnit(){
        if ($_POST) {
            $nombre = strClean($_POST["nombre"]);
            
            $id = strClean($_POST['id_unidad']);
            
                        $requestUser = $this->model->updateUnit($nombre, $id);



            if($requestUser){
                $arrResponse = array("status" => true);
                
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error, No se pudo Actualizar");
            }


            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function cancelUnit($id){
        if ($_GET) {
            
            $requestUser = $this->model->cancelUnit($id);

            if($requestUser){
                $arrResponse = array("status" => true);
                
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error, No se pudo eliminar");
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }
}