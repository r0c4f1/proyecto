<?php headerAdmin($data);
sideBar();

?>


<div class="main">
    <div class="header-wrap">
        <div class="header-title">
            <h2>Inicio</h2>
        </div>
        <div class="user-info">

            <div class="username">
                <h5><i class='fas fa-user-cog text-primary'></i> <?= $_SESSION['nameUser'] ?></h5>
                <!-- <h5><?= $_SESSION['id_usuario'] ?></h5> -->
                <!-- <h5><?= $_SESSION['id_unidad'] ?></h5> -->
            </div>
        </div>
    </div>
    <div class="card-container">
        <div class="card-wrap d-flex justify-content-evenly align-items-center" style="display:flex; flex-wrap:wrap;">
            <h3 class="main-title mb-2" style="width:100%;">Información</h3>

            <div class="visually-hidden d-flex flex-column justify-content-center align-items-center mb-5" id="chart1">
                <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">Hombres y
                    Mujeres</h4>
                <canvas id="myChart"></canvas>
            </div>
            <div class="visually-hidden d-flex flex-column justify-content-center align-items-center mb-5" id="chart2">
                <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">Proyectos</h4>
                <canvas id="myChart2"></canvas>
            </div>

            <?php if($_SESSION["nivel"] >= 1) { ?>
            <div class="visually-hidden d-flex flex-column justify-content-center align-items-center mb-5" id="chart3">
                <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">Incidencias Por
                    Usuario</h4>
                <canvas id="myChart3"></canvas>
            </div>
            <?php } ?>
            <div class="visually-hidden d-flex flex-column justify-content-center align-items-center mb-5" id="chart4">
                <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">Incidencias
                    totales</h4>
                <canvas id="myChart4">1234</canvas>
            </div>
        </div>
    </div>



    <div class="card-container">
        <h3 class="main-title">Progreso</h3>
        <div class="card-wrap">

            <div class="card-one shadow bg-white pointer border border-primary"
                onclick="alertaPromedioIncidenciasPorUsuario();">
                <div class="card-header">
                    <span>Tiempo promedio que toma resolver una incidencia</span>
                    <div class="card-inf">
                        <i class="fa-solid fa-business-time" style="font-size: 40px;"></i>
                    </div>
                </div>
                <span class="card-detail">
                    <p id="totalAvgIncidentResolution"></p>
                </span>
            </div>

            <div class="card-one shadow bg-white pointer border border-primary"
                onclick="alertaEquipoConMasIncidenciasCompletadas()">
                <div class="card-header">
                    <span>Equipo con más incidencias resueltas</span>
                    <div class="card-inf">
                        <i id="teamIncidents" class="fa-solid fa-flag-checkered text-secondary"
                            style="font-size: 40px;"></i>

                    </div>
                </div>
                <span class="card-detail">
                    <p id="teamTopIncidents"></p>
                </span>
            </div>
            <?php if($_SESSION["nivel"] >= 1) { ?>

            <div class="card-one shadow bg-white pointer border border-primary"
                onclick="alertaPorcentajeCapacitaciones()">
                <div class="card-header">
                    <span>Participación en capacitaciones</span>
                    <div class="card-inf">
                        <i id="capacitacion" class="fa-solid fa-headset text-secondary" style="font-size: 40px;"></i>

                    </div>
                </div>
                <span class="card-detail">
                    <p id="avgTraining"></p>
                </span>
            </div>

            <div class="card-one shadow bg-white pointer border border-primary"
                onclick="alertaPorcentajeRecursosUsados();">
                <div class="card-header">
                    <span>Porcentaje de utilización de recursos</span>
                    <div class="card-inf">
                        <i class="fa-solid fa-box-open fa-2x" style="font-size: 40px;"></i>
                    </div>
                </div>
                <span class="card-detail">
                    <p id="avgResources"></p>
                </span>
            </div>

            <div class="card-one shadow bg-white pointer border border-primary" onclick="alertaRecursosAgotados();">
                <div class="card-header">
                    <span>Recursos casi agotados</span>
                    <div class="card-inf">
                        <i id="recurso" class="fas fa-exclamation-triangle fa-2x" style="font-size: 40px;"></i>
                    </div>
                </div>
                <span class="card-detail">
                    <p id="mostDepletedResource"></p>
                </span>
            </div>
            <?php } ?>

        </div>
    </div>

    <?php if($_SESSION["nivel"] >= 1) { ?>

    <div class="card-container">
        <h3 class="main-title mb-2"><i class="fas fa-chart-line fa-2x"></i> Gráficos de Varianza</h3>
        <div class="card-wrap justify-content-around">
            <div class="visually-hidden border rounded p-2" id="chart5">
                <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">Incidencias
                </h4>
                <div class="d-flex justify-content-around">
                    <button onclick="updateChart('meses', 0)"
                        class="bg-blue-500 col-3  btn btn-primary text-white px-4 py-2 rounded">
                        Mensual
                    </button>
                    <button onclick="updateChart('años', 1)"
                        class="bg-green-500 col-3 btn btn-primary text-white px-4 py-2 rounded ml-2">
                        Anual
                    </button>
                </div>
                <div class="card-wrap d-flex justify-content-between align-items-center"
                    style="display:flex; flex-wrap:wrap;">


                    <canvas id="myChart5"></canvas>
                </div>
            </div>


            <div class="visually-hidden border rounded p-2" id="chart6">
                <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">Participación
                    en Capacitaciones</h4>
                <div class="d-flex justify-content-around">
                    <button onclick="updateChartCapacitacionesVariance('mesesCapacitaciones', 0)"
                        class="bg-blue-500 col-3  btn btn-primary text-white px-4 py-2 rounded">
                        Mensual
                    </button>
                    <button onclick="updateChartCapacitacionesVariance('añosCapacitaciones', 1)"
                        class="bg-green-500 col-3 btn btn-primary text-white px-4 py-2 rounded ml-2">
                        Anual
                    </button>
                </div>
                <div class="card-wrap d-flex justify-content-between align-items-center"
                    style="display:flex; flex-wrap:wrap;">


                    <canvas id="myChart6"></canvas>
                </div>

            </div>













            <div class="visually-hidden border rounded p-2" id="chart7">
                <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">
                    Tiempo Promedio de Finalizacion de Incidencias</h4>
                <div class="d-flex justify-content-around">
                    <button onclick="updateChartTimeVarianceIncidents('mesesTiempoIncidencia', 0)"
                        class="bg-blue-500 col-3  btn btn-primary text-white px-4 py-2 rounded">
                        Mensual
                    </button>
                    <button onclick="updateChartTimeVarianceIncidents('añosTiempoIncidencia', 1)"
                        class="bg-green-500 col-3 btn btn-primary text-white px-4 py-2 rounded ml-2">
                        Anual
                    </button>
                </div>
                <div class="card-wrap d-flex justify-content-between align-items-center"
                    style="display:flex; flex-wrap:wrap;">
                    <canvas id="myChart7"></canvas>
                </div>
            </div>

            <div class="visually-hidden border rounded p-2" id="chart8">
                <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">
                    Tiempo Promedio de Asignación de Incidencias</h4>
                <div class="d-flex justify-content-around">
                    <button onclick="updateChartTimeVarianceIncidentsAsignacion('mesesTiempoIncidenciaAsignacion', 0)"
                        class="bg-blue-500 col-3  btn btn-primary text-white px-4 py-2 rounded">
                        Mensual
                    </button>
                    <button onclick="updateChartTimeVarianceIncidentsAsignacion('añosTiempoIncidenciaAsignacion', 1)"
                        class="bg-green-500 col-3 btn btn-primary text-white px-4 py-2 rounded ml-2">
                        Anual
                    </button>
                </div>
                <div class="card-wrap d-flex justify-content-between align-items-center"
                    style="display:flex; flex-wrap:wrap;">


                    <canvas id="myChart8"></canvas>
                </div>
            </div>

            <div class="visually-hidden border rounded p-2" id="chart9">
                <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">
                    Mantenimientos solucioandos</h4>
                <div class="d-flex justify-content-around">
                    <button onclick="updateChartMantenimientos('mesesMantenimientos', 0)"
                        class="bg-blue-500 col-3  btn btn-primary text-white px-4 py-2 rounded">
                        Mensual
                    </button>
                    <button onclick="updateChartMantenimientos('añosMantenimientos', 1)"
                        class="bg-green-500 col-3 btn btn-primary text-white px-4 py-2 rounded ml-2">
                        Anual
                    </button>
                </div>
                <div class="card-wrap d-flex justify-content-between align-items-center"
                    style="display:flex; flex-wrap:wrap;">


                    <canvas id="myChart9"></canvas>
                </div>
            </div>



        </div>
    </div>

    <?php } ?>




    <?php
// ----------------------- CIERRE DEL HTML QUE VE EL ADMIN ---------------
    ?>

    <?php
    // if ($_SESSION['nivel'] == 1) { // -------------- HTML QUE VERA EL JEFE ---------------
    ?>
    <!-- <div class="main">
        <div class="header-wrap">
            <div class="header-title">
                <span>Inicio</span>
                <h2>Dashboard</h2>
                <div>
                    <a href="<?= base_url() ?>/TaskList/taskList">
                        <button class="btn btn-warning">Lista de Tareas</button>
                    </a>
                </div>
            </div>
            <div class="user-info">

                <div class="username">
                    <h5><i class='fas fa-user-tie text-info'></i> <?= $_SESSION['nameUser'] ?></h5>
                </div>
            </div>
        </div>
        <div class="card-container">
            <div class="card-wrap d-flex justify-content-between align-items-center"
                style="display:flex; flex-wrap:wrap;">
                <h3 class="main-title" style="width:100%;">Información de Hoy</h3>

                <div class="d-flex flex-column justify-content-center mb-5" style="width: 300px;" id="chart1">

                    <h4 class="main-title" style="letter-spacing: 2px; font-size: 24px; text-align: center;">Hombres y
                        Mujeres</h4>

                    <canvas id="myChart"></canvas>
                </div>
                <?php if($_SESSION["nivel"] >= 1) { ?>
                <div class="d-flex flex-column justify-content-center mb-5" style="width: 300px;">
                    <h4 class="main-title" style="letter-spacing: 2px; font-size: 24px; text-align: center;">Proyectos
                    </h4>
                    <canvas id="myChart2"></canvas>
                </div>
                <?php } ?>
                <div class="d-flex flex-column justify-content-center mb-5" style="width: 300px;">
                    <h4 class="main-title" style="letter-spacing: 2px; font-size: 24px; text-align: center;">Incidencias
                    </h4>
                    <canvas id="myChart3"></canvas>
                </div>
                <canvas id="miGrafico"></canvas>

            </div>
        </div>
        <div class="card-container">
            <h3 class="main-title">Progreso</h3>
            <div class="card-wrap">


                <div class="card-one shadow bg-white pointer border border-primary"
                    onclick="alertaPromedioIncidenciasPorUsuario();">
                    <div class="card-header">
                        <span>Tiempo promedio en resolver una incidencia</span>
                        <div class="card-inf">

                            <i class="fa-solid fa-business-time" style="font-size: 35px;"></i>
                        </div>
                    </div>
                    <span class="card-detail">
                        <p id="avgIncidentResolution"></p>
                    </span>
                </div>
                <div class="card-one shadow bg-white pointer border border-primary">
                    <div class="card-header">
                        <span>Tareas completadas Hoy</span>
                        <div class="card-inf">
                            <i class="fa-solid fa-flag-checkered" style="font-size: 35px;"></i>

                        </div>
                    </div>
                    <span class="card-detail">
                        <p id="totalIncidentsAndFinalized"></p>
                    </span>
                </div>
                <div class="card-one shadow bg-white pointer border border-primary">
                    <div class="card-header">
                        <span>Participación en capacitaciones</span>
                        <div class="card-inf">
                            <i class="fa-solid fa-headset" style="font-size: 35px;"></i>

                        </div>
                    </div>
                    <span class="card-detail">
                        <p id="avgIncidentResolution"></p>
                    </span>
                </div>
            </div>

        </div>


        <div>
        </div>

        <div class="card-container">
            <div class="row">
                <button onclick="updateChart('meses')"
                    class="bg-blue-500 col-3  btn btn-primary text-white px-4 py-2 rounded">
                    incidencias por mes
                </button>
                <button onclick="updateChart('años')"
                    class="bg-green-500 col-3 btn btn-primary text-white px-4 py-2 rounded ml-2">
                    incidencias por año
                </button>
            </div>
            <div class="card-wrap d-flex justify-content-between align-items-center"
                style="display:flex; flex-wrap:wrap;">
                <h3 class="main-title mb-2" style="width:100%;">Información</h3>
                <div class="visually-hidden" id="chart5">
                    <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">HOLA
                        DUCHARNE
                    </h4>
                    <canvas id="myChart5"></canvas>
                </div>
            </div>
        </div>
    </div> -->


    <?php
    // } // ----------------------- CIERRE DEL HTML QUE VE EL JEFE---------------
    ?>

    <?php
    // if ($_SESSION['nivel'] == 0) { // -------------- HTML QUE VERA EL USUARIO ---------------
    ?>
    <!-- <div class="main">
        <div class="header-wrap">
            <div class="header-title col-2">
                <span>Inicio</span>
                <h2>Dashboard</h2>
            </div>


            <div class="user-info col-2">
                <div class="username">
                    <h5><i class='fas fa-user text-success'></i> <?= $_SESSION['nameUser'] ?></h5>
                </div>
            </div>
        </div>
        <div class="card-container">
            <div class="card-wrap d-flex justify-content-between align-items-center"
                style="display:flex; flex-wrap:wrap;">
                <h3 class="main-title mb-2" style="width:100%;">Información</h3>
                <div class="visually-hidden d-flex flex-column justify-content-center align-items-center mb-5"
                    id="chart1">
                    <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">Hombres y
                        Mujeres</h4>
                    <canvas id="myChart"></canvas>
                </div>
                <div class="visually-hidden d-flex flex-column justify-content-center align-items-center mb-5"
                    id="chart2">
                    <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">Proyectos
                    </h4>
                    <canvas id="myChart2"></canvas>
                </div>
                <div class="visually-hidden d-flex flex-column justify-content-center align-items-center mb-5"
                    id="chart3">
                    <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">Incidencias
                        Por
                        Usuario</h4>
                    <canvas id="myChart3"></canvas>
                </div>
                <div class="visually-hidden d-flex flex-column justify-content-center align-items-center mb-5"
                    id="chart4">
                    <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">Incidencias
                        totales</h4>
                    <canvas id="myChart4"></canvas>
                </div>
            </div>
        </div>
        <div class="card-container">
            <h3 class="main-title">Progreso</h3>
            <div class="card-wrap">


                <div class="card-one shadow bg-white pointer border border-primary">
                    <div class="card-header">
                        <span>Tiempo promedio en resolver una incidencia</span>
                        <div class="card-inf">

                            <i class="fa-solid fa-business-time" style="font-size: 35px;"></i>
                        </div>
                    </div>
                    <span class="card-detail">
                        <p id="avgIncidentResolution"></p>
                    </span>
                </div>
                <div class="card-one shadow bg-white pointer border border-primary">
                    <div class="card-header">
                        <span>Tareas completadas Hoy</span>
                        <div class="card-inf">
                            <i class="fa-solid fa-flag-checkered" style="font-size: 35px;"></i>

                        </div>
                    </div>
                    <span class="card-detail">
                        <p id="totalIncidentsAndFinalized"></p>
                    </span>
                </div>
                <div class="card-one shadow bg-white pointer border border-primary"
                    onclick="alertaPorcentajeRecursosUsados();">
                    <div class="card-header">
                        <span>Porcentaje de utilización de recursos</span>
                        <div class="card-inf">
                            <i class="fa-solid fa-box-open fa-2x" style="font-size: 40px;"></i>
                        </div>
                    </div>
                    <span class="card-detail">
                        <p id="avgResources"></p>
                    </span>
                </div>

                <div class="card-one shadow bg-white pointer border border-primary" onclick="alertaRecursosAgotados();">
                    <div class="card-header">
                        <span>Recursos casi agotados</span>
                        <div class="card-inf">
                            <i id="recurso" class="fas fa-exclamation-triangle fa-2x" style="font-size: 40px;"></i>
                        </div>
                    </div>
                    <span class="card-detail">
                        <p id="mostDepletedResource"></p>
                    </span>
                </div>
            </div>

        </div>
        <div class="card-container">

            <div class="card-wrap d-flex justify-content-between align-items-center"
                style="display:flex; flex-wrap:wrap;">
                <h3 class="main-title mb-2" style="width:100%;">Información</h3>
                <div class="visually-hidden" id="chart5">
                    <h4 class="main-title" style="letter-spacing: 2px; font-size: 20px; text-align: center;">HOLA
                        DUCHARNE
                    </h4>
                    <canvas id="myChart5"></canvas>
                </div>
            </div>
        </div>


        <div>
        </div>
    </div> -->
    <?php
    // } // ----------------------- CIERRE DEL HTML QUE VE EL USUARIO ---------------
    ?>







    <?= getModal('modal_home') ?>

    <?php footerAdmin($data) ?>