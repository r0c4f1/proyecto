<?php headerAdmin($data);
sideBar();
?>

<main class="main">
<div class="header-wrap">
        <div class="header-title">
            <h2>Incidencias</h2>
            <span>Incidencias Reportadas</span>
        </div>
        <div class="user-info">
            <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
    </div>

    <section class="card-container">
        <header class="d-flex justify-content-between align-items-center">
        <h3 class="main-title">Incidencias</h3>
            <div class="d-flex justify-content-between">
  <button class="btn btn-primary" onclick="modalAddIncident()">Agregar Incidencia</button>
  <a href="<?= base_url() ?>/TypeIncident/typeIncident">
    <button class="btn btn-warning ms-2">Ver Tipos</button>
  </a>
  <a href="<?= base_url() ?>/Computer/computer">
    <button class="btn btn-secondary ms-2">Ver Computadoras</button>
  </a>
</div>

        </header>
        <hr>
        <section class="col-10">
            <table id="incidencias" class="tabla-estilizada text-wrap" style="width:100%;">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Categoría</th>
                        <th>Subtipo</th>
                        <th>Fecha De Reporte</th>
                        <th>Reportado Por</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
            </table>
        </section>
    </section>

    <?php
    if ($_SESSION['nivel'] != 0) { // -------------- Esto significa que los usuarios no pueden asignar -----------
    ?>
    <section class="card-container">

        <header>
        <h3 class="main-title">Asignar Incidencias</h3>
            <h3  id="asignacion"></h3>
        </header>
        <hr>

        <section>
            <div>
                <select name="" id="selectAsignados" class="form-control">
                    <option value="0">---</option>
                </select>
            </div>

            <div class="d-flex justify-content-between align-items-center">
                <input type='text' class='mt-4 form-control w-25' placeholder='Buscar'
                    onkeyup='filtroListaInscritos(event)' id='buscador' disabled>
            </div>
<hr>
            <article class="container col-12 mt-2 inscritos row flex-wrap justify-content-start align-items-start" id="listaAsignados"
                style="max-height:600px; overflow-y:scroll;">
            </article>

        </section>
    </section>
    <?php
    } // ----------------------- CIERRE DEL HTML QUE VE EL USUARIO ---------------
    ?>
</main>

<?= getModal('modal_incidents') ?>

<?php footerAdmin($data) ?>