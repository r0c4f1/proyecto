<div class="sidebar">
    <div class="logo">
        <div class="img-l d-flex justify-content-center align-items-center">
            <a href="<?= base_url() ?>">
                <img src="<?= media() ?>/images/1630588198601.png" alt="logo" />
            </a>
        </div>

        <ul class="menu">

            <li class="active">
                <a href="<?= base_url() ?>">
                    <i class="fa-solid fa-chart-pie" style="color: #000; font-size: 20px; margin-left:5px;"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <?php
            if($_SESSION["nivel"] == 0){ //PERMISO SOLO SI ES USUARIO
            ?>
            <li>
                <a href="<?= base_url() ?>/TaskList/taskList">
                    <i class="fa-solid fa-book" style="color: #000; font-size: 20px; margin-left:5px;"></i>
                    <span>Asignaciones</span>
                </a>
            </li>
            <?php
            } // CIERRE DEL PERMISO SOLO SI ES USUARIO
            ?>
            <li>
                <a href="<?= base_url() ?>/Poa/poa">
                    <i class="fa-solid fa-chart-column" style="color: #000; font-size: 20px; margin-left:5px;"></i>
                    <span>Metas</span>
                </a>
            <li>
                <a href="<?= base_url() ?>/Project/project">
                    <i class="fa-solid fa-list-check" style="color: #000; font-size: 20px; margin-left:5px;"></i>
                    <span>Proyectos</span>
                </a>
            </li>
            <li>
                <a href="<?= base_url() ?>/Teams/teams">

                    <i class="fa-solid fa-people-group" style="color: #000; font-size: 20px; margin-left:5px;"></i>
                    <span>Equipos</span>
                </a>
            </li>
            <li>
                <a href="<?= base_url() ?>/Incidents/incidents">
                    <i class="fa-solid fa-wrench" style="color: #000; font-size: 20px; margin-left:3px;"></i>
                    <span>Incidencias</span>
                </a>
            </li>
            <?php
            if($_SESSION["nivel"] == 1 || $_SESSION["nivel"] == 2){ //PERMISO SOLO SI ES JEFE O ADMIN
            ?>
            <li>
                <a href="<?= base_url() ?>/Assignments/assignments">
                    <i class="fa-solid fa-thumbtack" style="color: #000; font-size: 20px; margin-left:5px;"></i>
                    <span>Asignaciones</span>
                </a>
            </li>
            <?php
            } // CIERRE DEL PERMISO SOLO SI ES JEFE O ADMIN
            ?>
            <li>
                <a href="<?= base_url() ?>/Information/information">
                    <i class="fa-regular fa-file-lines" style="color: #000; font-size: 20px; margin-left:5px;"></i>
                    <span>Informes</span>
                </a>
            </li>
            </li>
            <li>
                <a href="<?= base_url() ?>/Training/training">
                    <i class="fa-solid fa-arrow-trend-up" style="color: #000; font-size: 18px; margin-left:3px;"></i>
                    <span>Capacitación</span>
                </a>
            </li>
            <li>
                <a href="<?= base_url() ?>/Users/users">
                    <i class="fa-regular fa-user" style="color: #000; font-size: 20px; margin-left:5px;"></i>
                    <span>Usuarios</span>
                </a>
            </li>
            <li>
                <a href="<?= base_url() ?>/Resources/resources">
                    <i class="fa-solid fa-boxes-stacked" style="color: #000; font-size: 20px; margin-left:5px;"></i>
                    <span>Recursos</span>
                </a>
            </li>
            <?php if ($_SESSION['nivel'] == 2) { ?>
            <li>
                <a href="<?= base_url() ?>/Settings/settings">
                    <i class="fa-solid fa-sliders" style="color: #000; font-size: 20px; margin-left:5px;"></i>
                    <span>Ajustes</span>
                </a>
            </li>
            <?php } ?>
            <li>
                <a href="<?= media() ?>/manual/MANUAL DE USUARIO.PDF" target="_blank">
                    <i class="fas fa-circle-question text-secondary" style="font-size: 18px; margin-left:5px;"></i>
                    <span>Ayuda</span>
                </a>
            </li>
            <li class="logout">
                <a href="<?= base_url() ?>/Logout">
                    <i class="fa-solid fa-arrow-right-from-bracket"
                        style="color: #000; font-size: 20px; margin-left:5px;"></i>
                    <span>Cerrar</span>
                </a>
            </li>


        </ul>
    </div>
</div>