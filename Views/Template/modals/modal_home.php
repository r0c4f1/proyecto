<!-- MODAL INDICADOR GÉNERO PERSONAL -->
<div class="modal fade" id="modalIndicadorGeneroPersonal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content modal-lg">
            <form id="formRegisterUserTraining">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="titleModalGender"></h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-center border-bottom border-primary p-1 mb-3">
                        <h3 class="col-4 fs-6 text-center fw-bold">Cargo <i class="fa-solid fa-user-tie"
                                style="font-size: 16px;"></i></h3>
                        <h3 class="col-4 fs-6 text-center fw-bold">Mujeres <i class="fa fa-venus text-danger"
                                style="font-size: 16px;"></i></h3>
                        <h3 class="col-4 fs-6 text-center fw-bold">Hombres <i class="fa fa-mars text-primary"
                                style="font-size: 16px;"></i></h3>
                    </div>
                    <div id="filaIndicadorGeneroPersonal"></div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-danger" onclick="reporteIndicadorEmpleadosCargoGenero()"><i
                            class="fas fa-file-pdf fa-2x"></i></button>
                    <button type="button" class="btn btn-secondary" id="btnCloseModalDddUserTraining"
                        data-bs-dismiss="modal">Cerrar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- MODAL INDICADOR PROYECTO -->
<div class="modal fade" id="modalIndicadorProyecto" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formRegisterUserTraining">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="titleModalProject"></h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex border-bottom border-primary p-1 mb-3 text-center">
                        <h3 class="col-4 fs-6"><i class="fas fa-briefcase" style="font-size: 24px;"></i></h3>
                        <h3 class="col-4 fs-6">Estado</h3>
                        <h3 class="col-4 fs-6">Asignado a</h3>
                    </div>
                    <div id="filaIndicadorProyecto"></div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-danger" onclick="reporteIndicadorEquiposProyectos()"><i
                            class="fas fa-file-pdf fa-2x"></i></button>
                    <button type="button" class="btn btn-secondary" id="btnCloseModalProject"
                        data-bs-dismiss="modal">Cerrar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- MODAL INCIDENCIAS DE CADA MES POR EQUIPO -->
<div class="modal fade" id="modalIndicadorIncidenciasPorEquipo" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formRegisterUserTraining">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="titleModalIncidenciasPorEquipo"></h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex border-bottom border-primary p-1 mb-3">
                        <h3 class="col-3 fs-6 text-center">Mes <i class="fa-regular fa-calendar"
                                style="font-size: 16px;"></i></h3>
                        <h3 class="col-3 fs-6 text-danger text-center">Pendientes</h3>
                        <h3 class="col-3 fs-6 text-primary text-center">En Proceso</h3>
                        <h3 class="col-3 fs-6 text-success text-center">Finalizadas</h3>
                    </div>
                    <div class="d-flex">
                        <ul class="col-3">
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(1, 'Enero')">Enero</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(2, 'Febrero')">Febrero</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(3, 'Marzo')">Marzo</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(4, 'Abril')">Abril</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(5, 'Mayo')">Mayo</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(6, 'Junio')">Junio</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(7, 'Julio')">Julio</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(8, 'Agosto')">Agosto</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(9, 'Septiembre')">Septiembre</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(10, 'Octubre')">Octubre</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(11, 'Noviembre')">Noviembre</li>
                            <li class="list-group-item fw-bold cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(12, 'Diciembre')">Diciembre</li>
                        </ul>
                        <ul id="listaPendientes" class="col-3 text-danger text-center">
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold"></li>
                        </ul>
                        <ul id="listaEnProceso" class="col-3 text-primary text-center">
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold"></li>
                        </ul>
                        <ul id="listaFinalizados" class="col-3 text-success text-center">
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold"></li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-danger" onclick="reporteIndicadorIncidenciasPorMesEquipo()"><i
                            class="fas fa-file-pdf fa-2x"></i></button>
                    <button type="button" class="btn btn-secondary" id="btnCloseModalProject"
                        data-bs-dismiss="modal">Cerrar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- MODAL INCIDENCIAS DE CADA MES TOTALES -->

<div class="modal fade" id="modalIndicadorIncidenciasPorMes" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formRegisterUserTraining">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="titleModalIncidenciasPorMes"></h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class=" d-flex border-bottom border-primary p-1 mb-3">
                        <h3 class="col-3 fs-6 text-center">Mes <i class="fa-regular fa-calendar"
                                style="font-size: 16px;"></i></h3>
                        <h3 class="col-3 fs-6 text-danger text-center">Pendientes</h3>
                        <h3 class="col-3 fs-6 text-primary text-center">En Proceso</h3>
                        <h3 class="col-3 fs-6 text-success text-center">Finalizadas</h3>

                    </div>

                    <div class="d-flex">

                        <ul class="col-3">
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(1, 'Enero')">Enero</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(2, 'Febrero')">Febrero</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(3, 'Marzo')">Marzo</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(4, 'Abril')">Abril</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(5, 'Mayo')">Mayo</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(6, 'Junio')">Junio</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(7, 'Julio')">Julio</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(8, 'Agosto')">Agosto</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(9, 'Septiembre')">Septiembre</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(10, 'Octubre')">Octubre</li>
                            <li class="list-group-item fw-bold mb-2 cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(11, 'Noviembre')">Noviembre</li>
                            <li class="list-group-item fw-bold cursor-pointer" style="cursor:pointer;"
                                onclick="getMonthIncident(12, 'Diciembre')">Diciembre</li>
                        </ul>

                        <ul id="listaPendientesTotal" class="col-3 text-danger text-center ">
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold"></li>

                        </ul>
                        <ul id="listaEnProcesoTotal" class="col-3 text-primary text-center">
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold"></li>
                        </ul>
                        <ul id="listaFinalizadosTotal" class="col-3 text-success text-center ">

                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold mb-2"></li>
                            <li class="list-group-item fw-bold"></li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-danger" onclick="reporteIndicadorIncidenciasPorMes()">
                        <i class="fas fa-file-pdf fa-2x"></i>
                    </button>
                    <button type="button" class="btn btn-secondary" id="btnCloseModalIncidenciasPorMes"
                        data-bs-dismiss="modal">Cerrar</button>

                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="modalIndicadorTarea" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formRegisterUserTraining">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="titleModalIncidenciasPorEquipo"></h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class=" d-flex border-bottom border-primary p-1 mb-3">
                        <h3 class="col-3 fs-6"><i class="fa-brands fa-teamspeak" style="font-size: 24px;"></i></h3>
                        <h3 class="col-3 fs-6 text-danger">Pendientes</h3>
                        <h3 class="col-3 fs-6 text-primary">En Proceso</h3>
                        <h3 class="col-3 fs-6 text-success">Finalizadas</h3>

                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-secondary" id="btnCloseModalProject"
                        data-bs-dismiss="modal">Cerrar</button>

                </div>
            </form>
        </div>
    </div>
</div>
<!---- MODAL CAPACITACIONES --->

<div class="modal fade" id="modalIndicadorCapacitaciones" tabindex="-1" aria-labelledby="myModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h1 class="modal-title fs-5">Participación por capacitación</h1>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div id="modalContent" style="min-height: 350px"></div>
            </div>
            <div class="modal-footer d-flex justify-content-between">
                <button type="button" class="btn btn-danger" target="_blank"
                    onclick="reporteIndicadorPorcentajePorCapacitacion()">
                    <i class="fas fa-file-pdf fa-2x"></i>
                </button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>


<!-- modal detalle incidencias por mes  -->

<div class="modal fade" id="modalDetalleIncidencia" tabindex="-1" aria-labelledby="modalDetalleIncidenciaLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="modalDetalleIncidenciaLabel">Detalle de Incidencias - <span
                        id="mesSeleccionado"></span></h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ul class="nav nav-tabs" id="incidenciasTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pendientes-tab" data-bs-toggle="tab"
                            data-bs-target="#pendientes" type="button" role="tab" aria-controls="pendientes"
                            aria-selected="true">Pendientes <span class="badge bg-danger"
                                id="countPendiente"></span></button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="proceso-tab" data-bs-toggle="tab" data-bs-target="#proceso"
                            type="button" role="tab" aria-controls="proceso" aria-selected="false">En Proceso <span
                                class="badge bg-primary" id="countEnProceso"></span></button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="finalizadas-tab" data-bs-toggle="tab" data-bs-target="#finalizadas"
                            type="button" role="tab" aria-controls="finalizadas" aria-selected="false">Finalizadas <span
                                class="badge bg-success" id="countFinalizado">0</span></button>
                    </li>
                </ul>
                <div class="tab-content pt-3" id="incidenciasTabContent">
                    <!-- Contenido de Pendientes -->
                    <div class="tab-pane fade show active" id="pendientes" role="tabpanel"
                        aria-labelledby="pendientes-tab">
                        <div class="table-responsive overflow-hidden">
                            <table class="table table-striped table-hover w-100" id="tablePendientes">
                                <thead>
                                    <tr>
                                        <th width="15%">Reportado por</th>
                                        <th width="20%">Fecha reporte</th>
                                        <th width="20%">Fecha asignacion</th>
                                        <th width="25%">Descripcion</th>
                                        <th>Equipo asignado</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Contenido de En Proceso -->
                    <div class="tab-pane fade" id="proceso" role="tabpanel" aria-labelledby="proceso-tab">
                        <div class="table-responsive overflow-hidden">
                            <table class="table table-striped table-hover w-100" id="tableEnProceso">
                                <thead>
                                    <tr>
                                        <th width="15%">Reportado por</th>
                                        <th>Fecha reporte</th>
                                        <th>Fecha asignacion</th>
                                        <th>Fecha inicio</th>
                                        <th>Descripcion</th>
                                        <th>Equipo asignado</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Contenido de Finalizadas -->
                    <div class="tab-pane fade" id="finalizadas" role="tabpanel" aria-labelledby="finalizadas-tab">
                        <div class="table-responsive overflow-hidden">
                            <table class="table table-striped table-hover w-100" id="tableFinalizadas">
                                <thead>
                                    <tr>
                                        <th width="15%">Reportado por</th>
                                        <th>Fecha reporte</th>
                                        <th>Fecha asignacion</th>
                                        <th>Fecha inicio</th>
                                        <th>Fecha solucion</th>
                                        <th>Descripcion</th>
                                        <th>Equipo asignado</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>