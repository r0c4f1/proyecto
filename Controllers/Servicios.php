<?php

class Servicios extends Controllers {
    
    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Home');
			die();
		}
    }
    
    // Views
    public function servicios(){
        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Servicios";
        $data['page_functions'] = functions($this, "servicios");
		$this->views->getView($this,"servicios",$data);
    }
}