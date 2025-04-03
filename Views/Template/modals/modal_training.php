<!-- modal inscribir a capacitacion -->

<div class="modal fade" id="addUserTraining" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formRegisterUserTraining">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Inscribirse</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body p-5">
                    <label class="w-100">
                        Cédula
                        <input type="number" name="id_usuario" class="form-control" placeholder="Cédula">
                    </label>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCloseModalDddUserTraining"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- modal agregar capacitacion -->

<div class="modal fade" id="addTraining" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAddTraining">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Inscribirse</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <label class="col-12 mb-4">
                            Tema
                            <input type="text" name="tema" class="form-control" placeholder="Tema" maxlength="50">
                        </label>

                        <label class="col-12 mb-4">
                            Tipo
                            <select name="tipo" class="form-select">
                                <option value="">---</option>
                                <option value="0">Desarrollo Personal</option>
                                <option value="1">Formación Técnica</option>
                            </select>
                        </label>


                        <label class="col-6">
                            Fecha De Inicio
                            <input type="date" name="fecha" class="form-control">
                        </label>

                        <label class="col-6">
                            Duración (Horas)
                            <input type="text" name="duracion" class="form-control" maxlength="4" placeholder="00">
                        </label>
                    </div>



                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCloseModalAddTraining"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary">Agregar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- modal editar capacitacion -->

<div class="modal fade" id="modalEditTraining" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formEditTraining">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <input type="hidden" name="id_usuario">
                        <label class="col-12 mb-4">
                            Tema
                            <input type="text" name="tema" class="form-control" placeholder="Tema" maxlength="50">
                        </label>

                        <label class="col-12 mb-4">
                            Tipo
                            <select name="tipo" class="form-select" id="selectTipoCapacitacion">
                                <option value="">---</option>
                                <option value="0">Desarrollo Personal</option>
                                <option value="1">Formación Técnica</option>
                            </select>
                        </label>

                        <label class="col-6">
                            Fecha De Inicio
                            <input type="date" name="fecha" class="form-control">
                        </label>

                        <label class="col-6">
                            Duración (Horas)
                            <input type="text" name="duracion" class="form-control" maxlength="4">
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
                    <button type="button" class="btn btn-secondary" id="btnCloseModalEditTraining"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</div>