<ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="<?= base_url() ?>">
                <i class="fas fa-house"></i>
                Inicio
              </a>
            </li>
</ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Registros</span>
            <a class="link-secondary" href="#" aria-label="Add a new report">
              <svg class="bi"><use xlink:href="#plus-circle"/></svg>
            </a>
          </h6>
<ul class="nav flex-column mb-auto">
             <!-- 
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="<?= base_url() ?>/Usuario/registroUsuario">
              <i class="fa-solid fa-user"></i>
                Registro de Usuario
              </a>
            </li>-->
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="<?= base_url() ?>/Atleta/registroAtleta">
              <i class="fa-solid fa-person-running"></i>
                Registro de Atleta
              </a>
            </li>
            <!-- 
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="<?= base_url() ?>/Evento/registroEvento">
              <i class="fa-solid fa-calendar-days"></i>
                Registro de Evento
              </a>
            </li>-->
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="<?= base_url() ?>/Disciplina/registroDisciplina">
              <i class="fa-solid fa-dumbbell"></i>
                Registro de Disciplina
              </a>
            </li>
    </ul>
    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Consultas</span>
            <a class="link-secondary" href="#" aria-label="Add a new report">
              <svg class="bi"><use xlink:href="#plus-circle"/></svg>
            </a>
          </h6>
          <ul class="nav flex-column mb-auto">
  <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="<?= base_url() ?>/Atleta/verAtletas">
			  	<i class="fa-solid fa-list"></i>
                Ver Atletas
              </a>
              <a class="nav-link d-flex align-items-center gap-2" href="<?= base_url() ?>/Disciplina/verDisciplinas">
			  	<i class="fa-solid fa-list"></i>
                Ver Disciplinas
              </a>
            </li>
    </ul>
         

          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Reportes</span>
            <a class="link-secondary" href="#" aria-label="Add a new report">
              <svg class="bi"><use xlink:href="#plus-circle"/></svg>
            </a>
          </h6>

          <ul class="nav flex-column mb-auto">
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="<?= base_url() ?>/Atleta/generarReportes">
                <i class="fa-solid fa-file-lines"></i>
                Generar Reportes
              </a>
            </li>
          </ul>

          <hr class="my-3">

          <ul class="nav flex-column mb-auto">
            <!-- 
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="#">
              <i class="fa-solid fa-gear"></i>
                Configurar
              </a>
            </li>-->
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center gap-2" href="<?= base_url() ?>/Logout">
              <i class="fa-solid fa-right-from-bracket"></i>
                Salir
              </a>
            </li>
            <center>
              <img src="<?= media() ?>/images/logo.gif" alt="UPTOS" width="70%">
            </center>
</ul>