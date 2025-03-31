<!-- modal agregar metas -->

<div class="modal fade" id="addGoals" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAddGoals">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Generar Meta</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <label class="col-12 mb-4">
                            Meta
                            <select name="meta" id="selectUnidad" class="form-select">
                                <option value="">---</option>
                            </select>
                        </label>

                        <label class="col-6 mb-4">
                            Cantidad Objetivo
                            <input type="text" name="cantidad_objetivo" class="form-control"
                                placeholder="Cantidad Objetivo" maxlength="4">
                        </label>

                        <label class="col-6">
                            Fecha Limite
                            <input type="date" name="fecha_limite" class="form-control" id="fecha_limite">
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCloseModalAddGoals"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary">Agregar</button>
                </div>
            </form>
        </div>
    </div>
</div>