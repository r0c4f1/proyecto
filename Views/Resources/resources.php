<?php headerAdmin($data);
sideBar(); ?>

<main class="main">
<div class="header-wrap">
        <div class="header-title">
            
            <h2>Recursos</h2>

<span>Recursos OTIC </span>

        </div>
        <div class="user-info">

           
            <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
    </div>
    <section class="card-container">
    <article class="d-flex justify-content-between">
       
    
    <h3 class="main-title">Lista de Recursos</h3>
                <div class="d-flex justify-content-between">
                <button class="btn btn-primary" onclick="modalAddResourceModal()">Agregar Recurso</button>
                
                
    <div class="dropdown ms-2 ">
        <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
         Recursos Reciclados <i class="fas fa-recycle"></i>
        </button>
        <div class="dropdown-menu p-3" aria-labelledby="dropdownMenuButton" style="min-width: 350px;">
        <header class="bg-success text-white text-center p-2 rounded">
            <h5 class="m-0">Añadir Recurso Reciclado</h5>
        </header>
            <form id="addRecycledResource" class="ps-4 mt-2">
            <label class="col-10">
                Nombre del Recurso
            <select name="recursoReciclado" id="recursoReciclado" class="form-select"></select>
            </label>
            <label class="col-6">
                            Cantidad
                            <input id="cantidad" type="text" name="cantidad" class="form-control">
                        </label>
                       
                        <button type="submit" id="btnAddRecycledResourceSubmit" class="btn btn-primary ms-4">Agregar</button>
                        <button type="button" class="btn btn-danger" onclick="reporteRecursosReciclaje()"><i class="fas fa-file-pdf fa-2x"></i></button>
                    </form>
        </div>
            </div>
            <div class="dropdown ms-2 ">
    <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
         Estadística <i class="fas fa-recycle"></i>
        </button>
        <div class="dropdown-menu p-3" aria-labelledby="dropdownMenuButton" style="min-width: 350px;">
        <button id="prevBtn">Anterior</button>
        <button id="nextBtn">Siguiente</button>
    <div style="width: 700px; margin: auto;">
  <canvas id="myChart"></canvas>
</div></div></div>
        </div>
        </article>
                <hr>
              
                
               
            
                <div class="col-8">
        <table id="recursos" class="tabla-estilizada text-wrap" style="width:100%;">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Disponible</th>
                    <th>Opciones</th>
                </tr>
            </thead>
        </table>
        </div>

    </section>

</main>

<?= getModal('modal_resources') ?>

<?php footerAdmin($data) ?>