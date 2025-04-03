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
    <h5 hidden id="idUsuario"><?= $_SESSION['id_usuario'] ?></h5>
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
 
    <section class="card-container justify-content-center">
    <?php
if ($_SESSION['nivel'] == 2 && 1) { // -------------- Sólo jefes y admin ---------------
?>
 <div class="d-flex justify-content-end">


<a href="<?= base_url() ?>/Assignments/assignments">
            <button class="btn btn-danger"id="back">Regresar</button>
                </a> </div>

<?php
} // ----------------------- 
    ?>
        <div class="row justify-content-center">
            <div class="container-btn border col-11 col-md-9 col-xl-5  rounded p-1 d-flex justify-content-center align-items-center">
                <button id="btn1" class="btn btn-danger mx-2 my-2 col-12 col-md-1 text-wrap" onclick="cardPendiente()">Pendiente</button>
                <button id="btn2" class="btn btn-transparent mx-2 my-2 col-12 col-md-1 text-wrap" onclick="cardEnProceso()">En Proceso</button>
                <button id="btn3" class="btn btn-transparent mx-2 my-2 col-12 col-md-1 text-wrap" onclick="cardFinalizado()">Finalizado</button>
            </div>
        </div>
        
        <label for="searchInput" class="fw-bold">
            Filtro de Incidencias y Proyectos
            <input type="search" id="searchInput" placeholder="Buscar" onkeyup="filtrarTarjetas()" class="form-control w-auto mb-3">
        </label>


        <!---SECCIÓN DE INCIDENCIAS---->
        <article class="card-container" id="titleCard"></article>

        <article class="card-container card-wrap d-flex justify-content-center" id="listaCard"></article>

        <!---SECCIÓN DE PROYECTOS---->
        <article class="card-container" id="titleCard2"></article>
        <article class="card-container card-wrap d-flex justify-content-center" id="listaCard2"></article>


    </section>
</div>


<?= getModal('modal_taskList') ?>
<?php footerAdmin($data) ?>

<script>
    document.addEventListener('DOMContentLoaded', cardPendiente);
</script>