<?php

class Project extends Controllers{

    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Auth');
			die();
		}
    }

     // Views
     public function project(){
        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Proyecto";
        $data['page_functions'] = functions($this, "project");
		$this->views->getView($this,"project",$data);
    }
   
    public function getProject($id = ""){
        if ($_GET) {
            
            $requestUser = $this->model->selectProject($id);
            if (empty($requestUser)) {
                echo json_encode(["message" => "No se encontraron proyectos."], JSON_UNESCAPED_UNICODE);
                return;
            }
            if ($id != 	"") {
                echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
                return;
            }
            
            for ($i=0; $i < count($requestUser); $i++) { 
                $editar = "<button class='btn btn-outline-success' onclick='modalEditarProyecto(".$requestUser[$i]["id_proyecto"].")'><i class='fa-regular fa-pen-to-square'></i></button>";
                $eliminar = "<button class='btn btn-outline-danger' onclick='confirmed(".$requestUser[$i]["id_proyecto"].")'><i class='fa-solid fa-trash'></i></button>";
                $requestUser[$i]['opc'] =  $editar . " " . $eliminar;
                }

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }
    
    public function registerProject(){
        if($_POST){
            $nombre = strClean($_POST["nombre"]);
            $descripcion = strClean($_POST["descripcion"]);
            $fecha_inicio = strClean($_POST["fecha_inicio"]);
            
            $requestUser = $this->model->insertProject($nombre, $descripcion, $fecha_inicio);
    
            if($requestUser){
                $arrResponse = array("status" => true, "msg" => "Proyecto registrado correctamente.");
            }else{
                $arrResponse = array("status" => false, "title" => "Error", "msg" => "Este Proyecto ya está registrado!");
            }
    
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        die();
    }
    public  function updateProject(){
        if ($_POST) {
            $nombre = strClean($_POST["nombre"]);
            $descripcion = strClean($_POST["descripcion"]);
            $fecha_inicio = strClean($_POST["fecha_inicio"]);
           
           
            $id_proyecto = strClean($_POST['id_proyecto']);
            
            $requestUser = $this->model->projectUpdate($nombre, $descripcion, $fecha_inicio, $id_proyecto);



            if($requestUser){
                $arrResponse = array("status" => true);
                
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error");
            }


            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }
    public  function cancelProject($id_proyecto){
        if ($_GET) {
            $requestUser = $this->model->deleteProject($id_proyecto);

            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Proyecto No Encontrado");
            }


            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

      
    public  function assignProject($parametros){
        // $datos = explode("," , $parametros);
        // $id_equipo = $datos[0];
        // $id_proyecto = $datos[1];

        //     $requestUser  = $this->model->insertAssign($id_equipo, $id_proyecto);
    
        //     if ($requestUser ) {
        //         $arrResponse = array("status" => true);
        //     } else {
        //         $arrResponse = array("status" => false, "title" => "Error!", "msg" => "No pudo asignarse el proyecto");
        //     }

        //     echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);

         if ($_POST) {
            // Variables obligatorias
            $id_equipo = isset($_POST['id_equipo']) ? strClean($_POST['id_equipo']) : null;
            $id_proyecto = isset($_POST['id_proyecto']) ? strClean($_POST['id_proyecto']) : null;
            $estado = "Pendiente";
            
    
            // Verificación de campos obligatorios
            if ($id_equipo && $id_proyecto) {
                // Variables opcionales
                $recurso1 = $_POST['recurso1'] != "" ? strClean($_POST['recurso1']) : null;
                $cantidad1 = $_POST['cantidad1'] != "" ? strClean($_POST['cantidad1']) : 0;
                $recurso2 = isset($_POST['recurso2']) ? strClean($_POST['recurso2']) : null;
                $cantidad2 = isset($_POST['cantidad2']) ? strClean($_POST['cantidad2']) : 0;
                $recurso3 = isset($_POST['recurso3']) ? strClean($_POST['recurso3']) : null;
                $cantidad3 = isset($_POST['cantidad3']) ? strClean($_POST['cantidad3']) : 0;
                $recurso4 = isset($_POST['recurso4']) ? strClean($_POST['recurso4']) : null;
                $cantidad4 = isset($_POST['cantidad4']) ? strClean($_POST['cantidad4']) : 0;
                $recurso5 = isset($_POST['recurso5']) ? strClean($_POST['recurso5']) : null;
                $cantidad5 = isset($_POST['cantidad5']) ? strClean($_POST['cantidad5']) : 0;
    
                $requestUser = $this->model->insertAssign(
                    $id_equipo, 
                    $estado,
                    $recurso1,
                    $recurso2,
                    $recurso3,
                    $recurso4,
                    $recurso5,
                    $cantidad1,
                    $cantidad2,
                    $cantidad3,
                    $cantidad4,
                    $cantidad5,
                    $id_proyecto
                );
            }else $requestUser = false;

            
            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error, No Insertado");
            }
        
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE); 
        }
        }

    }