function modalView() {
  const myModal = new bootstrap.Modal("#modalView");
  myModal.show();
}

let datosFiltro = [];
let listaCard = document.getElementById("listaCard");
let listaCard2 = document.getElementById("listaCard2");
const titleCard = document.getElementById("titleCard");
const titleCard2 = document.getElementById("titleCard2");
let idCapturado = ""; //Captura el id incidencia de la card para ser usado
let tipoCapturado = "";
let textarea = document.getElementById("descripcion_solucion"); // esto es el input oculto
let label = document.getElementById("label_solucion"); // label del input oculto

// ============== VARIALBLES HISTORICO =================
let tipoOperacion = "";
let descripcionOperacion = "";
let estadoOperacion = 0;

// =====================================================

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

function reload() {
  window.location.reload();
}

//FUNCIÓN PARA EL BOTON DE LAS TAREAS PENDIENTES
async function cardPendiente() {
  let idUsuario = document.getElementById("idUsuario").textContent;

  // Obtener equipos del usuario
  let query2 = await fetch(`${base_url}/TaskList/getEquipo/${idUsuario}`);
  let equipos = await query2.json();

  // Verificar si el usuario pertenece a algún equipo
  if (equipos.length === 0) {
    listaCard.innerHTML = `
      <header class="container-fluid mt-2">
        <div class="border rounded bg-danger p-1 text-white text-center">
          <h3>Sin equipo asignado</h3>
        </div>
      </header>
      <div class="text-center mt-4">No perteneces a ningún equipo.</div>`;
    listaCard2.innerHTML = ""; // Limpiar el contenido de listaCard2 también
    return;
  }

  // Arrays para almacenar datos de incidentes y proyectos
  let dataIncidentes = [];
  let dataProyectos = [];

  // Iterar sobre cada equipo y obtener datos de incidentes y proyectos pendientes
  for (let equipo of equipos) {
    // Obtener incidentes pendientes
    let queryIncidentes = await fetch(
      `${base_url}/TaskList/getIncident/${equipo.id_equipo}`
    );
    let incidentes = await queryIncidentes.json();
    dataIncidentes.push(...incidentes);

    // Obtener proyectos pendientes
    let queryProyectos = await fetch(
      `${base_url}/TaskList/getProject/${equipo.id_equipo}`
    );
    let proyectos = await queryProyectos.json();
    dataProyectos.push(...proyectos);
  }

  datosFiltro.push(...dataIncidentes, ...dataProyectos);

  // Construir la sección de incidentes pendientes
  let titulo = `
    <header class="container-fluid mt-2">
      <div class="border rounded bg-danger p-1 text-white text-center">
        <h3>Incidencias Pendientes</h3>
      </div>
    </header>`;

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
    secitonsIncidents += `<div class="text-center mt-4">No hay incidencias finalizadas</div>`;
    divs2 = secitonsIncidents;
  }

  // Construir la sección de proyectos pendientes
  let tituloProyecto = `
    <header class="container-fluid mt-2">
      <div class="border rounded bg-danger p-1 text-white text-center">
        <h3>Proyectos Pendientes</h3>
      </div>
    </header>`;

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
    cardProyectos = `<div class="text-center">No hay proyectos pendientes</div>`;
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

  titleCard.innerHTML = titulo;
  titleCard2.innerHTML = tituloProyecto;
  listaCard.innerHTML = `<div class='d-flex flex-column w-100'>${tab2}${divs2}</div>`;
  listaCard2.innerHTML = `<div class='d-flex flex-column w-100'>${tab}${divs}</div>`;
}

//FUNCIÓN PARA EL BOTÓN DE LAS TAREAS EN PROCESO
async function cardEnProceso() {
  let idUsuario = document.getElementById("idUsuario").textContent;

  // Obtener equipos del usuario
  let query2 = await fetch(`${base_url}/TaskList/getEquipo/${idUsuario}`);
  let equipos = await query2.json();

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
    dataIncidentes.push(...incidentes);

    // Obtener proyectos en proceso
    let queryProyectos = await fetch(
      `${base_url}/TaskList/getProjectInProcess/${equipo.id_equipo}`
    );
    let proyectos = await queryProyectos.json();
    dataProyectos.push(...proyectos);
  }

  datosFiltro.push(...dataIncidentes, ...dataProyectos);

  // Construir la sección de incidentes en proceso
  let titulo = `
    <header class="container-fluid mt-2">
      <div class="border rounded bg-primary p-1 text-white text-center">
        <h3>Incidencias En Proceso</h3>
      </div>
    </header>`;

  let cardIncidentes = "";
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
    secitonsIncidents += `<div class="text-center mt-4">No hay incidencias finalizadas</div>`;
    divs2 = secitonsIncidents;
  }

  // Construir la sección de proyectos finalizados
  let tituloProyecto = `
    <header class="container-fluid mt-2">
      <div class="border rounded bg-primary p-1 text-white text-center">
        <h3>Proyectos En Proceso</h3>
      </div>
    </header>`;

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

  let btnModal = document.getElementById("action");
  let btnClose = document.getElementById("btnClose");
  btnModal.textContent = "Finalizado";
  btnModal.style.display = "block";
  btnClose.style.display = "none";

  titleCard.innerHTML = titulo;
  titleCard2.innerHTML = tituloProyecto;
  listaCard.innerHTML = `<div class='d-flex flex-column w-100'>${tab2}${divs2}</div>`;
  listaCard2.innerHTML = `<div class='d-flex flex-column w-100'>${tab}${divs}</div>`;
}

//FUNCIÓN PARA EL BOTON DE LAS TAREAS FINALIZADAS
async function cardFinalizado() {
  let idUsuario = document.getElementById("idUsuario").textContent;

  // Obtener equipos del usuario
  let query2 = await fetch(`${base_url}/TaskList/getEquipo/${idUsuario}`);
  let equipos = await query2.json();

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
    dataIncidentes.push(...incidentes);
    console.log(dataIncidentes);

    // Obtener proyectos finalizados
    let queryProyectos = await fetch(
      `${base_url}/TaskList/getProjectFinalized/${equipo.id_equipo}`
    );
    let proyectos = await queryProyectos.json();
    dataProyectos.push(...proyectos);
  }

  datosFiltro.push(...dataIncidentes, ...dataProyectos);

  // Construir la sección de incidentes finalizados
  let titulo = `
    <header class="container-fluid mt-2">
      <div class="border rounded bg-success p-1 text-white text-center">
        <h3>Incidencias Finalizadas</h3>
      </div>
    </header>`;

  let cardIncidentes = "";
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
    secitonsIncidents += `<div class="text-center mt-4">No hay incidencias finalizadas</div>`;
    divs2 = secitonsIncidents;
  }

  // Construir la sección de proyectos finalizados
  let tituloProyecto = `
    <header class="container-fluid mt-2">
      <div class="border rounded bg-success p-1 text-white text-center">
        <h3>Proyectos Finalizados</h3>
      </div>
    </header>`;

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
    cardProyectos = `<div class="text-center">No hay proyectos finalizados</div>`;
    divs += `<div class="tab-pane fade show active">${cardProyectos}</div>`;
  }

  tab += `</ul>`;
  divs += `</div>`;
  tab2 += `</ul>`;
  divs2 += `</div>`;

  // Actualizar el DOM

  // Definición de la sección de botones modal
  let btnModal = document.getElementById("action");
  let btnClose = document.getElementById("btnClose");
  btnClose.style.display = "block";
  btnModal.style.display = "none";

  titleCard.innerHTML = titulo;
  titleCard2.innerHTML = tituloProyecto;
  listaCard.innerHTML = `<div class='d-flex flex-column w-100'>${tab2}${divs2}</div>`;
  listaCard2.innerHTML = `<div class='d-flex flex-column w-100'>${tab}${divs}</div>`;
}

let tipoEstadoTaskLst = "";

//FUNCIÓN PARA LLENAR LA INFORMACIÓN CORRESPONDIENTE DEL MODAL
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

  console.log(data);

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
    if (data[0].estado === "En Proceso") {
      // Muestra el label y el textarea
      textarea.style.display = "block";
      label.style.display = "block";
      textarea.value = "";
      textarea.removeAttribute("readonly"); // Establece el textarea como solo lectura
    } else if (data[0].estado === "Finalizado") {
      // Muestra el label y el textarea y haz que el textarea sea de solo lectura
      textarea.style.display = "block";
      label.style.display = "block";
      textarea.textContent = data[0].descripcion_solucion;
      textarea.setAttribute("readonly", true); // Establece el textarea como solo lectura
    }
  } else if (tipo === "proyecto") {
    let [dia, mes, anio] = data[0].fecha_inicio_formateada.split("-");
    let fechaComparar = `${dia}/${mes.replace("0", "")}/${anio}`;
    console.log(fechaComparar === new Date().toLocaleDateString());

    if (fechaComparar != new Date().toLocaleDateString()) {
      Swal.fire({
        icon: "info",
        title: "Tareas Asignadas",
        text: `Proyecto destinado para iniciar el dia: ${fechaComparar}`,
        showConfirmButton: false,
        timer: 2000,
      });

      return;
    }

    titleModal.textContent = "Proyecto";
    categoryModal.textContent = data[0].nombre;
    descriptionModal.textContent = data[0].descripcion;
    textarea.style.display = "none"; // Oculta el textarea
    label.style.display = "none"; // Oculta el label del textarea

    textModal.innerHTML =
      "<strong>Fecha de inicio:</strong> " + data[0].fecha_inicio_formateada;
    // console.log(data);
    if (data[0].estado === "En Proceso") {
      titleModal.textContent = "Proyecto";
      categoryModal.textContent = data[0].nombre;
      descriptionModal.textContent = data[0].descripcion;
      textarea.style.display = "block"; // Oculta el textarea
      label.style.display = "block"; // Oculta el label del textarea

      textModal.innerHTML =
        "<strong>Fecha de inicio:</strong> " + data[0].fecha_inicio_formateada;
    } else if (data[0].estado === "Finalizado") {
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

// FUNCIÓN PARA CAMBIAR COLORES
$(document).ready(function () {
  function cambiarColor(
    boton,
    colorNuevo,
    botonAction,
    colorAction,
    div,
    nuevoFondo
  ) {
    // Volver a la clase original para todos los botones excepto el botón "action"
    $(".btn")
      .not("#back")
      .removeClass("btn-danger btn-primary btn-success")
      .addClass("btn-transparent");
    $(".modal-header")
      .removeClass("bg-danger bg-primary bg-success")
      .addClass("bg-transparent");
    // Cambiar el color del botón presionado
    $(boton).removeClass("btn-transparent").addClass(colorNuevo);
    $(div).removeClass("bg-transparent").addClass(nuevoFondo);
    $(botonAction).removeClass("btn-transparent").addClass(colorAction);
  }
  // Evento de clic para cada botón
  $("#btn1").click(function () {
    cambiarColor(
      "#btn1",
      "btn-danger",
      "#action",
      "btn-primary",
      "#headerModal",
      "bg-danger"
    );
  });
  $("#btn2").click(function () {
    cambiarColor(
      this,
      "btn-primary",
      "#action",
      "btn-success",
      "#headerModal",
      "bg-primary"
    );
  });
  $("#btn3").click(function () {
    cambiarColor(
      this,
      "btn-success",
      "#action",
      "btn-success",
      "#headerModal",
      "bg-success"
    );
  });
});

//FILTRO PARA TARJETAS (búsqueda)
function filtrarTarjetas() {
  let input = document.getElementById("searchInput");
  let filter = input.value.toLowerCase();
  let cardContainers = document.querySelectorAll("#listaCard, #listaCard2");

  cardContainers.forEach((container) => {
    let cards = container.getElementsByClassName("card-wrap");
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      let textContent = card.textContent || card.innerText;
      if (textContent.toLowerCase().indexOf(filter) > -1) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    }
  });
}

//FUNCION PARA CAMBIAR EL ESTADO DE LA TAREA
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
        value === "Pendiente" ? cardPendiente() : cardEnProceso();
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

// ===================== HISTORICO DE OPERACIONES ======================
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
