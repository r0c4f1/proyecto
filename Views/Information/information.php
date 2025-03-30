<?php headerAdmin($data);
sideBar();

?>
<div class="main">
    <div class="header-wrap">
        <div class="header-title">

            <h2>Informes</h2>



        </div>
        <div class="user-info">

            <div class="username">
                <h5><?= $_SESSION['nameUser'] ?></h5>
            </div>
        </div>
    </div>
    <div class="card-container">
        <h3 class="main-title">Generar informe</h3>
        <div class="container mt-5">
            <div class="card">
                <div class="card-header">
                    <h4><i class="fas fa-file-pdf fa-2x text-danger"></i> Generador de Reportes PDF</i></h4>
                </div>
                <div class="card-body">
                    <form id="formulario">


                        <!-- Filtro de Sexo -->
                        <div class="mb-3">

                            <label for="tipo" class="form-label fw-bold">Seleccionar Reporte</label>
                            <select class="form-select" id="tipo" name="tipo">
                                <option value="">---</option>
                                <option value="historico">Histórico de Operaciones</option>
                                <option value="incidencia">Incidencia</option>
                                <option value="metas">Metas</option>
                                <option value="proyecto">Proyecto</option>
                                <option value="recursos">Recursos</option>
                                <option value="usuarios">Usuarios</option>

                            </select>
                        </div>

                        <!--Recurso-->
                        <div class="row mb-3 row-recurso visually-hidden">

                            <div class="col-md-6">
                                <label for="estado" class="form-label fw-bold">Recursos asignados a</label>
                                <select name="estado" id="opcion" class="form-control">
                                    <option value="x">---</option>
                                    <option value="0">Proyecto</option>
                                    <option value="1">Incidencias</option>
                                    
                                 

                                </select>
                            </div>
                        </div>
                        <!-- histórico-->
                        <div class="row mb-3 row-historico visually-hidden">

                            <div class="col-md-6">
                                <label for="estado" class="form-label fw-bold">Estado</label>
                                <select name="estado" id="estado" class="form-control">
                                    <option value="x">---</option>
                                    <option value="0">Fallido</option>
                                    <option value="1">Exitoso</option>

                                </select>
                            </div>
                        </div>
                        <!-- proyectos-->
                        <div class="row mb-3 row-proyecto visually-hidden">

                            <div class="col-md-6">
                                <label for="estadoP" class="form-label fw-bold">Estado</label>
                                <select name="estado" id="estadoP" class="form-control">
                                    <option value="x">---</option>
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="En Proceso">En Proceso</option>
                                    <option value="Finalizado">Finalizado</option>
                                </select>
                            </div>
                        </div>
                        <!-- Fechas -->
                        <div class="row mb-3 row-general">
                            <div class="col-md-6">
                                <label for="fechaInicio" class="form-label fw-bold">Fecha Inicio (Desde)</label>
                                <input type="date" class="form-control" id="fechaInicio" name="fechaInicio">
                            </div>
                            <div class="col-md-6">
                                <label for="fechaFin" class="form-label fw-bold">Fecha Fin (Hasta)</label>
                                <input type="date" class="form-control" id="fechaFin" name="fechaFin">
                            </div>
                        </div>

                        <!-- Filtro Usuario -->


                        <div class="row mb-3 row-user visually-hidden">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="nacimiento" class="form-label fw-bold">Año de Nacimiento</label>
                                    <input type="number" class="form-control" id="nacimiento" name="nacimiento" placeholder="1900" min="1900" max="2100">

                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="sexo" class="form-label fw-bold">Sexo</label>
                                    <select class="form-select" id="sexo" name="sexo">
                                        <option value="x">---</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Botón Generar -->
                        <button type="submit" class="btn btn-primary" id="btnGenerar">
                            <i class="bi bi-file-pdf"></i> Generar PDF
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>


</div>

<div>
</div>
</div>


<?php footerAdmin($data) ?>