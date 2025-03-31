<!-- modal agregar proyecto -->

<div class="modal fade" id="addProjectModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAddProject" onsubmit="addProject(event)">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Proyecto</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <label class="col-12 mb-4">
                            Título
                            <input type="text" name="nombre" class="form-control" placeholder="Título" maxlength="255">
                        </label>

                        <label class="col-12 mb-4">
                            Descripción
                            <div class="form-floating">
                                <textarea class="form-control" name="descripcion" style="height: 100px"></textarea>
                            </div>
                        </label>

                        <label class="col-6">
                            Fecha de Inicio
                            <input type="date" name="fecha_inicio" class="form-control">
                        </label>


                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCloseAddProjectmodal"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary">Agregar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- modal editar proyecto -->

<div class="modal fade" id="modalEditProject" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formEditProject">
                <input type="hidden" id="idProyecto" name="id_proyecto">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <label class="col-12 mb-4">
                            Título
                            <input id="nombre" type="text" name="nombre" class="form-control" placeholder="Título"
                                maxlength="255">
                        </label>

                        <label class="col-12 mb-4">
                            Descripción
                            <div class="form-floating">
                                <textarea class="form-control" name="descripcion" style="height: 100px"
                                    maxlength="10"></textarea>
                            </div>
                        </label>

                        <label class="col-6">
                            Fecha de Inicio
                            <input type="date" name="fecha_inicio" class="form-control">
                        </label>

                        <label class="col-12 mb-4">
                            Motivo Actualizacion
                            <div class="form-floating">
                                <textarea class="form-control" name="motivo" style="height: 100px"></textarea>
                            </div>
                        </label>

                    </div>



                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCloseEditProjectmodal"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary" onclick="updateProject(event)">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</div>


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


<div class="modal fade" id="addIncidentAssignment" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAddIncidentAssignment">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5 pl-5" id="exampleModalLabel">Asignar proyecto</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="id_equipo">
                    <div class="row p-3">
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
                                    <input type="number" name="cantidad1" id="cantRecurso1" min="1" max="1000"
                                        class="form-control" placeholder="10">
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
                    <button type="submit" class="btn btn-primary" id="btnAddProjectAssignment">Asignar</button>
                </div>
            </form>
        </div>
    </div>
</div>