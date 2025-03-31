<?php

class Poa extends Controllers{

    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Auth');
			die();
		}
    }

    public function poa(){

        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "POA";
        $data['page_functions'] = functions($this, "poa");

		$this->views->getView($this,"poa",$data);
    }

    public  function newDinamicGoals(){
        if ($_POST) {
            $meta = strClean($_POST['meta']);
            $fecha_limite = strClean($_POST['fecha_limite']);
            $cantidad_objetivo = strClean($_POST['cantidad_objetivo']);
            
            $requestUser = $this->model->insertDinamicGoals($meta, $fecha_limite, $cantidad_objetivo);
    
            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Debe esperar que la meta anterior de este tipo termine");
            }
    
    
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function getGoals($id){
        if($_GET){
            $requestUser = $this->model->selectGoals($id);
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function getDinamicGoals($id){
        if($_GET){
            $requestUser = $this->model->selectDinamicGoals($id);
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function getDinamicGoalsAlert(){
        if($_GET){
            $requestUser = $this->model->selectDinamicGoalsAlert();
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function getDinamicGoalsForzada($id){ // mal optimizado forzado por la hora
        if($_GET){
            $requestUser = $this->model->selectDinamicGoalsForzada($id);
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function getDinamicGoalsCompleted(){
            $requestUser = $this->model->selectDinamicGoalsCompleted();
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
    }

    public  function chanceDinamicGoalsStatus(){
        if($_GET){
            $requestUser = $this->model->updateDinamicGoalsStatus();
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public  function changeCantidadProgreso($parametros){
        $datos = explode("," , $parametros);
        $id = $datos[0];
        $id_metas_dinamicas = $datos[1];
        $cantidad_progreso = $datos[2];

            $requestUser = $this->model->updateCantidadProgreso($cantidad_progreso, $id, $id_metas_dinamicas);
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
    }

    public  function getDataIncidentGoals($parametros){
        $datos = explode("," , $parametros);
        $id = $datos[0];
        $fecha_creacion = $datos[1];
        $fecha_limite = $datos[2];

        // $fechaLimiteHora = explode("---", $fecha_limite);
		// $fechaHora = explode("---", $fecha_creacion);

        // echo "$fechaLimiteHora[0] $fechaLimiteHora[1]";


        $requestUser = $this->model->selectDataIncidentGoals($id, $fecha_creacion, $fecha_limite);
    
        echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
    }

    public  function getDataProjectGoals($parametros){
        $datos = explode("," , $parametros);
        $id = $datos[0];
        $fecha_creacion = $datos[1];
        $fecha_limite = $datos[2];

            $requestUser = $this->model->selectDataProjectGoals($id, $fecha_creacion, $fecha_limite);
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
    }

    public  function getDataTrainingGoals($parametros){
        $datos = explode("," , $parametros);
        $id = $datos[0];
        $fecha_creacion = $datos[1];
        $fecha_limite = $datos[2];

            $requestUser = $this->model->selectDataTrainingGoals($id, $fecha_creacion, $fecha_limite);
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
    }
    public  function getTrainedPersonnel($parametros){
        $datos = explode("," , $parametros);
        $id = $datos[0];
        $fecha_creacion = $datos[1];
        $fecha_limite = $datos[2];

            $requestUser = $this->model->selectTrainedPersonnel($id, $fecha_creacion, $fecha_limite);
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
    }
    

    public  function cancelarDinamicGoals($id){
        if($_GET){
            $requestUser = $this->model->updateCancelarDinamicGoals($id);
    
            if($requestUser){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Capacitación No Encontrada");
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

}