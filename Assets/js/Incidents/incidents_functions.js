const INCIDENTS_TABLE = new DataTable("#incidencias", {
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
    url: `${base_url}/Incidents/getIncidents`,
    dataSrc: "",
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error al obtener los datos:", jqXHR.responseText);
    },
  },
  columns: [
    { data: "nombre_tipo" },
    { data: "categoria" },
    {
      data: "subtipo",
      render: function (data, type, row) {
        return data === 0 ? "Mantenimiento" : "Incidencia";
      },
    },
    { data: "fecha_formateada" },
    {
      data: null,
      render: function (data) {
        return data.nombres + " " + data.apellidos;
      },
    },
    { data: "opc" },
  ],
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});

document.addEventListener("DOMContentLoaded", function () {
  // alert("ROBERTO ACUERDATE DEL ERROR CUANDO LLENAS LOS RECURSOS");
});

let globalSubtipo = "";
let inputCodigo = document.getElementById("codigo");
let labelCodigo = document.getElementById("labelCodigo");
let temaAsignacion = document.getElementById("asignacion");
let inputCategory = document.getElementById("categoria").value;
let selectAsignados = document.getElementById("selectAsignados");
let listaAsignados = document.getElementById("listaAsignados");
let listaUsuarios = document.getElementById("listaUsuarios");
let cantRecurso = document.getElementById("cantRecurso");
let buscador = document.getElementById("buscador");
let datosFiltro = [];
let selectTipoIncident = document.getElementById("tipoIncident");
let selectTipoIncidentEdit = document.getElementById("tipoIncidentEdit");
let selectRecurso = document.getElementById("recurso");
let btnCloseModalAddIncident = document.getElementById("btnCloseAddIncident");
let btnCloseEditIncident = document.getElementById("btnCloseEditIncident");
let btnGuardarIncidentAssignment = document.getElementById(
  "btnGuardarIncidentAssignment"
);
let btnCloseAddIncidentAssignment = document.getElementById(
  "btnCloseAddIncidentAssignment"
);

// ============== VARIALBLES HISTORICO O LOG =================
let tipoOperacion = "";
let descripcionOperacion = "";
let estadoOperacion = 0;

// =====================================================

// let formRegisterUserTraining = document.getElementById(

//   "formRegisterUserTraining"
// );
let formAddIncident = document.getElementById("formAddIncident");
let formEditIncident = document.getElementById("formEditIncident");
let formAddIncidentAssignment = document.getElementById(
  "formAddIncidentAssignment"
);
let formAsignados = document.getElementById("formAsignados");
// let formEditTraining = document.getElementById("formEditTraining");

async function modalAddIncidentAssignment(id) {
  let queryResource = await fetch(`${base_url}/Resources/getResources`);
  let dataResource = await queryResource.json();

  let querySubtipo = await fetch(
    `${base_url}/Incidents/getIncidents/${globalSubtipo}`
  );
  let dataSubtipo = await querySubtipo.json();

  console.log(dataSubtipo.subtipo);
  console.log("global dice", dataSubtipo);

  let input_equipo = formAddIncidentAssignment.querySelector("input");
  input_equipo.value = id;

  let fragment = document.createDocumentFragment();

  selectRecurso.innerHTML = "<option value=''> --- </option>";

  for (let i = 0; i < dataResource.length; i++) {
    let option = document.createElement("option");
    option.value = dataResource[i].id_recurso;
    option.textContent = dataResource[i].nombre;
    fragment.appendChild(option);
  }

  const hoy = new Date();

  // Obtener los valores de año, mes y día en la zona horaria local
  const año = hoy.getFullYear();
  let mes = hoy.getMonth() + 1; // getMonth() devuelve de 0 a 11, por eso sumamos 1
  let dia = hoy.getDate();

  // Asegurar que mes y día tengan dos dígitos
  mes = mes < 10 ? "0" + mes : mes;
  dia = dia < 10 ? "0" + dia : dia;

  // Formatear la fecha en "YYYY-MM-DD"
  const fechaFormateada = `${año}-${mes}-${dia}`;

  // Asignar el valor al input
  document.getElementById("fecha_asignacion").value = fechaFormateada;
  selectRecurso.appendChild(fragment);

  if (dataSubtipo.subtipo === 0) {
    labelCodigo.hidden = false;
    inputCodigo.hidden = false;
    inputCodigo.required = true;

    let queryComputer = await fetch(`${base_url}/Computer/getComputer`);
    let dataComputer = await queryComputer.json();
    console.log("hola", dataComputer);

    let fragment2 = document.createDocumentFragment();
    inputCodigo.innerHTML = "<option value=''> --- </option>";

    for (let i = 0; i < dataComputer.length; i++) {
      let option2 = document.createElement("option");
      option2.value = dataComputer[i].id_computadora;
      option2.textContent = `${dataComputer[i].codigo} - ${dataComputer[i].modelo}`;
      fragment2.appendChild(option2);
    }

    inputCodigo.appendChild(fragment2);
  } else {
    labelCodigo.hidden = true;
    inputCodigo.hidden = true;
    inputCodigo.required = false;
  }

  const myModal = new bootstrap.Modal("#addIncidentAssignment");
  myModal.show();
}

async function modalViewUser(id) {
  let query = await fetch(`${base_url}/Teams/getUserForTeam/${id}`);
  let data = await query.json();

  datosFiltro.push(...data);

  let card = ``;

  for (let i = 0; i < data.length; i++) {
    card += `
    <div class="col-4 mb-3"> 
        <div class="card border-primary"style="min-height: 150px;">
            <div class="card-header fw-bold bg-transparent text-center">
                <h6>${data[i].nombres} ${data[i].apellidos}</h6>
            </div>
            <div class="card-body">
                <h6 class="d-flex justify-content-center" style="font-size: 0.9rem;">${data[i].id_usuario}</h6>
                <h6 class="d-flex justify-content-center" style="font-size: 0.9rem;">${data[i].cargo}</h6>
            </div>
        </div>
    </div>
`;
  }

  listaUsuarios.innerHTML = card;

  const myModal = new bootstrap.Modal("#modalViewUser");

  myModal.show();
}

async function modalSeeAssignedIncident(id) {
  let query = await fetch(`${base_url}/Incidents/getAssignment/${id}`);
  let data = await query.json();

  let inputs = formAsignados.querySelectorAll("input");
  let textarea = formAsignados.querySelector("textarea");

  textarea.value = data.descripcion;
  inputs.item(0).value = data.fecha_asignacion;
  inputs.item(1).value = data.estado;
  inputs.item(2).value = data.nombre_equipo;
  inputs.item(3).value = data.nombre;
  inputs.item(4).value = data.numero_recursos;

  const myModal = new bootstrap.Modal("#modalAsignados");

  myModal.show();
}

async function modalEditarIncidencia(id) {
  let query = await fetch(`${base_url}/Incidents/getIncidents/${id}`);
  let data = await query.json();
  console.log(id);
  console.log(data);

  let queryCategoria = await fetch(
    `${base_url}/TypeIncident/getNameTypeIncident`
  );
  let dataCategoria = await queryCategoria.json();
  let fragment = document.createDocumentFragment();

  selectTipoIncidentEdit.innerHTML = "<option value='0'> --- </option>";

  for (let i = 0; i < dataCategoria.length; i++) {
    let option = document.createElement("option");
    option.value = dataCategoria[i].id_tipo;
    option.textContent = dataCategoria[i].nombre_tipo;
    fragment.appendChild(option);
  }

  selectTipoIncidentEdit.appendChild(fragment);

  let inputs = formEditIncident.querySelectorAll("input");
  let textarea = formEditIncident.querySelector("textarea");

  textarea.value = data.descripcion;
  inputs.item(0).value = data.id_incidencia;
  inputs.item(1).value = data.categoria;
  inputs.item(2).value = data.fecha_reporte.split(" ")[0];
  inputs.item(3).value = data.reportado_por;

  selectTipoIncidentEdit.value = data.id_tipo;

  const myModal = new bootstrap.Modal("#editIncident");

  myModal.show();
}

async function modalAddIncident() {
  let query = await fetch(`${base_url}/TypeIncident/getNameTypeIncident`);
  let data = await query.json();
  let fragment = document.createDocumentFragment();
  selectTipoIncident.innerHTML = "<option value='0'> --- </option>";

  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    option.value = data[i].id_tipo;
    option.textContent = data[i].nombre_tipo;
    fragment.appendChild(option);
  }

  selectTipoIncident.appendChild(fragment);

  const myModal = new bootstrap.Modal("#addIncident");

  myModal.show();
}

document.addEventListener("DOMContentLoaded", (event) => {
  selectTipoIncident.addEventListener("change", (event) => {
    id_tipo = event.target.value;
    console.log(`Has seleccionado: ${id_tipo}`);
    updateInput(id_tipo);
  });

  selectTipoIncidentEdit.addEventListener("change", (event) => {
    id_tipo = event.target.value;
    console.log(`Has seleccionado: ${id_tipo}`);
    updateInput(id_tipo);
  });
});

async function updateInput(id_tipo) {
  let query = await fetch(
    `${base_url}/TypeIncident/getCategoryTypeIncident/${id_tipo}`
  );
  let data = await query.json();
  document.getElementById("categoria").value = data[0].categoria;
  document.getElementById("categoriaEdit").value = data[0].categoria;
  console.log(data[0].categoria);
}

function recargaData() {
  selectAsignados.value = 0;

  temaAsignacion.textContent = " Asignar Equipos";
  listaAsignados.innerHTML = "";
  buscador.disabled = true;
  fillSelect();
}

async function fillSelect() {
  let query = await fetch(`${base_url}/Incidents/getIncidents`);
  let data = await query.json();
  selectAsignados.innerHTML = `
      <option value='0'>---</option>
    `;

  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    let fragment = document.createDocumentFragment();
    option.value = data[i].id_incidencia;
    option.textContent = data[i].nombre_tipo;
    fragment.appendChild(option);
    selectAsignados.appendChild(fragment);
  }

  temaAsignacion.textContent = `  Asignar Equipos`;
}

async function llenarCard(type) {
  let query = await fetch(`${base_url}/Teams/getTeamsForIncident/${type}`);
  let data = await query.json();
  console.log("Datos recibidos:", data);
  datosFiltro.push(...data);

  let card = ``;
  let option = selectAsignados.value;

  for (let i = 0; i < data.length; i++) {
    if (data[i].id_asignacion !== null) {
      // REVISAR ESTO CREO QUE EL CODIGO DEL ELSE ES INNECESARIO AHORA
      card += `
       <div class="card col-3 ms-3 border border-primary mt-2" style="min-height: 150px;">
          <header class="card-header fw-bold bg-transparent">
            <h6 class="text-wrap w-100 mt-2 text-center">${data[i].nombre_equipo}</h6>
            <button class="btn btn-primary mt-1" onclick="modalViewUser(${data[i].id_equipo})"
            id="btnViewUser"><i class='fa-regular fa-eye'></i></button>
          </header>
          <div class="d-flex justify-content-center">
            <button class="btn btn-secondary mt-1" style="width: max-content" onclick="modalAddIncidentAssignment(${data[i].id_equipo})"
            id="btnAsignar">Asignar</button>
            </div>
      </div>
  `;
    }
  }

  if (data.length < 1) return;

  listaAsignados.innerHTML = card;
  buscador.disabled = false;
  temaAsignacion.textContent = `Equipos Disponibles (${data.length})`;
}

function confirmed(id) {
  Swal.fire({
    title: "¿Está seguro?",
    html: `
      <p>Este cambio no será reversible. Por favor, especifique el motivo:</p>
      <textarea id="motivoEliminar" rows="4" cols="50" placeholder="Escriba el motivo aquí"></textarea>
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
      cancelarIncidencia(id, motivo);
    }
  });
}

async function cancelarIncidencia(id, motivo) {
  //================== HISTORICO DE OPERACIONES ======================
  let queryIncidencia = await fetch(`${base_url}/Incidents/getIncidents/${id}`);
  let dataIncidencia = await queryIncidencia.json();

  let queryTipoIncidencia = await fetch(
    `${base_url}/TypeIncident/getTypeIncident/${dataIncidencia.id_tipo}`
  );
  let dataTipoIncidencia = await queryTipoIncidencia.json();

  tipoOperacion = "Eliminación";
  descripcionOperacion = `Se elimino la Incidencia: ${dataTipoIncidencia.nombre_tipo}\nMotivo: ${motivo}`;

  // ==================================================================
  let query = await fetch(`${base_url}/Incidents/delIncidents/${id}`);
  let { status, msg, title } = await query.json();

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
    INCIDENTS_TABLE.ajax.reload();
    btnCloseModalAddIncident.click();
    fillSelect();
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

selectAsignados.addEventListener("change", async (e) => {
  //SELECTOR DE INCIDENCIAS
  let option = selectAsignados.selectedOptions[0].textContent;
  globalSubtipo = selectAsignados.selectedOptions[0].value; // CAPTURA EL ID DE LA INCIDENCIA PARA HACER USO DEL SUBTIPO
  console.log(globalSubtipo);
  datosFiltro = [];

  if (option == "---") {
    temaAsignacion.textContent = "(Vacío) Asignados";
    listaAsignados.innerHTML = "";
    buscador.disabled = true;
    return;
  }
  let type = 1;
  llenarCard(type);
});

formAddIncident.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formData = new FormData(formAddIncident);
  let select = formAddIncident.querySelectorAll("select");
  let textArea = formAddIncident.querySelectorAll("textarea");

  if (textArea.item(0).value === "") {
    alertTimeOut("error", "Campo descripción vacío", 3000);
    return;
  }

  if (select.item(0).value === "0") {
    alertTimeOut("error", "Seleccione un tipo de incidencia", 3000);
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
      "Descripción inválida, entre 8 y 200 caracteres",
      3000
    );
    return;
  }

  // ========== CARGAR DATOS PARA EL HISTORICO =============
  let queryTipo = await fetch(
    `${base_url}/TypeIncident/getTypeIncident/${formData.get("id_tipo")}`
  );
  let dataTipo = await queryTipo.json();
  tipoOperacion = "Creación";
  descripcionOperacion = `Registro de Incidencia: ${dataTipo.nombre_tipo}`;
  // ===============================

  let query = await fetch(`${base_url}/Incidents/setIncidents`, {
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
    recargaData();
    INCIDENTS_TABLE.ajax.reload();
    btnCloseModalAddIncident.click();
    formAddIncident.reset();
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
});

formEditIncident.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formData = new FormData(formEditIncident);
  let select = formEditIncident.querySelectorAll("select");
  let inputs = formEditIncident.querySelectorAll("input");
  let textArea = formEditIncident.querySelectorAll("textarea");

  if (select.item(0).value === "0") {
    alertTimeOut("error", "Seleccione un tipo de incidencia", 3000);
    return;
  }

  if (inputs.item(2).value === "") {
    alertTimeOut("error", "Campo fecha vacío", 3000);
    return;
  }

  if (!validarFecha(inputs.item(2).value)) {
    alertTimeOut("error", "Fecha inválida", 3000);
    return;
  }

  if (textArea.item(0).value === "") {
    alertTimeOut("error", "Campo descripción vacío");
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
      "Descripción inválida, entre 8 y 200 caracteres",
      3000
    );
    return;
  }

  if (textArea.item(1).value === "") {
    alertTimeOut("error", "Campo Motivo Actualizacion vacío");
    return;
  }

  if (
    !validator.isLength(textArea.item(1).value, { min: 8, max: 200 }) ||
    !validator.matches(
      textArea.item(1).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut(
      "error",
      "Motivo Actualizacion inválida, No permitidos caracteres especiales y desde 8 a 200 caracteres",
      3000
    );
    return;
  }

  formData.set(
    "fecha_reporte",
    `${inputs.item(2).value} ${new Date().toLocaleTimeString().split(" ")[0]}`
  );

  // ========== CARGAR DATOS PARA EL HISTORICO =============
  let queryTipo = await fetch(
    `${base_url}/TypeIncident/getTypeIncident/${formData.get("id_tipo")}`
  );
  let dataTipo = await queryTipo.json();

  tipoOperacion = "Actualización";
  descripcionOperacion = `Actualizacion de Incidencia: ${
    dataTipo.nombre_tipo
  }\nMotivo: ${formData.get("motivo")}`;
  // ===============================

  let query = await fetch(`${base_url}/Incidents/updateIncidents`, {
    method: "POST",
    body: formData,
  });
  let { status, msg, title } = await query.json();

  if (status) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: "Actualizado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    recargaData();
    INCIDENTS_TABLE.ajax.reload();
    btnCloseEditIncident.click();
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
});

formAddIncidentAssignment.addEventListener("submit", async (e) => {
  e.preventDefault();
  let formData = new FormData(formAddIncidentAssignment);
  formData.append("id_incidencia", selectAsignados.value);
  formData.append(
    "fecha_asignacion",
    `${document.getElementById("fecha_asignacion").value} ${
      new Date().toTimeString().split(" ")[0]
    }`
  );
  formData.append(
    "codigo",
    `${
      document.getElementById("codigo").value === ""
        ? 0
        : document.getElementById("codigo").value
    }`
  );

  // Iterar sobre el contenido
  for (let [clave, valor] of formData.entries()) {
    console.log(`${clave}: ${valor}`);
  }

  // ============================== HISTORICO DE OPERACIONES =============
  let queryIncidencia = await fetch(
    `${base_url}/Incidents/getIncidents/${formData.get("id_incidencia")}`
  );
  let dataIncidencia = await queryIncidencia.json();

  let queryTipoIncidencia = await fetch(
    `${base_url}/TypeIncident/getTypeIncident/${dataIncidencia.id_tipo}`
  );
  let dataTipoIncidencia = await queryTipoIncidencia.json();

  let queryEquipo = await fetch(
    `${base_url}/Teams/getTeams/${formData.get("id_equipo")}`
  );
  let dataEquipo = await queryEquipo.json();

  // ============= GUARDAR LAS CANTIDADES ===============
  const cantidades = [];
  for (let i = 1; i <= 5; i++) {
    let valor = formData.get(`cantidad${i}`);
    cantidades.push(valor);
  }

  // =======================================

  // ===== PARA OBTENER EL NOMBRE DE LOS RECURSOS =====
  const formDataRecursos = new FormData();
  formDataRecursos.append("recurso1", formData.get("recurso1"));
  formDataRecursos.append("recurso2", formData.get("recurso2"));
  formDataRecursos.append("recurso3", formData.get("recurso3"));
  formDataRecursos.append("recurso4", formData.get("recurso4"));
  formDataRecursos.append("recurso5", formData.get("recurso5"));

  let queryRecursos = await fetch(`${base_url}/Resources/getResourcesLog`, {
    method: "POST",
    body: formDataRecursos,
  });
  let dataResource = await queryRecursos.json();

  // ===== COMBINAR RECURSOS Y CANTIDADES =====
  let recursosConCantidades = dataResource
    .map((recurso, index) => {
      let cantidad = cantidades[index];
      if (
        recurso.nombre &&
        recurso.nombre.trim() !== "" &&
        cantidad &&
        cantidad.trim() !== ""
      ) {
        return `${recurso.nombre} (${cantidad})`;
      }
      return null; // Si no hay un recurso o cantidad válido, ignorarlo
    })
    .filter((item) => item !== null); // Filtra los valores nulos

  // Construimos la descripción dinámicamente
  tipoOperacion = "Asignación";
  descripcionOperacion = `Se Asignó la Incidencia: <strong>${
    dataTipoIncidencia.nombre_tipo
  }</strong> al Equipo: <strong>${
    dataEquipo.nombre_equipo
  }</strong>, Con los recursos: ${
    recursosConCantidades.join(", ") || "sin recursos disponibles"
  }`;
  // =====================================================================

  let query = await fetch(`${base_url}/Incidents/assignIncident`, {
    method: "POST",
    body: formData,
  });
  let { status, msg, title } = await query.json();

  if (status) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: "Asignado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    recargaData();
    INCIDENTS_TABLE.ajax.reload();
    btnCloseAddIncidentAssignment.click();
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
});

selectRecurso.addEventListener("change", async (e) => {
  let query = await fetch(
    `${base_url}/Resources/getResources/${selectRecurso.value}`
  );
  let dataResource = await query.json();

  if (dataResource.disponible) {
    cantRecurso.ariaValueMax = dataResource.cantidad;

    cantRecurso.removeAttribute("disabled");
  } else {
    cantRecurso.ariaValueMax = 0;
    cantRecurso.setAttribute("disabled", true);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      text: "No disponible en este momento",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  cantRecurso.value = "";
});

cantRecurso.addEventListener("focusout", (e) => {
  console.log(
    e.target.value > cantRecurso.ariaValueMax,
    e.target.value,
    cantRecurso.ariaValueMax
  );

  if (parseInt(e.target.value) > parseInt(cantRecurso.ariaValueMax)) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      text: `Cantidad Maxima de este recurso: ${cantRecurso.ariaValueMax}`,
      showConfirmButton: false,
      timer: 1500,
    });

    btnGuardarIncidentAssignment.setAttribute("disabled", true);
    return;
  }

  btnGuardarIncidentAssignment.removeAttribute("disabled");
});

window.addEventListener("DOMContentLoaded", () => {
  fillSelect();
});

document.addEventListener("DOMContentLoaded", (event) => {
  const container = document.getElementById("container");
  const addButton = document.getElementById("addButton");
  const removeButton = document.getElementById("removeButton");
  let inputCount = 1;
  const maxInputs = 5;

  async function fillSelectOptions(selectElement) {
    let queryResource = await fetch(`${base_url}/Resources/getResources`);
    let dataResource = await queryResource.json();

    let fragment = document.createDocumentFragment();
    selectElement.innerHTML = "<option value=''> --- </option>";

    for (let i = 0; i < dataResource.length; i++) {
      let option = document.createElement("option");
      option.value = dataResource[i].id_recurso;
      option.textContent = dataResource[i].nombre;
      fragment.appendChild(option);
    }
    selectElement.appendChild(fragment);
  }

  function createInputGroup(number) {
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group mt-2";

    const labelRecurso = document.createElement("label");
    labelRecurso.setAttribute("for", `recurso${number}`);
    labelRecurso.className = "col-6";
    labelRecurso.textContent = "Recurso";

    const selectRecurso = document.createElement("select");
    selectRecurso.id = `recurso${number}`;
    selectRecurso.name = `recurso${number}`;
    selectRecurso.className = "form-select";
    selectRecurso.required = true;

    // Añadir opción predeterminada
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "---";
    selectRecurso.appendChild(defaultOption);

    labelRecurso.appendChild(selectRecurso);
    inputGroup.appendChild(labelRecurso);

    // Crear el campo de cantidad
    const cantidadDiv = document.createElement("div");
    cantidadDiv.className = "col-5 ms-2";

    const cantidadLabel = document.createElement("label");
    cantidadLabel.textContent = "Cantidad";

    const cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.name = `cantidad${number}`;
    cantidadInput.id = `cantidad${number}`;
    cantidadInput.className = "form-control";
    cantidadInput.required = true;

    cantidadLabel.appendChild(cantidadInput);
    cantidadDiv.appendChild(cantidadLabel);
    inputGroup.appendChild(cantidadDiv);

    // Llenar las opciones del nuevo select
    fillSelectOptions(selectRecurso);

    return inputGroup;
  }

  addButton.addEventListener("click", () => {
    if (inputCount < maxInputs) {
      inputCount++;
      const newInputGroup = createInputGroup(inputCount);
      container.appendChild(newInputGroup);
    } else {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        text: `Número máximo de inputs alcanzado`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  removeButton.addEventListener("click", () => {
    if (inputCount > 1) {
      container.removeChild(container.lastElementChild);
      inputCount--;
    } else {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        text: `Número mínimo de inputs alcanzado`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  // Llenar opciones del primer select al cargar la página
  const initialSelect = document.querySelector("#recurso");
  if (initialSelect) {
    fillSelectOptions(initialSelect);
  }
});

//------------------ ALERTAS PARA MOSTRAR INFORMACION ----------------//

//------------------ OBTIENE LA DESCRIPCION DE LA INCIDENCIA ----------------//
async function alertaVerDescripcionIncidencia(id) {
  let query = await fetch(`${base_url}/Incidents/getIncidents/${id}`);
  let data = await query.json();

  let card = ``;

  card += `
      <p>
        ${data.descripcion}
      </p>
    `;

  Swal.fire({
    title: `<h4>Descripcion</h4>`,
    html: `${card}`,
    confirmButtonText: "Cerrar",
    confirmButtonColor: "#6c757d",
  });
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

function validarFecha(fechaInput) {
  // Validar que el formato sea correcto (YYYY-MM-DD)
  if (!validator.isDate(fechaInput)) return false;
  let partes = fechaInput.split("-");

  const hoy = new Date();
  // Convertir las fechas a objetos Date
  const fechaIngresada = new Date(partes[0], partes[1] - 1, partes[2]);

  hoy.setHours(0, 0, 0, 0);
  fechaIngresada.setHours(0, 0, 0, 0);

  // Validar que no sea hoy ni una fecha futura
  return hoy <= fechaIngresada;
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
