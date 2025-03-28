<?php headerAdmin($data);
sideBar();
$fecha = new DateTime();
?>
<main class="main">
    <div class="header-wrap">
        <div class="header-title">

            <h2>Ajustes</h2>
            <span><?php echo $fecha->format('d/m/Y'); ?></span>



        </div>
        <div class="user-info">


            <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
    </div>
    
    <!--================================= HISTORICO DE OPERACIONES ===========================-->
    <section class="card-container col-12">
        <header class="d-flex">
            <h3 class="main-title"><i class="fas fa-history fa-2x"></i>
                 HISTORICO DE OPERACIONES</h3>
                <div>
            </header>
            <hr>
            <section class="col-10">
            <table id="historico" class="tabla-estilizada text-wrap" style="width:100%;">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>Tipo Operacion</th>
                        <th class="col-5">Descripcion</th>
                        <th>Estado</th>
                    </tr>
                </thead>
            </table>
        </section>
    </section>
    <!--================================= HISTORICO DE OPERACIONES CIERRE ===========================-->
    
    <div class="d-flex justify-content-between">


    <section class="card-container col-6">

        <h3 class="main-title"><i class="fas fa-eye fa-2x"></i>
        Visibilidad de los indicadores</h3>

        <div class="card w-100">
            <div class="card-header">
                Indicadores
            </div>
            <div class="card-body">
                <div class="col">
                    <select class="form-select w-75" name="" id="indicadores">
                    </select>
                    <button class="btn btn-success" id="btnInsertar">Insertar</button>
                </div>


                <div class="mt-4">
                    <select class="form-select w-75" name="" id="desactivarIndicador">
                    </select>
                    <button class="btn btn-outline-danger" id="btnDesactivar">Eliminar</button>
                </div>
            </div>
        </div>
    </section>
    <section class="card-container col-6  mx-2">

        <h3 class="main-title"><i class="fas fa-paragraph fa-2x"></i>


        Subir imagen para cintillo del PDF</h3>

        <div class="card w-100">
            <div class="card-header">
              <div><i class="fas fa-image"></i> Subir imagen (.jpg ó .jpeg)</div>

            </div>
            <div class="card-body">
            <div class="upload-container">
        <input class="form-control border rounded w-100" type="file" id="fileInput" accept=".jpg,image/jpeg">
        <button class="btn btn-primary" id="uploadButton"><i class="fas fa-upload"></i> Subir Imagen</button>
    </div>
            </div>
        </div>
    </section>
    </div>
    <div class="d-flex justify-content-between">
    <section class="card-container col-6">

        <h3 class="main-title"><i class="fas fa-pen-fancy fa-2x"></i>
         Subir imagen para sello universitario</h3>

        <div class="card w-100">
            <div class="card-header">
              <div><i class="fas fa-image"></i> Subir imagen (.jpg, .jpeg, .png)</div>

            </div>
            <div class="card-body">
            <div class="upload-container">
        <input class="form-control border rounded w-100" type="file" id="fileInput2" accept=".jpg,image/jpeg,.png,image/png">
        <button class="btn btn-primary" id="uploadButtonSeal"><i class="fas fa-upload"></i> Subir Imagen</button>
    </div>
            </div>
        </div>
    </section>
    
    <section class="card-container col-6 mx-2">

        <h3 class="main-title"><i class="fas fa-stamp fa-2x"></i>
        Subir imagen firma para PDF</h3>

        <div class="card w-100">
            <div class="card-header">
              <div><i class="fas fa-image"></i> Subir imagen (.jpg, .jpeg, .png)</div>

            </div>
            <div class="card-body">
            <div class="upload-container">
        <input class="form-control border rounded w-100" type="file" id="fileInput3" accept=".jpg,image/jpeg,.png,image/png">
        <button class="btn btn-primary" id="uploadButtonFirm"><i class="fas fa-upload"></i> Subir Imagen</button>
    </div>
            </div>
        </div>
    </section></div>
    </div>
    
</main>

<?= getModal('modal_settings') ?>

<?php footerAdmin($data) ?>