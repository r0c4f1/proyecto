<?php

class Api extends Controllers{

    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Auth');
			die();
		}
    }


    public  function getApi(){ // FUNCION DISEÑADA UNICAMENTE PARA RESOLVER UN PROBLEMA RAPIDAMENTE
        if ($_GET) {

            $archivo = ''. base_url() .'/Controllers/datos.json';
            $json = file_get_contents($archivo);

            echo $json;
        }
    }
    
}