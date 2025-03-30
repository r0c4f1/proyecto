<?php

class Inventory extends Controllers{

    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Auth');
			die();
		}
    }

     // Views
     public function inventario(){
        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Inventario";
        $data['page_functions'] = functions($this, "inventory");
		$this->views->getView($this,"inventory",$data);
    }


}