// secciones para insertar las cards con datos
const listaCardIncidenciasPendientes = document.getElementById(
  "dataIncidenciasPendientes"
);
const listaCardProyectosPendientes = document.getElementById(
  "dataProyectosPendientes"
);
const listaCardIncidenciasEnProceso = document.getElementById(
  "dataIncidenciasEnProceso"
);
const listaCardProyectosEnProceso = document.getElementById(
  "dataProyectosEnProceso"
);
const listaCardIncidenciasFinalizadas = document.getElementById(
  "dataIncidenciasFinalizados"
);
const listaCardProyectosFinalizadas = document.getElementById(
  "dataProyectosFinalizados"
);

// número que indica cuantos registros estan en proyecto e incidencias (combinados) ejm : proyectosPendientes 2 + incidenciasPendientes 3: countPendientes 5
const countPendiente = document.getElementById("countPendiente");
const countEnProceso = document.getElementById("countEnProceso");
const countFinalizado = document.getElementById("countFinalizado");

let textarea = document.getElementById("descripcion_solucion"); // esto es el input oculto
let label = document.getElementById("label_solucion"); // label del input oculto
const formTask = document.getElementById("formTask");

async function getPendientes() {
  let queryEquipos = await fetch(`${base_url}/TaskList/getEquipo/${userId}`);
  let equipos = await queryEquipos.json();
  let dataIncidentes = [];
  let dataProyectos = [];
  let count = 0;

  for (let i = 0; i < equipos.length; i++) {
    const equipo = equipos[i];
    let queryIncidentes = await fetch(
      `${base_url}/TaskList/getIncident/${equipo.id_equipo}`
    );
    let incidentes = await queryIncidentes.json();

    if (incidentes.length > 0) count = incidentes.length;

    dataIncidentes.push(...incidentes);

    let queryProyectos = await fetch(
      `${base_url}/TaskList/getProject/${equipo.id_equipo}`
    );
    let proyectos = await queryProyectos.json();

    if (proyectos.length > 0) count += proyectos.length;

    dataProyectos.push(...proyectos);
  }

  let tab2 = `<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">`;
  let divs2 = `<div class="tab-content" id="myTabContent">`;
  let indice2 = 1;
  let currentTabIndex2 = 0; // Índice único para tabs

  // Agrupar proyectos en chunks de 3

  const chunkSizeIncidencias = 7;
  const gruposIncidencias = [];
  for (let i = 0; i < dataIncidentes.length; i += chunkSizeIncidencias) {
    gruposIncidencias.push(dataIncidentes.slice(i, i + chunkSizeIncidencias));
  }

  let secitonsIncidents = "";
  if (dataIncidentes.length > 0) {
    gruposIncidencias.forEach((grupo, index) => {
      // Construir las secciones del grupo actual
      grupo.forEach((incidencia) => {
        secitonsIncidents += `
                  <section class="card-content m-3" style="max-width:300px;">
                      <div class="container-card-body border rounded d-flex shadow align-items-center p-3 hover-bg"
                           onclick="llenarModal(${incidencia.id_incidencia}, 'incidente')">
                          <div class="card-body-icon d-flex justify-content-center align-items-center">
                              <i class="fas fa-check text-success" style="font-size: 28px;"></i>
                          </div>
                          <div class="card-body-text p-2">
                              <div class="card-title fw-bold"><h6>${incidencia.categoria}</h6></div>
                              <p class="card-text">${incidencia.nombre_tipo}</p>
                              <p class="card-text">${incidencia.fecha_reporte_formateada}</p>
                          </div>
                      </div>
                               <input type="hidden" id="tipoEntidad" name="tipoEntidad" value="incidente">
                  </section>`;
      });

      // Construir tabs y paneles
      const isActive = index === 0 ? "active" : "";
      const tabId = `tab-${currentTabIndex2}`;

      // Añadir botón del tab
      tab2 += `
              <li class="nav-item" role="presentation">
                  <button class="nav-link ${isActive}"
                          id="${tabId}-btn"
                          data-bs-toggle="tab"
                          data-bs-target="#${tabId}"
                          type="button"
                          role="tab"
                          aria-controls="${tabId}"
                          aria-selected="${index === 0 ? "true" : "false"}">
                      ${indice2}
                  </button>
              </li>`;

      // Añadir contenido del tab
      divs2 += `
              <div class="tab-pane fade ${index === 0 ? "show active" : ""} "
                   id="${tabId}"
                   role="tabpanel"
                   aria-labelledby="${tabId}-btn"
                   tabindex="0">
                   <div class='d-flex flex-wrap'>
                   ${secitonsIncidents}
                   </div>
              </div>`;

      currentTabIndex2++;
      indice2++;
    });
  } else {
    secitonsIncidents += `<h5 class="text-center mt-4">No hay incidencias finalizadas</h5>`;
    divs2 = secitonsIncidents;
  }

  let cardProyectos = "";
  let tab = `<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">`;
  let divs = `<div class="tab-content" id="myTabContent">`;
  let indice = 1;
  let currentTabIndex = 0;

  const chunkSizeProyectos = 7;
  const gruposProyectos = [];
  for (let i = 0; i < dataProyectos.length; i += chunkSizeProyectos) {
    gruposProyectos.push(dataProyectos.slice(i, i + chunkSizeProyectos));
  }

  let sections = "";

  if (dataProyectos.length > 0) {
    gruposProyectos.forEach((grupo, index) => {
      // Construir las secciones del grupo actual
      grupo.forEach((proyecto) => {
        sections += `
                  <section class="card-content m-3" style="max-width:300px;">
                      <div class="container-card-body border rounded d-flex shadow align-items-center p-3 hover-bg"
                           onclick="llenarModal(${proyecto.id_proyecto}, 'proyecto')">
                          <div class="card-body-icon d-flex justify-content-center align-items-center">
                              <i class="fas fa-check text-success" style="font-size: 28px;"></i>
                          </div>
                          <div class="card-body-text p-2">
                              <div class="card-title fw-bold"><p>${proyecto.nombre}</p></div>
                              <p class="card-text">${proyecto.fecha_inicio_formateada}</p>
                          </div>
                      </div>
                       <input type="hidden" id="tipoEntidad" name="tipoEntidad" value="proyecto">
                  </section>`;
      });

      // Construir tabs y paneles
      const isActive = index === 0 ? "active" : "";
      const tabId = `tab-${currentTabIndex}`;

      // Añadir botón del tab
      tab += `
              <li class="nav-item" role="presentation">
                  <button class="nav-link ${isActive}"
                          id="${tabId}-btn"
                          data-bs-toggle="tab"
                          data-bs-target="#${tabId}"
                          type="button"
                          role="tab"
                          aria-controls="${tabId}"
                          aria-selected="${index === 0 ? "true" : "false"}">
                      ${indice}
                  </button>
              </li>`;

      // Añadir contenido del tab
      divs += `
              <div class="tab-pane fade ${index === 0 ? "show active" : ""} "
                   id="${tabId}"
                   role="tabpanel"
                   aria-labelledby="${tabId}-btn"
                   tabindex="0">
                   <div class='d-flex flex-wrap'>
                   ${sections}
                   </div>
              </div>`;

      currentTabIndex++;
      indice++;
    });
  } else {
    cardProyectos = `<h5 class="text-center mt-3">No hay proyectos pendientes</h5>`;
    divs += `<div class="tab-pane fade show active">${cardProyectos}</div>`;
  }

  tab += `</ul>`;
  divs += `</div>`;
  tab2 += `</ul>`;
  divs2 += `</div>`;
  // Definición de la sección de botones modal
  let btnModal = document.getElementById("action");
  let btnClose = document.getElementById("btnClose");
  btnModal.textContent = "Iniciar Tarea";
  btnModal.style.display = "block";
  btnClose.style.display = "none";

  listaCardIncidenciasPendientes.innerHTML = `<div class='d-flex flex-column w-100'>${tab2}${divs2}</div>`;
  listaCardProyectosPendientes.innerHTML = `<div class='d-flex flex-column w-100'>${tab}${divs}</div>`;
  countPendiente.textContent = count;
}

async function getEnProceso() {
  // Obtener equipos del usuario
  let query2 = await fetch(`${base_url}/TaskList/getEquipo/${userId}`);
  let equipos = await query2.json();
  let count = 0;

  // Verificar si el usuario pertenece a algún equipo
  if (equipos.length === 0) {
    listaCard.innerHTML = `
      <header class="container-fluid mt-2">
        <div class="border rounded bg-primary p-1 text-white text-center">
          <h3>Sin equipo asignado</h3>
        </div>
      </header>
      <div class="text-center mt-4">No perteneces a ningún equipo.</div>`;
    listaCard2.innerHTML = ""; // Limpiar el contenido de listaCard2 también
    return;
  }

  // Arrays para almacenar datos de incidentes y proyectos en proceso
  let dataIncidentes = [];
  let dataProyectos = [];

  // Iterar sobre cada equipo y obtener datos de incidentes y proyectos en proceso
  for (let equipo of equipos) {
    // Obtener incidentes en proceso
    let queryIncidentes = await fetch(
      `${base_url}/TaskList/getIncidentInProcess/${equipo.id_equipo}`
    );
    let incidentes = await queryIncidentes.json();
    if (incidentes.length > 0) count = incidentes.length;

    dataIncidentes.push(...incidentes);

    // Obtener proyectos en proceso
    let queryProyectos = await fetch(
      `${base_url}/TaskList/getProjectInProcess/${equipo.id_equipo}`
    );
    let proyectos = await queryProyectos.json();
    if (proyectos.length > 0) count += proyectos.length;
    dataProyectos.push(...proyectos);
  }

  // Construir la sección de incidentes en proceso
  let tab2 = `<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">`;
  let divs2 = `<div class="tab-content" id="myTabContent">`;
  let indice2 = 1;
  let currentTabIndex2 = 0; // Índice único para tabs

  const chunkSize2 = 7;
  const grupos2 = [];
  for (let i = 0; i < dataIncidentes.length; i += chunkSize2) {
    grupos2.push(dataIncidentes.slice(i, i + chunkSize2));
  }

  let secitonsIncidents = "";
  if (dataIncidentes.length > 0) {
    grupos2.forEach((grupo, index) => {
      // Construir las secciones del grupo actual
      let sections = "";
      grupo.forEach((incidencia) => {
        secitonsIncidents += `
         <section class="card-wrap">
           <div class="row">
             <div class="card-content col-3">
               <div class="container-card-body border rounded d-flex shadow align-items-center p-3 hover-bg"
                     onclick="llenarModal(${incidencia.id_incidencia}, 'incidente')">
                 <div class="card-body-icon bg-primary d-flex justify-content-center align-items-center rounded p-3">
                   <i class="fa-solid fa-hourglass-half fa-fade" style="color: #FFF; font-size: 40px;"></i>
                 </div>
                 <div class="card-body-text p-3">
                   <div class="card-title"><h6>${incidencia.categoria}</h6></div>
                   <p class="card-text">${incidencia.nombre_tipo}</p>
                 </div>
               </div>
             </div>
           </div>
           <input type="hidden" id="tipoEntidad" name="tipoEntidad" value="incidente">
         </section>`;
      });

      // Construir tabs y paneles
      const isActive = index === 0 ? "active" : "";
      const tabId = `tab-${currentTabIndex2}`;

      // Añadir botón del tab
      tab2 += `
            <li class="nav-item" role="presentation">
                <button class="nav-link ${isActive}"
                        id="${tabId}-btn"
                        data-bs-toggle="tab"
                        data-bs-target="#${tabId}"
                        type="button"
                        role="tab"
                        aria-controls="${tabId}"
                        aria-selected="${index === 0 ? "true" : "false"}">
                    ${indice2}
                </button>
            </li>`;

      // Añadir contenido del tab
      divs2 += `
            <div class="tab-pane fade ${index === 0 ? "show active" : ""} "
                 id="${tabId}"
                 role="tabpanel"
                 aria-labelledby="${tabId}-btn"
                 tabindex="0">
                 <div class='d-flex flex-wrap'>
                 ${secitonsIncidents}
                 </div>
            </div>`;

      currentTabIndex2++;
      indice2++;
    });
  } else {
    secitonsIncidents += `<h5 class="text-center mt-4">No hay incidencias en proceso</h5>`;
    divs2 = secitonsIncidents;
  }

  let cardProyectos = "";
  let tab = `<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">`;
  let divs = `<div class="tab-content" id="myTabContent">`;
  let indice = 1;
  let currentTabIndex = 0; // Índice único para tabs

  // Agrupar proyectos en chunks de 3

  const chunkSize = 7;
  const grupos = [];
  for (let i = 0; i < dataProyectos.length; i += chunkSize) {
    grupos.push(dataProyectos.slice(i, i + chunkSize));
  }

  let sections = "";

  if (dataProyectos.length > 0) {
    grupos.forEach((grupo, index) => {
      // Construir las secciones del grupo actual
      grupo.forEach((proyecto) => {
        sections += `
                <section class="card-content m-3" style="max-width:300px;">
                    <div class="container-card-body border rounded d-flex shadow align-items-center p-3 hover-bg"
                         onclick="llenarModal(${proyecto.id_proyecto}, 'proyecto')">
                        <div class="card-body-icon d-flex justify-content-center align-items-center">
                            <i class="fas fa-check text-success" style="font-size: 28px;"></i>
                        </div>
                        <div class="card-body-text p-2">
                            <div class="card-title fw-bold"><p>${proyecto.nombre}</p></div>
                            <p class="card-text">${proyecto.fecha_inicio_formateada}</p>
                        </div>
                    </div>
                            <input type="hidden" id="tipoEntidad" name="tipoEntidad" value="proyecto">
                </section>`;
      });

      // Construir tabs y paneles
      const isActive = index === 0 ? "active" : "";
      const tabId = `tab-${currentTabIndex}`;

      // Añadir botón del tab
      tab += `
            <li class="nav-item" role="presentation">
                <button class="nav-link ${isActive}"
                        id="${tabId}-btn"
                        data-bs-toggle="tab"
                        data-bs-target="#${tabId}"
                        type="button"
                        role="tab"
                        aria-controls="${tabId}"
                        aria-selected="${index === 0 ? "true" : "false"}">
                    ${indice}
                </button>
            </li>`;

      // Añadir contenido del tab
      divs += `
            <div class="tab-pane fade ${index === 0 ? "show active" : ""} "
                 id="${tabId}"
                 role="tabpanel"
                 aria-labelledby="${tabId}-btn"
                 tabindex="0">
                 <div class='d-flex flex-wrap'>
                 ${sections}
                 </div>
            </div>`;

      currentTabIndex++;
      indice++;
    });
  } else {
    cardProyectos = `<div class="text-center">No hay proyectos en proceso</div>`;
    divs += `<div class="tab-pane fade show active">${cardProyectos}</div>`;
  }

  tab += `</ul>`;
  divs += `</div>`;
  tab2 += `</ul>`;
  divs2 += `</div>`;

  listaCardIncidenciasEnProceso.innerHTML = `<div class='d-flex flex-column w-100'>${tab2}${divs2}</div>`;
  listaCardProyectosEnProceso.innerHTML = `<div class='d-flex flex-column w-100'>${tab}${divs}</div>`;
  countEnProceso.textContent = count;
}

async function getFinalizados() {
  let query2 = await fetch(`${base_url}/TaskList/getEquipo/${userId}`);
  let equipos = await query2.json();
  let count = 0;

  // Verificar si el usuario pertenece a algún equipo
  if (equipos.length === 0) {
    listaCard.innerHTML = `
      <header class="container-fluid mt-2">
        <div class="border rounded bg-success p-1 text-white text-center">
          <h3>Sin equipo asignado</h3>
        </div>
      </header>
      <div class="text-center mt-4">No perteneces a ningún equipo.</div>`;
    listaCard2.innerHTML = ""; // Limpiar el contenido de listaCard2 también
    return;
  }

  // Arrays para almacenar datos de incidentes y proyectos finalizados
  let dataIncidentes = [];
  let dataProyectos = [];

  // Iterar sobre cada equipo y obtener datos de incidentes y proyectos finalizados
  for (let equipo of equipos) {
    // Obtener incidentes finalizados
    let queryIncidentes = await fetch(
      `${base_url}/TaskList/getIncidentFinalized/${equipo.id_equipo}`
    );
    let incidentes = await queryIncidentes.json();
    console.log(incidentes);

    if (incidentes.length > 0) count = incidentes.length;
    dataIncidentes.push(...incidentes);

    // Obtener proyectos finalizados
    let queryProyectos = await fetch(
      `${base_url}/TaskList/getProjectFinalized/${equipo.id_equipo}`
    );
    let proyectos = await queryProyectos.json();
    if (proyectos.length > 0) count += proyectos.length;
    dataProyectos.push(...proyectos);
  }

  // Construir la sección de incidentes finalizados
  let tab2 = `<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">`;
  let divs2 = `<div class="tab-content" id="myTabContent">`;
  let indice2 = 1;
  let currentTabIndex2 = 0; // Índice único para tabs

  // Agrupar proyectos en chunks de 3
  const chunkSize2 = 7;
  const grupos2 = [];
  for (let i = 0; i < dataIncidentes.length; i += chunkSize2) {
    grupos2.push(dataIncidentes.slice(i, i + chunkSize2));
  }

  let secitonsIncidents = "";
  if (dataIncidentes.length > 0) {
    grupos2.forEach((grupo, index) => {
      // Construir las secciones del grupo actual
      let sections = "";
      grupo.forEach((incidencia) => {
        secitonsIncidents += `
                <section class="card-content m-3" style="max-width:300px;">
                    <div class="container-card-body border rounded d-flex shadow align-items-center p-3 hover-bg"
                         onclick="llenarModal(${incidencia.id_incidencia}, 'incidente')">
                        <div class="card-body-icon d-flex justify-content-center align-items-center">
                            <i class="fas fa-check text-success" style="font-size: 28px;"></i>
                        </div>
                        <div class="card-body-text p-2">
                            <div class="card-title fw-bold"><h6>${incidencia.categoria}</h6></div>
                            <p class="card-text">${incidencia.nombre_tipo}</p>
                            <p class="card-text">${incidencia.fecha_solucion_formateada}</p>
                        </div>
                    </div>
                </section>`;
      });

      // Construir tabs y paneles
      const isActive = index === 0 ? "active" : "";
      const tabId = `tab-${currentTabIndex2}`;

      // Añadir botón del tab
      tab2 += `
            <li class="nav-item" role="presentation">
                <button class="nav-link ${isActive}"
                        id="${tabId}-btn"
                        data-bs-toggle="tab"
                        data-bs-target="#${tabId}"
                        type="button"
                        role="tab"
                        aria-controls="${tabId}"
                        aria-selected="${index === 0 ? "true" : "false"}">
                    ${indice2}
                </button>
            </li>`;

      // Añadir contenido del tab
      divs2 += `
            <div class="tab-pane fade ${index === 0 ? "show active" : ""} "
                 id="${tabId}"
                 role="tabpanel"
                 aria-labelledby="${tabId}-btn"
                 tabindex="0">
                 <div class='d-flex flex-wrap'>
                 ${secitonsIncidents}
                 </div>
            </div>`;

      currentTabIndex2++;
      indice2++;
    });
  } else {
    secitonsIncidents += `<h5 class="text-center mt-4">No hay incidencias finalizadas</h5>`;
    divs2 = secitonsIncidents;
  }

  // Construir la sección de proyectos finalizados
  let cardProyectos = "";
  let tab = `<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">`;
  let divs = `<div class="tab-content" id="myTabContent">`;
  let indice = 1;
  let currentTabIndex = 0; // Índice único para tabs

  const chunkSize = 7;
  const grupos = [];
  for (let i = 0; i < dataProyectos.length; i += chunkSize) {
    grupos.push(dataProyectos.slice(i, i + chunkSize));
  }

  if (dataProyectos.length > 0) {
    grupos.forEach((grupo, index) => {
      // Construir las secciones del grupo actual
      let sections = "";
      grupo.forEach((proyecto) => {
        sections += `
                <section class="card-content m-3" style="max-width:300px;">
                    <div class="container-card-body border rounded d-flex shadow align-items-center p-3 hover-bg"
                         onclick="llenarModal(${proyecto.id_proyecto}, 'proyecto')">
                        <div class="card-body-icon d-flex justify-content-center align-items-center">
                            <i class="fas fa-check text-success" style="font-size: 28px;"></i>
                        </div>
                        <div class="card-body-text p-2">
                            <div class="card-title fw-bold"><p>${proyecto.nombre}</p></div>
                            <p class="card-text">${proyecto.fecha_fin_formateada}</p>
                        </div>
                    </div>
                </section>`;
      });

      // Construir tabs y paneles
      const isActive = index === 0 ? "active" : "";
      const tabId = `tab-${currentTabIndex}`;

      // Añadir botón del tab
      tab += `
            <li class="nav-item" role="presentation">
                <button class="nav-link ${isActive}"
                        id="${tabId}-btn"
                        data-bs-toggle="tab"
                        data-bs-target="#${tabId}"
                        type="button"
                        role="tab"
                        aria-controls="${tabId}"
                        aria-selected="${index === 0 ? "true" : "false"}">
                    ${indice}
                </button>
            </li>`;

      // Añadir contenido del tab
      divs += `
            <div class="tab-pane fade ${index === 0 ? "show active" : ""} "
                 id="${tabId}"
                 role="tabpanel"
                 aria-labelledby="${tabId}-btn"
                 tabindex="0">
                 <div class='d-flex flex-wrap'>
                 ${sections}
                 </div>
            </div>`;

      currentTabIndex++;
      indice++;
    });
  } else {
    cardProyectos = `<h5 class="text-center mt-3">No hay proyectos finalizados</h5>`;
    divs += `<div class="tab-pane fade show active">${cardProyectos}</div>`;
  }

  tab += `</ul>`;
  divs += `</div>`;
  tab2 += `</ul>`;
  divs2 += `</div>`;

  listaCardIncidenciasFinalizadas.innerHTML = `<div class='d-flex flex-column w-100'>${tab2}${divs2}</div>`;
  listaCardProyectosFinalizadas.innerHTML = `<div class='d-flex flex-column w-100'>${tab}${divs}</div>`;
  countFinalizado.textContent = count;
}

async function historico(tipoOperacion, descripcionOperacion, estadoOperacion) {
  const formData = new FormData();
  formData.append("id_usuario", userId);
  formData.append("tipoOperacion", tipoOperacion);
  formData.append("descripcionOperacion", descripcionOperacion);
  formData.append("estadoOperacion", estadoOperacion);

  let query = await fetch(base_url + "/Settings/insertHistorico", {
    method: "POST",
    body: formData,
  });
  let data = await query.json();
}

async function llenarModal(id, tipo) {
  console.log(id, tipo);
  idCapturado = id;
  tipoCapturado = tipo;
  let query;
  let data;
  tipoEstadoTaskLst = tipo;
  // Determinar el tipo de entidad y hacer la consulta adecuada
  if (tipo === "incidente") {
    query = await fetch(`${base_url}/TaskList/getIncidentForId/${id}`);
    data = await query.json();
  } else if (tipo === "proyecto") {
    query = await fetch(`${base_url}/TaskList/getProjectById/${id}`);
    data = await query.json();
  } else {
    console.error("Tipo desconocido");
    return;
  }
  // Asignar los valores a los elementos del modal
  let titleModal = document.getElementById("titleModal");
  let descriptionModal = document.getElementById("descriptionModal");
  let textModal = document.getElementById("textModal");
  let categoryModal = document.getElementById("categoryModal");
  let endAssignment = document.getElementById("endAssignment");
  let reportBy = document.getElementById("reportBy");
  // Configuración del modal dependiendo del tipo de elemento
  if (tipo === "incidente") {
    titleModal.textContent = data[0].categoria;
    categoryModal.textContent = data[0].nombre_tipo;
    descriptionModal.textContent = data[0].descripcion;
    reportBy.innerHTML =
      "<strong>Reportado por:</strong> " +
      data[0].nombres +
      " " +
      data[0].apellidos;
    textModal.innerHTML =
      "<strong>Fecha de reporte:</strong> " + data[0].fecha_reporte_formateada;
    if (
      !data[0].fecha_solucion ||
      data[0].fecha_solucion.trim() === "" ||
      data[0].fecha_solucion === "0000-00-00 00:00:00"
    ) {
      endAssignment.innerHTML = "";
    } else {
      endAssignment.innerHTML =
        "<strong>Fecha de solución:</strong> " +
        data[0].fecha_solucion_formateada;
    }
    // CONDICION PARA EL INPUT OCULTO
    document.getElementById("headerModal").classList.remove("bg-success");
    document.getElementById("headerModal").classList.remove("bg-primary");
    document.getElementById("headerModal").classList.add("bg-danger");
    if (data[0].estado === "En Proceso") {
      // Muestra el label y el textarea
      textarea.style.display = "block";
      label.style.display = "block";
      textarea.value = "";
      document.getElementById("headerModal").classList.remove("bg-success");
      document.getElementById("headerModal").classList.remove("bg-danger");
      document.getElementById("headerModal").classList.add("bg-primary");
    } else if (data[0].estado === "Finalizado") {
      // Muestra el label y el textarea y haz que el textarea sea de solo lectura
      textarea.style.display = "block";
      label.style.display = "block";
      textarea.textContent = data[0].descripcion_solucion;
      document.getElementById("headerModal").classList.remove("bg-danger");
      document.getElementById("headerModal").classList.remove("bg-primary");
      document.getElementById("headerModal").classList.add("bg-success");
      textarea.setAttribute("readonly", true); // Establece el textarea como solo lectura
    }
  } else if (tipo === "proyecto") {
    let fecha = data[0].fecha_inicio;
    let fechaComparar = data[0].fecha_inicio_formateada;

    if (new Date() < new Date(fecha)) {
      Swal.fire({
        icon: "info",
        title: "Tareas Asignadas",
        text: `Proyecto destinado para iniciar el dia: ${fechaComparar}`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    document.getElementById("headerModal").classList.remove("bg-success");
    document.getElementById("headerModal").classList.remove("bg-primary");
    document.getElementById("headerModal").classList.add("bg-danger");

    titleModal.textContent = "Proyecto";
    categoryModal.textContent = data[0].nombre;
    descriptionModal.textContent = data[0].descripcion;
    textarea.style.display = "none"; // Oculta el textarea
    label.style.display = "none"; // Oculta el label del textarea
    textModal.innerHTML =
      "<strong>Fecha de inicio:</strong> " + data[0].fecha_inicio_formateada;
    // console.log(data);
    if (data[0].estado === "En Proceso") {
      document.getElementById("headerModal").classList.remove("bg-success");
      document.getElementById("headerModal").classList.remove("bg-danger");
      document.getElementById("headerModal").classList.add("bg-primary");
      titleModal.textContent = "Proyecto";
      categoryModal.textContent = data[0].nombre;
      descriptionModal.textContent = data[0].descripcion;
      textarea.style.display = "block"; // Oculta el textarea
      label.style.display = "block"; // Oculta el label del textarea
      textModal.innerHTML =
        "<strong>Fecha de inicio:</strong> " + data[0].fecha_inicio_formateada;
    } else if (data[0].estado === "Finalizado") {
      document.getElementById("headerModal").classList.remove("bg-danger");
      document.getElementById("headerModal").classList.remove("bg-primary");
      document.getElementById("headerModal").classList.add("bg-success");
      titleModal.textContent = "Proyecto";
      categoryModal.textContent = data[0].nombre;
      descriptionModal.textContent = data[0].descripcion;
      textarea.textContent = data[0].descripcion_solucion;
      textarea.style.display = "block"; // Oculta el textarea
      label.style.display = "block"; // Oculta el label del textarea
      textarea.setAttribute("readonly", true); // Establece el textarea como solo lectura
    }
    if (
      !data[0].fecha_fin ||
      data[0].fecha_fin.trim() === "" ||
      data[0].fecha_fin === "0000-00-00 00:00:00"
    ) {
      endAssignment.innerHTML = "";
    } else {
      endAssignment.innerHTML =
        "<strong>Fecha de finalización:</strong> " +
        data[0].fecha_fin_formateada;
    }
  }
  const myModal = new bootstrap.Modal(document.getElementById("modalView"));
  myModal.show();
}

function cambiarNombreBtn(estado) {
  let btnModal = document.getElementById("action");
  let btnClose = document.getElementById("btnClose");

  if (estado === "Pendiente") {
    btnModal.textContent = "Iniciar Tarea";
    btnModal.style.display = "block";
    btnClose.style.display = "none";
  } else if (estado === "En Proceso") {
    btnModal.textContent = "Finalizar Tarea";
    btnModal.style.display = "block";
    btnClose.style.display = "none";
  } else {
    btnClose.style.display = "block";
    btnModal.style.display = "none";
  }
}

function alertTimeOut(icon, text, timer) {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    text,
    showConfirmButton: false,
    timer,
  });
}

formTask.addEventListener("submit", async (e) => {
  e.preventDefault();

  let btnClose = document.getElementById("btnClose");
  let formData = new FormData(formTask);
  let tipoEntidad = document.getElementById("tipoEntidad").value; // Obtener el tipo de entidad
  formData.append("tipoEntidad", tipoCapturado); // Añadir el tipo al formData
  // formData.append("tipoCapturado", tipoCapturado);

  // Obtener el estado de la tarea
  let query = await fetch(`${base_url}/TaskList/getStatus/${idCapturado}`, {
    method: "POST",
    body: formData,
  });

  let data = await query.json();

  console.log(data);

  // VERIFICAIÓN DEL ESTADO DE LA RESPUESTA DE LA CONSULTA
  if (query.ok) {
    let value = data[0].estado;
    let query2 = "";

    console.log(value);

    // Si está en estado "Pendiente", cambiar a "En Proceso"
    if (value === "Pendiente") {
      let dato = new Date().toLocaleString().split(" ");
      dato.pop();
      dato =
        dato[0].split("/").reverse().join("-").replace(",", "") +
        " " +
        new Date().toTimeString().split(" ")[0];

      formData.append("fecha_inicio", dato);
      // ========================== HISTORICO ======================
      // CAPTURA DE DATOS PARA EL HISTORICO ========================
      let queryGetDatos = await fetch(
        `${base_url}/TaskList/getData/${idCapturado}/${tipoCapturado}`
      );
      let dataGetDatos = await queryGetDatos.json();
      console.log("Datos: ", dataGetDatos);

      // ==========================================================

      query2 = await fetch(
        `${base_url}/TaskList/changeToPendiente/${idCapturado}`,
        {
          method: "POST",
          body: formData,
        }
      );

      getPendientes();
      getEnProceso();

      if (formData.get("tipoEntidad") == "incidente") {
        tipoOperacion = "Actualización";
        descripcionOperacion = `La Incidencia: <strong>${dataGetDatos.nombre_tipo}</strong>,
        Con Fecha de Asignacion: <strong>${dataGetDatos.fecha_asignacion_formateada}</strong>
        Y Asignada al Equipo: <strong>${dataGetDatos.nombre_equipo}</strong>
        Cambio su estado a <strong>En Proceso</strong>`;
        estadoOperacion = 1;
        historico(tipoOperacion, descripcionOperacion, estadoOperacion);
      } else {
        tipoOperacion = "Actualización";
        descripcionOperacion = `El Proyecto: <strong>${dataGetDatos.nombre_proyecto}</strong>,
        Con Fecha de Asignacion: <strong>${dataGetDatos.fecha_asignacion_formateada}</strong>
        Y Asignado al Equipo: <strong>${dataGetDatos.nombre_equipo}</strong>
        Cambio su estado a <strong>En Proceso</strong>`;
        estadoOperacion = 1;
        historico(tipoOperacion, descripcionOperacion, estadoOperacion);
      }
      // =======================================================================

      // Si está en estado "En Proceso", cambiar a "Finalizado"
    } else if (value === "En Proceso") {
      // VALIDACION ===========================================
      let textArea = formTask.querySelectorAll("textarea");
      if (textArea.item(0).value === "") {
        alertTimeOut("error", "Campo descripción solucion vacío", 3000);
        return;
      }

      if (
        !validator.isLength(textArea.item(0).value, { min: 8, max: 200 }) ||
        !validator.matches(
          textArea.item(0).value,
          /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
        )
      ) {
        alertTimeOut(
          "error",
          "Descripción solucion inválida, entre 8 y 200 caracteres",
          3000
        );
        return;
      }

      // ======================================================

      // ========================== HISTORICO ======================
      // CAPTURA DE DATOS PARA EL HISTORICO ========================
      let queryGetDatos = await fetch(
        `${base_url}/TaskList/getData/${idCapturado}/${formData.get(
          "tipoEntidad"
        )}`
      );
      let dataGetDatos = await queryGetDatos.json();
      console.log("Datos: ", dataGetDatos);
      // ==========================================================

      query2 = await fetch(
        `${base_url}/TaskList/changeToEnproceso/${idCapturado}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (formData.get("tipoEntidad") == "incidente") {
        tipoOperacion = "Actualización";
        descripcionOperacion = `La Incidencia: <strong>${
          dataGetDatos.nombre_tipo
        }</strong>,
        Y Asignada al Equipo: <strong>${dataGetDatos.nombre_equipo}</strong>
        Cambio su estado a <strong>Finalizado</strong>, Bajo el Motivo: ${formData.get(
          "descripcion_solucion"
        )}`;
        estadoOperacion = 1;
        historico(tipoOperacion, descripcionOperacion, estadoOperacion);
      } else {
        tipoOperacion = "Actualización";
        descripcionOperacion = `El Proyecto: <strong>${
          dataGetDatos.nombre_proyecto
        }</strong>,
        Y Asignado al Equipo: <strong>${dataGetDatos.nombre_equipo}</strong>
        Cambio su estado a <strong>Finalizado</strong>, Bajo el Motivo: ${formData.get(
          "descripcion_solucion"
        )}`;
        estadoOperacion = 1;
        historico(tipoOperacion, descripcionOperacion, estadoOperacion);
      }
      // =======================================================================
    }
    // VERIFICACIÓN DE ESTADO DE LA SEGUNDA CONSULTA
    console.log(query2);

    if (query2 && query2.ok) {
      let response = await query2.json();
      let { status, msg, title } = response;

      if (status) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          text: value === "Pendiente" ? "Tarea Iniciada" : "Tarea Finalizada",
          showConfirmButton: false,
          timer: 1500,
        });
        // value === "Pendiente" ? getPendientes() : getEnProceso();
        getEnProceso();
        getFinalizados();
        btnClose.click();
      } else {
        Swal.fire({
          icon: "error",
          title,
          text: msg,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al cambiar el estado de la tarea.",
        showConfirmButton: true,
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al obtener el estado de la tarea.",
      showConfirmButton: true,
    });
  }
});

addEventListener("DOMContentLoaded", () => {
  getPendientes();
  getEnProceso();
  getFinalizados();
});
