<?php headerAdmin($data);
sideBar();
$nivelUsuario = $_SESSION['nivel'];
?>

<main class="main">
    <div class="header-wrap">
        <div class="header-title">
            <h2>Equipos</h2>
            <span>Equipos OTIC</span>
        </div>
        <div class="user-info">
            <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
    </div>

    <section class="card-container">


        <header class="d-flex justify-content-between align-items-center">
            <h3 class="main-title">Equipos de Trabajo</h3>
            <button class="btn btn-primary" onclick="modalAddTeams()"
                style="<?php echo $nivelUsuario == 0 ? 'display:none;' : ''; ?>">Agregar Equipo</button>
        </header>
        <hr>
        <section class="col-12 d-flex justify-content-right">
            <table id="equipo" class="tabla-estilizada text-wrap" style="width:100%;">
                <thead>
                    <tr>
                        <th>Equipos</th>
                        <th>Tipo </th>
                        <th>Opciones</th>
                    </tr>
                </thead>
            </table>
        </section>

    </section>

    <section class="card-container" style="<?php echo $nivelUsuario == 0 ? 'display:none;' : ''; ?>">
        <header class="d-flex justify-content-between align-items-center">
            <h3 class="main-title">Añadir a Equipo</h3>

        </header>
        <div>
            <h3 id="temaInscritos"></h3>
            <hr>
            <section class="col-11">
                <select name="" id="selectTeams" class="form-control">
                    <option value="0">---</option>
                </select>
        </div>

        <div class="d-flex justify-content-between align-items-center">
            <input type='text' class='mt-4 form-control w-25' placeholder='Buscar' onkeyup='filtroListaInscritos(event)'
                id='buscador' disabled>
            <button class="btn btn-primary mt-4" onclick="modalAddUserTeams()" disabled id="btnAddToTeams">Agregar
                Usuario a Equipo</button>

        </div>
        <article class="mt-2 inscritos row flex-wrap justify-content-start align-items-start" id="listaTeams"
            style="max-height:500px; overflow-y:scroll;">
        </article>

    </section>
    </section>
</main>

<?= getModal('modal_teams') ?>

<?php footerAdmin($data) ?>