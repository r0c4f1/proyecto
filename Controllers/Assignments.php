<?php

class Assignments extends Controllers{

    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Auth');
			die();
		}
    }

     // Views
    public function assignments(){
        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Asignaciones";
        $data['page_functions'] = functions($this, "assignments");
		$this->views->getView($this,"assignments",$data);
    }

    public function getAssignments($parametros){
        $datos = explode("," , $parametros);
        $userLevel = $datos[0];
        $unidad = $datos[1];
        
        if ($_GET) {
            
            $requestUser = $this->model->selectAssignments($userLevel, $unidad);
            
            for ($i = 0; $i < count($requestUser); $i++) {
                // Botón "Ver"
                $ver = "<button class='btn btn-outline-info' onclick='modalVerRecursos(".$requestUser[$i]["id_asignacion"].")'><i class='fa-regular fa-eye'></i></button>"; 
                
                // Botón "Eliminar" solo si el estado no es "Finalizado"
                $eliminar = "";
                if ($requestUser[$i]['estado'] == "Pendiente") {
                    $eliminar = "<button class='btn btn-outline-danger' onclick='confirmed(".$requestUser[$i]["id_asignacion"].", ".$requestUser[$i]["id_incidencia"].")'><i class='fas fa-ban'></i></button>";
                }
                
                // Combinar opciones
                $requestUser[$i]['opc'] = $ver . " " . $eliminar;
                            
                // Cambiar el estilo del estado
                if ($requestUser[$i]['estado'] == "Pendiente") {
                    $requestUser[$i]['estado'] = "<div class='user bg-danger text-danger'>0</div>";
                } else if ($requestUser[$i]['estado'] == "En Proceso") {
                    $requestUser[$i]['estado'] = "<div class='boss bg-primary text-primary'>1</div>";
                } else {
                    $requestUser[$i]['estado'] = "<div class='admin bg-success text-success'>2</div>";
                }
            }
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }
    

    public function getAssignmentsProjects($parametros){
        $datos = explode("," , $parametros);
        $userLevel = $datos[0];
        $unidad = $datos[1];
        
        if ($_GET) {
            $requestUser = $this->model->selectProjects($userLevel, $unidad);
            
            for ($i = 0; $i < count($requestUser); $i++) {
                
                $ver = "<button class='btn btn-outline-info' onclick='modalVerRecursos(".$requestUser[$i]["id_asignacion"].")'><i class='fa-regular fa-eye'></i></button>"; 

                // Botón "Eliminar" o Check según el estado
                $eliminar = "";
                if ($requestUser[$i]['estado'] == "Pendiente") {
                    $eliminar = "<button class='btn btn-outline-danger' onclick='confirmedProject(".$requestUser[$i]["id_proyecto"].", ".$requestUser[$i]["id_asignacion"].")'><i class='fas fa-ban'></i></button>";
                } else {
                    $eliminar = "<i class='fa fa-check text-success fa-2x'></i>"; // Agregar ícono de check con estilo
                }
                $requestUser[$i]['opc'] = $eliminar;
    
                // Cambiar el estilo del estado
                if ($requestUser[$i]['estado'] == "Pendiente") {
                    $requestUser[$i]['estado'] = "<div class='user bg-danger text-danger'>0</div>";
                } else if ($requestUser[$i]['estado'] == "En Proceso") {
                    $requestUser[$i]['estado'] = "<div class='boss bg-primary text-primary'>1</div>";
                } else {
                    $requestUser[$i]['estado'] = "<div class='admin bg-success text-success'>2</div>";
                }
            }
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }
    

    public  function getIdTipo($id){ // FUNCION DISEÑADA UNICAMENTE PARA RESOLVER UN PROBLEMA RAPIDAMENTE
        if ($_GET) {

            $requestUser = $this->model->selectIdTipo($id);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }
    
    public  function getResourcesForAssignments($id){
        if ($_GET) {

            $requestUser = $this->model->selectResourcesForAssignments($id);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }
    

    public function delAssignments($id){
        if ($_GET) {
            $requestUser = $this->model->deleteAssignments($id);
            
            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Asignacion no encontrada");
            }
        
        
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public function delAssignmentsProject($id){
            $requestUser = $this->model->deleteAssignmentsProject($id);
            
            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Asignacion no encontrada");
            }
        
        
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }

}