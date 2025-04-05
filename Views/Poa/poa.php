<?php headerAdmin($data);
sideBar();
$nivelUsuario = $_SESSION['nivel'];
$currentUserId = $_SESSION['id_usuario'];
$fecha = new DateTime();
?>
<main class="main">
    <div class="header-wrap">
        <div class="header-title">
            <h2>Metas Internas <?php echo $fecha->format('Y'); ?></h2>
            <span>Metas OTIC</span>
        </div>
        <div class="user-info">
            <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
    </div>
    <div class="card-container">
        <header class="d-flex justify-content-between">
            <h3 class="main-title">Progreso Actual</h3>
            <button id="" onclick="modalAddGoals()" class="btn btn-primary m-3"
                style="<?php echo $nivelUsuario == 0 ? 'display:none;' : ''; ?>">Generar Meta</button>


        </header>
        <div class="card-wrap align-items-center" id="ContenedorCard">
        </div>
    </div>

    <div class="card-container">
        <h3 class="main-title">Historial de Metas</h3>
        <section class="col-12">
            <table id="table_metas" class="tabla-estilizada text-wrap" style="width:100%;">
                <thead>
                    <tr>
                        <th>Meta</th>
                        <th>Fecha Creacion</th>
                        <th>Fecha Limite</th>
                        <th>Progreso en Procentaje</th>
                        <th>Progreso Final</th>
                        <th>Cantidad Objetivo</th>
                        <th>Estado</th>
                    </tr>
                </thead>
            </table>
        </section>
    </div>
    </div>
</main>
<?= getModal('modal_poa') ?>


<?php footerAdmin($data) ?>