<div class="modal fade" id="addIncidentAssignment" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAddIncidentAssignment">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5 pl-5" id="exampleModalLabel">Asignar Incidencia</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="id_equipo">
                    <div class="row p-3">
                        <label class="col-12 mb-3 text-primary">
                            Fecha Asignación
                            <input type="date" name="fecha_asignacion" id="fecha_asignacion" class="form-control"
                                required>
                        </label>

                        <label class="col-12 mb-3 text-primary">
                            Estado
                            <input type="text" name="estado" id="estado" value="Pendiente" placeholder="Pendiente"
                                class="form-control" readonly required>
                        </label>

                        <div id="container" class="input-group mt-2">
                            <label for="recurso" class="col-6">
                                Recurso
                                <select id="recurso" name="recurso1" class="form-select">
                                    <option value="">---</option>
                                </select>
                            </label>
                            <div class="col-5 ms-2">
                                <label>
                                    Cantidad
                                    <input type="number" name="cantidad1" id="cantRecurso" class="form-control"
                                        disabled>
                                </label>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end mb-3">
                            <button type="button" class="btn btn-primary me-2" id="addButton">
                                <i class="fa fa-plus"></i> Añadir
                            </button>
                            <button type="button" class="btn btn-danger" id="removeButton">
                                <i class="fa fa-minus"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex aling-content-center justify-content-center">
                    <button type="button" class="btn btn-secondary" id="btnCloseAddIncidentAssignment"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-success" id="btnGuardarIncidentAssignment">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>


<div class="modal fade" id="addIncident" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAddIncident">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Incidencia</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <label for="estado" class="col-12 mb-4">Tipo De Incidencia:
                            <select class="form-select" id="tipoIncident" name="id_tipo">
                                <option value="0">---</option>
                            </select>
                        </label>
                        <label class="col-6 mb-4">
                            Categoria
                            <input type="text" name="categoria" id="categoria" class="form-control" value="" readonly>
                        </label>
                        <label class="col-6">
                            Fecha de Inicio
                            <input type="date" name="fecha_reporte" id="fecha_reporte" class="form-control">
                        </label>
                        <label class="col-12 mb-4">
                            Descripción
                            <div class="form-floating">
                                <textarea class="form-control" name="descripcion" style="height: 100px"></textarea>
                            </div>
                        </label>
                        <label class="col-6">
                            Reportado Por
                            <input type="number" name="reportado_por" class="form-control"
                                value="<?= $_SESSION['id_usuario'] ?>">
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCloseAddIncident"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-success">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>


<div class="modal fade" id="editIncident" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formEditIncident">
                <input type="hidden" name="id_incidencia">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Incidencia</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <label for="estado" class="col-12 mb-4">Tipo De Incidencia:
                            <select class="form-select" id="tipoIncidentEdit" name="id_tipo">
                                <option value="0">---</option>
                            </select>
                        </label>
                        <label class="col-6 mb-4">
                            Categoria
                            <input type="text" name="categoria" id="categoriaEdit" class="form-control" value=""
                                readonly>
                        </label>
                        <label class="col-6">
                            Fecha de Inicio
                            <input type="date" name="fecha_reporte" id="fecha_reporte" class="form-control">
                        </label>
                        <label class="col-12 mb-4">
                            Descripción
                            <div class="form-floating">
                                <textarea class="form-control" name="descripcion" style="height: 100px"
                                    value="<? $_SESSION[" nombres"]?>"></textarea>
                            </div>
                        </label>
                        <label class="col-6">
                            Reportado Por
                            <input type="number" name="reportado_por" class="form-control" value="">
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCloseEditIncident"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-success">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>


<div class="modal fade" id="modalAsignados" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAsignados">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Información de la asignación</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <label class="col-12 mb-2">
                            Incidencia
                            <div class="form-floating">
                                <textarea class="form-control" style="height: 100px" disabled></textarea>
                            </div>
                        </label>
                        <label class="col-6">
                            Fecha de asignación
                            <input type="date" class="form-control" disabled>
                        </label>
                        <label class="col-6 mb-2">
                            Estado
                            <input type="text" class="form-control" disabled>
                        </label>
                        <label class="col-12 mb-2">
                            Nombre del equipo
                            <input type="text" class="form-control" disabled>
                        </label>
                        <label class="col-12 mb-2">
                            Nombre del recurso
                            <input type="text" class="form-control" disabled>
                        </label>
                        <label class="col-12 mb-2">
                            Cantidad del recurso usado en la incidencia
                            <input type="text" class="form-control" disabled>
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCloseEditIncident"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-success">Finalizar asignación</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal -->

<div class="modal fade" id="modalViewUser" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Usuarios del equipo</h1>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column" style="min-height: 300px;">
                <!-- Asegura una altura mínima -->
                <div id="listaUsuarios" class="row"></div> <!-- Contenedor para las tarjetas -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>