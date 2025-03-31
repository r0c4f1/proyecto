let columns = [
  { data: "nombre" },
  { data: "descripcion" },
  { data: "fecha_formateada" },
];

if (typeof nivelUsuario !== "undefined" && nivelUsuario != 0) {
  columns.push({ data: "opc" });
}

const PROYECTO_TABLE = new DataTable("#proyecto", {
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
    url: `${base_url}/Project/getProject`,
    dataSrc: "",
  },
  columns: columns,
  // dom: "lfrtip",
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});

let temaAsignacion = document.getElementById("asignacion");
let selectProyecto = document.getElementById("selectProyecto");
let buscador = document.getElementById("buscador");
let listaProyecto = document.getElementById("listaProyectos");
let datosFiltro = [];

// ============== VARIALBLES HISTORICO =================
let tipoOperacion = "";
let descripcionOperacion = "";
let estadoOperacion = 0;

// =====================================================

let globalSubtipo = "";

window.addEventListener("DOMContentLoaded", () => {
  fillSelect();
});

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

async function fillSelect() {
  let query = await fetch(`${base_url}/Project/getProject`);
  let data = await query.json();
  selectProyecto.innerHTML = `
      <option value='0'>---</option>
    `;

  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    let fragment = document.createDocumentFragment();
    option.value = data[i].id_proyecto;
    option.textContent = data[i].nombre;
    fragment.appendChild(option);
    selectProyecto.appendChild(fragment);
  }

  temaAsignacion.textContent = ` Asignar Equipos`;
}

selectProyecto.addEventListener("change", async (e) => {
  //SELECTOR DE INCIDENCIAS
  let option = selectProyecto.selectedOptions[0].textContent;

  datosFiltro = [];

  if (option == "---") {
    temaAsignacion.textContent = "Asignar Equipo";
    listaProyecto.innerHTML = "";
    buscador.disabled = true;
    return;
  }
  let type = 0;
  llenarCard(type);
});

async function llenarCard(type) {
  let query = await fetch(`${base_url}/Teams/getTeamsForIncident/${type}`);
  let data = await query.json();
  // console.log("Datos recibidos:", data);
  datosFiltro.push(...data);

  // Crear un conjunto para almacenar los ID de los equipos ya añadidos
  let equiposUnicos = new Set();

  let card = ``;
  let option = selectProyecto.value;

  for (let i = 0; i < data.length; i++) {
    // Solo añadir la tarjeta si el ID del equipo no está en el conjunto
    if (!equiposUnicos.has(data[i].id_equipo)) {
      equiposUnicos.add(data[i].id_equipo);
      card += `
        <div class="card col-3 ms-3 border border-primary mt-2" style="min-height: 150px;">
          <header class="card-header fw-bold bg-transparent d-flex justify-content-between">
            <h6 class="text-wrap w-100 mt-2 text-center">${data[i].nombre_equipo}</h6>
            <button class="btn btn-primary mt-1 ml-3" onclick="modalViewUser(${data[i].id_equipo})" id="btnViewUser"><i class='fa-regular fa-eye'></i></button>
          </header>
          <div class="d-flex justify-content-center">
            <button class="btn btn-secondary mt-1" style="width: max-content" onclick="modalAsignarProyecto(${data[i].id_equipo}, ${selectProyecto.value})" id="btnAsignar">Asignar</button>
          </div>
        </div>
      `;
    }
  }

  if (data.length < 1) return;

  listaProyecto.innerHTML = card;
  buscador.disabled = false;
  temaAsignacion.textContent = `Equipos Disponibles (${equiposUnicos.size})`;
}

//////////////////////////////////////////////////////////////// ASIGNAR PROYECTO
let selectRecurso = document.getElementById("recurso");
const addButton = document.getElementById("addButton");
const removeButton = document.getElementById("removeButton");
const btnAddProjectAssignment = document.getElementById(
  "btnAddProjectAssignment"
);
let inputCount = 1;
let maxInputs = 5;

async function modalAsignarProyecto(id_equipo, id_proyecto) {
  let queryResource = await fetch(`${base_url}/Resources/getResources`);
  let dataResource = await queryResource.json();

  let fragment = document.createDocumentFragment();

  selectRecurso.innerHTML = "<option value=''> --- </option>";

  for (let i = 0; i < dataResource.length; i++) {
    let option = document.createElement("option");
    option.value = dataResource[i].id_recurso;
    option.textContent = dataResource[i].nombre;
    fragment.appendChild(option);
  }

  selectRecurso.appendChild(fragment);

  const myModal = new bootstrap.Modal("#addIncidentAssignment");
  myModal.show();
  btnAddProjectAssignment.setAttribute(
    "onclick",
    `assignProject(event, ${id_equipo}, ${id_proyecto})`
  );
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

async function assignProject(e, id_equipo, id_proyecto) {
  e.preventDefault();

  let recurso1 = document.getElementById("recurso");
  let cantidad1 = document.getElementById("cantRecurso1");
  // let recurso2 = document.getElementById("recurso2");
  // let cantidad2 = document.getElementById("cantidad2");
  // let recurso3 = document.getElementById("recurso3");
  // let cantidad3 = document.getElementById("cantidad3");
  // let recurso4 = document.getElementById("recurso4");
  // let cantidad4 = document.getElementById("cantidad4");
  // let recurso5 = document.getElementById("recurso5");

  const containerInputs = document
    .getElementById("container")
    .querySelectorAll("input");

  const containerSelect = document
    .getElementById("container")
    .querySelectorAll("select");

  if (recurso1.value === "" && cantidad1.value !== "") {
    alertTimeOut("error", "Falta el recurso", 2000);
    return;
  }

  if (recurso1.value !== "" && cantidad1.value === "") {
    alertTimeOut("error", "Falta la cantidad", 2000);
    return;
  }

  for (let i = 0; i < containerSelect.length; i++) {
    const el = containerSelect[i];
    const al = containerInputs[i];

    let query = await fetch(`${base_url}/Resources/getResources/${el.value}`);
    let data = await query.json();

    if (parseInt(data.cantidad) < parseInt(al.value)) {
      alertTimeOut(
        "error",
        `Recurso insuficiente: ${el.selectedOptions[0].textContent}`,
        2000
      );
      return;
    }
  }

  // ============================== HISTORICO DE OPERACIONES =============
  let queryProyecto = await fetch(
    `${base_url}/Project/getProject/${id_proyecto}`
  );
  let dataProyecto = await queryProyecto.json();

  let queryEquipo = await fetch(`${base_url}/Teams/getTeams/${id_equipo}`);
  let dataEquipo = await queryEquipo.json();

  tipoOperacion = "Asignación";
  descripcionOperacion = `Se Asigno el Proyecto: ${dataProyecto.nombre} al Equipo: ${dataEquipo.nombre_equipo}`;
  // =====================================================================
  const formData = new FormData();
  formData.append("id_equipo", id_equipo);
  formData.append("id_proyecto", id_proyecto);

  for (let i = 0; i < containerInputs.length; i++) {
    const el = containerInputs[i];
    formData.append(el.name, el.value);
  }

  for (let i = 0; i < containerSelect.length; i++) {
    const el = containerSelect[i];
    formData.append(el.name, el.value);
  }

  let query = await fetch(`${base_url}/Project/assignProject`, {
    method: "POST",
    body: formData,
  });

  let { status, title, msg } = await query.json();

  if (status) {
    document.getElementById("btnCloseAddIncidentAssignment").click();
    // const myModal = new bootstrap.Modal("#addIncidentAssignment");
    // myModal.hide();

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
    PROYECTO_TABLE.ajax.reload();
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

///////////////////////////////////////////////////////////////////////
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

function modalAddProjectModal() {
  const myModal = new bootstrap.Modal("#addProjectModal");

  myModal.show();
}
function modalRecycleBinProject() {
  const myModal = new bootstrap.Modal("#modalRecycleBinProject");

  myModal.show();
}
function closeRecycleBinProjectModal() {
  let btn = document.getElementById("btnCloseRecycleBinProjectmodal");
  btn.click();
}

function closeModalAddProjectModal() {
  let btn = document.getElementById("btnCloseAddProjectmodal");
  btn.click();
}

function closeModalEditProjectModal() {
  let btn = document.getElementById("btnCloseEditProjectmodal");
  btn.click();
}

async function addProject(e) {
  e.preventDefault(); // Evita el envío normal del formulario

  let formAddProject = document.getElementById("formAddProject");
  let inputs = formAddProject.querySelectorAll("input");
  let textArea = formAddProject.querySelectorAll("textarea");

  if (inputs.item(0).value === "") {
    alertTimeOut("error", "Campo título vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(0).value, { min: 1, max: 255 }) ||
    !validator.matches(
      inputs.item(0).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Título inválido", 3000);
    return;
  }

  if (textArea.item(0).value === "") {
    alertTimeOut("error", "Campo descripción vacío", 3000);
    return;
  }

  if (
    !validator.isLength(textArea.item(0).value, { min: 1, max: 500 }) ||
    !validator.matches(
      textArea.item(0).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Descripción inválida", 3000);
    return;
  }

  if (inputs.item(1).value === "") {
    alertTimeOut("error", "Campo fecha vacío", 3000);
    return;
  }

  if (!validarFecha(inputs.item(1).value)) {
    alertTimeOut("error", "Fecha inválida", 3000);
    return;
  }

  const formData = new FormData(formAddProject);

  // ========== CARGAR DATOS PARA EL HISTORICO =============
  tipoOperacion = "Creación";
  descripcionOperacion = `Registro de Proyecto ${formData.get("nombre")}`;
  // ===============================

  try {
    let query = await fetch(base_url + "/Project/registerProject", {
      method: "POST",
      body: formData,
    });

    let response = await query.json();

    if (response.status) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        text: response.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      fillSelect();
      closeModalAddProjectModal(); // Cierra el modal
      PROYECTO_TABLE.ajax.reload(); // Recarga la tabla
      estadoOperacion = "1";
      historico(tipoOperacion, descripcionOperacion, estadoOperacion); // llamado al historico
      document.querySelectorAll("input").forEach((input) => (input.value = "")); // Limpia los campos
      formAddProject.reset();
    } else {
      Swal.fire({
        icon: "error",
        title: response.title || "Error",
        text: response.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "No disponible!",
      text: "Intente nuevamente...",
      showConfirmButton: false,
      timer: 1500,
    });
    historico(tipoOperacion, descripcionOperacion, estadoOperacion); // llamado al historico
  }
}

async function updateProject(e) {
  e.preventDefault();

  let formAddProject = document.getElementById("formEditProject");
  let inputs = formAddProject.querySelectorAll("input");
  let textArea = formAddProject.querySelectorAll("textarea");

  if (inputs.item(1).value === "") {
    alertTimeOut("error", "Campo título vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(1).value, { min: 1, max: 50 }) ||
    !validator.matches(
      inputs.item(1).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Título inválido", 3000);
    return;
  }

  if (textArea.item(0).value === "") {
    alertTimeOut("error", "Campo descripción vacío", 3000);
    return;
  }

  if (
    !validator.isLength(textArea.item(0).value, { min: 1 }) ||
    !validator.matches(
      textArea.item(0).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Descripción inválida", 3000);
    return;
  }

  if (textArea.item(1).value === "") {
    alertTimeOut("error", "Campo Motivo Actualizacion vacío", 3000);
    return;
  }

  if (
    !validator.isLength(textArea.item(1).value, { min: 1 }) ||
    !validator.matches(
      textArea.item(1).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Motivo inválido", 3000);
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
  // let { checked } = document.getElementById("isAdmin");

  const formData = new FormData(formAddProject);
  // formData.append("admin", checked ? 1 : 0);

  // ========== CARGAR DATOS PARA EL HISTORICO =============
  tipoOperacion = "Actualización";
  descripcionOperacion = `Actualizacion de Proyecto ${formData.get(
    "nombre"
  )}\nMotivo: ${formData.get("motivo")}`;
  // ===============================

  let query = await fetch(base_url + "/Project/updateProject", {
    method: "POST",
    body: formData,
  }).catch(() => {
    Swal.fire({
      icon: "error",
      title: "No disponible!",
      text: "Intente nuevamente...",
      showConfirmButton: false,
      timer: 1500,
    });
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
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
    closeModalEditProjectModal();
    PROYECTO_TABLE.ajax.reload();
    fillSelect();
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
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

async function modalEditarProyecto(id_proyecto) {
  let query = await fetch(`${base_url}/Project/getProject/${id_proyecto}`);
  let data = await query.json();
  // console.log(id_proyecto);

  const myModal = new bootstrap.Modal("#modalEditProject");
  myModal.show();

  let formProject = document.getElementById("formEditProject");

  formProject.querySelectorAll("input").item(0).value = id_proyecto;
  formProject.querySelectorAll("input").item(1).value = data.nombre;
  formProject.querySelector("textarea").value = data.descripcion;
  formProject.querySelectorAll("input").item(2).value = data.fecha_inicio;
}

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
      cancelarProyecto(id, motivo);
    }
  });
}

async function cancelarProyecto(id, motivo) {
  let queryGet = await fetch(`${base_url}/Project/getProject/${id}`);
  let data = await queryGet.json();

  //================== HISTORICO DE OPERACIONES ======================

  tipoOperacion = "Eliminación";
  descripcionOperacion = `Se elimino el Proyecto: ${data.nombre}\nMotivo: ${motivo}`;

  // ==================================================================

  let query = await fetch(`${base_url}/Project/cancelProject/${id}`);
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
    PROYECTO_TABLE.ajax.reload();
    PROYECTOPAPELERA_TABLE.ajax.reload();
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

function validarFecha(fechaInput) {
  // Validar que el formato sea correcto (YYYY-MM-DD)
  if (!validator.isDate(fechaInput)) return false;
  let partes = fechaInput.split("-");

  const hoy = new Date();
  // Convertir las fechas a objetos Date
  const fechaIngresada = new Date(partes[0], partes[1] - 1, partes[2]);

  hoy.setHours(0, 0, 0, 0);
  fechaIngresada.setHours(0, 0, 0, 0);

  console.log(hoy <= fechaIngresada, hoy, fechaIngresada);

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
