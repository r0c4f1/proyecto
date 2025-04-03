<?php

class Home extends Controllers{

    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Auth');
			die();
		}
    }

    public function home(){

        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Inicio";
        $data['page_functions'] = functions($this, "home");

		$this->views->getView($this,"home",$data);
    }

    public function getGenderIndicator() {
        if ($_GET) {
            $requestUser = $this->model->selectGenderIndicator();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getProjectIndicator($parametros) {
        if ($_GET) {

        $datos = explode("," , $parametros);
        $nivel = $datos[0];
        $unidad = $datos[1];

            $requestUser = $this->model->selectProjectIndicator($nivel, $unidad);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    
    public function getProjectIndicatorPerProject($idUsuario) {
        if ($_GET) {
            $requestUser = $this->model->selectProjectPerUserIndicator($idUsuario);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getProjectStates($parametros) {
        if ($_GET) {

            $datos = explode("," , $parametros);
            $nivel = $datos[0];
            $unidad = $datos[1];
            $id_proyecto = $datos[2] == null ? "" : $datos[2];
            
            $requestUser = $this->model->selectProjectStates($nivel, $unidad, $id_proyecto);
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

       public function getProjectPerUserStates($id_proyecto = null) {
        if ($_GET) {
            
            $requestUser = $this->model->selectProjectPerUserStates($id_proyecto);
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }


    public function getProjectPerTeams() {
        if ($_GET) {
            $requestUser = $this->model->selectProjectPerTeams();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getTasksPerUserIndicator($userId) {
        if ($_GET) {
            $requestUser = $this->model->selectTasksPerUserIndicator($userId);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }
    
    public function getTasksFinalizedPerUserIndicator($userId) {
        if ($_GET) {
            $requestUser = $this->model->selectTasksFinalizedPerUserIndicator($userId);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getTasksNumberPerUserIndicator($userId) {
        if ($_GET) {
            $requestUser = $this->model->selectTasksNumberPerUserIndicator($userId);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getAvgIncidentsPerUserIndicator($userId) {
        if ($_GET) {
            $requestUser = $this->model->selectAvgIncidentsPerUserIndicator($userId);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getTotalAvgIncidentsIndicator(){
        if ($_GET) {
            $requestUser = $this->model->selectTotalAvgIncidentsIndicator();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getAvgIncidentsIndicatorGroupByTeam($parametros){ 
        if ($_GET) {
            $datos = explode("," , $parametros);
            $nivel = $datos[0];
            $unidad = $datos[1];

            $requestUser = $this->model->selectAvgIncidentsIndicatorGroupByTeam($nivel,$unidad);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getUserTasksPerMonthIndicator($userId) {
        if ($_GET) {
            $requestUser = $this->model->selectUserTasksPerMonthIndicator($userId);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getTasksPerMonthIndicator($parametros) {
        if ($_GET) {
            $datos = explode("," , $parametros);
            $nivel = $datos[0];
            $unidad = $datos[1];

            $requestUser = $this->model->selectTasksPerMonthIndicator($nivel,$unidad);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getAllTasksIndicator($parametros) {
        if ($_GET) {
        
        $datos = explode("," , $parametros);
        $nivel = $datos[0];
        $unidad = $datos[1];

            $requestUser = $this->model->selectAllTasksIndicator($nivel,$unidad);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getAvgTasksIndicator() {
        if ($_GET) {
            $requestUser = $this->model->selectAvgTasksIndicator();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getAvgResourses() {
        if ($_GET) {
            $requestUser = $this->model->selectAvgresourses();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getMostDepletedResource() {
        if ($_GET) {
            $requestUser = $this->model->selectMostDepletedResource();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getTeamTopIncidents() {
        if ($_GET) {
            $requestUser = $this->model->selectTeamTopIncidents();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getTeamsPerIncidents($parametros) {
        if ($_GET) {
            $datos = explode("," , $parametros);
            $nivel = $datos[0];
            $unidad = $datos[1];
            
            $requestUser = $this->model->selectTeamsPerIncidents($nivel,$unidad);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getJob() {
        if ($_GET) {
            $requestUser = $this->model->selectJob();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getUserInJob($cargo){
        if ($_GET) {
            $requestUser = $this->model->selectUserInJob($cargo);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getAvgTraining(){
        if ($_GET) {
            $requestUser = $this->model->selectAvgTraining();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getUserInTraining($id_capacitacion){
        if ($_GET) {
            $requestUser = $this->model->selectUserInTraining($id_capacitacion);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getIncidenceVariance(){
        if ($_GET) {
            $requestUser = $this->model->selectIncidenceVariance();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

     public function getIncidenceVarianceYear(){
        if ($_GET) {
            $requestUser = $this->model->selectIncidenceVarianceYear();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

     public function getCapacitacionVariance(){
        if ($_GET) {
            $requestUser = $this->model->selectCapacitacionVariance();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

     public function getCapacitacionVarianceYear(){
        if ($_GET) {
            $requestUser = $this->model->selectCapacitacionVarianceYear();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

     public function getTimeIncidentsVariance(){
        if ($_GET) {
            $requestUser = $this->model->selectTimeIncidentsVariance();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getTimeIncidentsVarianceYear(){
        if ($_GET) {
            $requestUser = $this->model->selectTimeIncidentsVarianceYear();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

     public function getTimeAsignacionIncident(){
        if ($_GET) {
            $requestUser = $this->model->selectTimeAsignacionIncident();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getTimeAsignacionIncidentYear(){
        if ($_GET) {
            $requestUser = $this->model->selectTimeAsignacionIncidentYear();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

     public function getMantenimientoVariance(){
        if ($_GET) {
            $requestUser = $this->model->selectMantenimientoVariance();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

      public function getMantenimientoVarianceYear(){
        if ($_GET) {
            $requestUser = $this->model->selectMantenimientoVarianceYear();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    public function getMonthIncident($parametros){
        if ($_GET) {

            $datos = explode("," , $parametros);
            $mes = $datos[0];
            $nivel = $datos[1];
            $unidad = $datos[2];

            $requestUser = $this->model->selectMonthIncident($mes, $nivel, $unidad);

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

}