cambiarEstado();
// =============== GUIA DE ESTADOS =====================
// =============== 0 FINALIZADO =====================
// =============== 1 ACTIVO =====================
// =============== 2 CANCELADO =====================

const META_TABLE = new DataTable("#table_metas", {
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
  ajax: {
    url: `${base_url}/Poa/getDinamicGoalsCompleted`,
    dataSrc: "",
  },
  columns: [
    { data: "meta" },
    { data: "fecha_creacionFormateada" },
    { data: "fecha_limiteFormateada" },
    {
      data: null,
      render: function (data, type, row) {
        if (row.cantidad_objetivo > 0) {
          const porcentaje =
            (row.cantidad_progreso / row.cantidad_objetivo) * 100;
          return `${porcentaje.toFixed(2)}%`;
        } else {
          return "N/A";
        }
      },
      title: "Porcentaje",
    },
    { data: "cantidad_progreso" },
    { data: "cantidad_objetivo" },
    {
      data: null,
      render: function (data, type, row) {
        if (row.estado == 2) {
          // Si el estado es 2, mostrar "Cancelado" en rojo
          return `<span class="text-info fw-bold">Cancelado</span>`;
        }

        // Esta parte del código decide "Crítico", "Tolerable" o "Aceptable"
        // Puedes eliminar o comentar lo siguiente:
        if (row.cantidad_objetivo > 0) {
          const porcentaje =
            (row.cantidad_progreso / row.cantidad_objetivo) * 100;
          let estado = "";
          let className = ""; // Usaremos className en lugar de class y color

          if (porcentaje <= 30) {
            estado = "Crítico";
            className = "text-danger"; // Clase de Bootstrap para texto rojo
          } else if (porcentaje > 30 && porcentaje < 90) {
            estado = "Tolerable";
            className = "text-warning"; // Clase de Bootstrap para texto amarillo/naranja
          } else if (porcentaje >= 90) {
            estado = "Aceptable";
            className = "text-success"; // Clase de Bootstrap para texto verde
          }

          return `<span class="${className} fw-bold">${estado}</span>`; // Usamos className y fw-bold
        }

        return "N/A"; // Esto se mostrará si no deseas evaluar los porcentajes
      },
      title: "Estado",
    },
  ],
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});

// ================= DEFINIR VARIABLES ====================00
let formAddGoals = document.getElementById("formAddGoals");
let ContenedorCard = document.getElementById("ContenedorCard");
datosFiltro = [];
let selectUnidad = document.getElementById("selectUnidad");

// ============== VARIALBLES HISTORICO =================
let tipoOperacion = "";
let descripcionOperacion = "";
let estadoOperacion = 0;

// =====================================================

let porcentaje = "";
const formatFecha = (fecha) => {
  const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(fecha).toLocaleDateString("es-VE", opciones);
};

async function modalAddGoals() {
  let queryGoals = await fetch(`${base_url}/Poa/getGoals`);
  let dataGoals = await queryGoals.json();

  selectUnidad.innerHTML = "<option value=''> --- </option>";

  let fragment = document.createDocumentFragment();

  for (let i = 0; i < dataGoals.length; i++) {
    let option = document.createElement("option");
    option.value = dataGoals[i].id_metas; // Corrige el acceso al array
    option.textContent = dataGoals[i].meta;
    fragment.appendChild(option);
  }

  selectUnidad.appendChild(fragment);

  const myModal = new bootstrap.Modal(document.getElementById("addGoals"));
  myModal.show();
}

// ================ AL CARGAR LA PAGINA ==========================================
document.addEventListener("DOMContentLoaded", function () {
  llenarCards();
  hola();
});
async function hola() {
  try {
    let query = await fetch(`${base_url}/Poa/getDinamicGoalsAlert`);
    let data = await query.json();

    console.log(data); // Verifica la estructura de los datos en la consola

    // Filtrar metas con progreso menor al 90%
    const hoy = new Date();
    const metasPendientes = data.filter((item) => {
      const porcentaje =
        (item.cantidad_progreso / item.cantidad_objetivo) * 100;
      return porcentaje < 90; // Solo metas con progreso menor al 90%
    });

    if (metasPendientes.length > 0) {
      // Si hay metas pendientes, calcular tiempo restante y generar mensajes personalizados
      const mensajes = metasPendientes.map((item) => {
        const fechaLimite = new Date(item.fecha_limite);
        const diferenciaMilisegundos = fechaLimite - hoy;
        const diferenciaDias = Math.floor(
          diferenciaMilisegundos / (1000 * 60 * 60 * 24)
        );
        const diferenciaHoras = Math.floor(
          (diferenciaMilisegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        const porcentaje =
          (item.cantidad_progreso / item.cantidad_objetivo) * 100;

        // Determinar el consejo basado en el porcentaje y el id_metas
        let consejo = "";
        if (porcentaje < 30) {
          // Mensaje urgente según el id_metas
          if (item.id_metas === 1)
            consejo = "<b>Urgente:</b> Revisa reparaciones.";
          if (item.id_metas === 2)
            consejo = "<b>Urgente:</b> Revisa incidencias.";
          if (item.id_metas === 3)
            consejo = "<b>Urgente:</b> Revisa proyectos.";
          if (item.id_metas === 4)
            consejo = "<b>Urgente:</b> Revisa capacitaciones.";
          if (item.id_metas === 5) consejo = "<b>Urgente:</b> Revisa personal.";
        } else if (porcentaje >= 30 && porcentaje < 90) {
          // Mensaje regular según el id_metas
          if (item.id_metas === 1)
            consejo = "<b>Consejo:</b> Revisa reparaciones.";
          if (item.id_metas === 2)
            consejo = "<b>Consejo:</b> Revisa incidencias.";
          if (item.id_metas === 3)
            consejo = "<b>Consejo:</b> Revisa proyectos.";
          if (item.id_metas === 4)
            consejo = "<b>Consejo:</b> Revisa capacitaciones.";
          if (item.id_metas === 5) consejo = "<b>Consejo:</b> Revisa personal.";
        }

        // Formatear el mensaje según los días o horas restantes
        if (diferenciaDias > 0) {
          return `Quedan ${diferenciaDias} días para la meta "${item.nombre_meta}". ${consejo}`;
        } else {
          return `Quedan ${diferenciaHoras} horas para la meta "${item.nombre_meta}". ${consejo}`;
        }
      });

      // Mostrar los mensajes en la alerta
      Swal.fire({
        title: "Metas Dinámicas",
        html: mensajes.join("<br><br>"), // Usar <br> para saltos de línea
        icon: "info",
        confirmButtonText: "Cerrar",
      });
    } else {
      // Si todo está bien, mostrar un mensaje indicando que todo va bien
      Swal.fire({
        title: "Todo en orden",
        text: "Todas tus metas están por encima del 90% de progreso. ¡Buen trabajo!",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
    }
  } catch (error) {
    console.error("Error al obtener las metas dinámicas:", error);

    // Mostrar alerta de error si algo falla
    Swal.fire({
      title: "Error",
      text: "No se pudieron obtener las metas dinámicas.",
      icon: "error",
      confirmButtonText: "Intentar de nuevo",
    });
  }
}

function llenarCards() {
  ContenedorCard.innerHTML = "";
  cambiarEstado();
  llenarCardPrimeraMeta();
  llenarCardSegundaMeta();
  llenarCardTerceraMeta();
  llenarCardCuartaMeta();
  llenarCardQuintaMeta();
}

// ============================= FORMULARIO DE METAS EVENTO ====================
formAddGoals.addEventListener("submit", async (e) => {
  e.preventDefault();

  let btnCloseModalAddGoals = document.getElementById("btnCloseModalAddGoals");
  let formData = new FormData(formAddGoals);

  // // Mostrar contenido
  // formData.forEach((value, key) => {
  //   console.log(`${key}: ${value}`);
  // });

  // ========== CARGAR DATOS PARA EL HISTORICO =============
  let queryMeta = await fetch(
    `${base_url}/Poa/getGoals/${formData.get("meta")}`
  );
  let dataMeta = await queryMeta.json();

  // ================== FORMATEO DE FECHAS ==============
  let fecha = "";
  fecha = formData.get("fecha_limite").split("-").reverse().join("-");
  // =============================================

  tipoOperacion = "Creación";
  descripcionOperacion = `Registro de Meta: 
  <strong>${dataMeta.meta}</strong>, 
  Con la Cantidad Obejtivo: <strong>${formData.get(
    "cantidad_objetivo"
  )}</strong>,
  y la Fecha Límite: <strong>${fecha}</strong>`;
  // ==========================================================

  let query = await fetch(`${base_url}/Poa/newDinamicGoals`, {
    method: "POST",
    body: formData,
  });

  let { status, msg, title } = await query.json();

  if (status) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: "Agregado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    btnCloseModalAddGoals.click();
    formAddGoals.reset();
    llenarCards();
  } else {
    Swal.fire({
      icon: "error",
      title,
      text: msg,
      showConfirmButton: false,
      timer: 2000,
    });
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
  }
});

// =============================== LLENAR LAS CARD CON DATOS ==================================
async function llenarCardPrimeraMeta() {
  let id = 1;

  // ================== TRAE DATOS DE LA META PRINCIPALMENTE SUS FECHAS PARA EFECTUAR UN FILTRO =============
  let query = await fetch(`${base_url}/Poa/getDinamicGoals/${id}`);
  let data = await query.json();

  if (!data || Object.keys(data).length === 0) {
    return;
  }

  // ===================== TRAE LOS DATOS QUE SE ENCUENTRAN ENTRE ESAS FECHAS ES DECIR LAS METAS QUE ESTAN TERMINANDAS ===========
  let query2 = await fetch(
    `${base_url}/Poa/getDataIncidentGoals/${id}/${data.fecha_creacion}/${data.fecha_limite}`
  );
  let data2 = await query2.json();

  // Validar que también haya datos en la segunda consulta
  if (!data2 || Object.keys(data2).length === 0) {
    return;
  }

  // ===================== ACTUALIZA LA TABLA CON LOS DATOS DE ANTES ==========================
  let query3 = await fetch(
    `${base_url}/Poa/changeCantidadProgreso/${id}/${data.id_metas_dinamicas}/${data2.cantidad}`
  );
  let data3 = await query3.json();

  // ======================= CALCULO PARA INDICADOR VISUAL SEMAFORO BSC ===========
  porcentaje = (data2.cantidad / data.cantidad_objetivo) * 100;
  porcentaje = Math.round(porcentaje);
  // ==============================================================================

  let card = ``;

  let deleteButton = "";

  if (userLevel == 2) {
    deleteButton = `
          <button class='btn btn-outline-danger mt-1'
            onclick="confirmed(${data.id_metas_dinamicas})">
            <i class='fas fa-ban'></i>
          </button>`;
  }

  card += `
<div class="card-one shadow bg-white pointer border border-primary rounded p-3" style="height: 220px;">

      <div class="card-header d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h6 class="text-primary m-0">${data.nombre_meta}</h6>
          <small class="text-muted">Fecha Creación: <strong>${
            data.fecha_creacionFormateada
          }</strong></small>
      </div>
      <div class="card-body">
          <p class="mb-1">
              <strong>Fecha Límite:</strong> ${data.fecha_limiteFormateada}
          </p>
          <p class="mb-1">
              <strong>Objetivo:</strong> ${data2.cantidad} / ${
    data.cantidad_objetivo
  }
          </p>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center pt-2 border-top">
          <div>
          <i class="fas ${
            porcentaje < 30
              ? "fas fa-face-frown-open text-danger"
              : porcentaje < 70
              ? "fas fa-face-smile text-warning"
              : "fa-face-grin-beam text-success"
          }" 
    style="font-size: 35px;"></i>
    <small class="ms-2">Progreso: ${porcentaje}%</small> </div>
          ${deleteButton}
      </div>
  </div>
`;

  ContenedorCard.innerHTML += card;
}

async function llenarCardSegundaMeta() {
  let id = 2;

  // ================== TRAE DATOS DE LA META PRINCIPALMENTE SUS FECHAS PARA EFECTUAR UN FILTRO =============
  let query = await fetch(`${base_url}/Poa/getDinamicGoals/${id}`);
  let data = await query.json();

  if (!data || Object.keys(data).length === 0) {
    return;
  }

  // ===================== TRAE LOS DATOS QUE SE ENCUENTRAN ENTRE ESAS FECHAS ES DECIR LAS METAS QUE ESTAN TERMINANDAS ===========
  let query2 = await fetch(
    `${base_url}/Poa/getDataIncidentGoals/${id}/${data.fecha_creacion}/${data.fecha_limite}`
  );
  let data2 = await query2.json();

  // Validar que también haya datos en la segunda consulta
  if (!data2 || Object.keys(data2).length === 0) {
    return;
  }

  // ===================== ACTUALIZA LA TABLA CON LOS DATOS DE ANTES ==========================
  let query3 = await fetch(
    `${base_url}/Poa/changeCantidadProgreso/${id}/${data.id_metas_dinamicas}/${data2.cantidad}`
  );
  let data3 = await query3.json();

  // ======================= CALCULO PARA INDICADOR VISUAL SEMAFORO BSC ===========
  porcentaje = (data2.cantidad / data.cantidad_objetivo) * 100;
  porcentaje = Math.round(porcentaje);
  // ==============================================================================

  // Construcción de la tarjeta
  let card = ``;

  let deleteButton = "";

  if (userLevel == 2) {
    deleteButton = `
          <button class='btn btn-outline-danger mt-1'
            onclick="confirmed(${data.id_metas_dinamicas})">
            <i class='fas fa-ban'></i>
          </button>`;
  }

  card += `
<div class="card-one shadow bg-white pointer border border-primary rounded p-3" style="height: 220px;">

      <div class="card-header d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h6 class="text-primary m-0">${data.nombre_meta}</h6>
          <small class="text-muted">Fecha Creación: <strong>${
            data.fecha_creacionFormateada
          }</strong></small>
      </div>
      <div class="card-body">
          <p class="mb-1">
              <strong>Fecha Límite:</strong> ${data.fecha_limiteFormateada}
          </p>
          <p class="mb-1">
              <strong>Objetivo:</strong> ${data2.cantidad} / ${
    data.cantidad_objetivo
  }
          </p>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center pt-2 border-top">
          <div>
             <i class="fas ${
               porcentaje < 30
                 ? "fas fa-face-frown-open text-danger"
                 : porcentaje < 70
                 ? "fas fa-face-smile text-warning"
                 : "fa-face-grin-beam text-success"
             }" 
    style="font-size: 35px;"></i>
    <small class="ms-2">Progreso: ${porcentaje}%</small> </div>
          ${deleteButton}
      </div>
  </div>
`;

  ContenedorCard.innerHTML += card;
}

async function llenarCardTerceraMeta() {
  let id = 3;

  // ================== TRAE DATOS DE LA META PRINCIPALMENTE SUS FECHAS PARA EFECTUAR UN FILTRO =============
  let query = await fetch(`${base_url}/Poa/getDinamicGoals/${id}`);
  let data = await query.json();

  if (!data || Object.keys(data).length === 0) {
    return;
  }

  // ===================== TRAE LOS DATOS QUE SE ENCUENTRAN ENTRE ESAS FECHAS ES DECIR LAS METAS QUE ESTAN TERMINANDAS ===========
  let query2 = await fetch(
    `${base_url}/Poa/getDataProjectGoals/${id}/${data.fecha_creacion}/${data.fecha_limite}`
  );
  let data2 = await query2.json();

  // Validar que también haya datos en la segunda consulta
  if (!data2 || Object.keys(data2).length === 0) {
    return;
  }

  // ===================== ACTUALIZA LA TABLA CON LOS DATOS DE ANTES ==========================
  let query3 = await fetch(
    `${base_url}/Poa/changeCantidadProgreso/${id}/${data.id_metas_dinamicas}/${data2.cantidad}`
  );
  let data3 = await query3.json();

  // ======================= CALCULO PARA INDICADOR VISUAL SEMAFORO BSC ===========
  porcentaje = (data2.cantidad / data.cantidad_objetivo) * 100;
  porcentaje = Math.round(porcentaje);
  // ==============================================================================

  // Construcción de la tarjeta
  let card = ``;

  let deleteButton = "";

  if (userLevel == 2) {
    deleteButton = `
          <button class='btn btn-outline-danger mt-1'
            onclick="confirmed(${data.id_metas_dinamicas})">
            <i class='fas fa-ban'></i>
          </button>`;
  }

  card += `
<div class="card-one shadow bg-white pointer border border-primary rounded p-3" style="height: 220px;">

      <div class="card-header d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h6 class="text-primary m-0">${data.nombre_meta}</h6>
          <small class="text-muted">Fecha Creación: <strong>${
            data.fecha_creacionFormateada
          }</strong></small>
      </div>
      <div class="card-body">
          <p class="mb-1">
              <strong>Fecha Límite:</strong> ${data.fecha_limiteFormateada}
          </p>
          <p class="mb-1">
              <strong>Objetivo:</strong> ${data2.cantidad} / ${
    data.cantidad_objetivo
  }
          </p>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center pt-2 border-top">
          <div>
             <i class="fas ${
               porcentaje < 30
                 ? "fas fa-face-frown-open text-danger"
                 : porcentaje < 70
                 ? "fas fa-face-smile text-warning"
                 : "fa-face-grin-beam text-success"
             }" 
    style="font-size: 35px;"></i>
    <small class="ms-2">Progreso: ${porcentaje}%</small> </div>
          ${deleteButton}
      </div>
  </div>
`;

  ContenedorCard.innerHTML += card;
}

async function llenarCardCuartaMeta() {
  let id = 4;

  // ================== TRAE DATOS DE LA META PRINCIPALMENTE SUS FECHAS PARA EFECTUAR UN FILTRO =============
  let query = await fetch(`${base_url}/Poa/getDinamicGoals/${id}`);
  let data = await query.json();

  if (!data || Object.keys(data).length === 0) {
    return;
  }

  // ===================== TRAE LOS DATOS QUE SE ENCUENTRAN ENTRE ESAS FECHAS ES DECIR LAS METAS QUE ESTAN TERMINANDAS ===========
  let query2 = await fetch(
    `${base_url}/Poa/getDataTrainingGoals/${id}/${data.fecha_creacion}/${data.fecha_limite}`
  );
  let data2 = await query2.json();

  // Validar que también haya datos en la segunda consulta
  if (!data2 || Object.keys(data2).length === 0) {
    return;
  }

  // ===================== ACTUALIZA LA TABLA CON LOS DATOS DE ANTES ==========================
  let query3 = await fetch(
    `${base_url}/Poa/changeCantidadProgreso/${id}/${data.id_metas_dinamicas}/${data2.cantidad}`
  );
  let data3 = await query3.json();

  // ======================= CALCULO PARA INDICADOR VISUAL SEMAFORO BSC ===========
  porcentaje = (data2.cantidad / data.cantidad_objetivo) * 100;

  porcentaje = Math.round(porcentaje);
  // ==============================================================================

  // Construcción de la tarjeta
  let card = ``;

  let deleteButton = "";

  if (userLevel == 2) {
    deleteButton = `
          <button class='btn btn-outline-danger mt-1'
            onclick="confirmed(${data.id_metas_dinamicas})">
            <i class='fas fa-ban'></i>
          </button>`;
  }

  card += `
<div class="card-one shadow bg-white pointer border border-primary rounded p-3" style="height: 220px;">

      <div class="card-header d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h6 class="text-primary m-0">${data.nombre_meta}</h6>
          <small class="text-muted">Fecha Creación: <strong>${
            data.fecha_creacionFormateada
          }</strong></small>
      </div>
      <div class="card-body">
          <p class="mb-1">
              <strong>Fecha Límite:</strong> ${data.fecha_limiteFormateada}
          </p>
          <p class="mb-1">
              <strong>Objetivo:</strong> ${data2.cantidad} / ${
    data.cantidad_objetivo
  }
          </p>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center pt-2 border-top">
          <div>
          
              <i class="fas ${
                porcentaje < 30
                  ? "fas fa-face-frown-open text-danger"
                  : porcentaje < 70
                  ? "fas fa-face-smile text-warning"
                  : "fa-face-grin-beam text-success"
              }" 
    style="font-size: 35px;"></i>
    <small class="ms-2">Progreso: ${porcentaje}%</small> </div>
          ${deleteButton}
      </div>
  </div>
`;

  ContenedorCard.innerHTML += card;
}

async function llenarCardQuintaMeta() {
  let id = 5;

  // ================== TRAE DATOS DE LA META PRINCIPALMENTE SUS FECHAS PARA EFECTUAR UN FILTRO =============
  let query = await fetch(`${base_url}/Poa/getDinamicGoals/${id}`);
  let data = await query.json();

  if (!data || Object.keys(data).length === 0) {
    return;
  }

  // ===================== TRAE LOS DATOS QUE SE ENCUENTRAN ENTRE ESAS FECHAS ES DECIR LAS METAS QUE ESTAN TERMINANDAS ===========
  let query2 = await fetch(
    `${base_url}/Poa/getTrainedPersonnel/${id}/${data.fecha_creacion}/${data.fecha_limite}`
  );
  let data2 = await query2.json();

  // Validar que también haya datos en la segunda consulta
  if (!data2 || Object.keys(data2).length === 0) {
    return;
  }

  // ===================== ACTUALIZA LA TABLA CON LOS DATOS DE ANTES ==========================
  let query3 = await fetch(
    `${base_url}/Poa/changeCantidadProgreso/${id}/${data.id_metas_dinamicas}/${data2.cantidad}`
  );
  let data3 = await query3.json();

  // ======================= CALCULO PARA INDICADOR VISUAL SEMAFORO BSC ===========
  porcentaje = (data2.cantidad / data.cantidad_objetivo) * 100;
  console.log(data2.cantidad, "zz");
  porcentaje = Math.round(porcentaje);
  // ==============================================================================
  console.log(data.id_metas_dinamicas);
  // Construcción de la tarjeta
  let card = ``;

  let deleteButton = "";

  if (userLevel == 2) {
    deleteButton = `
          <button class='btn btn-outline-danger mt-1'
            onclick="confirmed(${data.id_metas_dinamicas})">
            <i class='fas fa-ban'></i>
          </button>`;
  }

  card += `
<div class="card-one shadow bg-white pointer border border-primary rounded p-3" style="height: 220px;">

      <div class="card-header d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h6 class="text-primary m-0">${data.nombre_meta}</h6>
          <small class="text-muted">Fecha Creación: <strong>${
            data.fecha_creacionFormateada
          }</strong></small>
      </div>
      <div class="card-body">
          <p class="mb-1">
              <strong>Fecha Límite:</strong> ${data.fecha_limiteFormateada}
          </p>
          <p class="mb-1">
              <strong>Objetivo:</strong> ${data2.cantidad} / ${
    data.cantidad_objetivo
  }
          </p>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center pt-2 border-top">
          <div>
          
              <i class="fas ${
                porcentaje < 30
                  ? "fas fa-face-frown-open text-danger"
                  : porcentaje < 70
                  ? "fas fa-face-smile text-warning"
                  : "fa-face-grin-beam text-success"
              }" 
    style="font-size: 35px;"></i>
    <small class="ms-2">Progreso: ${porcentaje}%</small> </div>
          ${deleteButton}
      </div>
  </div>
`;

  ContenedorCard.innerHTML += card;
}

async function cambiarEstado() {
  try {
    let query = await fetch(`${base_url}/Poa/chanceDinamicGoalsStatus`);
    let data = await query.json();

    // Imprime el resultado completo para inspección
    console.log("Respuesta completa del servidor:", data);

    // Accede y muestra los datos de `updateResult` y `selectResult` por separado
    console.log(
      "Resultado de la actualización (updateResult):",
      data.updateResult
    );

    console.log("Resultados del SELECT (selectResult):");
    if (data.selectResult && data.selectResult.length > 0) {
      // Itera sobre los datos y crea una descripción concatenada
      descripcionOperacion = "Se Actualizó de forma automatica las Metas: ";
      data.selectResult.forEach((item, index) => {
        descripcionOperacion += `#${index + 1} [<strong>${
          item.meta
        }</strong>, Con Fecha de Creacion: <strong>${
          item.fecha_creacionFormateada
        }</strong>, Motivado a su Fecha Límite: <strong>${
          item.fecha_limiteFormateada
        }</strong>] `;
      });

      // Muestra la descripción completa
      console.log("Descripción de la operación:", descripcionOperacion);

      // Define tipoOperacion y estadoOperacion
      tipoOperacion = "Actualización";
      estadoOperacion = 1;

      // Llama a la función historico
      historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    } else {
      console.log("No se encontraron datos en selectResult.");
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error.message);
  }
}

//  ========================== APARTADO DE BORRADO ======================0

function confirmed(id) {
  Swal.fire({
    title: "¿Está seguro?",
    html: `
      <p>Este cambio no será reversible. Por favor, especifique el motivo:</p>
      <textarea class="border rounded p-2 col-12" id="motivoEliminar" rows="4" cols="50" placeholder="Escriba el motivo aquí"></textarea>
    `,
    icon: "warning",
    iconColor: "#d33",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    preConfirm: () => {
      const motivo = document.getElementById("motivoEliminar").value;

      // Validar longitud del motivo
      if (!validator.isLength(motivo, { min: 8, max: 200 })) {
        Swal.showValidationMessage(
          "El motivo debe tener entre 8 y 200 caracteres."
        );
        return false;
      }

      // Validar caracteres permitidos en el motivo
      if (!validator.matches(motivo, /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/)) {
        Swal.showValidationMessage(
          "El motivo contiene caracteres no permitidos."
        );
        return false;
      }

      // Retornar el motivo si pasa todas las validaciones
      return motivo;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const motivo = result.value; // Aquí tienes el motivo validado
      cancelarMeta(id, motivo);
    }
  });
}

async function cancelarMeta(id, motivo) {
  // ============================ HISTORICO ==========================
  let queryMetas = await fetch(`${base_url}/Poa/getDinamicGoalsForzada/${id}`);
  let dataMetas = await queryMetas.json();
  tipoOperacion = "Eliminación";
  descripcionOperacion = `Se Cancelo la Meta: <strong>${dataMetas.nombre_meta}</strong>, 
  Con los datos:
  Fecha Creacion: <strong>${dataMetas.fecha_creacionFormateada}</strong>, 
  Fecha Límite: <strong>${dataMetas.fecha_limiteFormateada}</strong>, 
  Cantidad Progreso: <strong>${dataMetas.cantidad_progreso}</strong>, 
  Cantidad Objetivo: <strong>${dataMetas.cantidad_objetivo}</strong>, 
  Motivado a: ${motivo}`;
  // =================================================================
  let query = await fetch(`${base_url}/Poa/cancelarDinamicGoals/${id}`);
  let { status, title, msg } = await query.json();

  if (status) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: "Eliminado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    llenarCards();
  } else {
    Swal.fire({
      icon: "error",
      title,
      text: msg,
      showConfirmButton: false,
      timer: 1500,
    });
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
  }
}
function formatearPorcentaje(valor) {
  // Verifica si termina en .00
  if (valor % 1 === 0) {
    return `${valor}`; // Retorna solo el entero
  } else {
    return `${valor.toFixed(2)}`; // Mantiene un decimal si no es entero
  }
}

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
