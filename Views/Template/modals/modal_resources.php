<!-- modal editar  -->

<div class="modal  fade" id="resourceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formEditResource">
                    <input type="hidden" name="id_recurso">
                    <div class="row p-3">
                        <label class="col-12 mb-4">
                            Nombre del Recurso
                            <input id="nombre" type="text" name="nombre" class="form-control" placeholder="Título" maxlength="40">
                        </label>

                        <label class="col-6">
                            Tipo
                            <input id="tipo" type="text" name="tipo" class="form-control"
                                placeholder="Descripción" maxlength="30">
                        </label>

                        <label class="col-6">
                            Cantidad
                            <input id="cantidad" type="text" name="cantidad" class="form-control">
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
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    id="btnCloseEditResourceModal">Cerrar</button>
                <button type="button" class="btn btn-primary" onclick="updateResource(event)">Actualizar</button>
            </div>
                </form>
            </div>
            
        </div>
    </div>
</div>

<!-- modal agregar  -->

<div class="modal  fade" id="addResourceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formAddResource" onsubmit="addResource(event)">
            <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5 pl-5" id="exampleModalLabel">Agregar Recurso</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <section class="modal-body">
                <div class="row p-3">
                        <label class="col-12 mb-4">
                            Nombre del Recurso
                            <input id="nombre" type="text" name="nombre" class="form-control" placeholder="Nombre del Recurso" maxlength="40">
                        </label>

                        <label class="col-6">
                            Tipo
                            <input id="tipo" type="text" name="tipo" class="form-control"
                                placeholder="Tipo" maxlength="30">
                        </label>

                        <label class="col-6">
                            Cantidad
                            <input id="cantidad" type="text" name="cantidad" class="form-control" placeholder="00">
                        </label>
                        
                                             
                    </div>
                </section>
                <div class="modal-footer">
                    <button type="button" id="btnCloseAddResourceModal" class="btn btn-secondary"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" id="btnAddResourceSubmit" class="btn btn-primary">Agregar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- modal test -->
<div class="modal fade" id="testModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form id="formTest" onsubmit="Test(event)">
        <div class="modal-header bg-primary text-white">
          <h1 class="modal-title fs-5 pl-5" id="exampleModalLabel">Test</h1>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <button type="button" class="btn btn-primary" id="addButton"><i class="fa fa-plus"></i> Agregar Input</button>
          <div id="container" class="input-group">
            <label for="item1" class="col-6">
              Recurso
              <select id="item1" name="item1" class="form-select" required>
                <option value="">---</option>
              </select>
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" id="btnTest">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</div>
