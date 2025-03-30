<!-- modal ingresar a equipo -->

<div class="modal fade" id="addUserTeams" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formRegisterUserTeams">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Empleado</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body p-5">
                    <label class="w-100">
                        Cédula
                        <input type="number" name="id_usuario" class="form-control validate-input" maxlength="9"
                            placeholder="Cédula">
                    </label>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCloseModalAddUserTeams"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary">Añadir</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- modal agregar equipo de trabajo -->

<div class="modal fade" id="addTeams" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAddTeams">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Equipo</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <label class="col-12 mb-4">
                            Nombre Equipo
                            <input type="text" name="nombre" class="form-control validate-input" maxlength="30"
                                placeholder="Nombre equipo">
                        </label>
                        <label class="w-100">
                            Tipo Equipo
                            <select name="tipo_equipo" class="form-select">
                                <option value="0">Proyecto</option>
                                <option value="1">Trabajo</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCloseModalAddTeams"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary">Agregar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- modal editar equipos de trabajo-->

<div class="modal fade" id="modalEditTeams" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formEditTeams">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row p-3">
                        <input type="hidden" name="id_equipo">
                        <label class="col-12 mb-4">
                            Nombre Equipo
                            <input type="text" name="nombre" class="form-control" placeholder="Nombre Equipo" maxlength="30">
                        </label>
                        <label class="w-100">
                            Tipo Equipo
                            <select name="tipo_equipo" class="form-select" id="select-team">
                                <option value="0">Proyecto</option>
                                <option value="1">Trabajo</option>
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
                    <button type="button" class="btn btn-secondary" id="btnCloseModalEditTeams"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</div>



<!-- modal fullscreen  -->

<div class="modal" tabindex="-1" id="modalTeams">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="modalViewUser" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Usuarios del equipo</h1>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column" style="min-height: 300px;">
                
                <div id="listaUsuarios" class="row"></div> 
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>