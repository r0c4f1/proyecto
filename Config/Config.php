<?php 
	ini_set('display_errors',1);
	error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
	const BASE_URL = "http://localhost/proyecto";

	//Zona horaria
	date_default_timezone_set('America/Caracas'); 

	//Datos de conexión a Base de Datos
	const DB_HOST = "localhost";
	const DB_NAME = "proyecto";
	const DB_USER = "root";
	const DB_PASSWORD = "";
	const DB_CHARSET = "utf8";

	const APP_NAME = "Sistema GTO";
	