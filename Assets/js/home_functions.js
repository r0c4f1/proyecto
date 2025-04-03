const IncidenciasPendientesTable = new DataTable("#tablePendientes", {
  layout: {
    topEnd: false,
    topStart: {
      search: {
        placeholder: "Buscar",
      },
    },
  },
  language: {
    url: `${base_url}/Assets/js/plugins/datatables/es-ES.json`,
  },
  columns: [
    {
      data: "nombres",
    },
    {
      data: "fecha_reporte",
    },
    {
      data: "fecha_asignacion",
    },
    {
      data: "descripcion",
    },
    {
      data: "nombre_equipo",
    },
  ],
  // dom: "lfrtip",
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});
const IncidenciasEnProcesoTable = new DataTable("#tableEnProceso", {
  layout: {
    topEnd: false,
    topStart: {
      search: {
        placeholder: "Buscar",
      },
    },
  },
  language: {
    url: `${base_url}/Assets/js/plugins/datatables/es-ES.json`,
  },
  columns: [
    {
      data: "nombres",
    },
    {
      data: "fecha_reporte",
    },
    {
      data: "fecha_asignacion",
    },
    {
      data: "fecha_inicio",
    },
    {
      data: "descripcion",
    },
    {
      data: "nombre_equipo",
    },
  ],
  // dom: "lfrtip",
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});
const IncidenciasFinalizadasTable = new DataTable("#tableFinalizadas", {
  layout: {
    topEnd: false,
    topStart: {
      search: {
        placeholder: "Buscar",
      },
    },
  },
  language: {
    url: `${base_url}/Assets/js/plugins/datatables/es-ES.json`,
  },
  columns: [
    {
      data: "nombres",
    },
    {
      data: "fecha_reporte",
    },
    {
      data: "fecha_asignacion",
    },
    {
      data: "fecha_inicio",
    },
    {
      data: "fecha_solucion",
    },
    {
      data: "descripcion",
    },
    {
      data: "nombre_equipo",
    },
  ],
  // dom: "lfrtip",
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});

const ctx = document.getElementById("myChart");
const ctx2 = document.getElementById("myChart2");
const ctx3 = document.getElementById("myChart3");
const ctx4 = document.getElementById("myChart4");
const ctx5 = document.getElementById("myChart5");
const ctx6 = document.getElementById("myChart6");
const ctx7 = document.getElementById("myChart7");
const ctx8 = document.getElementById("myChart8");
const ctx9 = document.getElementById("myChart9");
const ctx10 = document.getElementById("myChart10");

// VARIABLES GLOBALES
let datosFiltro = [];
let totalIncidentsAndFinalized = document.getElementById(
  "totalIncidentsAndFinalized"
);
let avgIncidentResolution = document.getElementById("avgIncidentResolution");
let totalAvgIncidentResolution = document.getElementById(
  "totalAvgIncidentResolution"
);
let avgResources = document.getElementById("avgResources");
let teamTopIncidents = document.getElementById("teamTopIncidents");
let mostDepletedResource = document.getElementById("mostDepletedResource");
let filaIndicadorGeneroPersonal = document.getElementById(
  "filaIndicadorGeneroPersonal"
);
let filaIndicadorProyecto = document.getElementById("filaIndicadorProyecto");
let avgTraining = document.getElementById("avgTraining");

function estadisticas(labels, data, element, type, label, fn) {
  let miChart = "";
  if (element && element.offsetParent !== null) {
    miChart = new Chart(element, {
      type,
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            borderWidth: 2,
            backgroundColor: [
              "rgb(220, 53, 69)", // Color para la primera barra
              "rgb(0, 123, 255)", // Color para la segunda barra
              "rgb(40, 167, 69)", // Color para la tercera barra
              "rgb(255, 193, 7)", // Color para la cuarta barra
            ],
            spacing: 0.5,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              display: false, // Oculta las etiquetas del eje Y
            },
            grid: {
              display: false, // Oculta las líneas de la cuadrícula del eje Y
              drawBorder: false,
            },
          },
          x: {
            ticks: {
              display: false, // Oculta las etiquetas del eje X
            },
            grid: {
              drawOnChartArea: false,
              drawTicks: false,
            },
          },
        },
        plugins: {
          title: {
            display: false,
          },
          legend: {
            labels: {
              font: {
                size: 12, // Aumentar el tamaño de la fuente en la leyenda
              },
            },
          },
          tooltip: {
            bodyFont: {
              size: 12, // Aumentar el tamaño de la fuente en los tooltips
            },
            titleFont: {
              size: 12, // Aumentar el tamaño de la fuente en el título de los tooltips
            },
          },
        },
      },
    });
  }
  if (element && element.offsetParent !== null) {
    element.addEventListener("click", (event) => {
      const puntos = miChart.getElementsAtEventForMode(
        event,
        "nearest",
        {
          intersect: true,
        },
        true
      );

      if (puntos.length) {
        const puntoIndice = puntos[0].index;
        const etiqueta = miChart.data.labels[puntoIndice];
        const valor = miChart.data.datasets[0].data[puntoIndice];

        // Evento personalizado
        fn(etiqueta, valor);

        // Aquí puedes agregar más lógica o llamar a una función personalizada
      }
    });
  }
}

function estadisticasModeloDos(labels, data, element, type, label, fn) {
  const miChart = new Chart(element, {
    type,
    data: {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          label: label,
          data,
          borderWidth: 6,
          borderColor: "rgba(54, 148, 93, 0.33)", // Color del borde de la línea
          backgroundColor: "rgb(54, 148, 93)", // Fondo semitransparente
          tension: 0.1, // Suaviza las líneas
          pointRadius: 10,
          pointHoverRadius: 15,
        },
      ],
    },
    options: {
      radius: 10,
      hoverBorderWidth: 15,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            display: true,
          },
          grid: {
            display: true,
            drawBorder: true,
          },
        },
        x: {
          ticks: {
            display: true, // Mostrar las etiquetas del eje X
            font: {
              size: 10, // Cambiar el tamaño de la fuente a un valor más pequeño (por ejemplo, 10px)
            },
            maxRotation: 0, // Forzar que las etiquetas estén completamente horizontales
            minRotation: 0, // Evita que Chart.js gire las etiquetas automáticamente
          },
          grid: {
            drawOnChartArea: false, // Desactiva la cuadrícula si es necesario
          },
        },
      },
      plugins: {
        // Aquí está correctamente cerrado
        legend: {
          labels: {
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 12,
          },
          titleFont: {
            size: 12,
          },
        },
      },
    },
  });

  element.addEventListener("click", (event) => {
    const puntos = miChart.getElementsAtEventForMode(
      event,
      "nearest",
      {
        intersect: true,
      },
      true
    );

    if (puntos.length) {
      const puntoIndice = puntos[0].index;
      const etiqueta = miChart.data.labels[puntoIndice];
      const valor = miChart.data.datasets[0].data[puntoIndice];

      // Evento personalizado
      fn(etiqueta, valor);

      // Aquí puedes agregar más lógica o llamar a una función personalizada
    }
  });
}

async function manejador(etiqueta, valor) {
  // ----- OBTIENE LOS CARGOS DE TRABAJO DE HOMBRES Y MUJERES -----
  let queryJob = await fetch(`${base_url}/Home/getJob`);
  let dataJob = await queryJob.json();

  datosFiltro.push(...dataJob);

  let titleModalGender = document.getElementById("titleModalGender");

  titleModalGender.textContent = `Personal`;

  let queryIndicatorGender = await fetch(`${base_url}/Home/getGenderIndicator`);
  let data = await queryIndicatorGender.json();
  let mujeres = 0;
  let hombres = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].sexo === "F") mujeres = data[i].cantidad;
    else hombres = data[i].cantidad;
  }

  let card = ``;

  for (let i = 0; i < dataJob.length; i++) {
    card += `
      <div class="d-flex">
        <ul class="col-4 pointer">
          <li class="list-group-item fw-bold mb-1" onclick="alertaUsuarioPorCargo('${dataJob[i].cargo}')">${dataJob[i].cargo}</li>
        </ul>
        <ul class="col-4 text-center">
          <li class="list-group-item fw-bold text-danger mb-1">${dataJob[i].Femenino}</li>
        </ul>
        <ul class="col-4 text-center">
          <li class="list-group-item fw-bold text-primary mb-1">${dataJob[i].Masculino}</li>
        </ul>
      </div>
    `;
  }

  card += `
    <div class="p-1 border-primary border-top d-flex">
    <ul class="col-4">
      <li class="list-group-item fw-bold mb-1">Total</li>
      </ul>
    <ul class="col-4">
      <li class="list-group-item fw-bold text-danger mb-1 text-center">${mujeres}</li>
      </ul>
      <ul class="col-4">
      <li class="list-group-item fw-bold text-primary mb-1 text-center">${hombres}</li>
      </ul>
    </div>
  `;

  filaIndicadorGeneroPersonal.innerHTML = card;

  const myModal = new bootstrap.Modal("#modalIndicadorGeneroPersonal");

  myModal.show();
}

async function manejadorProyecto(etiqueta, valor) {
  // ----- OBTIENE LOS PROYECTOS POR TITULO Y SU PROGRESO -----
  let queryProjectStates = "";
  if (userLevel >= 1) {
    queryProjectStates = await fetch(
      `${base_url}/Home/getProjectStates/${userLevel}/${unidad}/0`
    );
  } else {
    queryProjectStates = await fetch(
      `${base_url}/Home/getProjectPerUserStates`
    );
  }
  let dataProjectStates = await queryProjectStates.json();

  datosFiltro.push(...dataProjectStates);

  let titleModalProject = document.getElementById("titleModalProject");
  titleModalProject.textContent = `Proyecto`;

  let card = ``;

  for (let i = 0; i < dataProjectStates.length; i++) {
    // Asignar clase de Bootstrap dependiendo del estado
    let estadoClass = "";
    if (dataProjectStates[i].estado === "Pendiente") {
      estadoClass = "text-danger"; // Clase para "danger"
    } else if (dataProjectStates[i].estado === "En proceso") {
      estadoClass = "text-primary"; // Clase para "primary"
    } else if (dataProjectStates[i].estado === "Finalizado") {
      estadoClass = "text-success"; // Clase para "success"
    }

    if (userLevel >= 1) {
      card += `
      <div class="d-flex">
        <ul class="col-4 pointer">
        <li class="list-group-item fw-bold mb-1" onclick="descripcionProyecto(${dataProjectStates[i].id_proyecto}, '${dataProjectStates[i].nombre}')">
    <small>${dataProjectStates[i].nombre}</small>
  </li>
        </ul>
  
        <ul class="col-4 text-center">
          <li class="list-group-item fw-bold mb-1 ${estadoClass}">${dataProjectStates[i].estado}</li>
        </ul>
  
        <ul class="col-4 text-center">
          <li class="list-group-item fw-bold mb-1"><small>${dataProjectStates[i].nombre_equipo}</small></li>
        </ul>
      </div>
      `;
    } else {
      card += `
      <div class="d-flex">
        <ul class="col-4 pointer">
        <li class="list-group-item fw-bold mb-1" onclick="descripcionProyectoPorMes(${dataProjectStates[i].id_proyecto}, '${dataProjectStates[i].nombre}')">
    <small>${dataProjectStates[i].nombre}</small>
  </li>
        </ul>
  
        <ul class="col-4 text-center">
          <li class="list-group-item fw-bold mb-1 ${estadoClass}">${dataProjectStates[i].estado}</li>
        </ul>
  
        <ul class="col-4 text-center">
          <li class="list-group-item fw-bold mb-1"><small>${dataProjectStates[i].nombre_equipo}</small></li>
        </ul>
      </div>
      `;
    }
  }

  filaIndicadorProyecto.innerHTML = card;

  const myModal = new bootstrap.Modal("#modalIndicadorProyecto");
  myModal.show();
}

async function descripcionProyecto(id_proyecto, nombre) {
  let queryProject = await fetch(
    `${base_url}/Home/getProjectStates/${userLevel}/${unidad}/${id_proyecto}`
  );
  let dataProject = await queryProject.json();

  if (!dataProject || !Array.isArray(dataProject)) {
    Swal.fire(
      "Error",
      "El servidor devolvió una respuesta inválida o no hay datos disponibles",
      "error"
    );
    return;
  }

  const project = dataProject.find((p) => p.id_proyecto === id_proyecto);
  if (!project) {
    Swal.fire("Error", "No se encontró el proyecto especificado", "error");
    return;
  }
  console.log("Miembros del equipo:", project.datosUsuariosEquipo);

  let miembrosEquipo = "";
  if (
    !Array.isArray(project.datosUsuariosEquipo) ||
    project.datosUsuariosEquipo.length === 0
  ) {
    miembrosEquipo = `<p class="text-muted">No hay miembros en el equipo</p>`;
  } else {
    for (let i = 0; i < project.datosUsuariosEquipo.length; i++) {
      const el = project.datosUsuariosEquipo[i];
      let nombre = el.nombres.split(" ")[0];
      let apellido = el.apellidos.split(" ")[0];
      let avatar = `${nombre[0]}${apellido[0]}`;

      miembrosEquipo += ` <div class="d-flex align-items-center p-2 border rounded mb-2">
                <div class="avatar rounded me-3">${avatar}</div>
                <div>
                  <p class="mb-0 fw-medium">${nombre} ${apellido}</p>
                  <span class="badge bg-light text-dark border w-100">${el.id_usuario}</span>
                  <span class="badge bg-light text-dark border w-100">${el.telefono}</span>
                  <span class="badge bg-light text-dark border w-100">${el.email}</span>
                </div>
              </div>`;
    }
  }

  let descripcion = project.descripcion || "No hay descripción disponible";
  let fechaFin =
    !project.fecha_fin || project.fecha_fin === "null"
      ? "Sin fecha de finalización"
      : project.fecha_fin;

  let card = /* html */ `
    <div class="container">
      <div class="card mx-auto" style="max-width: 500px;">
        <div class="card-header text-center bg-white border-bottom-0 pt-4">
          <h4 class="fw-bold text-center w-100">${project.nombre}</h4>
        </div>
        <div class="card-body">
          <p class="text-muted">Descripción del Proyecto</p>
          <div class="bg-light p-3 rounded mb-3">
            <p class="text-center mb-0">${descripcion}</p>
          </div>
          <div class="mb-3">
            <div class="d-flex align-items-center mb-2">
              <i class="bi bi-calendar me-2 text-secondary"></i>
              <div>
                <p class="mb-0 small fw-medium text-start">Fecha inicio:</p>
                <p class="mb-0 fs-6">${project.fecha_inicio}</p>
              </div>
            </div>
            <div class="d-flex align-items-center mb-3">
              <i class="bi bi-clock me-2 text-secondary"></i>
              <div>
                <p class="mb-0 small fw-medium text-start">Fecha Final:</p>
                <p class="mb-0 text-start fs-6">${fechaFin}</p>
              </div>
            </div>
          </div>
          <button class="btn btn-outline-secondary w-100 mb-3" id="teamToggle">
            <i class="bi bi-people"></i> Ver Equipo
          </button>
          <div class="team-section" id="teamSection">
            ${miembrosEquipo}
          </div>
        </div>
      </div>
    </div>
  `;

  Swal.fire({
    html: card,
    confirmButtonText: "Cerrar",
    confirmButtonColor: "#6c757d",
  });

  const teamToggle = document.getElementById("teamToggle");
  if (teamToggle) {
    teamToggle.addEventListener("click", function () {
      const teamSection = document.getElementById("teamSection");
      teamSection.classList.toggle("show");

      teamToggle.innerHTML = teamSection.classList.contains("show")
        ? '<i class="bi bi-people me-2"></i> Ocultar Equipo'
        : '<i class="bi bi-people me-2"></i> Ver Equipo';
    });
  }
}

async function descripcionProyectoPorMes(id_proyecto, nombre) {
  let queryProject = await fetch(
    `${base_url}/Home/getProjectPerUserStates/${id_proyecto}`
  );
  let dataProject = await queryProject.json();

  console.log("Datos del servidor:", dataProject);

  const project = dataProject.find((p) => p.id_proyecto === id_proyecto);
  let miembrosEquipo = "";

  for (let i = 0; i < project.datosUsuariosEquipo.length; i++) {
    const el = project.datosUsuariosEquipo[i];
    let nombre = el.nombres.split(" ")[0];
    let apellido = el.apellidos.split(" ")[0];

    let avatar = `${nombre[0]}${apellido[0]}`;

    miembrosEquipo += ` <div class="d-flex align-items-center p-2 border rounded mb-2">
            <div class="avatar rounded me-3">${avatar}</div>
            <div>
              <p class="mb-0 fw-medium">${nombre} ${apellido}</p>
              <span class="badge bg-light text-dark border w-100">${el.id_usuario}</span>
              <span class="badge bg-light text-dark border w-100">${el.telefono}</span>
              <span class="badge bg-light text-dark border w-100">${el.email}</span>
            </div>
          </div>`;
  }

  let card = /* html */ `
  <div class="container">
    <div class="card mx-auto" style="max-width: 500px;">
      <div class="card-header text-center bg-white border-bottom-0 pt-4">
        <h4 class="fw-bold text-center w-100">${project.nombre}</h4>
        </div>
        
        <div class="card-body">
        <!-- Project Description -->
        <p class="text-muted">Descripción del Proyecto</p>
        <div class="bg-light p-3 rounded mb-3">
          <p class="text-center mb-0">${project.descripcion}</p>
        </div>
        
        <!-- Project Dates -->
        <div class="mb-3">
          <div class="d-flex align-items-center mb-2">
            <i class="bi bi-calendar me-2 text-secondary"></i>
            <div>
              <p class="mb-0 small fw-medium text-start">Fecha inicio:</p>
              <p class="mb-0 fs-6">${project.fecha_inicio}</p>
            </div>
          </div>
          
          <div class="d-flex align-items-center mb-3">
            <i class="bi bi-clock me-2 text-secondary"></i>
            <div>
              <p class="mb-0 small fw-medium text-start">Fecha Final:</p>
              <p class="mb-0 text-start fs-6">${
                project.fecha_fin === null
                  ? "Sin fecha de finalización"
                  : project.fecha_fin
              }</p>
            </div>
          </div>
        </div>
        
        <!-- Team Toggle Button -->
        <button class="btn btn-outline-secondary w-100 mb-3" id="teamToggle">
          <i class="bi bi-people"></i> Ver Equipo
        </button>
        
        <!-- Team Members Section -->
     
           <div class="team-section" id="teamSection">
          <h5 class="d-flex align-items-center mb-3">
            <i class="bi bi-people me-2"></i> Miembros del Equipo
          </h5>
          
          <!-- Team Member 1 -->
          ${miembrosEquipo}
          
      
        </div>
         
      </div>
      
    </div>
  </div>
`;

  Swal.fire({
    html: card,
    confirmButtonText: "Cerrar",
    confirmButtonColor: "#6c757d",
  });
  document.getElementById("teamToggle").addEventListener("click", function () {
    const teamSection = document.getElementById("teamSection");
    const button = document.getElementById("teamToggle");

    teamSection.classList.toggle("show");

    if (teamSection.classList.contains("show")) {
      button.innerHTML = '<i class="bi bi-people me-2"></i> Ocultar Equipo';
    } else {
      button.innerHTML = '<i class="bi bi-people me-2"></i> Ver Equipo';
    }
  });
}

async function manejadorIncidenciasPorMes(etiqueta, valor) {
  let titleModalIncidenciasPorMes = document.getElementById(
    "titleModalIncidenciasPorMes"
  );
  titleModalIncidenciasPorMes.textContent = `Lista Incidencias Por Mes`;

  // Realiza la solicitud para obtener las tareas por mes
  let queryTasksPerMonth = await fetch(
    `${base_url}/Home/getTasksPerMonthIndicator/${userLevel}/${unidad}`
  );
  let dataTasksPerMonth = await queryTasksPerMonth.json();

  // Selecciona todos los elementos <li> dentro de cada lista
  let itemsPendientes = document.querySelectorAll("#listaPendientesTotal li");
  let itemsEnProcesos = document.querySelectorAll("#listaEnProcesoTotal li");
  let itemsFinalizados = document.querySelectorAll("#listaFinalizadosTotal li");

  // Inicializa todos los elementos de las listas a "0"
  itemsPendientes.forEach((item) => (item.textContent = "0"));
  itemsEnProcesos.forEach((item) => (item.textContent = "0"));
  itemsFinalizados.forEach((item) => (item.textContent = "0"));

  // Bucle para actualizar las incidencias pendientes
  dataTasksPerMonth.forEach((task) => {
    let monthIndex = task.mes - 1; // Ajusta el valor del mes a un índice de array (0-11)
    if (monthIndex >= 0 && monthIndex < itemsPendientes.length) {
      itemsPendientes[monthIndex].textContent = task.pendiente; // Actualiza con cantidad pendiente
    }
  });

  // Bucle para actualizar las incidencias en proceso
  dataTasksPerMonth.forEach((task) => {
    let monthIndex = task.mes - 1; // Ajusta el valor del mes a un índice de array (0-11)
    if (monthIndex >= 0 && monthIndex < itemsEnProcesos.length) {
      itemsEnProcesos[monthIndex].textContent = task.en_proceso; // Actualiza con cantidad en proceso
    }
  });

  // Bucle para actualizar las incidencias finalizadas
  dataTasksPerMonth.forEach((task) => {
    let monthIndex = task.mes - 1; // Ajusta el valor del mes a un índice de array (0-11)
    if (monthIndex >= 0 && monthIndex < itemsFinalizados.length) {
      itemsFinalizados[monthIndex].textContent = task.finalizado; // Actualiza con cantidad finalizada
    }
  });

  const myModal = new bootstrap.Modal("#modalIndicadorIncidenciasPorMes");
  myModal.show();
}

async function manejadorIncidenciasPorEquipo(etiqueta, valor) {
  // Cambia el título del modal con la etiqueta proporcionada
  let titleModalIncidenciasPorEquipo = document.getElementById(
    "titleModalIncidenciasPorEquipo"
  );
  titleModalIncidenciasPorEquipo.textContent = `Lista de incidencias por mes`;

  // Realiza la solicitud para obtener las tareas por mes
  let queryTasksPerMonth = await fetch(
    `${base_url}/Home/getUserTasksPerMonthIndicator/${userId}`
  );
  let dataTasksPerMonth = await queryTasksPerMonth.json();

  // Selecciona todos los elementos <li> dentro de cada lista
  let itemsPendientes = document.querySelectorAll("#listaPendientes li");
  let itemsEnProcesos = document.querySelectorAll("#listaEnProceso li");
  let itemsFinalizados = document.querySelectorAll("#listaFinalizados li");

  // Inicializa todos los elementos de las listas a "0"
  itemsPendientes.forEach((item) => (item.textContent = "0"));
  itemsEnProcesos.forEach((item) => (item.textContent = "0"));
  itemsFinalizados.forEach((item) => (item.textContent = "0"));

  // Bucle para actualizar las incidencias pendientes
  dataTasksPerMonth.forEach((task) => {
    let monthIndex = task.mes - 1; // Ajusta el valor del mes a un índice de array (0-11)
    if (monthIndex >= 0 && monthIndex < itemsPendientes.length) {
      itemsPendientes[monthIndex].textContent = task.pendiente; // Actualiza con cantidad pendiente
    }
  });

  // Bucle para actualizar las incidencias en proceso
  dataTasksPerMonth.forEach((task) => {
    let monthIndex = task.mes - 1; // Ajusta el valor del mes a un índice de array (0-11)
    if (monthIndex >= 0 && monthIndex < itemsEnProcesos.length) {
      itemsEnProcesos[monthIndex].textContent = task.en_proceso; // Actualiza con cantidad en proceso
    }
  });

  // Bucle para actualizar las incidencias finalizadas
  dataTasksPerMonth.forEach((task) => {
    let monthIndex = task.mes - 1; // Ajusta el valor del mes a un índice de array (0-11)
    if (monthIndex >= 0 && monthIndex < itemsFinalizados.length) {
      itemsFinalizados[monthIndex].textContent = task.finalizado; // Actualiza con cantidad finalizada
    }
  });

  // Muestra el modal
  const myModal = new bootstrap.Modal("#modalIndicadorIncidenciasPorEquipo");
  myModal.show();
}

async function habilitarChart() {
  let query = await fetch(`${base_url}/Settings/getGraficos`);
  let data = await query.json();

  for (let i = 0; i < data.length; i++) {
    const el = data[i];
    if (el.status !== 1) continue;

    let chart = document.getElementById(`chart${el.id_graficos}`);

    if (chart && chart.offsetParent !== null) {
      chart.classList.remove("visually-hidden");

      if (el.id_graficos >= 5 && el.id_graficos <= 9) {
        chart.style.width = "550px";
        chart.style.height = "400px";
      } else {
        chart.style.width = "250px";
        chart.style.height = "250px";
      }
    }
  }
}

// GRAFICO DE HOMBRES Y MUJERES ================================================

document.addEventListener("DOMContentLoaded", async (e) => {
  let queryIndicatorGender = await fetch(`${base_url}/Home/getGenderIndicator`);
  let data = await queryIndicatorGender.json();
  let mujeres = 0;
  let hombres = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].sexo == "M") hombres = data[i].cantidad;
    else mujeres = data[i].cantidad;
  }

  estadisticas(
    ["Mujer", "Hombre"],
    [mujeres, hombres],
    ctx,
    "doughnut",
    "Personal",
    manejador
  );

  // ----- GRAFICO INCIDENCIAS PROYECTOS TOTALES
  if (userLevel != 0) {
    let queryIndicatorProject = await fetch(
      `${base_url}/Home/getProjectIndicator/${userLevel}/${unidad}`
    );
    let dataProject = await queryIndicatorProject.json();

    let pendiente = 0;
    let enProceso = 0;
    let finalizado = 0;

      dataProject.forEach((item) => {
        if(item.estado === "Pendiente") {
          pendiente++;
        }else if(item.estado === "En Proceso") {
          enProceso++;
        }else {
          finalizado++;
        }
      })
      

    estadisticas(
      ["Pendiente", "En Proceso", "Finalizado"],
      [pendiente, enProceso, finalizado],
      ctx2,
      "doughnut",
      "Cantidad",
      manejadorProyecto
    );
  }

  // ------ grafico proyectos por usuario

  let queryIndicatorProjectPerUsuario = await fetch(
    `${base_url}/Home/getProjectIndicatorPerProject/${userId}`
  );
  let dataProjectPerUser = await queryIndicatorProjectPerUsuario.json();

  let pendientePerUser =
    dataProjectPerUser.find((item) => item.estado === "Pendiente")?.cantidad ||
    0;
  let enProcesoPerUser =
    dataProjectPerUser.find((item) => item.estado === "En Proceso")?.cantidad ||
    0;
  let finalizadoPerUser =
    dataProjectPerUser.find((item) => item.estado === "Finalizado")?.cantidad ||
    0;

  estadisticas(
    ["Pendiente", "En Proceso", "Finalizado"],
    [pendientePerUser, enProcesoPerUser, finalizadoPerUser],
    ctx10,
    "doughnut",
    "Cantidad",
    manejadorProyecto
  );

  // ----- GRAFICOS INCIDENCIAS TOTALES
  let queryIndicatorTasksPerUser = await fetch(
    `${base_url}/Home/getTasksPerUserIndicator/${userId}`
  );
  let dataTasksPerUser = await queryIndicatorTasksPerUser.json();

  let tareasPendiente =
    dataTasksPerUser.find((item) => item.estado === "Pendiente")?.cantidad || 0;

  let tareasEnProceso =
    dataTasksPerUser.find((item) => item.estado === "En Proceso")?.cantidad ||
    0;

  let tareasFinalizado =
    dataTasksPerUser.find((item) => item.estado === "Finalizado")?.cantidad ||
    0;

  estadisticas(
    ["Pendiente", "En Proceso", "Finalizado"],
    [tareasPendiente, tareasEnProceso, tareasFinalizado],
    ctx3,
    "doughnut",
    "Cantidad",
    manejadorIncidenciasPorEquipo
  );

  //----- GRAFICO INCIDENCIAS TOTALES
  if(userLevel > 0) {
     let queryIndicatorTasks = await fetch(
    `${base_url}/Home/getAllTasksIndicator/${userLevel}/${unidad}`
  );
  let dataTasks = await queryIndicatorTasks.json();

  let tareasGeneralespendiente =
    dataTasks.find((item) => item.estado === "Pendiente")?.cantidad || 0;
  let tareasGeneralesEnProceso =
    dataTasks.find((item) => item.estado === "En Proceso")?.cantidad || 0;
  let tareasGeneralesFinalizado =
    dataTasks.find((item) => item.estado === "Finalizado")?.cantidad || 0;

  estadisticas(
    ["Pendiente", "En Proceso", "Finalizado"],
    [
      tareasGeneralespendiente,
      tareasGeneralesEnProceso,
      tareasGeneralesFinalizado,
    ],
    ctx4,
    "doughnut",
    "Cantidad",
    manejadorIncidenciasPorMes
  );

  }
 
  habilitarChart();
});

// FUNCIONES PARA OBTENER ALGUNOS DATOS DEL DASHBOARD ------------------------------

document.addEventListener("DOMContentLoaded", async (e) => {
  // ----- OBTIENE LA CANTIDAD DE INCIDENCIAS FINALIZADAS POR EL USUARIO -----
  let queryTasksFinalized = await fetch(
    `${base_url}/Home/getTasksFinalizedPerUserIndicator/${userId}`
  );
  let dataTasksFinalized = await queryTasksFinalized.json();

  // ----- OBTIENE LA CANTIDAD DE INCIDENCIAS TOTALES ASIGNADAS AL USUARIO -----
  let queryTasksNumber = await fetch(
    `${base_url}/Home/getTasksNumberPerUserIndicator/${userId}`
  );
  let dataTasksNumber = await queryTasksNumber.json();

  document.getElementById("totalIncidentsAndFinalized") &&
    (totalIncidentsAndFinalized.textContent = `${dataTasksFinalized.cantidad}/${dataTasksNumber.cantidad}`);

  // ----- OBTIENE EL PROMEDIO DE TIEMPO QUE TOMA RESOLVER UNA INCIDENCIA POR UN USUARIO O EQUIPO -----
  let queryAvgIncidents = await fetch(
    `${base_url}/Home/getAvgIncidentsPerUserIndicator/${userId}`
  );
  let dataAvgIncidents = await queryAvgIncidents.json();

  let promedio = dataAvgIncidents.promedio; // esto es solo para no usar data

  // Aquí usas "conversion" para almacenar el resultado de la función
  const conversion = convertirHorasDecimal(promedio);

  document.getElementById("avgIncidentResolution") &&
    (avgIncidentResolution.textContent = `${conversion.horas} Hora ${conversion.minutos} Minutos`);

  // Usa la variable "conversion" en lugar de "resultado"

  // ----- OBTIENE EL PROMEDIO DE TIEMPO QUE TOMA RESOLVER UNA INCIDENCIA CALCULANDO A TODOS LOS USUARIOS O EQUIPOS -----
  let queryTotalAvgIncidents = await fetch(
    `${base_url}/Home/getTotalAvgIncidentsIndicator`
  );
  let dataTotalAvgIncidents = await queryTotalAvgIncidents.json();

  promedio = dataTotalAvgIncidents.promedio;

  const totalConversion = convertirHorasDecimal(promedio);

  document.getElementById("totalAvgIncidentResolution") &&
    (totalAvgIncidentResolution.textContent = `${totalConversion.horas} Hora ${totalConversion.minutos} Minutos`);

  // ----- OBTIENE PORCENTAJE DE RECURSOS USADOS -----
  let queryAvgResourses = await fetch(`${base_url}/Home/getAvgResourses`);
  let dataAvgResourses = await queryAvgResourses.json();

  if (dataAvgResourses) {
    avgResources.textContent = `${dataAvgResourses[0].nombre} ${dataAvgResourses[0].porcentaje_asignado}%`;
  } else {
    avgResources.textContent = "No hay datos disponibles";
  }

  // ----- OBTIENE EL RECURSO MAS AGOTADO -----
  let queryMostDepletedResource = await fetch(
    `${base_url}/Home/getMostDepletedResource`
  );
  let dataMostDepletedResource = await queryMostDepletedResource.json();
  let iconResource = document.getElementById("recurso");

  if (
    dataMostDepletedResource[0].cantidad >= 0 &&
    dataMostDepletedResource[0].cantidad <= 10
  ) {
    $(iconResource)
      .removeClass("text-secondary text-warning text-success")
      .addClass("text-danger fa-fade");
  } else if (
    dataMostDepletedResource[0].cantidad >= 11 &&
    dataMostDepletedResource[0].cantidad <= 20
  ) {
    $(iconResource)
      .removeClass("text-secondary text-success text-danger fa-fade")
      .addClass("text-warning");
  } else if (dataMostDepletedResource[0].cantidad >= 21) {
    $(iconResource)
      .removeClass("text-danger text-secondary text-warning fa-fade")
      .addClass("text-success");
  }
  if (dataMostDepletedResource) {
    mostDepletedResource.textContent = `${dataMostDepletedResource[0].nombre}: ${dataMostDepletedResource[0].cantidad}`;
  } else {
    mostDepletedResource.textContent = "No hay datos disponibles";
  }

  // ----- OBTIENE EL EQUIPO CON MAS INCIDENCIAS FINALIZADAS -----
  let queryTeamTopIncidents = await fetch(
    `${base_url}/Home/getTeamTopIncidents`
  );
  let dataTeamTopIncidents = await queryTeamTopIncidents.json();
  let iconTeamTopIncidents = document.getElementById("teamIncidents");

  if (dataTeamTopIncidents) {
    teamTopIncidents.textContent = `${dataTeamTopIncidents.nombre_equipo} - Incidencias finalizadas: ${dataTeamTopIncidents.max_finalizado}`;

    let maxFinalizado = dataTeamTopIncidents.max_finalizado;
    if (maxFinalizado >= 0 && maxFinalizado <= 5) {
      $(iconTeamTopIncidents)
        .removeClass("text-secondary text-warning text-success")
        .addClass("text-danger fa-fade");
    } else if (maxFinalizado >= 6 && maxFinalizado <= 10) {
      $(iconTeamTopIncidents)
        .removeClass("text-secondary text-success text-danger fa-fade")
        .addClass("text-warning");
    } else if (maxFinalizado >= 11) {
      $(iconTeamTopIncidents)
        .removeClass("text-danger text-secondary text-warning fa-fade")
        .addClass("text-success");
    }
  } else {
    teamTopIncidents.textContent = "No hay datos disponibles";
  }

  // ----- OBTIENE EL PORCENTAJE DE PARTICIPACION EN CAPACITACIONES -----
  let queryAvgTraining = await fetch(`${base_url}/Home/getAvgTraining`);
  let dataAvgTraining = await queryAvgTraining.json();
  let iconTraining = document.getElementById("capacitacion");

  if (
    dataAvgTraining[0].porcentaje_total >= 0 &&
    dataAvgTraining[0].porcentaje_total <= 30
  ) {
    $(iconTraining)
      .removeClass("text-secondary text-warning text-success")
      .addClass("text-danger fa-fade");
  } else if (
    dataAvgTraining[0].porcentaje_total >= 31 &&
    dataAvgTraining[0].porcentaje_total <= 65
  ) {
    $(iconTraining)
      .removeClass("text-secondary text-success text-danger fa-fade")
      .addClass("text-warning");
  } else if (dataAvgTraining[0].porcentaje_total >= 66) {
    $(iconTraining)
      .removeClass("text-danger text-secondary text-warning fa-fade")
      .addClass("text-success");
  }
  if (dataAvgTraining && dataAvgTraining.length > 0) {
    avgTraining.textContent = `${dataAvgTraining[0].porcentaje_total}%`;
  } else {
    avgTraining.textContent = "No hay datos disponibles";
  }

  // let queryIndicatorTasks = await fetch(
  //   `${base_url}/Home/getAllTasksIndicator`
  // );

  // let tareasNoResueltas = tareasGeneralespendiente + tareasGeneralesEnProceso;
  // let totalTareas = tareasGeneralespendiente + tareasGeneralesEnProceso + tareasGeneralesFinalizado;
  // let resultadoAvgTareas = tareasNoResueltas / totalTareas * 100;
});

function convertirHorasDecimal(decimalHours) {
  // Separar las horas enteras
  const horas = Math.floor(decimalHours);

  // Convertir la fracción decimal a minutos
  const minutosDecimales = decimalHours - horas;
  const minutos = Math.round(minutosDecimales * 60);

  return {
    horas: horas,
    minutos: minutos,
  };
}

// ----- ALERTAS PARA MOSTRAR INFORMACION -----

// ----- MUESTRA EL PROMEDIO DE LAS INCIDENCIAS POR USUARIO O EQUIPO -----
async function alertaPromedioIncidenciasPorUsuario() {
  let queryAvgIncidentsIndicatorGroupByTeam = await fetch(
    `${base_url}/Home/getAvgIncidentsIndicatorGroupByTeam/${userLevel}/${unidad}`
  );
  let dataAvgIncidentsIndicatorGroupByTeam =
    await queryAvgIncidentsIndicatorGroupByTeam.json();

  let tab = `<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">`;
  let divs = `<div class="tab-content" id="myTabContent">`;
  let indice = 1;
  let currentTabIndex = 0; // Índice único para tabs

  const chunkSize = 7;
  const grupos = [];
  for (
    let i = 0;
    i < dataAvgIncidentsIndicatorGroupByTeam.length;
    i += chunkSize
  ) {
    grupos.push(dataAvgIncidentsIndicatorGroupByTeam.slice(i, i + chunkSize));
  }

  datosFiltro.push(...dataAvgIncidentsIndicatorGroupByTeam);

  let primeraLista = ``;
  let segundaLista = ``;

  grupos.forEach((grupo, index) => {
    // Construir las secciones del grupo actual
    grupo.forEach((data) => {
      let conversionPorEquipo = convertirHorasDecimal(data.promedio);
      let conversionPorEquipoResultado = `${conversionPorEquipo.horas} Hora ${conversionPorEquipo.minutos} Minutos`;

      primeraLista += `
      <li class="list-group-item fw-bold">${data.nombre_equipo}:</li>
    `;
      segundaLista += `
      <li class="list-group-item fw-bold">${conversionPorEquipoResultado}</li>
    `;
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
            <div class="tab-pane fade ${index === 0 ? "show active" : ""}" 
                 id="${tabId}" 
                 role="tabpanel" 
                 aria-labelledby="${tabId}-btn" 
                 tabindex="0">
                 <div class='d-flex flex-wrap row'>
                   <ul class="col-4">
                     ${primeraLista}
                    </ul>
                    <ul class="text-primary col-8">
                      ${segundaLista}
                    </ul>
                 </div>
            </div>`;

    currentTabIndex++;
    indice++;
    primeraLista = "";
    segundaLista = "";
  });

  tab += "</ul>";
  divs += "</div>";

  // for (let i = 0; i < dataAvgIncidentsIndicatorGroupByTeam.length; i++) {
  //   let conversionPorEquipo = convertirHorasDecimal(
  //     dataAvgIncidentsIndicatorGroupByTeam[i].promedio
  //   );
  //   let conversionPorEquipoResultado = `${conversionPorEquipo.horas} Hora ${conversionPorEquipo.minutos} Minutos`;

  //   primeraLista += `
  //     <li class="list-group-item fw-bold">${dataAvgIncidentsIndicatorGroupByTeam[i].nombre_equipo}:</li>
  //   `;
  //   segundaLista += `
  //     <li class="list-group-item fw-bold">${conversionPorEquipoResultado}</li>
  //   `;
  // }

  Swal.fire({
    title: "<h4>Tiempo promedio</h4>",
    html: `
      <div class="modal-body overflow-hidden">
     
      
      <div class="d-flex justify-content-center flex-column">
        ${tab}
        <div class="d-flex align-items-center justify-content-center border-bottom border-primary p-2 mb-3">
    <h3 class="col-4 fs-6">
        <i class="fa-brands fa-teamspeak" style="font-size: 24px;"></i>
    </h3>
    <h3 class="col-8 fs-6 text-primary"><i class="fa-regular fa-clock" style="font-size: 24px;"></i> </h3>
</div>
        ${divs}
      </div>
      <div class="modal-footer border-top border-secondary p-2 ">
        
        
        <button id="cerrarBtn" class="btn btn-secondary me-2">Cerrar</button>     
        </div>
    `,
    showConfirmButton: false,
    showCancelButton: false,
    showClass: {
      popup: "animate__animated animate__slideInDown", // Animación de aparición (similar a los modales)
    },
    hideClass: {
      popup: "animate__animated animate__slideOutUp", // Animación de desaparición (similar a los modales)
    },
  });

  document.getElementById("cerrarBtn").addEventListener("click", () => {
    Swal.close();
  });
}

// ----- MUESTRA PROCENTAJE DEL USO DE RECURSOS Y TAMBIEN MUESTRA EL RECURSO MAS DEMANDADO -----
async function alertaPorcentajeRecursosUsados() {
  let queryAvgResoursesAll = await fetch(`${base_url}/Home/getAvgResourses`);
  let dataAvgResoursesAll = await queryAvgResoursesAll.json();

  datosFiltro.push(...dataAvgResoursesAll);

  let card = "";

  let tab = `<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">`;
  let divs = `<div class="tab-content" id="myTabContent">`;
  let indice = 1;
  let currentTabIndex = 0; // Índice único para tabs

  const chunkSize = 7;
  const grupos = [];
  for (let i = 0; i < dataAvgResoursesAll.length; i += chunkSize) {
    grupos.push(dataAvgResoursesAll.slice(i, i + chunkSize));
  }

  let listaRecursos = ``;
  let listaNumeros = ``;
  let listaPorcentajes = ``;

  // Función para formatear los porcentajes
  function formatearNumero(numero) {
    // Verificar si 'numero' es un número
    if (isNaN(numero)) {
      console.error("El valor no es un número:", numero);
      return numero; // Devolver el valor original si no es un número
    }

    // Asegurarse de que 'numero' es un número
    numero = parseFloat(numero);
    return numero % 1 === 0 ? numero.toString() : numero.toFixed(2);
  }

  if (dataAvgResoursesAll.length > 0) {
    grupos.forEach((grupo, index) => {
      // Construir las secciones del grupo actual
      grupo.forEach((data) => {
        listaRecursos += `<li class="list-group-item"><h6>${data.nombre}:</h6></li>`;
        listaNumeros += `<li class="list-group-item"><h6>${data.numero_recursos_utilizados}</h6></li>`;
        listaPorcentajes += `<li class="list-group-item"><h6>${formatearNumero(
          data.porcentaje_asignado
        )} %</h6></li>`;
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
            <div class="tab-pane fade ${index === 0 ? "show active" : ""}" 
                 id="${tabId}" 
                 role="tabpanel" 
                 aria-labelledby="${tabId}-btn" 
                 tabindex="0">
                 <div class='d-flex flex-wrap row '>
                  <ul class="col-6 list-unstyled">
                    ${listaRecursos}
                  </ul>
                  <ul class="col-3 list-unstyled text-primary">
                    ${listaNumeros}
                  </ul>
                  <ul class="col-3 list-unstyled text-primary">
                    ${listaPorcentajes}
                  </ul>
                 </div>
            </div>`;

      currentTabIndex++;
      indice++;
      listaRecursos = ``;
      listaNumeros = ``;
      listaPorcentajes = ``;
    });
  } else {
    listaRecursos = `<div class="text-center">No hay recursos en uso</div>`;
    divs += `<div class="tab-pane fade show active">${card}</div>`;
  }

  tab += "</ul>";
  divs += "</div>";

  // for (let i = 0; i < dataAvgResoursesAll.length; i++) {
  //   listaRecursos += `<li class="list-group-item"><h6>${dataAvgResoursesAll[i].nombre}:</h6></li>`;
  //   listaNumeros += `<li class="list-group-item"><h6>${dataAvgResoursesAll[i].numero_recursos_utilizados}</h6></li>`;
  //   listaPorcentajes += `<li class="list-group-item"><h6>${formatearNumero(
  //     dataAvgResoursesAll[i].porcentaje_asignado
  //   )} %</h6></li>`;
  // }

  Swal.fire({
    title: "<h4>Recursos en uso</h4>",
    html: `
    <div class="modal-body">
      
      <div class="d-flex flex-column overflow-hidden">
         ${tab}
         <div class="d-flex align-items-center border-bottom border-primary p-2 mb-3">
        <h3 class="col-6 fs-6">
          <i class="fa-solid fa-box-open fa-2x"></i>
        </h3>
        <h3 class="col-3 fs-6 text-primary">
          <i class="fas fa-hashtag fa-2x"></i>
        </h3>
        <h3 class="col-3 fs-6 text-primary">
          <i class="fas fa-percentage fa-2x"></i>
        </h3>
      </div>
         ${divs}
      </div>
      <div class="border-top border-secondary d-flex justify-content-between p-2">
        <button class="btn btn-danger custom-swal-button" onclick="reporteIndicadorRecursosUsados()">
          <i class="fas fa-file-pdf fa-2x"></i>
        </button>
        <button id="cerrarBtn" class="btn btn-secondary me-2">Cerrar</button>
      </div>
    </div>
  `,

    showConfirmButton: false,
    showCancelButton: false,
    showClass: {
      popup: "animate__animated animate__slideInDown", // Animación de aparición (similar a los modales)
    },
    hideClass: {
      popup: "animate__animated animate__slideOutUp", // Animación de desaparición (similar a los modales)
    },
  });

  document.getElementById("cerrarBtn").addEventListener("click", () => {
    Swal.close();
  });
}

// ----- MUESTRA EL EQUIPO CON MAS INCIDENCIAS FINALIZADAS Y UNA LISTA DE TODOS LOS EQUIPOS -----

async function alertaEquipoConMasIncidenciasCompletadas() {
  let queryTeamsPerIncidents = await fetch(
    `${base_url}/Home/getTeamsPerIncidents/${userLevel}/${unidad}`
  );
  let dataTeamsPerIncidents = await queryTeamsPerIncidents.json();

  let totalPendiente = 0;
  let totalEnProceso = 0;
  let totalFinalizado = 0;

  datosFiltro.push(...dataTeamsPerIncidents);

  let tab = `<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">`;
  let divs = `<div class="tab-content" id="myTabContent">`;
  let indice = 1;
  let currentTabIndex = 0; // Índice único para tabs

  const chunkSize = 7;
  const grupos = [];
  for (let i = 0; i < dataTeamsPerIncidents.length; i += chunkSize) {
    grupos.push(dataTeamsPerIncidents.slice(i, i + chunkSize));
  }

  let colunma1_nombreEquipo = ``;
  let colunma2_pendiente = ``;
  let colunma3_en_proceso = ``;
  let colunma4_finalizado = ``;

  if (dataTeamsPerIncidents.length > 0) {
    grupos.forEach((grupo, index) => {
      // Construir las secciones del grupo actual
      grupo.forEach((data) => {
        colunma1_nombreEquipo += `
            <li class="list-group-item"><h6>${data.nombre_equipo}</h6></li>
          `;
        colunma2_pendiente += `
            <li class="list-group-item text-danger fw-bold">${data.pendiente}</li>
          `;
        colunma3_en_proceso += `
            <li class="list-group-item text-primary fw-bold">${data.en_proceso}</li>
          `;
        colunma4_finalizado += `
            <li class="list-group-item text-success fw-bold">${data.finalizado}</li>
          `;

        totalPendiente += parseInt(data.pendiente);
        totalEnProceso += parseInt(data.en_proceso);
        totalFinalizado += parseInt(data.finalizado);
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
            <div class="tab-pane fade ${index === 0 ? "show active" : ""}" 
                 id="${tabId}" 
                 role="tabpanel" 
                 aria-labelledby="${tabId}-btn" 
                 tabindex="0">
                 <div class='d-flex flex-wrap row'>
                   <ul class="col-3">
                     ${colunma1_nombreEquipo}
                   </ul>
                   <ul class="col-3">
                     ${colunma2_pendiente}
                   </ul>
                   <ul class="col-3">
                     ${colunma3_en_proceso}
                   </ul>
                   <ul class="col-3">
                     ${colunma4_finalizado}
                   </ul>
                 </div>
            </div>`;

      currentTabIndex++;
      indice++;
      colunma1_nombreEquipo = "";
      colunma2_pendiente = "";
      colunma3_en_proceso = "";
      colunma4_finalizado = "";
    });
  } else {
    card = `<div class="text-center">No hay recursos</div>`;
    divs += `<div class="tab-pane fade show active">${cardProyectos}</div>`;
  }

  tab += "</ul>";
  divs += "</div>";

  // for (let i = 0; i < dataTeamsPerIncidents.length; i++) {
  //   colunma1_nombreEquipo += `
  //     <li class="list-group-item"><h6>${dataTeamsPerIncidents[i].nombre_equipo}</h6></li>
  //   `;
  //   colunma2_pendiente += `
  //     <li class="list-group-item text-danger fw-bold">${dataTeamsPerIncidents[i].pendiente}</li>
  //   `;
  //   colunma3_en_proceso += `
  //     <li class="list-group-item text-primary fw-bold">${dataTeamsPerIncidents[i].en_proceso}</li>
  //   `;
  //   colunma4_finalizado += `
  //     <li class="list-group-item text-success fw-bold">${dataTeamsPerIncidents[i].finalizado}</li>
  //   `;

  //   totalPendiente += parseInt(dataTeamsPerIncidents[i].pendiente);
  //   totalEnProceso += parseInt(dataTeamsPerIncidents[i].en_proceso);
  //   totalFinalizado += parseInt(dataTeamsPerIncidents[i].finalizado);
  // }

  Swal.fire({
    title: "<h4>Lista por equipo</h4>",
    html: `<div class="modal-body">
      
      
      <div class="d-flex flex-column overflow-hidden" style="min-height: 300px;">
        ${tab}
        <div class=" d-flex border-bottom border-primary p-1 mb-3">
        <h3 class="col-3 fs-6"><i class="fa-brands fa-teamspeak" style="font-size: 24px;"></i></h3>
        <h3 class="col-3 fs-6 text-danger">Pendientes</h3>
        <h3 class="col-3 fs-6 text-primary">En Proceso</h3>
        <h3 class="col-3 fs-6 text-success">Finalizadas</h3>
      </div>
        ${divs}
      </div>
      <div class="d-flex border-top border-primary ">
      <ul class="col-3"><span class=" fw-bold">Total</span></ul>
        <ul class="col-3"><span class="text-danger fw-bold">${totalPendiente}</span></ul>
         <ul class="col-3"><span class="text-primary fw-bold">${totalEnProceso}</span></ul>
        <ul class="col-3"><span class="text-success fw-bold">${totalFinalizado}</span></ul>
      </div>
      <div class="modal-footer border-top border-secondary p-2 justify-content-between">
        <button id="cerrarBtn" class="btn btn-secondary me-2">Cerrar</button>     
      </div>
    `,
    showConfirmButton: false,
    showCancelButton: false,
    showClass: {
      popup: "animate__animated animate__slideInDown",
    },
    hideClass: {
      popup: "animate__animated animate__slideOutUp",
    },
  });

  document.getElementById("cerrarBtn").addEventListener("click", () => {
    Swal.close();
  });
}

async function alertaUsuarioPorCargo(cargo) {
  let queryUserInJob = await fetch(`${base_url}/Home/getUserInJob/${cargo}`);
  let dataUserInJob = await queryUserInJob.json();

  datosFiltro.push(...dataUserInJob);

  let card = `
  <div class="d-flex align-items-center mb-2 border-bottom border-primary">
    <div class="col-4">
      <h4><i class="fas fa-id-card"></i></h4>
    </div>
    <div class="col-4">
      <h4><i class="fas fa-user"></i></h4>
    </div>
        <div class="col-4">
      <h4><i class="fas fa-venus-mars"></i></h4>
    </div>
  </div>
`;

  for (let i = 0; i < dataUserInJob.length; i++) {
    let genderIcon =
      dataUserInJob[i].sexo === "M"
        ? "fa-mars text-primary"
        : "fa-venus text-danger";

    card += `
      <div class="d-flex align-items-center mb-2">
        <div class="col-4">
          <li class="list-group-item border-0 p-0">
            ${dataUserInJob[i].id_usuario}
          </li>
        </div>
        <div class="col-6">
          <li class="list-group-item border-0 p-0">
            ${dataUserInJob[i].nombres} ${dataUserInJob[i].apellidos}
          </li>
        </div>
        <div class="col-2 text-center">
          <li class="list-group-item border-0 p-0">
            <i class="fa ${genderIcon}" style="font-size: 16px;"></i>
          </li>
        </div>
      </div>
    `;
  }

  Swal.fire({
    title: `${cargo}`,
    html: `<ul class="list-group">${card}</ul>`,
    confirmButtonText: "Cerrar",
    confirmButtonColor: "#6c757d",
  });
}

function indicadorCapacitaciones() {
  // Crear una instancia del modal de Bootstrap
  const myModalElement = document.getElementById(
    "modalIndicadorCapacitaciones"
  );
  const myModal = new bootstrap.Modal(myModalElement);
  myModal.show();
}

async function alertaPorcentajeCapacitaciones() {
  let queryAvgTraining = await fetch(`${base_url}/Home/getAvgTraining`);
  let dataAvgTraining = await queryAvgTraining.json();

  let card = "";
  let tab = `<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">`;
  let divs = `<div class="tab-content" id="myTabContent">`;
  let indice = 1;
  let currentTabIndex = 0; // Índice único para tabs

  const chunkSize = 7;
  const grupos = [];
  for (let i = 0; i < dataAvgTraining.length; i += chunkSize) {
    grupos.push(dataAvgTraining.slice(i, i + chunkSize));
  }

  // Función para formatear los porcentajes
  function formatearNumero(numero) {
    // Verificar si 'numero' es un número
    if (isNaN(numero)) {
      console.error("El valor no es un número:", numero);
      return numero; // Devolver el valor original si no es un número
    }

    // Asegurarse de que 'numero' es un número
    numero = parseFloat(numero);
    return numero % 1 === 0 ? numero.toString() : numero.toFixed(2);
  }

  if (dataAvgTraining.length > 0) {
    grupos.forEach((grupo, index) => {
      // Construir las secciones del grupo actual
      grupo.forEach((data) => {
        card += `
          <div class="d-flex justify-content-center align-items-center mb-2">
            <div class="col-3 d-flex justify-content-center">
              <li class="list-group-item fw-bold border-0 p-0 pointer text-center" onclick="alertaParticipanteEnCapacitacion('${
                data.id_capacitacion
              }')">
                ${data.tema}
              </li>
            </div>
            <div class="col-3 d-flex justify-content-center text-center">
              <li class="list-group-item border-0 p-0 fw-bold text-center text-secondary">
                ${formatearNumero(data.porcentaje)}%
              </li>
            </div>
            <div class="col-3 d-flex justify-content-center">
              <li class="list-group-item border-0 p-0 fw-bold text-primary text-center">
                ${formatearNumero(data.porcentaje_hombres)}%
              </li>
            </div>
            <div class="col-3 d-flex justify-content-center">
              <li class="list-group-item border-0 p-0 fw-bold text-danger text-center">
                ${formatearNumero(data.porcentaje_mujeres)}%
              </li>
            </div>
          </div>`;
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
            <div class="tab-pane fade ${index === 0 ? "show active" : ""}" 
                 id="${tabId}" 
                 role="tabpanel" 
                 aria-labelledby="${tabId}-btn" 
                 tabindex="0">
                 <div class='d-flex flex-wrap row '>
                 ${card}
                 </div>
            </div>`;

      currentTabIndex++;
      indice++;
      card = "";
    });
  } else {
    card = `<div class="text-center">No se encontraron resultados</div>`;
    divs += `<div class="tab-pane fade show active">${cardProyectos}</div>`;
  }

  tab += "</ul>";
  divs += "</div>";

  modalContent.innerHTML = `<ul class="list-group">
  ${tab}
    <div class="d-flex justify-content-center align-items-center mb-2 border-bottom border-primary">
        <div class="col-3 d-flex justify-content-center">
            <h4><i class="fas fa-book"></i></h4>
        </div>
          <div class="col-3 d-flex justify-content-center">
            <h4><i class="fas fa-percentage text-secondary"></i></h4>
          </div>
          <div class="col-3 d-flex justify-content-center">
            <h4><i class="fas fa-mars text-primary"></i></h4>
          </div>
          <div class="col-3 d-flex justify-content-center">
            <h4><i class="fas fa-venus text-danger"></i></h4>
          </div>
        </div>
  ${divs}</ul>`;
  const myModal = new bootstrap.Modal(
    document.getElementById("modalIndicadorCapacitaciones")
  );
  myModal.show();
}

async function alertaParticipanteEnCapacitacion(id_capacitacion) {
  let queryUserInTraining = await fetch(
    `${base_url}/Home/getUserInTraining/${id_capacitacion}`
  );
  let dataUserInTraining = await queryUserInTraining.json();

  datosFiltro.push(...dataUserInTraining);

  let card = `
  <div class="d-flex align-items-center mb-2 border-bottom border-primary">
    <div class="col-4">
      <h4><i class="fas fa-id-card"></i></h4>
    </div>
    <div class="col-4">
      <h4><i class="fas fa-user"></i></h4>
    </div>
        <div class="col-4">
      <h4><i class="fas fa-venus-mars"></i></h4>
    </div>
  </div>
`;

  for (let i = 0; i < dataUserInTraining.length; i++) {
    let genderIcon =
      dataUserInTraining[i].sexo === "M"
        ? "fa-mars text-primary"
        : "fa-venus text-danger";

    card += `
      <div class="d-flex align-items-center mb-2">
        <div class="col-4">
          <li class="list-group-item border-0 p-0">
            ${dataUserInTraining[i].id_usuario}
          </li>
        </div>
        <div class="col-6">
          <li class="list-group-item border-0 p-0">
            ${dataUserInTraining[i].nombres} ${dataUserInTraining[i].apellidos}
          </li>
        </div>
        <div class="col-2 text-center">
          <li class="list-group-item border-0 p-0">
            <i class="fa ${genderIcon}" style="font-size: 16px;"></i>
          </li>
        </div>
      </div>
    `;
  }

  Swal.fire({
    title: `<h4 class="mb-3">Lista De Participante en:</h4><h4 class="text-primary">${dataUserInTraining[0].tema}</h4>`,
    html: `
        <ul class="list-group mb-3">${card}</ul>
        <div class="border-top border-secondary d-flex justify-content-between p-2">
        <button class="btn btn-danger custom-swal-button" onclick="reporteIndicadorUsuariosEnCapacitacion('${id_capacitacion}')"><i class="fas fa-file-pdf fa-2x"></i></button>
        <button id="cerrarBtn" class="btn btn-secondary me-2">Cerrar</button>
        </div>
    `,
    showConfirmButton: false,
    showCancelButton: false,
    showClass: {
      popup: "animate__animated animate__slideInDown",
    },
    hideClass: {
      popup: "animate__animated animate__slideOutUp",
    },
  });

  document.getElementById("cerrarBtn").addEventListener("click", () => {
    Swal.close();
  });
}

async function alertaRecursosAgotados() {
  let queryMostDepletedResource = await fetch(
    `${base_url}/Home/getMostDepletedResource`
  );
  let dataMostDepletedResource = await queryMostDepletedResource.json();

  let card = "";

  let tab = `<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">`;
  let divs = `<div class="tab-content" id="myTabContent">`;
  let indice = 1;
  let currentTabIndex = 0; // Índice único para tabs

  const chunkSize = 7;
  const grupos = [];
  for (let i = 0; i < dataMostDepletedResource.length; i += chunkSize) {
    grupos.push(dataMostDepletedResource.slice(i, i + chunkSize));
  }

  if (dataMostDepletedResource.length > 0) {
    grupos.forEach((grupo, index) => {
      // Construir las secciones del grupo actual
      grupo.forEach((data) => {
        let cantidad = data.cantidad;
        let cantidadClass = "";
        if (cantidad < 10) {
          cantidadClass = "text-danger";
        } else if (cantidad >= 10 && cantidad < 30) {
          cantidadClass = "text-warning";
        } else {
          cantidadClass = "text-success";
        }

        card += `
            <div class="d-flex">
              <ul class="col-6 text-left">
                <li class="list-group-item border-0 p-0 mb-1">
                  ${data.nombre}
                </li>
              </ul>
              <ul class="col-6">
                <li class="list-group-item fw-bold border-0 p-0 mb-1 ${cantidadClass}">
                  ${cantidad}
                </li>
              </ul>
            </div>
          `;
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
            <div class="tab-pane fade ${index === 0 ? "show active" : ""}" 
                 id="${tabId}" 
                 role="tabpanel" 
                 aria-labelledby="${tabId}-btn" 
                 tabindex="0">
                 <div class='d-flex flex-wrap row '>
                 ${card}
                 </div>
            </div>`;

      currentTabIndex++;
      indice++;
      card = "";
    });
  } else {
    card = `<div class="text-center">No hay recursos</div>`;
    divs += `<div class="tab-pane fade show active">${cardProyectos}</div>`;
  }

  tab += "</ul>";
  divs += "</div>";

  // for (let i = 0; i < dataMostDepletedResource.length; i++) {
  //   let cantidad = dataMostDepletedResource[i].cantidad;
  //   let cantidadClass = "";
  //   if (cantidad < 10) {
  //     cantidadClass = "text-danger";
  //   } else if (cantidad >= 10 && cantidad < 30) {
  //     cantidadClass = "text-warning";
  //   } else {
  //     cantidadClass = "text-success";
  //   }

  //   card += `
  //     <div class="d-flex">
  //       <ul class="col-6 text-left">
  //         <li class="list-group-item border-0 p-0 mb-1">
  //           ${dataMostDepletedResource[i].nombre}
  //         </li>
  //       </ul>
  //       <ul class="col-6">
  //         <li class="list-group-item fw-bold border-0 p-0 mb-1 ${cantidadClass}">
  //           ${cantidad}
  //         </li>
  //       </ul>
  //     </div>
  //   `;
  // }

  Swal.fire({
    title: `<div class="rounded bg-info text-white p-2"><h4>Recursos casi agotados</h4></div>`,
    html: `
    <ul class="list-group overflow-hidden" style="min-height: 350px;">
    ${tab}
       <div class="d-flex align-items-center mb-2 border-bottom border-primary">
    <div class="col-6">
      <h4><i class="fas fa-cubes"></i></h4>
    </div>
    <div class="col-6">
      <h4><i class="fas fa-sort-amount-down text-primary"></i></h4>
    </div>
  </div>
    ${divs}
    </ul>
    
    
    <div class=" border-top border-secondary d-flex justify-content-between p-2">
      
      <button class="btn btn-danger custom-swal-button" onclick="reporteIndicadorRecursosAgotados()">
        <i class="fas fa-file-pdf fa-2x"></i>
      </button>
      <button id="cerrarBtn" class="btn btn-secondary me-2">
        Cerrar
      </button>
    </div>
    `,
    showConfirmButton: false,
    showCancelButton: false,
    showClass: {
      popup: "animate__animated animate__slideInDown", // Animación de aparición (similar a los modales)
    },
    hideClass: {
      popup: "animate__animated animate__slideOutUp", // Animación de desaparición (similar a los modales)
    },
  });

  document.getElementById("cerrarBtn").addEventListener("click", () => {
    Swal.close();
  });
}

// ====================== FUNCIONES QUE SE USAN PARA LOS REPORTES

function reporteIndicadorEmpleadosCargoGenero() {
  window.open(`${base_url}/Report/listaEmpleadosCargoGenero`, "_blank");
}

function reporteIndicadorEquiposProyectos() {
  window.open(`${base_url}/Report/listaProyectos`, "_blank");
}

function reporteIndicadorIncidenciasPorMesEquipo() {
  window.open(
    `${base_url}/Report/listaIncidenciasMesEquipo/${userId}`,
    "_blank"
  );
}

function reporteIndicadorIncidenciasPorMes() {
  window.open(`${base_url}/Report/listaIncidenciasMes`, "_blank");
}

function reporteIndicadorPorcentajePorCapacitacion() {
  window.open(`${base_url}/Report/listaPorcentajePorCapacitacion`, "_blank");
}

function reporteIndicadorUsuariosEnCapacitacion(id_capacitacion) {
  window.open(
    `${base_url}/Report/listaUsuariosEnCapacitacion/${id_capacitacion}`,
    "_blank"
  );
}

function reporteIndicadorRecursosUsados() {
  window.open(`${base_url}/Report/listaRecursosUsados`, "_blank");
}

function reporteIndicadorRecursosAgotados() {
  window.open(`${base_url}/Report/listaRecursosAgotados`, "_blank");
}

const dataGraficosVarianza = {
  meses: {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Varianza Mensual de Incidencias",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  },
  años: {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Varianza Anual de Incidencias",
        data: [1200, 1900, 3000, 2500, 4000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  },
  mesesCapacitaciones: {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Varianza Mensual de Participación a Capacitaciones",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  },
  añosCapacitaciones: {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Varianza Anual de Participación a Capacitaciones",
        data: [1200, 1900, 3000, 2500, 4000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  },
  mesesTiempoIncidencia: {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Varianza Mensual de Tiempo de Incidencia (Minutos)",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  },
  añosTiempoIncidencia: {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Varianza Anual de Tiempo de Incidencia (Horas)",
        data: [1200, 1900, 3000, 2500, 4000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  },
  mesesTiempoIncidenciaAsignacion: {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label:
          "Variante Mensual de Tiempo Promedio de Asignación de Incidencias (Horas)",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  },
  añosTiempoIncidenciaAsignacion: {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label:
          "Varianza Anual de Tiempo Promedio de Asignación de Incidencias(Horas)",
        data: [1200, 1900, 3000, 2500, 4000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  },
  mesesMantenimientos: {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Varianza Mensual de Mantenimientos solucionados",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  },
  añosMantenimientos: {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Varianza Anual de Mantenimientos solucionados",
        data: [1200, 1900, 3000, 2500, 4000],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  },
};

let myChart = "";
let meses = [];
let years = [];
let anios = [];
let datosVarianzaIncidencia = [];
let datosVarianzaIncidenciaYear = [];
let datosVarianzaCapacitaciones = [];
let datosVarianzaCapacitacionesYear = [];
let datosTiempoPromedioFinalizacionIncidencias = [];
let datosTiempoPromedioFinalizacionIncidenciasYear = [];
let datosTiempoPromedioAsignacionIncidencias = [];
let datosTiempoPromedioAsignacionIncidenciasYear = [];
let datosVarianzaMantenimientosGrafico = [];
let datosVarianzaMantenimientosGraficoYear = [];
let mesesDelAnio = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
let statusIdVarianza = 0;
let statusIdCapacitaciones = 0;
let statusIdMantenimiento = 0;
let statusIdTiempoIncidencia = 0;
let statusIdAsignacionIncidencia = 0;

let myChartCapacitaciones = "";
let myChartTiempoIncidencias = "";
let myChartTiempoAsignacionIncidencia = "";
let myChartMantenimientoVariance = "";

async function medirVarianza() {
  // incidencias por mes
  let queryIndicatorVarianzaIncidencias = await fetch(
    `${base_url}/Home/getIncidenceVariance`
  );
  let dataVarianzaIncidencias = await queryIndicatorVarianzaIncidencias.json();
  ///////////////////
  datosVarianzaIncidencia = dataVarianzaIncidencias;
  // incidencias por año
  let queryIndicatorVarianzaIncidenciasYear = await fetch(
    `${base_url}/Home/getIncidenceVarianceYear`
  );
  let dataVarianzaIncidenciasYear =
    await queryIndicatorVarianzaIncidenciasYear.json();

  datosVarianzaIncidenciaYear = dataVarianzaIncidenciasYear;

  ///////////////////
  meses = dataVarianzaIncidencias.map((item) => item.incidencias_finalizadas);

  let year = dataVarianzaIncidenciasYear.map(
    (item) => item.incidencias_finalizadas
  );

  anios = dataVarianzaIncidenciasYear.map((item) => item.anio);

  dataGraficosVarianza.meses.datasets[0].data = meses;
  dataGraficosVarianza.años.labels = anios;
  dataGraficosVarianza.años.datasets[0].data = year;

  myChart = new Chart(ctx5, {
    type: "line",
    data: dataGraficosVarianza.meses,
    options: {
      radius: 10,
      hoverBorderWidth: 15,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            display: true,
          },
          grid: {
            display: true,
            drawBorder: true,
          },
        },
        x: {
          ticks: {
            display: true, // Mostrar las etiquetas del eje X
            font: {
              size: 10, // Cambiar el tamaño de la fuente a un valor más pequeño (por ejemplo, 10px)
            },
            maxRotation: 0, // Forzar que las etiquetas estén completamente horizontales
            minRotation: 0, // Evita que Chart.js gire las etiquetas automáticamente
          },
          grid: {
            drawOnChartArea: false, // Desactiva la cuadrícula si es necesario
          },
        },
      },
      plugins: {
        // Aquí está correctamente cerrado
        legend: {
          labels: {
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 12,
          },
          titleFont: {
            size: 12,
          },
        },
      },
    },
  });
}

async function medirVarianzaPorcentajeCapacitacion() {
  // incidencias por mes
  let queryIndicatorVarianzaIncidencias = await fetch(
    `${base_url}/Home/getCapacitacionVariance`
  );
  let dataVarianzaCapacitacion = await queryIndicatorVarianzaIncidencias.json();
  ///////////////////
  datosVarianzaCapacitaciones = dataVarianzaCapacitacion;
  // incidencias por año
  let queryIndicatorVarianzaCapacitacionYear = await fetch(
    `${base_url}/Home/getCapacitacionVarianceYear`
  );
  let dataVarianzaCapacitacionYear =
    await queryIndicatorVarianzaCapacitacionYear.json();

  datosVarianzaCapacitacionesYear = dataVarianzaCapacitacionYear;

  ///////////////////
  meses = dataVarianzaCapacitacion.map((item) => item.participacion_actual);

  years = dataVarianzaCapacitacionYear.map((item) => item.participacion_actual);

  anios = dataVarianzaCapacitacionYear.map((item) => item.año);

  dataGraficosVarianza.mesesCapacitaciones.datasets[0].data = meses;
  dataGraficosVarianza.añosCapacitaciones.labels = anios;
  dataGraficosVarianza.añosCapacitaciones.datasets[0].data = years;

  myChartCapacitaciones = new Chart(ctx6, {
    type: "line",
    data: dataGraficosVarianza.mesesCapacitaciones,
    options: {
      radius: 10,
      hoverBorderWidth: 15,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            display: true,
          },
          grid: {
            display: true,
            drawBorder: true,
          },
        },
        x: {
          ticks: {
            display: true, // Mostrar las etiquetas del eje X
            font: {
              size: 10, // Cambiar el tamaño de la fuente a un valor más pequeño (por ejemplo, 10px)
            },
            maxRotation: 0, // Forzar que las etiquetas estén completamente horizontales
            minRotation: 0, // Evita que Chart.js gire las etiquetas automáticamente
          },
          grid: {
            drawOnChartArea: false, // Desactiva la cuadrícula si es necesario
          },
        },
      },
      plugins: {
        // Aquí está correctamente cerrado
        legend: {
          labels: {
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 12,
          },
          titleFont: {
            size: 12,
          },
        },
      },
    },
  });
}

async function medirVarianzaTiempoIncidencia() {
  // incidencias por mes
  let queryVarianzaTiempoIncidencia = await fetch(
    `${base_url}/Home/getTimeIncidentsVariance`
  );
  let dataVarianzaTiempoIncidencia = await queryVarianzaTiempoIncidencia.json();
  datosTiempoPromedioFinalizacionIncidencias = dataVarianzaTiempoIncidencia;
  ///////////////////

  // incidencias por año
  let queryVarianzaTiempoIncidenciaYear = await fetch(
    `${base_url}/Home/getTimeIncidentsVarianceYear`
  );
  let dataVarianzaTiempoIncidenciaYear =
    await queryVarianzaTiempoIncidenciaYear.json();

  datosTiempoPromedioFinalizacionIncidenciasYear =
    dataVarianzaTiempoIncidenciaYear;

  ///////////////////

  meses = dataVarianzaTiempoIncidencia.map((item) => item.tiempo_total);
  let minutos = [];

  dataVarianzaTiempoIncidencia.forEach((el) => {
    let tiempo = el.tiempo_total
      .replace("h", "")
      .replace("m", "")
      .replace("s", "");

    let [hora, minuto, segundo] = tiempo.split(" ");

    let minutosCalculados = parseFloat(
      Number(hora) * 60 + Number(minuto) + Number(segundo) / 60
    );

    minutos.push(minutosCalculados);
  });

  meses = minutos;

  years = dataVarianzaTiempoIncidenciaYear.map(
    (item) => item.tiempo_total_solucionado
  );
  let minutosYear = [];
  dataVarianzaTiempoIncidenciaYear.forEach((el) => {
    let tiempo = el.tiempo_total_solucionado
      .replace("h", "")
      .replace("m", "")
      .replace("s", "");

    let [hora, minuto, segundo] = tiempo.split(" ");

    let minutosCalculados = parseFloat(
      Number(hora) * 60 + Number(minuto) + Number(segundo) / 60
    );

    minutosYear.push(minutosCalculados);
  });
  years = minutosYear;

  anios = dataVarianzaTiempoIncidenciaYear.map((item) => item.Año);

  dataGraficosVarianza.mesesTiempoIncidencia.datasets[0].data = meses;
  dataGraficosVarianza.añosTiempoIncidencia.labels = anios;
  dataGraficosVarianza.añosTiempoIncidencia.datasets[0].data = years;

  myChartTiempoIncidencias = new Chart(ctx7, {
    type: "line",
    data: dataGraficosVarianza.mesesTiempoIncidencia,
    options: {
      radius: 10,
      hoverBorderWidth: 15,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            display: true,
          },
          grid: {
            display: true,
            drawBorder: true,
          },
        },
        x: {
          ticks: {
            display: true, // Mostrar las etiquetas del eje X
            font: {
              size: 10, // Cambiar el tamaño de la fuente a un valor más pequeño (por ejemplo, 10px)
            },
            maxRotation: 0, // Forzar que las etiquetas estén completamente horizontales
            minRotation: 0, // Evita que Chart.js gire las etiquetas automáticamente
          },
          grid: {
            drawOnChartArea: false, // Desactiva la cuadrícula si es necesario
          },
        },
      },
      plugins: {
        // Aquí está correctamente cerrado
        legend: {
          labels: {
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 12,
          },
          titleFont: {
            size: 12,
          },
        },
      },
    },
  });
}

async function medirVarianzaTiempoIncidenciaAsignacion() {
  // incidencias por mes
  let queryVarianzaTiempoAsignacionIncidencia = await fetch(
    `${base_url}/Home/getTimeAsignacionIncident`
  );
  let dataVarianzaTiempoAsignacionIncidencia =
    await queryVarianzaTiempoAsignacionIncidencia.json();
  datosTiempoPromedioAsignacionIncidencias =
    dataVarianzaTiempoAsignacionIncidencia;
  ///////////////////

  // incidencias por año
  let queryVarianzaTiempoIncidenciaAsignacionYear = await fetch(
    `${base_url}/Home/getTimeAsignacionIncidentYear`
  );
  let dataVarianzaTiempoIncidenciaAsignacionYear =
    await queryVarianzaTiempoIncidenciaAsignacionYear.json();

  datosTiempoPromedioAsignacionIncidenciasYear =
    dataVarianzaTiempoIncidenciaAsignacionYear;

  ///////////////////
  meses = dataVarianzaTiempoAsignacionIncidencia.map(
    (item) => item.tiempo_total_asignacion
  );
  let minutos = [];

  dataVarianzaTiempoAsignacionIncidencia.forEach((el) => {
    let tiempo = el.tiempo_total_asignacion
      .replace("h", "")
      .replace("m", "")
      .replace("s", "");

    let [hora, minuto, segundo] = tiempo.split(" ");

    let minutosCalculados = parseFloat(
      Number(hora) * 60 + Number(minuto) + Number(segundo) / 60
    );

    minutos.push(minutosCalculados);
  });

  meses = minutos;

  years = dataVarianzaTiempoIncidenciaAsignacionYear.map(
    (item) => item.tiempo_promedio_asignacion
  );
  let minutosYear = [];

  dataVarianzaTiempoIncidenciaAsignacionYear.forEach((el) => {
    let tiempo = el.tiempo_total_asignacion
      .replace("h", "")
      .replace("m", "")
      .replace("s", "");

    let [hora, minuto, segundo] = tiempo.split(" ");

    let minutosCalculados = parseFloat(
      Number(hora) * 60 + Number(minuto) + Number(segundo) / 60
    );

    minutosYear.push(minutosCalculados);
  });

  years = minutosYear;

  anios = dataVarianzaTiempoIncidenciaAsignacionYear.map((item) => item.anio);

  dataGraficosVarianza.mesesTiempoIncidenciaAsignacion.datasets[0].data = meses;
  dataGraficosVarianza.añosTiempoIncidenciaAsignacion.labels = anios;
  dataGraficosVarianza.añosTiempoIncidenciaAsignacion.datasets[0].data = years;

  myChartTiempoAsignacionIncidencia = new Chart(ctx8, {
    type: "line",
    data: dataGraficosVarianza.mesesTiempoIncidenciaAsignacion,
    options: {
      radius: 10,
      hoverBorderWidth: 15,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            display: true,
          },
          grid: {
            display: true,
            drawBorder: true,
          },
        },
        x: {
          ticks: {
            display: true, // Mostrar las etiquetas del eje X
            font: {
              size: 10, // Cambiar el tamaño de la fuente a un valor más pequeño (por ejemplo, 10px)
            },
            maxRotation: 0, // Forzar que las etiquetas estén completamente horizontales
            minRotation: 0, // Evita que Chart.js gire las etiquetas automáticamente
          },
          grid: {
            drawOnChartArea: false, // Desactiva la cuadrícula si es necesario
          },
        },
      },
      plugins: {
        // Aquí está correctamente cerrado
        legend: {
          labels: {
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 12,
          },
          titleFont: {
            size: 12,
          },
        },
      },
    },
  });
}

async function medirVarianzaMantenimiento() {
  // incidencias por mes
  let queryVarianzaMantenimiento = await fetch(
    `${base_url}/Home/getMantenimientoVariance`
  );
  let dataVarianzaMantenimiento = await queryVarianzaMantenimiento.json();
  datosVarianzaMantenimientosGrafico = dataVarianzaMantenimiento;
  ///////////////////

  // incidencias por año
  let queryVarianzaMantenimientoYear = await fetch(
    `${base_url}/Home/getMantenimientoVarianceYear`
  );
  let dataVarianzaMantenimientoYear =
    await queryVarianzaMantenimientoYear.json();

  datosVarianzaMantenimientosGraficoYear = dataVarianzaMantenimientoYear;

  ///////////////////
  meses = dataVarianzaMantenimiento.map(
    (item) => item.mantenimientos_finalizados
  );

  years = dataVarianzaMantenimientoYear.map(
    (item) => item.mantenimientos_finalizados
  );

  anios = dataVarianzaMantenimientoYear.map((item) => item.Anio);

  dataGraficosVarianza.mesesMantenimientos.datasets[0].data = meses;
  dataGraficosVarianza.añosMantenimientos.labels = anios;
  dataGraficosVarianza.añosMantenimientos.datasets[0].data = years;

  myChartMantenimientoVariance = new Chart(ctx9, {
    type: "line",
    data: dataGraficosVarianza.mesesMantenimientos,
    options: {
      radius: 10,
      hoverBorderWidth: 15,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            display: true,
          },
          grid: {
            display: true,
            drawBorder: true,
          },
        },
        x: {
          ticks: {
            display: true, // Mostrar las etiquetas del eje X
            font: {
              size: 10, // Cambiar el tamaño de la fuente a un valor más pequeño (por ejemplo, 10px)
            },
            maxRotation: 0, // Forzar que las etiquetas estén completamente horizontales
            minRotation: 0, // Evita que Chart.js gire las etiquetas automáticamente
          },
          grid: {
            drawOnChartArea: false, // Desactiva la cuadrícula si es necesario
          },
        },
      },
      plugins: {
        // Aquí está correctamente cerrado
        legend: {
          labels: {
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 12,
          },
          titleFont: {
            size: 12,
          },
        },
      },
    },
  });
}
if (ctx6 && ctx6.offsetParent !== null) medirVarianzaPorcentajeCapacitacion();
if (ctx7 && ctx7.offsetParent !== null) medirVarianzaTiempoIncidencia();
if (ctx8 && ctx8.offsetParent !== null)
  medirVarianzaTiempoIncidenciaAsignacion();
if (ctx5 && ctx5.offsetParent !== null) medirVarianza();
if (ctx9 && ctx9.offsetParent !== null) medirVarianzaMantenimiento();

function updateChart(rango, id) {
  myChart.destroy(); // Destruir el gráfico anterior

  statusIdVarianza = id;

  myChart = new Chart(ctx5, {
    type: "line",
    data: dataGraficosVarianza[rango],
    options: {
      radius: 10,
      hoverBorderWidth: 15,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            display: true,
          },
          grid: {
            display: true,
            drawBorder: true,
          },
        },
        x: {
          ticks: {
            display: true, // Mostrar las etiquetas del eje X
            font: {
              size: 10, // Cambiar el tamaño de la fuente a un valor más pequeño (por ejemplo, 10px)
            },
            maxRotation: 0, // Forzar que las etiquetas estén completamente horizontales
            minRotation: 0, // Evita que Chart.js gire las etiquetas automáticamente
          },
          grid: {
            drawOnChartArea: false, // Desactiva la cuadrícula si es necesario
          },
        },
      },
      plugins: {
        // Aquí está correctamente cerrado
        legend: {
          labels: {
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 12,
          },
          titleFont: {
            size: 12,
          },
        },
      },
    },
  });
}

function updateChartCapacitacionesVariance(rango, id) {
  myChartCapacitaciones.destroy(); // Destruir el gráfico anterior

  statusIdCapacitaciones = id;

  myChartCapacitaciones = new Chart(ctx6, {
    type: "line",
    data: dataGraficosVarianza[rango],
    options: {
      radius: 10,
      hoverBorderWidth: 15,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            display: true,
          },
          grid: {
            display: true,
            drawBorder: true,
          },
        },
        x: {
          ticks: {
            display: true, // Mostrar las etiquetas del eje X
            font: {
              size: 10, // Cambiar el tamaño de la fuente a un valor más pequeño (por ejemplo, 10px)
            },
            maxRotation: 0, // Forzar que las etiquetas estén completamente horizontales
            minRotation: 0, // Evita que Chart.js gire las etiquetas automáticamente
          },
          grid: {
            drawOnChartArea: false, // Desactiva la cuadrícula si es necesario
          },
        },
      },
      plugins: {
        // Aquí está correctamente cerrado
        legend: {
          labels: {
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 12,
          },
          titleFont: {
            size: 12,
          },
        },
      },
    },
  });
}

function updateChartTimeVarianceIncidents(rango, id) {
  myChartTiempoIncidencias.destroy(); // Destruir el gráfico anterior

  statusIdTiempoIncidencia = id;

  myChartTiempoIncidencias = new Chart(ctx7, {
    type: "line",
    data: dataGraficosVarianza[rango],
    options: {
      radius: 10,
      hoverBorderWidth: 15,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            display: true,
          },
          grid: {
            display: true,
            drawBorder: true,
          },
        },
        x: {
          ticks: {
            display: true, // Mostrar las etiquetas del eje X
            font: {
              size: 10, // Cambiar el tamaño de la fuente a un valor más pequeño (por ejemplo, 10px)
            },
            maxRotation: 0, // Forzar que las etiquetas estén completamente horizontales
            minRotation: 0, // Evita que Chart.js gire las etiquetas automáticamente
          },
          grid: {
            drawOnChartArea: false, // Desactiva la cuadrícula si es necesario
          },
        },
      },
      plugins: {
        // Aquí está correctamente cerrado
        legend: {
          labels: {
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 12,
          },
          titleFont: {
            size: 12,
          },
        },
      },
    },
  });
}

function updateChartTimeVarianceIncidentsAsignacion(rango, id) {
  myChartTiempoAsignacionIncidencia.destroy(); // Destruir el gráfico anterior

  statusIdAsignacionIncidencia = id;

  myChartTiempoAsignacionIncidencia = new Chart(ctx8, {
    type: "line",
    data: dataGraficosVarianza[rango],
    options: {
      radius: 10,
      hoverBorderWidth: 15,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            display: true,
          },
          grid: {
            display: true,
            drawBorder: true,
          },
        },
        x: {
          ticks: {
            display: true, // Mostrar las etiquetas del eje X
            font: {
              size: 10, // Cambiar el tamaño de la fuente a un valor más pequeño (por ejemplo, 10px)
            },
            maxRotation: 0, // Forzar que las etiquetas estén completamente horizontales
            minRotation: 0, // Evita que Chart.js gire las etiquetas automáticamente
          },
          grid: {
            drawOnChartArea: false, // Desactiva la cuadrícula si es necesario
          },
        },
      },
      plugins: {
        // Aquí está correctamente cerrado
        legend: {
          labels: {
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 12,
          },
          titleFont: {
            size: 12,
          },
        },
      },
    },
  });
}

function updateChartMantenimientos(rango, id) {
  myChartMantenimientoVariance.destroy(); // Destruir el gráfico anterior

  statusIdMantenimiento = id;

  myChartMantenimientoVariance = new Chart(ctx9, {
    type: "line",
    data: dataGraficosVarianza[rango],
    options: {
      radius: 10,
      hoverBorderWidth: 15,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            display: true,
          },
          grid: {
            display: true,
            drawBorder: true,
          },
        },
        x: {
          ticks: {
            display: true, // Mostrar las etiquetas del eje X
            font: {
              size: 10, // Cambiar el tamaño de la fuente a un valor más pequeño (por ejemplo, 10px)
            },
            maxRotation: 0, // Forzar que las etiquetas estén completamente horizontales
            minRotation: 0, // Evita que Chart.js gire las etiquetas automáticamente
          },
          grid: {
            drawOnChartArea: false, // Desactiva la cuadrícula si es necesario
          },
        },
      },
      plugins: {
        // Aquí está correctamente cerrado
        legend: {
          labels: {
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 12,
          },
          titleFont: {
            size: 12,
          },
        },
      },
    },
  });
}

function ctx5Function(event) {
  const puntos = myChart.getElementsAtEventForMode(
    event,
    "nearest",
    {
      intersect: true,
    },
    true
  );

  if (puntos.length) {
    const puntoIndice = puntos[0].index;
    const etiqueta = myChart.data.labels[puntoIndice];
    const valor = myChart.data.datasets[0].data[puntoIndice];

    let indice = mesesDelAnio.indexOf(etiqueta);
    let data = "";
    if (statusIdVarianza === 0) {
      data = datosVarianzaIncidencia[indice];
    } else {
      data = datosVarianzaIncidenciaYear.filter(
        (el) => el.anio === etiqueta
      )[0];
    }

    Swal.fire({
      title: `<h4>Varianza ${
        statusIdVarianza === 1 ? "anual" : "mensual"
      } de Incidencias Finalizadas (${etiqueta})</h4> <hr/>`,
      icon: "info",
      html: `<h5>Incidencias Finalizadas: <b>${data.incidencias_finalizadas}</b></h5>
             <h5>Varianza Porcentual: <b>${data.varianza_porcentual}%</b></h5>`,
      showConfirmButton: false,
      showCancelButton: false,
    });

    // Evento personalizado
    // fn(etiqueta, valor);

    // Aquí puedes agregar más lógica o llamar a una función personalizada
  }
}

if (ctx5 && ctx5.offsetParent !== null)
  ctx5.addEventListener("click", ctx5Function);

if (ctx6 && ctx6.offsetParent !== null)
  ctx6.addEventListener("click", (event) => {
    const puntos = myChartCapacitaciones.getElementsAtEventForMode(
      event,
      "nearest",
      {
        intersect: true,
      },
      true
    );

    if (puntos.length) {
      const puntoIndice = puntos[0].index;
      const etiqueta = myChartCapacitaciones.data.labels[puntoIndice];
      const valor = myChartCapacitaciones.data.datasets[0].data[puntoIndice];

      let indice = mesesDelAnio.indexOf(etiqueta);
      let data = datosVarianzaCapacitaciones[indice];

      if (statusIdCapacitaciones === 0) {
        data = datosVarianzaCapacitaciones[indice];
      } else {
        data = datosVarianzaCapacitacionesYear.filter(
          (el) => el.año === etiqueta
        )[0];
      }

      Swal.fire({
        title: `<h4>Participación en capacitaciones (${etiqueta})</h4> <hr/>`,
        icon: "info",
        html: `<h5>Participación Actual: <b>${data.participacion_actual}</b></h5>
             <h5>Varianza Porcentual: <b>${data.tasa_variacion_porcentual}%</b></h5>`,
        showConfirmButton: false,
        showCancelButton: false,
      });

      // Evento personalizado
      // fn(etiqueta, valor);

      // Aquí puedes agregar más lógica o llamar a una función personalizada
    }
  });

if (ctx7 && ctx7.offsetParent !== null)
  ctx7.addEventListener("click", (event) => {
    const puntos = myChartTiempoIncidencias.getElementsAtEventForMode(
      event,
      "nearest",
      {
        intersect: true,
      },
      true
    );

    if (puntos.length) {
      const puntoIndice = puntos[0].index;
      const etiqueta = myChartTiempoIncidencias.data.labels[puntoIndice];
      const valor = myChartTiempoIncidencias.data.datasets[0].data[puntoIndice];

      let indice = mesesDelAnio.indexOf(etiqueta);
      let data = "";

      if (statusIdTiempoIncidencia === 0) {
        data = datosTiempoPromedioFinalizacionIncidencias[indice];
      } else {
        data = datosTiempoPromedioFinalizacionIncidenciasYear.filter(
          (el) => el.Año === etiqueta
        )[0];
      }

      Swal.fire({
        title: `<h4>Promedio de tiempo de incidenicas finalizadas (${etiqueta})</h4> <hr/>`,
        icon: "info",
        html: `<h5>tiempo total (${
          statusIdTiempoIncidencia === 0 ? "Mensual" : "Anual"
        }): <b>${
          statusIdTiempoIncidencia === 0
            ? data.tiempo_total
            : data.tiempo_total_solucionado
        }</b></h5>
             <h5>Varianza Porcentual: <b>${
               statusIdTiempoIncidencia === 0
                 ? data.tasa_variacion_porcentual
                 : data.tasa_de_variación
             }%</b></h5>`,
        showConfirmButton: false,
        showCancelButton: false,
      });

      // Evento personalizado
      // fn(etiqueta, valor);

      // Aquí puedes agregar más lógica o llamar a una función personalizada
    }
  });

if (ctx8 && ctx8.offsetParent !== null)
  ctx8.addEventListener("click", (event) => {
    const puntos = myChartTiempoAsignacionIncidencia.getElementsAtEventForMode(
      event,
      "nearest",
      {
        intersect: true,
      },
      true
    );

    if (puntos.length) {
      const puntoIndice = puntos[0].index;
      const etiqueta =
        myChartTiempoAsignacionIncidencia.data.labels[puntoIndice];
      const valor =
        myChartTiempoAsignacionIncidencia.data.datasets[0].data[puntoIndice];

      let indice = mesesDelAnio.indexOf(etiqueta);

      let data = "";

      if (statusIdAsignacionIncidencia === 0) {
        data = datosTiempoPromedioAsignacionIncidencias[indice];
      } else {
        data = datosTiempoPromedioAsignacionIncidenciasYear.filter(
          (el) => el.anio === etiqueta
        )[0];
      }

      Swal.fire({
        title: `<h4>Tiempo promedio de incidenicas asignadas (${etiqueta})</h4> <hr/>`,
        icon: "info",
        html: `<h5>tiempo total (${
          statusIdAsignacionIncidencia === 0 ? "Mensual" : "Anual"
        }): <b>${data.tiempo_total_asignacion}</b></h5>
             <h5>Varianza Porcentual: <b>${
               data.tasa_variacion_porcentual
             }%</b></h5>`,
        showConfirmButton: false,
        showCancelButton: false,
      });

      // Evento personalizado
      // fn(etiqueta, valor);

      // Aquí puedes agregar más lógica o llamar a una función personalizada
    }
  });

if (ctx9 && ctx9.offsetParent !== null)
  ctx9.addEventListener("click", (event) => {
    const puntos = myChartMantenimientoVariance.getElementsAtEventForMode(
      event,
      "nearest",
      {
        intersect: true,
      },
      true
    );

    if (puntos.length) {
      const puntoIndice = puntos[0].index;
      const etiqueta = myChartMantenimientoVariance.data.labels[puntoIndice];
      const valor =
        myChartMantenimientoVariance.data.datasets[0].data[puntoIndice];

      let indice = mesesDelAnio.indexOf(etiqueta);
      let data = "";

      if (statusIdMantenimiento === 0) {
        data = datosVarianzaMantenimientosGrafico[indice];
      } else {
        data = datosVarianzaMantenimientosGraficoYear.filter(
          (el) => el.Anio === etiqueta
        )[0];
      }

      Swal.fire({
        title: `<h4>Promedio de mantenimientos solucionados (${etiqueta})</h4> <hr/>`,
        icon: "info",
        html: `<h5>Mantenimientos solucionados: <b>${data.mantenimientos_finalizados}</b></h5>
             <h5>Varianza Porcentual: <b>${data.tasa_de_variación}%</b></h5>`,
        showConfirmButton: false,
        showCancelButton: false,
      });

      // Evento personalizado
      // fn(etiqueta, valor);

      // Aquí puedes agregar más lógica o llamar a una función personalizada
    }
  });

async function getMonthIncident(mesId, mes) {
  let queryIncident = await fetch(
    `${base_url}/Home/getMonthIncident/${mesId}/${userLevel}/${unidad}`
  );
  let dataIncident = await queryIncident.json();

  let btn = document.getElementById("btnCloseModalIncidenciasPorMes");
  btn.click();

  let datosPendientes = [];
  let datosEnProceso = [];
  let datosFinalizados = [];

  for (let i = 0; i < dataIncident.length; i++) {
    const el = dataIncident[i];

  

    if (el.estado === "Pendiente") {
      console.log(el.fecha_asignacion);
         el.fecha_asignacion = `${el.fecha_asignacion
        .split(" ")[0]
        .split("-")
        .reverse()
        .join("-")} ${el.fecha_asignacion.split(" ")[1]}`;

      el.fecha_reporte = `${el.fecha_reporte
        .split(" ")[0]
        .split("-")
        .reverse()
        .join("-")} ${el.fecha_reporte.split(" ")[1]}`;
      datosPendientes.push(el);
    } else if (el.estado === "En Proceso") {
         el.fecha_asignacion = `${el.fecha_asignacion
        .split(" ")[0]
        .split("-")
        .reverse()
        .join("-")} ${el.fecha_asignacion.split(" ")[1]}`;

      el.fecha_reporte = `${el.fecha_reporte
        .split(" ")[0]
        .split("-")
        .reverse()
        .join("-")} ${el.fecha_reporte.split(" ")[1]}`;

         el.fecha_inicio = `${el.fecha_inicio
        .split(" ")[0]
        .split("-")
        .reverse()
        .join("-")} ${el.fecha_inicio.split(" ")[1]}`;

    
      datosEnProceso.push(el);
    } else {
         el.fecha_asignacion = `${el.fecha_asignacion
        .split(" ")[0]
        .split("-")
        .reverse()
        .join("-")} ${el.fecha_asignacion.split(" ")[1]}`;

      el.fecha_reporte = `${el.fecha_reporte
        .split(" ")[0]
        .split("-")
        .reverse()
        .join("-")} ${el.fecha_reporte.split(" ")[1]}`;

         el.fecha_inicio = `${el.fecha_inicio
        .split(" ")[0]
        .split("-")
        .reverse()
        .join("-")} ${el.fecha_inicio.split(" ")[1]}`;

        console.log(el);
        

      el.fecha_solucion = `${el.fecha_solucion
        .split(" ")[0]
        .split("-")
        .reverse()
        .join("-")} ${el.fecha_solucion.split(" ")[1]}`;
      datosFinalizados.push(el);
    }
  }

  IncidenciasPendientesTable.clear().rows.add(datosPendientes).draw();
  IncidenciasEnProcesoTable.clear().rows.add(datosEnProceso).draw();
  IncidenciasFinalizadasTable.clear().rows.add(datosFinalizados).draw();
  document.getElementById("countPendiente").textContent =
    datosPendientes.length;
  document.getElementById("countEnProceso").textContent = datosEnProceso.length;
  document.getElementById("countFinalizado").textContent =
    datosFinalizados.length;

  document.getElementById("mesSeleccionado").textContent = mes;

  const myModal = new bootstrap.Modal("#modalDetalleIncidencia");
  myModal.show();
}
