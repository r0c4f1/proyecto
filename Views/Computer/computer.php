<?php headerAdmin($data);
sideBar(); ?>

<main class="main">
<div class="header-wrap">

        <div class="header-title">
        
            <h2>Computadoras</h2>
            <span>Computadoras OTIC</span>
        </div>
        <div class="user-info">
                        <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
    </div>

    <section class="card-container">
        <header class="d-flex justify-content-between">
        <h3 class="main-title">Computadoras Registradas</h3>
            <div>
            <button class="btn btn-primary" onclick="modalAddComputer()">Registrar Computadora</button>
            <a href="<?= base_url() ?>/Incidents/incidents">
            <button class="btn btn-danger">Regresar</button>
                </a> </div>
        </header>
        <hr>
        <section class="col-8">
        <table id="computer" class="tabla-estilizada text-wrap" style="width:100%;">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Modelo</th>
                    <th>Opciones</th>
                </tr>
            </thead>
        </table>
    </section>
</section>
</main>

<?= getModal('modal_computer') ?>

<?php footerAdmin($data) ?>