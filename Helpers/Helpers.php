<?php 
   require_once ('Libraries/vendor/autoload.php');
  // use Mpdf\Mpdf;
	//Retorna la url del proyecto
	function base_url()
	{
		return BASE_URL;
	}
    //Retorna la url de Assets
    function media()
    {
        return BASE_URL."/Assets";
    }

    function headerAdmin($data="")
    {
        $view_header = "Views/Template/header_admin.php";
        require_once ($view_header);
    }
    function headerHome($data="")
    {
        $view_header = "Views/Template/header_home.php";
        require_once ($view_header);
    }
    function sideBar($data="")
    {
        $view_header = "Views/Template/sidebar.php";
        require_once ($view_header);
    }
    function footerAdmin($data="")
    {
        $view_footer = "Views/Template/footer_admin.php";
        require_once ($view_footer);        
    }
    function footerHome($data="")
    {
        $view_footer = "Views/Template/footer_home.php";
        require_once ($view_footer);        
    }
    
    function functions($class, $name){

        if(get_class($class) == "Home") $functions = $name."_functions.js";
        else $functions = get_class($class)."/".$name."_functions.js";

        return $functions;
    }
	function dep($data)
    {
        //Muestra información formateada
        $format  = print_r('<pre>');
        $format .= print_r($data);
        $format .= print_r('</pre>');
        return $format;
    }
    function getModal(string $nameModal, $data = "")
    {
        $view_modal = "Views/Template/modals/{$nameModal}.php";
        require_once $view_modal;        
    }
   
    function getFile(string $url, $data)
    {
        ob_start();
        require_once("Views/{$url}.php");
        $file = ob_get_clean();
        return $file;        
    }

    // function getPermisos(int $idmodulo){
    //     require_once ("Models/PermisosModel.php");
    //     $objPermisos = new PermisosModel();
    //     if(!empty($_SESSION['userData'])){
    //         $idrol = $_SESSION['userData']['idrol'];
    //         $arrPermisos = $objPermisos->permisosModulo($idrol,$idmodulo);
    //         $_SESSION['permisos'] = $arrPermisos;
    //         $_SESSION['permisosMod'] = $arrPermisos;
    //     }
    // }

    // function sessionUser(int $idpersona){
    //     require_once ("Models/LoginModel.php");
    //     $objLogin = new LoginModel();
    //     $request = $objLogin->sessionLogin($idpersona);
    //     return $request;
    // }

    function uploadImage(array $data, string $name){
        $url_temp = $data['tmp_name'];
        $destino    = 'Assets/images/uploads/'.$name;        
        $move = move_uploaded_file($url_temp, $destino);
        return $move;
    }

    function uploadStrucureImageCompress(array $data, string $name){
        $url_temp = $data['tmp_name'];
        $destino    = 'Assets/images/uploads/images/'.$name;
        $return = false;
                
                if($data['type'] == 'image/jpeg'){
                    $original= imagecreatefromjpeg($url_temp);
                    }else if($data['type'] == 'image/png'){
                    $original= imagecreatefrompng($url_temp);
                    }else{
                        $return = false;
                        return $return;
                    }               
                        if(imagejpeg($original, $destino, 100)){
                          $return = true;  
                        }

                        imagedestroy($original);
        return $return;
    }

    function deleteFile(string $name){
        unlink('Assets/images/uploads/'.$name);
    }

    function strClean($strCadena){
        $string = preg_replace(['/\s+/','/^\s|\s$/'],[' ',''], $strCadena);
        $string = trim($string);
        $string = stripslashes($string);
        $string = str_ireplace("<script>","",$string);
        $string = str_ireplace("</script>","",$string);
        $string = str_ireplace("<script src>","",$string);
        $string = str_ireplace("<script type=>","",$string);
        $string = str_ireplace("SELECT * FROM","",$string);
        $string = str_ireplace("DELETE FROM","",$string);
        $string = str_ireplace("INSERT INTO","",$string);
        $string = str_ireplace("SELECT COUNT(*) FROM","",$string);
        $string = str_ireplace("DROP TABLE","",$string);
        $string = str_ireplace("OR '1'='1","",$string);
        $string = str_ireplace(" OR ","",$string);
        $string = str_ireplace('OR "1"="1"',"",$string);
        $string = str_ireplace('OR ´1´=´1´',"",$string);
        $string = str_ireplace("is NULL; --","",$string);
        $string = str_ireplace("is NULL; --","",$string);
        $string = str_ireplace("LIKE '","",$string);
        $string = str_ireplace('LIKE "',"",$string);
        $string = str_ireplace("LIKE ´","",$string);
        $string = str_ireplace("OR 'a'='a","",$string);
        $string = str_ireplace('OR "a"="a',"",$string);
        $string = str_ireplace("OR ´a´=´a","",$string);
        $string = str_ireplace("OR ´a´=´a","",$string);
        $string = str_ireplace("--","",$string);
        $string = str_ireplace("^","",$string);
        $string = str_ireplace("[","",$string);
        $string = str_ireplace("]","",$string);
        $string = str_ireplace("=","",$string);
        $string = str_ireplace("'","",$string);
        $string = str_ireplace(";","",$string);
        return $string;
    }

    function clear_cadena(string $cadena){
        //Reemplazamos la A y a
        $cadena = str_replace(
        array('Á', 'À', 'Â', 'Ä', 'á', 'à', 'ä', 'â', 'ª'),
        array('A', 'A', 'A', 'A', 'a', 'a', 'a', 'a', 'a'),
        $cadena
        );
 
        //Reemplazamos la E y e
        $cadena = str_replace(
        array('É', 'È', 'Ê', 'Ë', 'é', 'è', 'ë', 'ê'),
        array('E', 'E', 'E', 'E', 'e', 'e', 'e', 'e'),
        $cadena );
 
        //Reemplazamos la I y i
        $cadena = str_replace(
        array('Í', 'Ì', 'Ï', 'Î', 'í', 'ì', 'ï', 'î'),
        array('I', 'I', 'I', 'I', 'i', 'i', 'i', 'i'),
        $cadena );
 
        //Reemplazamos la O y o
        $cadena = str_replace(
        array('Ó', 'Ò', 'Ö', 'Ô', 'ó', 'ò', 'ö', 'ô'),
        array('O', 'O', 'O', 'O', 'o', 'o', 'o', 'o'),
        $cadena );
 
        //Reemplazamos la U y u
        $cadena = str_replace(
        array('Ú', 'Ù', 'Û', 'Ü', 'ú', 'ù', 'ü', 'û'),
        array('U', 'U', 'U', 'U', 'u', 'u', 'u', 'u'),
        $cadena );
 
        //Reemplazamos la N, n, C y c
        $cadena = str_replace(
        array('Ñ', 'ñ', 'Ç', 'ç',',','.',';',':'),
        array('N', 'n', 'C', 'c','','','',''),
        $cadena
        );
        return $cadena;
    }
    


?>