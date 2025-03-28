<?php

class Errors extends Controllers{

    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Auth');
			die();
		}
    }

    public function notFound(){

        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Error";
        //$data['functions'] = "admin";
		$this->views->getView($this,"error",$data);
    }

}

$notFound = new Errors();
$notFound->notFound();