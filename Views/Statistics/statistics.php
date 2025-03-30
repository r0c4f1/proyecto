<?php headerAdmin($data);
sideBar(); ?>
<div class="main">
    <div class="header-wrap">
        <div class="header-title">
            <h2>Estadísticas</h2>
        </div>
        <div class="user-info">
            <div class="input-box">
                <input type="text" class="input-field" placeholder="Búsqueda" />
                <i><img src="<?= media() ?>/icon/buscar.png" alt="búsqueda" /></i>
            </div>
            <div class="username">
                <h5>Natha Ferreira</h5>
            </div>
        </div>
    </div>
    <div class="card-container">
        <h3 class="main-title">Indicadores</h3>
        <div class="card-wrap"></div>
    </div>

    <div class="card-container">
        <h3 class="main-title">Prioridad de Hoy</h3>
        <div class="card-wrap"></div>
    </div>

    <div class="card-container">
        <h3 class="main-title">Estadísticas</h3>
        <div class="card-wrap"></div>
    </div>

</div>
<?php footerAdmin($data) ?>