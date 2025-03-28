const nacimiento = document.getElementById("nacimiento");
const sexo = document.getElementById("sexo");
const opcion = document.getElementById("opcion");
const fecha1 = document.getElementById("fechaInicio");
const fecha2 = document.getElementById("fechaFin");
const estado = document.getElementById("estado");
const estadoP = document.getElementById("estadoP");
const formulario = document.getElementById("formulario");
const btnGenerar = document.getElementById("btnGenerar");
const tipo = document.getElementById("tipo");
const rowUser = document.querySelector(".row-user");
const rowGeneral = document.querySelector(".row-general");
const rowHistorico = document.querySelector(".row-historico");
const rowProyecto = document.querySelector(".row-proyecto");
const rowRecurso = document.querySelector(".row-recurso");
// ============== VARIALBLES HISTORICO =================
let tipoOperacion = "";
let descripcionOperacion = "";
let estadoOperacion = 0;

// =====================================================

// formulario.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   location.href = `${base_url}/Report/usuarios`;
// });
const tipoSelect = document.getElementById("tipo");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  let selectedValue = tipoSelect.value;
  let url = `${base_url}/Report`;

  if (selectedValue === "proyecto") {
    // Crear formulario dinámico para POST
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `${url}/proyecto`;
    form.target = "_blank";
    form.style.display = "none";

    // Agregar parámetros al formulario
    const params = {
      estadoP: estadoP.value,
      fecha1: fecha1.value,
      fecha2: fecha2.value,
    };

    for (const [key, value] of Object.entries(params)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value || "x"; // Valor por defecto 'x' si está vacío
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    // ================= HISTORICO DE OPERACIONES ===========================
    tipoOperacion = "Generar PDF";
    descripcionOperacion = `Se Generó un PDF Sobre <strong>Proyectos</strong>`;
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    // ======================================================================
    return; // Finaliza aquí para evitar ejecutar otros casos
  }
  if (selectedValue === "incidencia") {
    // Crear formulario dinámico para POST
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `${url}/incidencia`;
    form.target = "_blank";
    form.style.display = "none";

    // Agregar parámetros al formulario
    const params = {
      estadoP: estadoP.value,
      fecha1: fecha1.value,
      fecha2: fecha2.value,
    };

    for (const [key, value] of Object.entries(params)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value || "x"; // Valor por defecto 'x' si está vacío
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    // ================= HISTORICO DE OPERACIONES ===========================
    tipoOperacion = "Generar PDF";
    descripcionOperacion = `Se Generó un PDF Sobre <strong>Incidencias</strong>`;
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    // ======================================================================
    return; // Finaliza aquí para evitar ejecutar otros casos
  }

  if (selectedValue === "historico") {
    // Crear formulario dinámico para POST
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `${url}/historico`;
    form.target = "_blank";
    form.style.display = "none";

    // Agregar parámetros al formulario
    const params = {
      estado: estado.value,
      fecha1: fecha1.value,
      fecha2: fecha2.value,
    };

    for (const [key, value] of Object.entries(params)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value || "x"; // Valor por defecto 'x' si está vacío
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    // ================= HISTORICO DE OPERACIONES ===========================
    tipoOperacion = "Generar PDF";
    descripcionOperacion = `Se Generó un PDF Sobre <strong>Historico De Operaciones</strong>`;
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    // ======================================================================
    return; // Finaliza aquí para evitar ejecutar otros casos
  }
  if (selectedValue === "recursos") {
    // Crear formulario dinámico para POST
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `${url}/recursos/${opcion.value}`; // Ajusta la ruta según tu necesidad
    form.target = "_blank";
    form.style.display = "none";

    // Agregar el valor de opcion.value como parámetro
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "opcion"; // Nombre del parámetro
    input.value = opcion.value || "x"; // Valor por defecto 'x' si está vacío
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
    // ================= HISTORICO DE OPERACIONES ===========================
    tipoOperacion = "Generar PDF";
    descripcionOperacion = `Se Generó un PDF Sobre <strong>Recursos</strong>`;
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    // ======================================================================
    return; // Finaliza aquí para evitar ejecutar otros casos
  }

  if (selectedValue === "usuarios") {
    url += `/usuarios/${sexo.value}/${nacimiento.value}`;
    // ================= HISTORICO DE OPERACIONES ===========================
    tipoOperacion = "Generar PDF";
    descripcionOperacion = `Se Generó un PDF Sobre <strong>Usuarios</strong>`;
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    // ======================================================================
  } else if (selectedValue === "metas") {
    url += `/metas/${fecha1.value}/${fecha2.value}`; // Ajusta la ruta según tu necesidad
    // ================= HISTORICO DE OPERACIONES ===========================
    tipoOperacion = "Generar PDF";
    descripcionOperacion = `Se Generó un PDF Sobre <strong>Metas</strong>`;
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    // ======================================================================
  }

  window.open(url, "_blank");
});

tipo.addEventListener("change", (e) => {
  if (e.target.value === "usuarios") {
    rowUser.classList.remove("visually-hidden");
    rowGeneral.classList.add("visually-hidden");
    rowHistorico.classList.add("visually-hidden");
    rowProyecto.classList.add("visually-hidden");
    rowRecurso.classList.add("visually-hidden");
  } else if (e.target.value === "historico") {
    rowUser.classList.add("visually-hidden");
    rowGeneral.classList.remove("visually-hidden");
    rowProyecto.classList.add("visually-hidden");
    rowHistorico.classList.remove("visually-hidden");
    rowRecurso.classList.add("visually-hidden");
  } else if (e.target.value === "proyecto" || e.target.value === "incidencia") {
    rowUser.classList.add("visually-hidden");
    rowGeneral.classList.remove("visually-hidden");
    rowHistorico.classList.add("visually-hidden");
    rowProyecto.classList.remove("visually-hidden");
    rowRecurso.classList.add("visually-hidden");
  } else if (e.target.value === "recursos") {
    rowUser.classList.add("visually-hidden");
    rowGeneral.classList.add("visually-hidden");
    rowHistorico.classList.add("visually-hidden");
    rowProyecto.classList.add("visually-hidden");
    rowRecurso.classList.remove("visually-hidden");
  } else {
    // Ocultar todo si no hay selección válida
    rowUser.classList.add("visually-hidden");
    rowGeneral.classList.remove("visually-hidden");
    rowHistorico.classList.add("visually-hidden");
    rowProyecto.classList.add("visually-hidden");
    rowRecurso.classList.add("visually-hidden");
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
