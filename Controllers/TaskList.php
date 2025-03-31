<?php

class TaskList extends Controllers
{

    public function __construct()
    {
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
            header('Location: ' . base_url() . '/Auth');
            die();
        }
    }

    public function tasklist()
    {

        $data['page_tag'] = APP_NAME;
        $data['page_title'] = APP_NAME;
        $data['page_name'] = "Lista de Tareas";
        $data['page_functions'] = functions($this, "taskList");

        $this->views->getView($this, "taskList", $data);
    }

    //FUNCIÓN PARA OBTENER LOS EQUIPOS DE UN USUARIO EN ESPECÍFICO
    public function getEquipo($idUsuario)
    {
        if ($_GET) {
            $requestUser = $this->model->selectEquipo($idUsuario);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    //FUNCIÓN PARA OBTENER LAS INCIDENCIAS PENDIENTES DEL USUARIO
    public function getIncident($idEquipo)
    {
        if ($_GET) {
            $requestUser = $this->model->selectIncident($idEquipo);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    //FUNCIÓN PARA OBTENER LOS PROYECTOS PENDIENTES DEL USUARIO
    public function getProject($idEquipo)
    {
        if ($_GET) {
            $requestUser = $this->model->selectProject($idEquipo);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }
    //FUNCIÓN PARA OBTENER LAS INDICENCIAS EN PROCESO DEL USUARIO
    public function getIncidentInProcess($idEquipo)
    {
        if ($_GET) {
            $requestUser = $this->model->selectIncidentInProcess($idEquipo);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    //FUNCIÓN PARA OBTENER LOS PROYECTOS EN PROCESO DEL USUARIO
    public function getProjectInProcess($idEquipo)
    {
        if ($_GET) {
            $requestUser = $this->model->selectProjectInProcess($idEquipo);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    //FUNCIÓN PARA OBTENER LAS INDICENCIAS FINALIZADAS DEL USUARIO
    public function getIncidentFinalized($idEquipo)
    {
        if ($_GET) {
            $requestUser = $this->model->selectIncidentFinalized($idEquipo);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    //FUNCIÓN PARA OBTENER LOS PROYECTOS FINALIZADOS DEL USUARIO
    public function getProjectFinalized($idEquipo)
    {
        if ($_GET) {
            $requestUser = $this->model->selectProjectFinalized($idEquipo);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    //FUNCIÓN PARA OBTENER LA INFORMACIÓN DE UN INCIDENTE ESPECÍFICO
    public function getIncidentForId($id)
    {
        if ($_GET) {
            $requestUser = $this->model->selectIncidentForId($id);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    //FUNCIÓN PARA OBTENER LA INFORMACIÓN DE UN PROYECTO ESPECÍFICO
    public function getProjectById($id)
    {
        if ($_GET) {
            $requestUser = $this->model->selectProjectById($id);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }


    //FUNCIONES DEL CAMBIO DE ESTATUS EN TASKLIST 
    //PIDE EL ESTADO VARIANDO ENTRE PROYECTO E INCIDENCIA
    public function getStatus($idCapturado)
    {
        if ($_POST) {
            $tipo = $_POST['tipoEntidad'];
            // $tipo = $_POST['tipoCapturado'];
            $requestUser = $this->model->selectStatus($idCapturado, $tipo);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    //CAMBIA EL ESTADO 'PENDIENTE' A 'EN PROCESO'
    public function changeToPendiente($idCapturado)
    {
        if ($_POST) {
            $tipo = $_POST['tipoEntidad'];
            $fecha_inicio = isset($_POST['fecha_inicio']) ? $_POST['fecha_inicio'] : 0;
            $requestUser = $this->model->changeStatusPendiente($idCapturado, $tipo, $fecha_inicio);

            if ($requestUser) {
                $arrResponse = array("status" => true);
            } else {
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error");
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }
        //SELECCIONAR LOS DATOS ANTES DE ACTUALIZAR DE ´PENDIENTE´ A 'PROCESO' 'finalizado'
        public function getData($parametros)
        {
            if ($_GET) {
                $datos = explode("," , $parametros);
                $idCapturado = $datos[0];
                $tipo = $datos[1];

                $requestUser = $this->model->selectedData($idCapturado, $tipo);

    
                echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
            }
        }

    //CAMBIA EL ESTADO 'EN PROCESO' A 'FINALIZADO'
    public function changeToEnproceso($idCapturado)
    {
        if ($_POST) {
            $tipo = $_POST['tipoEntidad'];
            $descripcion_solucion = $_POST['descripcion_solucion'];
            $requestUser = $this->model->changeStatusEnproceso($idCapturado, $tipo, $descripcion_solucion);

            if ($requestUser) {
                $arrResponse = array("status" => true);
            } else {
                $arrResponse = array("status" => false, "title" => "Error!", "msg" => "Error");
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
    }

}