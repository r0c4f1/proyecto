<?php

class Report extends Controllers
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

    // REPORTE USUARIO
    public function usuarios($params)
    {
        $data['page_title'] = "Usuarios";
        $data['page_name'] = "Report";
        $dataParametro = explode(",", $params);
        $sexo = isset($dataParametro[0]) ? $dataParametro[0] : 'x';
        $fechaNacimiento = isset($dataParametro[1]) ? $dataParametro[1] : 'x';
        $data['datos'] = $this->model->ReportUsers($sexo, $fechaNacimiento);


        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(3, 3, 3);
        $pdf->SetPrintHeader(false);
        $pdf->SetPrintFooter(false);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/Report/users_list.php';

        $html = ob_get_clean();
        // Escribir el contenido HTML en el PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // Generar el PDF
        $pdf->Output('Empleados_OTIC.pdf', 'I');

        ob_end_flush();
    }
// REPORTE RECURSOS
    public function recursos()
    {   $opcion = $_POST['opcion'] ?? 'x';
        $data['page_title'] = "Usuarios"; 
        $data['page_name'] = "Report";    
        $data['datos'] = $this->model->ReportResources($opcion);

        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(4, 1, 4);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/Report/resources_list.php';

        $html = ob_get_clean();
        // Escribir el contenido HTML en el PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // Generar el PDF
        $pdf->Output('Recursos_OTIC.pdf', 'I');

        ob_end_flush();
    }

    // REPORTE DE METAS
    public function metas($params)
    {
        $data['page_title'] = "Usuarios";
        $data['page_name'] = "Report";
        $dataParametro = explode(",", $params);

        // Asignar valor por defecto si no existe
        $fecha1 = isset($dataParametro[0]) ? $dataParametro[0] : 'x';
        $fecha2 = isset($dataParametro[1]) ? $dataParametro[1] : 'x';

        $data['datos'] = $this->model->reportAchievedGoals($fecha1, $fecha2);



        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(4, 1, 4);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/Report/goals_list.php';

        $html = ob_get_clean();
        // Escribir el contenido HTML en el PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // Generar el PDF
        $pdf->Output('Informe de Metas.pdf', 'I');

        ob_end_flush();
    }

// REPORTE DE HISTÓRICO
    public function historico()
    {
        // Validar si hay datos en POST
        $estado = isset($_POST['estado']) && in_array($_POST['estado'], ['0', '1']) ? $_POST['estado'] : 'x';
        $fecha1 = isset($_POST['fecha1']) && $_POST['fecha1'] !== '' ? $_POST['fecha1'] : 'x';
        $fecha2 = isset($_POST['fecha2']) && $_POST['fecha2'] !== '' ? $_POST['fecha2'] : 'x';

        // Registrar los valores para depuración
        error_log("Parámetros recibidos: Estado=$estado, Fecha1=$fecha1, Fecha2=$fecha2");

        // Llamar al modelo con los parámetros validados
        $data['datos'] = $this->model->ReportOperations($estado, $fecha1, $fecha2);

        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(3, 3, 3);
        $pdf->SetPrintHeader(false);
        $pdf->SetPrintFooter(false);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/Report/operationsHistory_list.php';

        $html = ob_get_clean();
        $pdf->writeHTML($html, true, false, true, false, '');
        $pdf->Output('Historico_Operaciones_GTO.pdf', 'I');
        ob_end_flush();
    }

// REPORTE DE PROYECTOS
    public function proyecto()
    {
        // Obtener parámetros desde POST (no desde URL)
        $estadoP = $_POST['estadoP'] ?? 'x'; // Valor predeterminado 'x' si no existe
        $fecha1 = $_POST['fecha1'] ?? 'x';
        $fecha2 = $_POST['fecha2'] ?? 'x';

      

      
        error_log("Parámetros POST recibidos: Estado=$estadoP, Fecha1=$fecha1, Fecha2=$fecha2");

        // Resto del código se mantiene igual
        $data['datos'] = $this->model->ReportProject($estadoP, $fecha1, $fecha2);

        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(3, 3, 3);
        $pdf->SetPrintHeader(false);
        $pdf->SetPrintFooter(false);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/Report/projectInfo_list.php';

        $html = ob_get_clean();
        $pdf->writeHTML($html, true, false, true, false, '');
        $pdf->Output('Informe_Proyectos_OTIC.pdf', 'I');
        ob_end_flush();
    }

// REPORTE DE INCIDENCIAS
public function incidencia()
{
    // Obtener parámetros desde POST (no desde URL)
    $estadoP = $_POST['estadoP'] ?? 'x'; // Valor predeterminado 'x' si no existe
    $fecha1 = $_POST['fecha1'] ?? 'x';
    $fecha2 = $_POST['fecha2'] ?? 'x';

  

    

    error_log("Parámetros POST recibidos: Estado=$estadoP, Fecha1=$fecha1, Fecha2=$fecha2");

    // Resto del código se mantiene igual
    $data['datos'] = $this->model->ReportIncident($estadoP, $fecha1, $fecha2);


    ob_start();
    include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
    $pdf->SetMargins(3, 3, 3);
    $pdf->SetPrintHeader(false);
    $pdf->SetPrintFooter(false);
    $pdf->AddPage();
    $pdf->SetFont('Helvetica', '', 12);

    ob_start();
    include 'Views/Report/incidentInfo_list.php';

    $html = ob_get_clean();
    $pdf->writeHTML($html, true, false, true, false, '');
    $pdf->Output('Informe_Incidentes_OTIC.pdf', 'I');
    ob_end_flush();
}

    // ==================== LLAMADOS A LAS FUNCIONES DESDE EL DASHBOARD (REPORTCUSTOM) =============

    public function listaEmpleadosCargoGenero()
    {         // MUESTRA UN PDF POR CARGO CUANTAS PERSONAS ESTAN Y SU GENERO
        $data['page_title'] = "Usuarios";
        $data['page_name'] = "Report";

        $data['datos'] = $this->model->ReporteEmpleadosCargoGenero();

        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(4, 1, 4);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/ReportCustom/employeesByPositionAndGender_list.php';

        $html = ob_get_clean();
        // Escribir el contenido HTML en el PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // Generar el PDF
        $pdf->Output('Empleados_OTIC_CARGO.pdf', 'I');

        ob_end_flush();
    }

    public function listaProyectos()
    {         // MUESTRA UN PDF CON LOS EQUIPOS Y LA CANTIDAD DE PROYECTOS
        $data['page_title'] = "Usuarios";
        $data['page_name'] = "Report";

        $data['datos'] = $this->model->ReporteProyectos();

        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(4, 1, 4);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/ReportCustom/project_list.php';

        $html = ob_get_clean();
        // Escribir el contenido HTML en el PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // Generar el PDF
        $pdf->Output('Proyectos_OTIC.pdf', 'I');

        ob_end_flush();
    }

    public function listaIncidenciasMesEquipo($userId)
    {         // MUESTRA UN PDF CON LOS EQUIPOS Y LA CANTIDAD DE INCIDENCIAS POR MES
        $data['page_title'] = "Usuarios";
        $data['page_name'] = "Report";

        $data['datos'] = $this->model->ReporteIncidenciasMesEquipo($userId);

        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(4, 1, 4);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/ReportCustom/userIncidentsPerMonth_list.php';

        $html = ob_get_clean();
        // Escribir el contenido HTML en el PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // Generar el PDF
        $pdf->Output('INCIDENCIAS_MES_OTIC.pdf', 'I');

        ob_end_flush();
    }


    public function listaIncidenciasMes()
    {         // MUESTRA UN PDF CON LA CANTIDAD DE INCIDENCIAS POR MES
        $data['page_title'] = "Usuarios";
        $data['page_name'] = "Report";

        $data['datos'] = $this->model->ReporteIncidenciasMes();

        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(4, 1, 4);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/ReportCustom/IncidentsPerMonth_list.php';

        $html = ob_get_clean();
        // Escribir el contenido HTML en el PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // Generar el PDF
        $pdf->Output('documento.pdf', 'I');

        ob_end_flush();
    }

    public function listaPorcentajePorCapacitacion()
    {         // MUESTRA UN PDF CON EL PROCENTAJE DE ASISTENCIA A CAPACITACIONES
        $data['page_title'] = "Usuarios";
        $data['page_name'] = "Report";

        $data['datos'] = $this->model->ReportePorcentajePorCapacitacion();

        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(4, 1, 4);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/ReportCustom/avgTraining_list.php';

        $html = ob_get_clean();
        // Escribir el contenido HTML en el PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // Generar el PDF
        $pdf->Output('documento.pdf', 'I');

        ob_end_flush();
    }

    public function listaUsuariosEnCapacitacion($id_capacitacion)
    {       // MUESTRA UN PDF CON LOS USUARIOS QUE ESTAN EN UNA CAPACION ESPECIFICA
        $data['page_title'] = "Usuarios";
        $data['page_name'] = "Report";

        $data['datos'] = $this->model->ReporteUsuariosEnCapacitacion($id_capacitacion);

        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(4, 1, 4);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/ReportCustom/usersIntraining_list.php';

        $html = ob_get_clean();
        // Escribir el contenido HTML en el PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // Generar el PDF
        $pdf->Output('Lista_Usuario_Capacitacion.pdf', 'I');

        ob_end_flush();
    }

    public function listaRecursosUsados()
    {       // MUESTRA UN PDF CON LOS RECURSOS MAS USADOS POR PORCENTAJE
        $data['page_title'] = "Usuarios";
        $data['page_name'] = "Report";

        $data['datos'] = $this->model->ReporteRecursosUsados();

        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(10, 10, 10);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/ReportCustom/avgResources_list.php';

        $html = ob_get_clean();
        // Escribir el contenido HTML en el PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // Generar el PDF
        $pdf->Output('documento.pdf', 'I');

        ob_end_flush();
    }

    public function listaRecursosAgotados()
    {       // MUESTRA UN PDF CON LOS RECURSOS MAS CERCANOS AGOTARSE
        $data['page_title'] = "Usuarios";
        $data['page_name'] = "Report";

        $data['datos'] = $this->model->ReporteRecursosAgotados();

        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(4, 1, 4);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/ReportCustom/depletedResources_list.php';

        $html = ob_get_clean();
        // Escribir el contenido HTML en el PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // Generar el PDF
        $pdf->Output('documento.pdf', 'I');

        ob_end_flush();
    }

    public function listaReporteRecursosReciclaje()
    {       // MUESTRA UN PDF CON LOS RECURSOS MAS CERCANOS AGOTARSE
        $data['page_title'] = "Usuarios";
        $data['page_name'] = "Report";

        $data['datos'] = $this->model->ReporteRecursosReciclaje();

        ob_start();
        include 'Libraries/vendor/tecnickcom/tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, 'letter', true, 'UTF-8', false);
        $pdf->SetMargins(4, 1, 4);
        $pdf->AddPage();
        $pdf->SetFont('Helvetica', '', 12);

        ob_start();
        include 'Views/ReportCustom/recyclableItems_list.php';

        $html = ob_get_clean();
        // Escribir el contenido HTML en el PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // Generar el PDF
        $pdf->Output('Recursos_Reutilizados.pdf', 'I');

        ob_end_flush();
    }
}
