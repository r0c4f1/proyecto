<?php headerAdmin($data);
sideBar();
?>
<style>
.btn {
    min-width: 120px;
    max-width: 120px;
}
</style>


<div class="main">
    <div class="header-wrap">
        <div class="header-title">
            <h2>Tareas Asignadas</h2>
            <span>Incidencias y Proyectos Asignados</span>
        </div>
        <div class="user-info">

            <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
    </div>

    <div class="card-container">
        <?php if ($_SESSION['nivel'] == 2 && 1) {?>
        <div class="d-flex justify-content-end">
            <a href="<?= base_url() ?>/Assignments/assignments">
                <button class="btn btn-danger" id="back">Regresar</button>
            </a>
        </div>
        <?php } ?>
        <ul class="nav nav-tabs justify-content-center" id="incidenciasTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pendientes-tab" data-bs-toggle="tab"
                    onclick="cambiarNombreBtn('Pendiente')" data-bs-target="#pendientes" type="button" role="tab"
                    aria-controls="pendientes" aria-selected="true">Pendientes <span class="badge bg-danger"
                        id="countPendiente">0</span></button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="proceso-tab" onclick="cambiarNombreBtn('En Proceso')" data-bs-toggle="tab"
                    data-bs-target="#proceso" type="button" role="tab" aria-controls="proceso" aria-selected="false">En
                    Proceso <span class="badge bg-primary" id="countEnProceso">0</span></button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="finalizadas-tab" onclick="cambiarNombreBtn('Finalizado')"
                    data-bs-toggle="tab" data-bs-target="#finalizadas" type="button" role="tab"
                    aria-controls="finalizadas" aria-selected="false">Finalizadas <span class="badge bg-success"
                        id="countFinalizado">0</span></button>
            </li>
        </ul>
        <div class="tab-content pt-3" id="incidenciasTabContent">
            <!-- Contenido de Pendientes -->
            <div class="tab-pane fade show active" id="pendientes" role="tabpanel" aria-labelledby="pendientes-tab">
                <header class="container-fluid mt-2">
                    <div class="border rounded bg-danger p-1 text-white text-center">
                        <h3>Incidencias Pendientes</h3>
                    </div>
                </header>

                <section id="dataIncidenciasPendientes">

                </section>

                <header class="container-fluid mt-2">
                    <div class="border rounded bg-danger p-1 text-white text-center">
                        <h3>Proyectos Pendientes</h3>
                    </div>
                </header>

                <section id="dataProyectosPendientes">

                </section>
            </div>

            <!-- Contenido de En Proceso -->
            <div class="tab-pane fade" id="proceso" role="tabpanel" aria-labelledby="proceso-tab">
                <header class="container-fluid mt-2">
                    <div class="border rounded bg-primary p-1 text-white text-center">
                        <h3>Incidencias En Proceso</h3>
                    </div>
                </header>

                <section id="dataIncidenciasEnProceso">

                </section>

                <header class="container-fluid mt-2">
                    <div class="border rounded bg-primary p-1 text-white text-center">
                        <h3>Proyectos En Proceso</h3>
                    </div>
                </header>

                <section id="dataProyectosEnProceso">

                </section>
            </div>

            <!-- Contenido de Finalizadas -->
            <div class="tab-pane fade" id="finalizadas" role="tabpanel" aria-labelledby="finalizadas-tab">
                <header class="container-fluid mt-2">
                    <div class="border rounded bg-success p-1 text-white text-center">
                        <h3>Incidencias Finalizadas</h3>
                    </div>
                </header>

                <section id="dataIncidenciasFinalizados">

                </section>

                <header class="container-fluid mt-2">
                    <div class="border rounded bg-success p-1 text-white text-center">
                        <h3>Proyectos Finalizados</h3>
                    </div>
                </header>

                <section id="dataProyectosFinalizados">

                </section>
            </div>
        </div>
    </div>





</div>


<?= getModal('modal_taskList') ?>
<?php footerAdmin($data) ?>