<!-- modal editar  -->

<div class="modal  fade" id="userModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formEditUsers">
                    <input type="hidden" name="id_usuario">
                    <div class="row p-3">
                        <label class="col">
                            Nombre
                            <input type="text" name="nombre" maxlength="50">
                        </label>
                        <label class="col">
                            Apellido
                            <input type="text" name="apellido" maxlength="50">
                        </label>
                    </div>

                    <div class="row p-3">
                        <label class="col">
                            Correo
                            <input type="text" name="email" maxlength="32">
                        </label>

                        <label class="col">
                            Teléfono
                            <input type="text" name="telefono" maxlength="11">
                        </label>
                    </div>

                    <div class="row p-3">
                        <label class="col">
                            Cargo
                            <input type="text" name="cargo" maxlength="30">
                        </label>

                        <label class="col">
                            Nacimiento
                            <input type="date" name="fechaNac">
                        </label>
                    </div>

                    <div class="row p-3">
                        <label class="col">
                            Unidad
                            <select name="id_unidad" id="selectEditUnit" class="w-100 form-select" required>
                                <option value="">---</option>
                            </select>
                        </label>

                        <label class="col">
                            Sexo
                            <select name="sexo" id="selectSexEdit" class="w-100 form-select">
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </label>

                        <label class="col">
                            Discapacidad
                            <select name="discapacidad" id="selectDiscapacidadEdit" class="w-100 form-select">
                                <option value="Ninguna">Ninguna</option>
                                <option value="Física">Física</option>
                                <option value="Intelectual">Intelectual</option>
                                <option value="Mental">Mental</option>
                                <option value="Sensorial">Sensorial</option>
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

<!-- modal agregar  -->

<div class="modal  fade" id="addUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAddUsers" onsubmit="addUser(event)">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Usuario</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <section class="modal-body">

                    <div class="row p-3">
                        <div class="col-6">
                            <label>
                                Cédula
                                <input type="number" name="cedula" onfocusout="verifyId(event)" placeholder="Cédula"
                                    id="cedulaId">
                            </label>
                        </div>
                        <div class="col-6 d-flex justify-content-end">
                            <div class="form-check form-switch rounded"><label class="form-check-label"
                                    for="isAdmin">Jefe
                                    <input class="form-check-input rounded " type="checkbox" role="switch"
                                        id="isAdmin"></label>
                            </div>
                        </div>
                    </div>

                    <div class="row p-3">
                        <label class="col">
                            Nombre
                            <input type="text" name="nombre" placeholder="Nombre" maxlength="50">
                        </label>
                        <label class="col">
                            Apellido
                            <input type="text" name="apellido" placeholder="Apellido" maxlength="50">
                        </label>
                    </div>

                    <div class="row p-3">
                        <label class="col">
                            Correo
                            <input type="email" name="email" placeholder="example01@mail.com" maxlength="30">
                        </label>

                        <label class="col">
                            Teléfono
                            <input type="number" name="telefono" placeholder="0424-1234567">
                        </label>
                    </div>

                    <div class="row p-3">
                        <label class="col">
                            Cargo
                            <input type="text" name="cargo" placeholder="Cargo" maxlength="30">
                        </label>

                        <label class="col">
                            Nacimiento
                            <input type="date" name="fechaNac" class="w-100">
                        </label>
                    </div>

                    <div class="row p-3">
                        <label class="col">
                            Unidad
                            <select name="id_unidad" id="selectUnit" class="w-100 form-select" required>
                                <option value="">---</option>
                            </select>
                        </label>

                        <label class="col">
                            Sexo
                            <select name="sexo" id="sexo" class="w-100 form-select">
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </label>


                        <label class="col">
                            Discapacidad
                            <select name="discapacidad" id="discapacidad" class="w-100 form-select">
                                <option value="Ninguna">Ninguna</option>
                                <option value="Física">Física</option>
                                <option value="Intelectual">Intelectual</option>
                                <option value="Mental">Mental</option>
                                <option value="Sensorial">Sensorial</option>
                            </select>
                        </label>
                    </div>
                    <div class="row p-3">
                        <div class="col-md-6 input-container">
                            <label class="col">
                                Clave
                                <input type="password" name="clave" id="claveInput" placeholder="Ex@mpl3">
                                <button type="button" id="visible" class="toggle-password" onclick="changeType()">
                                    <i class="fa-solid fa-eye-slash"></i>
                                </button>
                                <button type="button" id="invisible" class="toggle-password visually-hidden"
                                    onclick="changeType()">
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                            </label>
                        </div>


                        <label class="col-md-6 input-container">
                            Repetir Clave
                            <input type="password" onkeyup="claveRepetida(event)" id="claveRepetida"
                                placeholder="Ex@mpl3">
                            <button type="button" id="visible2" class="toggle-password" onclick="changeType()"><i
                                    class="fa-solid fa-eye-slash"></i></button>
                            <button type="button toggle-password" id="invisible2"
                                class="toggle-password visually-hidden" onclick="changeType()"><i
                                    class="fa-solid fa-eye"></i></button>
                        </label>
                    </div>
                </section>
                <div class="modal-footer">
                    <button type="button" id="btnCloseAddUsermodal" class="btn btn-secondary"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" id="btnAddUserSubmit" class="btn btn-primary">Agregar</button>
                </div>
            </form>
        </div>
    </div>
</div>