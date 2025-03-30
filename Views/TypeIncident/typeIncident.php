<?php headerAdmin($data);
sideBar(); ?>

<main class="main">
<div class="header-wrap">

        <div class="header-title">
        
            <h2>Tipos de Incidentes</h2>
        </div>
        <div class="user-info">
                        <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
    </div>

    <section class="card-container">
        <header class="d-flex justify-content-between">
        <h3 class="main-title">Incidentes Registrados</h3>
            <div>
            <button class="btn btn-primary" onclick="modalAddTypeIncident()">Agregar Nuevo Tipo</button>
            <a href="<?= base_url() ?>/Incidents/incidents">
            <button class="btn btn-danger">Regresar</button>
                </a> </div>
        </header>
        <hr>
        <section class="col-8">
        <table id="type" class="tabla-estilizada text-wrap" style="width:100%;">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Subtipo</th>
                    <th>Opciones</th>
                </tr>
            </thead>
        </table>
    </section>
</section>
</main>

<?= getModal('modal_type_incident') ?>

<?php footerAdmin($data) ?>