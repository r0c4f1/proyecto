<!-- modal agregar computadora -->

<div class="modal fade" id="addComputer" tabindex="-1" aria-labelledby="addComputer" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAddComputer" onsubmit="addComputer(event)">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Registrar Computadora</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <label class="col-12">
                            Código
                            <input type="text" name="codigo" class="form-control" placeholder="Código (D-01)" maxlength="50" require>
                        </label>
                        <label class="col-12">
                            Modelo
                            <input type="text" name="modelo" class="form-control" placeholder="Especificar Modelo" maxlength="50" require>
                        </label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="btnCloseModalAddComputer"
                            data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary">Agregar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- modal editar computadora -->

<div class="modal fade" id="editComputer" tabindex="-1" aria-labelledby="addComputer" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formEditComputer" onsubmit="editComputer(event)">
                <input type="hidden" name="id_computadora">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Registro</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <label class="col-12">
                            Código
                            <input type="text" name="codigo" class="form-control" placeholder="Código" maxlength="50"  require>
                        </label>
                        <label class="col-12">
                            Modelo
                            <input type="text" name="modelo" class="form-control" placeholder="Especificar Modelo" maxlength="50" require>
                        </label>
                        
                        <label class="col-12 mb-4">
                            Motivo Actualizacion
                            <div class="form-floating">
                                <textarea class="form-control" name="motivo" style="height: 100px"></textarea>
                            </div>
                        </label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="btnCloseModalEditComputer"
                            data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary">Actualizar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>