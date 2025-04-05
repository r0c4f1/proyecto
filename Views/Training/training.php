<?php headerAdmin($data);
sideBar();
$nivelUsuario = $_SESSION['nivel'];
$currentUserId = $_SESSION['id_usuario'];
?>
<script>
// Definir la variable global nivelUsuario a partir del valor PHP
var nivelUsuario = <?php echo $nivelUsuario; ?>;
var currentUserId = <?php echo $currentUserId; ?>;
</script>
<main class="main">

    <div class="header-wrap">
        <div class="header-title">
            <h2>Capacitaciones</h2>
            <span>Formación para el Personal</span>
        </div>
        <div class="user-info">

            <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
    </div>
    <section class="card-container">

        <header class="d-flex justify-content-between">
            <h3 class="main-title">Lista de Cursos</h3>
            <?php
            if ($_SESSION['nivel'] != 0) { // Mostrar "Opciones" si el nivel NO es 0
            ?><button class="btn btn-primary" onclick="modalAddTraining()"
                style="<?php echo $nivelUsuario == 0 ? 'display:none;' : ''; ?>">Agregar Capacitación</button> <?php
                                                                                                            }
                                                                                                                ?>
        </header>
        <hr>
        <section class="col-12">
            <table id="capacitaciones" class="tabla-estilizada text-wrap" style="width:100%;">
                <thead>
                    <tr>
                        <th>Tema</th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Duración</th>
                        <th style="<?php echo $nivelUsuario == 0 ? 'display:none;' : ''; ?>">Opciones</th>

                    </tr>
                </thead>
            </table>
        </section>


    </section>

    <section class="card-container">

        <header>
            <h3 class="main-title">Inscribir Usuarios</h3>
            <h3 id="temaInscritos"></h3>
        </header>
        <hr>

        <section>
            <div>
                <select name="" id="selectCapacitacion" class="form-control">
                    <option value="0">---</option>
                </select>
            </div>

            <div class="d-flex justify-content-between align-items-center flex-wrap">
                <!-- Campo de Búsqueda -->
                <div class="col-5 d-flex justify-content-between">
                    <input type="text" class="mt-4 form-control w-50" placeholder="Buscar"
                        onkeyup="filtroListaInscritos(event)" id="buscador" disabled>

                    <button class="btn btn-primary mt-4" onclick="modalAddUserTraining()" disabled id="btnInscribirse">
                        Inscribir Usuario
                    </button>
                </div>



                <div class="col-5 d-flex justify-content-between">


                    <button class="btn btn-primary mt-4" onclick="inscribirTodos()" disabled id="btnInscribirseTodos"
                        style="<?php echo $nivelUsuario == 0 ? 'display:none;' : ''; ?>">
                        Inscribir a Todos
                    </button>



                    <div class="dropdown mt-4" style="<?php echo $nivelUsuario == 0 ? 'display:none;' : ''; ?>">
                        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-bs-toggle="dropdown" aria-expanded="false" disabled>
                            Inscripción por Unidad
                        </button>
                        <div class="dropdown-menu p-3" aria-labelledby="dropdownMenuButton" style="min-width: 350px;">
                            <!-- Formulario de Inscripción por Unidad-->

                            <form id="formTipoInscripcion">
                                <label class="col">
                                    Inscripción por unidad
                                    <select name="unidad" id="selectUnit" class="w-100 form-select" disabled>
                                        <option value="">---</option>
                                    </select>
                                </label>
                                <button id="btnSubmit" type="submit" class="btn btn-primary" disabled>
                                    Inscribir
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
            <hr>
            <article class="container col-12 mt-2 inscritos row flex-wrap justify-content-start align-items-start"
                id="listaInscritos" style="max-height:600px; overflow-y:scroll;">
            </article>

        </section>

    </section>

</main>

<?= getModal('modal_training') ?>

<?php footerAdmin($data) ?>