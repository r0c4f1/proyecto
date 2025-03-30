<?php headerAdmin($data);
sideBar(); ?>
<?php
$nivelUsuario = $_SESSION['nivel'];
?>
<script>
    // Definir la variable global nivelUsuario a partir del valor PHP
    var nivelUsuario = <?php echo $nivelUsuario; ?>;
</script>

<main class="main">
    <div class="header-wrap">
        <div class="header-title">

            <h2>Usuarios</h2>


        </div>
        <div class="user-info">


            <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
       
    </div>
   
    <section class="card-container">
        <article class="d-flex justify-content-between">
            <div>
                <label>
                    <h6>Usuario</h6>
                    <div class="text-center text-success"><i class="fas fa-user"></i></div>
                </label>
                <label>
                    <h6>Jefe</h6>
                    <div class="text-center text-info"><i class="fas fa-user-tie"></i></div>
                </label>
                <label>
                    <h6>Admin</h6>
                    <div class="text-center text-primary"><i class="fas fa-user-cog"></i></div>
                </label>
            </div>
            <div>
            <?php
            if ($_SESSION['nivel'] != 0) { // Mostrar "Opciones" si el nivel NO es 0
            ?> <button class="btn btn-primary" onclick="modalAddUserModal()">Agregar Usuario</button>
                <a href="<?= base_url() ?>/Units/units">
                    <button class="btn btn-secondary">Ver Unidades</button>
                </a>

            <?php
            }
            ?>
            <div class="d-flex justify-content-center mt-3">
    <div class="dropdown">
        <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          Gráfico de Discapacidades
        </button>
        <div class="dropdown-menu p-3" aria-labelledby="dropdownMenuButton" style="min-width: 350px;">
            <canvas id="barChart"></canvas>
        </div>
    </div>
</div></div>
        </article>
        <hr>
        <div class="col-11">
            <table id="usuarios" class="tabla-estilizada text-wrap">
                <thead>
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Teléfono</th>
                        <th>Nacimiento</th>
                        <th>Unidad</th>
                        <th>Sexo</th>
                        <th>Discapacidad</th>
                        <th>Nivel</th>
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
    </div>
</main>

<?= getModal('modal_users') ?>

<script src="<?= media() ?>/js/jquery-1.8.0.js"></script>
<?php footerAdmin($data) ?>