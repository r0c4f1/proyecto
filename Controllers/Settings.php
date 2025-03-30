<?php

class Settings extends Controllers{

    public function __construct(){
        parent::__construct();
        session_start();
        if (empty($_SESSION['login'])) {
			header('Location: ' . base_url() . '/Auth');
			die();
		}
    }

    public function settings(){

        $data['page_tag'] = APP_NAME;
		$data['page_title'] = APP_NAME;
		$data['page_name'] = "Ajustes";
        $data['page_functions'] = functions($this, "settings");

		$this->views->getView($this,"settings",$data);
    }

    // ================================== HISTORICO DE OPERACIONES FUNCIONES =================

    public function getHistorico(){
        if($_GET){

            $request = $this->model->selectHistorico();

            echo json_encode($request, JSON_UNESCAPED_UNICODE);
        }
    }

    public function insertHistorico() {
        if($_POST)
        {
            $id_usuario = $_POST["id_usuario"];
            $tipoOperacion = $_POST["tipoOperacion"];
            $descripcionOperacion = $_POST["descripcionOperacion"];
            $estadoOperacion = $_POST["estadoOperacion"];
    
            $requestUser = $this->model->insertOperation($id_usuario, $tipoOperacion, $descripcionOperacion, $estadoOperacion);
    
            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }
    // ============================================================================================

    public function getGraficos() {
        if ($_GET) {
            $requestUser = $this->model->selectGraficos();

            echo json_encode($requestUser, JSON_UNESCAPED_UNICODE);
        }
    }

    
    public function setGrafico(){
        if($_POST){
            $id_grafico = $_POST["id_grafico"];
            $status = $_POST["status"];

            $request = $this->model->insertGrafico($id_grafico, $status);

            if($request){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error al activar", "msg" => "Error");
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        die();
    }

    public function delGrafico(){
        if($_POST){
            $id_grafico = $_POST["id_grafico"];
            $status = $_POST["status"];

            $request = $this->model->insertGrafico($id_grafico, $status);

            if($request){
                $arrResponse = array("status" => true);
            }else{
                $arrResponse = array("status" => false, "title" => "Error al activar", "msg" => "Error");
            }

            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        die();
    }

    
}
class ImageUploader {
    public function uploadImage($fieldName, $fileName) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES[$fieldName])) {
            $uploadDir = 'assets/images/';
            $uploadFile = $uploadDir . pathinfo($fileName, PATHINFO_FILENAME) . '.' . pathinfo($_FILES[$fieldName]['name'], PATHINFO_EXTENSION);

            // Eliminar archivos existentes con el mismo nombre base (independientemente del tipo de archivo)
            $existingFiles = glob($uploadDir . pathinfo($fileName, PATHINFO_FILENAME) . '.*');
            foreach ($existingFiles as $existingFile) {
                unlink($existingFile);
            }

            // Mover la imagen subida a la carpeta de assets
            if (move_uploaded_file($_FILES[$fieldName]['tmp_name'], $uploadFile)) {
                echo 'Imagen subida y reemplazada con éxito.';
            } else {
                echo 'Error al subir la imagen.';
            }
        }
    }
    
}

// Crear una instancia de la clase
$imageUploader = new ImageUploader();

// Llamar al método uploadImage para diferentes campos de carga
$imageUploader->uploadImage('imageCintillo', 'cintillo.jpg');
$imageUploader->uploadImage('imageSello', 'sello.png');
$imageUploader->uploadImage('imageFirma', 'firma.png');
