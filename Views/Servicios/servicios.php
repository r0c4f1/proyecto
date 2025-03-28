<?php headerAdmin($data);
sideBar(); ?>


<main class="main">
    <div class="row d-flex justify-content-center mt-5 mb-5">
        <section class="col-5">
            <header class="d-flex justify-content-between align-items-center">
                <h3>Servicio</h3>
                <button class="btn btn-success" onclick="modalAddTraining()">Agregar Servicio</button>
            </header>
            <hr>
            <table id="capacitaciones" class="tabla-estilizada" style="width:100%;">
                <thead>
                    <tr>
                        <th>Tema</th>
                        <th>Fecha</th>
                        <th>Duración</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
            </table>
        </section>
        <section class="col-6">
            <div>
                <h3 id="temaInscritos"></h3>
                <hr>
                <select name="" id="selectCapacitacion" class="form-control">
                    <option value="0">---</option>
                </select>
            </div>

            <div class="d-flex justify-content-between align-items-center">
                <input type='text' class='mt-4 form-control w-50' placeholder='Buscar'
                    onkeyup='filtroListaInscritos(event)' id='buscador' disabled>
                <button class="btn btn-success mt-4" onclick="modalAddUserTraining()" disabled
                    id="btnInscribirse">Inscribirse</button>
            </div>
            <article class="mt-2 inscritos row flex-wrap justify-content-start align-items-start" id="listaInscritos"
                style="height: 450px; overflow-y: scroll;">
            </article>

        </section>
    </div>


</main>


<?= getModal('modal_servicio') ?>
<?php footerAdmin($data) ?>