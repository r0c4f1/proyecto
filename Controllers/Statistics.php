<?php

class Statistics extends Controllers{

    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Auth');
			die();
		}
    }

     // Views
     public function estadisticas(){
        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Estadisticas";
        $data['page_functions'] = functions($this, "statistics");
		$this->views->getView($this,"Statistics",$data);
    }


}