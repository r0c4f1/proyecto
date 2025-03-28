<div class="modal fade" id="modalView" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="formTask">
                <div class="modal-header bg-danger text-white" id="headerModal">
                    <h1 class="modal-title fs-5" id="titleModal"></h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <h3 id="categoryModal" class="text-center mb-3"></h3>
                    <div class="report-info">
                        <p id="reportBy"></p>
                    </div>
                    <div>
                        <span class="fw-bold">Descripción</span>
                        <div class="border rounded p-1 mb-2">
                            <p id="descriptionModal"></p>
                        </div>
                    </div>
                    <div>
                        <label for="descripcion_solucion" id="label_solucion" style="display: none;">Informe de Solución</label>
                        <textarea class="form-control" name="descripcion_solucion" id="descripcion_solucion" rows="3" style="display: none;"></textarea>
                    </div>
                    <div class="additional-info">
                        <p id="textModal"></p>
                        <p id="endAssignment"></p>
                    </div>
                    <div class="modal-footer" id="footerModal">
                        <button type="button" id="btnClose" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" id="action" class="btn btn-primary"></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
