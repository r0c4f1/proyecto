<!-- modal ejemplo  -->

<div class="modal  fade" id="userModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formEditUsers">
                    <input type="hidden" name="id_usuario">
                    <div class="row">
                        <label class="col d-flex justify-content-between mb-4">
                            Nombre
                            <input type="text" name="nombre" class="border">
                        </label>
                        <label class="col d-flex justify-content-between mb-4">
                            Apellido
                            <input type="text" name="apellido" class="border">
                        </label>
                    </div>

                    <div class="row">
                        <label class="col d-flex justify-content-between mb-4">
                            Correo
                            <input type="text" name="email" class="border">
                        </label>

                        <label class="col d-flex justify-content-between mb-4">
                            Telefono
                            <input type="text" name="telefono" class="border">
                        </label>
                    </div>

                    <div class="row">
                        <label class="col d-flex justify-content-between mb-4">
                            Cargo
                            <input type="text" name="cargo" class="border">
                        </label>

                        <label class="col d-flex justify-content-between mb-4">
                            Nacimiento
                            <input type="date" name="fechaNac" class="border w-50">
                        </label>
                    </div>

                    <div class="row">
                        <label class="col d-flex justify-content-between mb-4">
                            Unidad
                            <input type="number" name="unidad" class="border">
                        </label>

                        <label class="col d-flex justify-content-between mb-4">
                            Sexo
                            <select name="sexo" id="selectSexEdit" class="border w-50">
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    id="btnCloseEditUsermodal">Cerrar</button>
                <button type="button" class="btn btn-primary" onclick="updateUser(event)">Actualizar</button>
            </div>
        </div>
    </div>
</div>