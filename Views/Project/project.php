<?php headerAdmin($data);
sideBar();
$nivelUsuario = $_SESSION['nivel'];
?>
<script>
// Definir la variable global nivelUsuario a partir del valor PHP
var nivelUsuario = <?php echo $nivelUsuario; ?>;
</script>
<main class="main">
    <div class="header-wrap">
        <div class="header-title">
            <h2>Proyectos</h2>
            <span>Proyectos OTIC</span>
        </div>
        <div class="user-info">
            <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
    </div>

    <section class="card-container">
        <header class="d-flex justify-content-between">
            <h3 class="main-title">Lista de Proyectos</h3>

            <?php
                        if ($_SESSION['nivel'] != 0) { // Mostrar "Opciones" si el nivel NO es 0
                        ?><button class="btn btn-primary" onclick="modalAddProjectModal()">Agregar Proyecto</button>
            <?php
                    }
                    ?>

        </header>
        <hr>
        <section class="col-12">
            <table id="proyecto" class="tabla-estilizada text-wrap" style="width:100%;">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Fecha de Inicio</th>
                        <?php
                        if ($_SESSION['nivel'] != 0) { // Mostrar "Opciones" si el nivel NO es 0
                        ?>
                        <th>Opciones</th>
                        <?php
                        }
                        ?>
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
            <h3 class="main-title">Asignar Proyecto</h3>
            <h3 id="asignacion"></h3>
        </header>
        <hr>
        <section>
            <div>
                <select name="" id="selectProyecto" class="form-control">
                    <option value="0">---</option>
                </select>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <input type="text" class="mt-4 form-control w-25" placeholder="Buscar"
                    onkeyup="filtroListaInscritos(event)" id="buscador" disabled>
            </div>
            <hr>
            <article class="container col-12 mt-2 inscritos row flex-wrap justify-content-start align-items-start"
                id="listaProyectos" style="max-height:600px; overflow-y:scroll;">
            </article>
        </section>
    </section>
    <?php
    } // ----------------------- CIERRE DEL HTML QUE VE EL USUARIO ---------------
    ?>
</main>

<?= getModal('modal_project') ?>

<?php footerAdmin($data) ?>