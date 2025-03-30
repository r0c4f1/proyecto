<?php

class Incidents extends Controllers {
    
    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Home');
			die();
		}
    }
    
    // Views
    public function incidents(){
        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Servicios";
        $data['page_functions'] = functions($this, "incidents");
		$this->views->getView($this,"incidents",$data);
    }

    public function getIncidents($id = ""){
        if ($_GET) {
            $requestUser = $this->model->selectIncidents($id);
    
            if ($id != "") {
                echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
                return;
            }
    
            for ($i=0; $i < count($requestUser); $i++) { 
                $ver = "<button class='btn btn-outline-info' onclick='alertaVerDescripcionIncidencia(".$requestUser[$i]["id_incidencia"].")'><i class='fa fa-align-left'></i></button>";
                $editar = "<button class='btn btn-outline-success' onclick='modalEditarIncidencia(".$requestUser[$i]["id_incidencia"].")'><i class='fa-regular fa-pen-to-square'></i></button>";
                             
                if (isset($_SESSION['nivel']) && ($_SESSION['nivel'] == 1 || $_SESSION['nivel'] == 2))  {
                    
                    $confirmed = "<button class='btn btn-outline-danger' onclick='confirmed(".$requestUser[$i]["id_incidencia"].")'><i class='fa-solid fa-trash'></i></button>";
                    $requestUser[$i]['opc'] =  $ver . " " . $editar . " " . $confirmed;
                } else {
                    $requestUser[$i]['opc'] =  $ver. "" . $editar;
                }
            }
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }
    

    
    
    

    public  function getAssignment($idAsignacion){
        if ($_GET) {
            $requestUser = $this->model->selectAssignment($idAsignacion);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }
    

    public  function getAsignedIncidents($idAsignacion){
        if ($_GET) {
            $requestUser = $this->model->selectAsignedIncidents($idAsignacion);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function setIncidents(){
        if ($_POST) {
            $descripcion = strClean($_POST['descripcion']);
            $id_tipo = strClean($_POST['id_tipo']);
            $reportado_por = strClean($_POST['reportado_por']);
            
            $requestUser = $this->model->insertIncidents($id_tipo, $descripcion, $reportado_por);
            
            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "No Insertado");
            }
        
        
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public function assignIncident() {
        if ($_POST) {
            // Variables obligatorias
            $codigo = isset($_POST['codigo']) ? strClean($_POST['codigo']) : null;
            $id_equipo = isset($_POST['id_equipo']) ? strClean($_POST['id_equipo']) : null;
            $id_incidencia = isset($_POST['id_incidencia']) ? strClean($_POST['id_incidencia']) : null;
            $fecha_asignacion = isset($_POST['fecha_asignacion']) ? strClean($_POST['fecha_asignacion']) : null;
            $estado = isset($_POST['estado']) ? strClean($_POST['estado']) : null;
            $recurso1 = isset($_POST['recurso1']) ? strClean($_POST['recurso1']) : null;
            $cantidad1 = isset($_POST['cantidad1']) ? strClean($_POST['cantidad1']) : 0;
    
            // Verificación de campos obligatorios
            if ($id_equipo && $id_incidencia && $fecha_asignacion && $estado && $recurso1 && $cantidad1) {
                // Variables opcionales
                $recurso2 = isset($_POST['recurso2']) ? strClean($_POST['recurso2']) : null;
                $cantidad2 = isset($_POST['cantidad2']) ? strClean($_POST['cantidad2']) : 0;
                $recurso3 = isset($_POST['recurso3']) ? strClean($_POST['recurso3']) : null;
                $cantidad3 = isset($_POST['cantidad3']) ? strClean($_POST['cantidad3']) : 0;
                $recurso4 = isset($_POST['recurso4']) ? strClean($_POST['recurso4']) : null;
                $cantidad4 = isset($_POST['cantidad4']) ? strClean($_POST['cantidad4']) : 0;
                $recurso5 = isset($_POST['recurso5']) ? strClean($_POST['recurso5']) : null;
                $cantidad5 = isset($_POST['cantidad5']) ? strClean($_POST['cantidad5']) : 0;
    
                $requestUser = $this->model->insertAssign(
                    $codigo,
                    $id_equipo, 
                    $fecha_asignacion, 
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
                    $id_incidencia
                );
            }
            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error, No Insertado");
            }
        
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE); 
        }
    }

    public  function updateIncidents(){
        if ($_POST) {
            $id_incidencia = strClean($_POST['id_incidencia']);
            $descripcion = strClean($_POST['descripcion']);
            $id_tipo = strClean($_POST['id_tipo']);
            $fecha_reporte = strClean($_POST['fecha_reporte']);
            $reportado_por = strClean($_POST['reportado_por']);
            
            $requestUser = $this->model->updateIncidents($id_incidencia, $id_tipo, $descripcion, $fecha_reporte, $reportado_por);
            
            
            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error, No Actualizado");
            }
        
        
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function delIncidents($id){
        if ($_GET) {
            $requestUser = $this->model->deleteIncidents($id);
            
            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error o Incidencia no encontrada");
            }
        
        
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }
}