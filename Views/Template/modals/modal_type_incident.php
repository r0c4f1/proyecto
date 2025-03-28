<!-- modal agregar proyecto -->

<div class="modal fade" id="addTypeIncident" tabindex="-1" aria-labelledby="addTypeIncident" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAddTypeIncident" onsubmit="addTypeIncident(event)">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Tipo</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <label class="col-12">
                            Nombre
                            <input type="text" name="nombre_tipo" class="form-control" placeholder="Nombre" maxlength="40">
                        </label>
                        <label class="col-6 mb-4">
                            Categoría
                            <select class="form-select" name="categoria" id="" required>
                                <option value="">---</option>
                                <option value="Software">Software</option>
                                <option value="Hardware">Hardware</option>
                            </select>
                        </label>
                        <label class="col-6 mb-4">
                            Subtipo
                            <select class="form-select" name="subtipo" id="" required>
                                <option value="">---</option>
                                <option value="0">Mantenimiento</option>
                                <option value="1">Incidencia</option>
                            </select>
                        </label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="btnCloseAddTypeIncident"
                            data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary">Agregar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- modal editar tipo incidencia-->

<div class="modal fade" id="modalEditTypeIncident" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formEditTypeIncident">
                <input type="hidden" id="id_type" name="id_tipo">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <label class="col-12 mb-4">
                            Nombre
                            <input id="nombre_tipo" type="text" name="nombre_tipo" class="form-control"
                                placeholder="Descripción" maxlength="40">
                        </label>
                        <label class="col-6 mb-4">
                            Categoría
                            <select class="form-select" name="categoria" id="selectCategory" required>
                                <option value="">---</option>
                                <option value="Software">Software</option>
                                <option value="Hardware">Hardware</option>
                            </select>
                        </label>
                        <label class="col-6 mb-4">
                            Subtipo
                            <select class="form-select" name="subtipo" id="selectSubtipo" required>
                                <option value="">---</option>
                                <option value="0">Mantenimiento</option>
                                <option value="1">Incidencia</option>
                            </select>
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
                    <button type="button" class="btn btn-secondary" id="btnCloseEditTypeIncident"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary"
                        onclick="updateTypeIncident(event)">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</div>