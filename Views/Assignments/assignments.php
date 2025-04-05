<?php headerAdmin($data);
sideBar(); ?>

<main class="main">
    <div class="header-wrap">
        <div class="header-title">
            <h2>Asignaciones</h2>
            <span>Asignaciones a empleados</span>
        </div>

        <div class="user-info">
            <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
    </div>

    <section class="card-container">
        <article class="d-flex justify-content-between">
            <h3 class="main-title">Lista de Incidencias Asignadas</h3>
            <div>
                <a href="<?= base_url() ?>/TaskList/taskList">
                    <button class="btn btn-warning">Lista de Tareas</button>
                </a>
            </div>
        </article>
        <hr>

        <div class="col-12 justify-content-center">
            <table id="asignaciones" class="tabla-estilizada text-wrap" style="width:100%;">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th>Reportado por</th>
                        <th>Asignado a</th>
                        <th>Fecha Reporte</th>
                        <th>Fecha Asignacion</th>
                        <th>Fecha Solucion</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
            </table>
        </div>

    </section>

    <section class="card-container">
        <article class="d-flex justify-content-between">
            <h3 class="main-title">Lista de Proyectos Asignadas</h3>
        </article>
        <hr>

        <div class="col-12 justify-content-center">
            <table id="asignacionesProyecto" class="tabla-estilizada text-wrap" style="width:100%;">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Asignado a</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Final</th>
                        <th>Fecha Asignacion</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
            </table>
        </div>

    </section>

</main>

<?= getModal('modal_assignments') ?>

<?php footerAdmin($data) ?>