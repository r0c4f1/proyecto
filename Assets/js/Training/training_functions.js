let columns = [
  { data: "tema" },
  {
    data: "tipo_capacitacion",
    render: function (data, type, row) {
      if (data == 0) {
        return "Desarrollo Personal";
      } else if (data == 1) {
        return "Formación Técnica";
      } else {
        return data;
      }
    },
  },
  { data: "fecha_formateada" },
  { data: "duracion" },
];

// Agregar la columna "opc" si el nivel del usuario no es 0
if (typeof nivelUsuario !== "undefined" && nivelUsuario != 0)
  columns.push({ data: "opc" });

const CAPACITACION_TABLE = new DataTable("#capacitaciones", {
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
    url: `${base_url}/Training/getTraining`,
    dataSrc: "",
  },
  columns: columns,
  // dom: "lfrtip",
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});
console.log(nivelUsuario, currentUserId);
let selectUnidad = document.getElementById("selectUnit");
let btnInscribirseTodos = document.getElementById("btnInscribirseTodos");
let btnSubmit = document.getElementById("btnSubmit");
let btnDropdown = document.getElementById("dropdownMenuButton");
let selectTipoCapacitacion = document.getElementById("selectTipoCapacitacion");
let selectCapacitacion = document.getElementById("selectCapacitacion");
let temaInscritos = document.getElementById("temaInscritos");
let listaInscritos = document.getElementById("listaInscritos");
let buscador = document.getElementById("buscador");
let btnInscribirse = document.getElementById("btnInscribirse");
let formTipoInscripcion = document.getElementById("formTipoInscripcion");
let formRegisterUserTraining = document.getElementById(
  "formRegisterUserTraining"
);
let formAddTraining = document.getElementById("formAddTraining");
let formEditTraining = document.getElementById("formEditTraining");

// ============== VARIALBLES HISTORICO =================
let tipoOperacion = "";
let descripcionOperacion = "";
let estadoOperacion = 0;

// =====================================================

let datosFiltro = [];

function recargaData() {
  selectCapacitacion.value = 0;

  temaInscritos.textContent = "Inscritos (Vacío)";
  listaInscritos.innerHTML = "";
  buscador.disabled = true;
  btnInscribirse.disabled = true;
  selectUnidad.disabled = true;
  btnInscribirseTodos.disabled = true;
  btnSubmit.disabled = true;
  btnDropdown.disabled = true;
  fillSelect();
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

async function fillSelect() {
  let query = await fetch(`${base_url}/Training/getTraining`);
  let data = await query.json();
  selectCapacitacion.innerHTML = `
    <option value='0'>---</option>
  `;

  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    let fragment = document.createDocumentFragment();
    option.value = data[i].id_capacitacion;
    option.textContent = data[i].tema;
    fragment.appendChild(option);
    selectCapacitacion.appendChild(fragment);
  }

  temaInscritos.textContent = `Inscribir Usuarios`;
}

function filtroListaInscritos(e) {
  let data = datosFiltro.filter((item) => {
    item.nombres = item.nombres.toLowerCase();
    item.apellidos = item.apellidos.toLowerCase();
    item.email = item.email.toLowerCase();
    let nombreCompleto = `${item.nombres} ${item.apellidos}`;

    const campos = [nombreCompleto, item.email, item.telefono, item.id_usuario];
    return campos.some((campo) => campo.includes(e.target.value));
  });

  let card = ``;
  for (let i = 0; i < data.length; i++) {
    let deleteButton = "";

    // Mostrar el botón de eliminar solo para el usuario actual si nivelUsuario es 0
    // o para todos los usuarios si nivelUsuario es 1 o 2
    if (
      (nivelUsuario === 0 &&
        String(data[i].id_usuario) === String(currentUserId)) ||
      nivelUsuario === 1 ||
      nivelUsuario === 2
    ) {
      deleteButton = `
        <button class='btn btn-outline-danger mt-1' 
                onclick="deleteTrainingUser('${data[i].id_usuario}', '${data[i].id_capacitacion}')">
          <i class='fa-solid fa-trash'></i>
        </button>`;
    }

    card += `
      <div class="card col-3 ms-3 border border-primary mt-2">
        <header class="card-header fw-bold bg-transparent">
          <h6 class="text-wrap w-100 mt-2">${data[i].nombres} ${data[i].apellidos}</h6>
          ${deleteButton}
        </header>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><b>Correo</b>: ${data[i].email}</li>
          <li class="list-group-item"><b>Cédula</b>: ${data[i].id_usuario}</li>
          <li class="list-group-item"><b>Teléfono</b>: ${data[i].telefono}</li>
          <li class="list-group-item"><b>Sexo</b>: ${data[i].sexo}</li>
        </ul>
      </div>
    `;
  }
  listaInscritos.innerHTML = card;
}

function modalAddUserTraining() {
  const myModal = new bootstrap.Modal("#addUserTraining");

  myModal.show();
}

function modalAddTraining() {
  const myModal = new bootstrap.Modal("#addTraining");

  myModal.show();
}

async function inscribirTodos() {
  // =============== HISTORICO DE OPERACIONES ==============
  let queryTraining = await fetch(
    `${base_url}/Training/getTraining/${selectCapacitacion.value}`
  );
  let dataTraining = await queryTraining.json();

  tipoOperacion = "Asignación";
  descripcionOperacion = `Se Asigno Todo el Personal en la Capacitación: <strong>${dataTraining.tema}</strong>`;

  // =======================================================
  let query = await fetch(
    `${base_url}/Training/registerAllUsers/${selectCapacitacion.value}`
  );
  let { status, title, msg } = await query.json();

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
    llenarCard();
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
      cancelarCapacitacion(id, motivo);
    }
  });
}

async function cancelarCapacitacion(id, motivo) {
  //================== HISTORICO DE OPERACIONES ======================
  let queryGetTraining = await fetch(`${base_url}/Training/getTraining/${id}`);
  let dataGetTraining = await queryGetTraining.json();

  tipoOperacion = "Eliminación";
  descripcionOperacion = `Se elimino la Capacitación: <strong>${dataGetTraining.tema}</strong>\nMotivo: ${motivo}`;

  // ==================================================================
  let query = await fetch(`${base_url}/Training/cancelTraining/${id}`);
  let { status, title, msg } = await query.json();

  if (status) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: "Elminado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    CAPACITACION_TABLE.ajax.reload();
    recargaData();
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

async function modalEditarCapacitacion(id) {
  const myModal = new bootstrap.Modal("#modalEditTraining");
  myModal.show();

  let inputs = formEditTraining.querySelectorAll("input");
  let selectTipoCapacitacion = formEditTraining.querySelector(
    "select[name='tipo']"
  );

  let query = await fetch(`${base_url}/Training/getTraining/${id}`);
  let data = await query.json();
  let { tema, fecha, duracion, tipo_capacitacion } = data;

  // Limpiar opciones anteriores del select
  selectTipoCapacitacion.innerHTML = "";

  // Añadir opciones al select
  let fragment = document.createDocumentFragment();

  let opciones = [
    { value: "0", text: "Desarrollo Personal" },
    { value: "1", text: "Formación Técnica" },
  ];

  opciones.forEach((opcion) => {
    let option = document.createElement("option");
    option.value = opcion.value;
    option.textContent = opcion.text;
    fragment.appendChild(option);
  });

  selectTipoCapacitacion.appendChild(fragment);

  // Establecer el valor del select basado en el valor devuelto por la consulta
  selectTipoCapacitacion.value = tipo_capacitacion;

  // Asignar valores a los inputs
  inputs.item(0).value = id;
  inputs.item(1).value = tema;
  inputs.item(2).value = fecha;
  inputs.item(3).value = duracion;
}

async function llenarCard() {
  let query = await fetch(
    `${base_url}/Training/getRegisteredUsers/${selectCapacitacion.value}`
  );
  let data = await query.json();

  datosFiltro.push(...data);

  let card = ``;

  for (let i = 0; i < data.length; i++) {
    let deleteButton = "";

    // Mostrar el botón de eliminar solo para el usuario actual si nivelUsuario es 0
    // o para todos los usuarios si nivelUsuario es 1 o 2
    if (
      (nivelUsuario === 0 &&
        String(data[i].id_usuario) === String(currentUserId)) ||
      nivelUsuario === 1 ||
      nivelUsuario === 2
    ) {
      deleteButton = `
        <button class='btn btn-outline-danger mt-1' 
                onclick="deleteTrainingUser('${data[i].id_usuario}', '${data[i].id_capacitacion}')">
          <i class='fa-solid fa-trash'></i>
        </button>`;
    }

    card += `
      <div class="card col-3 ms-3 border border-primary mt-2">
        <header class="card-header fw-bold bg-transparent">
          <h6 class="text-wrap w-100 mt-2">${data[i].nombres} ${data[i].apellidos}</h6>
          ${deleteButton}
        </header>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><b>Correo</b>: ${data[i].email}</li>
          <li class="list-group-item"><b>Cédula</b>: ${data[i].id_usuario}</li>
          <li class="list-group-item"><b>Teléfono</b>: ${data[i].telefono}</li>
          <li class="list-group-item"><b>Sexo</b>: ${data[i].sexo}</li>
        </ul>
      </div>
    `;
  }

  if (data.length === 0) {
    temaInscritos.textContent = "Inscribir Usuarios";
    listaInscritos.innerHTML = "";
  } else {
    listaInscritos.innerHTML = card;
    buscador.disabled = false;
    selectUnidad.disabled = false;
    btnInscribirse.disabled = false;
    btnInscribirseTodos.disabled = false;
    btnSubmit.disabled = false;
    btnDropdown.disabled = false;
    temaInscritos.textContent = `Inscritos (${data.length})`;
  }
}

formRegisterUserTraining.addEventListener("submit", async (e) => {
  e.preventDefault();

  let btnCloseModalDddUserTraining = document.getElementById(
    "btnCloseModalDddUserTraining"
  );
  let formData = new FormData(formRegisterUserTraining);
  formData.append("id_capacitacion", selectCapacitacion.value);

  // ============================== HISTORICO DE OPERACIONES ======================
  let queryUser = await fetch(
    `${base_url}/Users/getUser/${formData.get("id_usuario")}`
  );
  let dataUser = await queryUser.json();

  let queryTraining = await fetch(
    `${base_url}/Training/getTraining/${formData.get("id_capacitacion")}`
  );
  let dataTraining = await queryTraining.json();

  tipoOperacion = "Asignación";
  descripcionOperacion = `Se Inscribio al Usuario: <strong>${dataUser.nombres} ${dataUser.apellidos}</strong>, 
  En la Capacitacíon <strong>${dataTraining.tema}</strong>`;

  // ==============================================================================

  let query = await fetch(`${base_url}/Training/registerTrainingUser`, {
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
    datosFiltro = [];
    llenarCard();
    btnCloseModalDddUserTraining.click();
    formRegisterUserTraining.reset();
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

formTipoInscripcion.addEventListener("submit", async (e) => {
  e.preventDefault();
  let select = formTipoInscripcion.querySelectorAll("select");

  if (select.item(0).value === "") {
    alertTimeOut("error", "Debe elegir una unidad para usar esta opción", 3000);
    return;
  }

  let formData = new FormData(formTipoInscripcion);
  formData.append("id_capacitacion", selectCapacitacion.value);

  // ================ HISTORICO DE OPERACIONES ===============
  let queryTraining = await fetch(
    `${base_url}/Training/getTraining/${selectCapacitacion.value}`
  );
  let dataTraining = await queryTraining.json();

  let queryUnidad = await fetch(
    `${base_url}/Units/getUnits/${formData.get("unidad")}`
  );
  let dataUnidad = await queryUnidad.json();

  tipoOperacion = "Asignación";
  descripcionOperacion = `Se Asigno Todo el Personal de la Unidad: <strong>${dataUnidad.nombre}</strong> 
  en la Capacitación: <strong>${dataTraining.tema}</strong>`;

  // ==========================================================

  let query = await fetch(`${base_url}/Training/registerAllUsersUnid`, {
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
    datosFiltro = [];
    llenarCard();
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

document.addEventListener("DOMContentLoaded", () => {
  const selectUnidad = document.getElementById("selectUnit");

  if (selectUnidad) {
    fillSelectOptions(selectUnidad);
  }
});

formAddTraining.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formAddTraining = document.getElementById("formAddTraining");
  let inputs = formAddTraining.querySelectorAll("input");
  let select = formAddTraining.querySelectorAll("select");
  let fragment = document.createDocumentFragment();
  selectUnidad.innerHTML = "<option value=''> --- </option>";

  if (inputs.item(0).value === "") {
    alertTimeOut("error", "Campo tema vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(0).value, { min: 1, max: 50 }) ||
    !validator.matches(
      inputs.item(0).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Tema inválido", 3000);
    return;
  }

  if (select.item(0).value === "") {
    alertTimeOut("error", "Elija un tipo", 3000);
    return;
  }

  if (inputs.item(1).value === "") {
    alertTimeOut("error", "Campo Fecha vacío", 3000);
    return;
  }

  if (!validarFecha(inputs.item(1).value)) {
    alertTimeOut("error", "Fecha inválida", 3000);
    return;
  }

  if (inputs.item(2).value === "") {
    alertTimeOut("error", "Campo duracion vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(2).value, { min: 1, max: 4 }) ||
    !validator.matches(inputs.item(2).value, /^[0-9]+$/)
  ) {
    alertTimeOut("error", "Cantidad de Horas inválida", 3000);
    return;
  }

  let btnCloseModalAddTraining = document.getElementById(
    "btnCloseModalAddTraining"
  );
  let formData = new FormData(formAddTraining);

  // ========== CARGAR DATOS PARA EL HISTORICO =============
  let tipo = "";
  tipo =
    formData.get("tipo_capacitacion") == 1
      ? "Formación Técnica"
      : "Desarrollo Personal";

  tipoOperacion = "Creación";
  descripcionOperacion = `Registro de Capaciación: <strong>${formData.get(
    "tema"
  )}</strong> de Tipo: <strong>${tipo}</strong>`;
  // ======================================================================

  let query = await fetch(`${base_url}/Training/addTraining`, {
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
    CAPACITACION_TABLE.ajax.reload();
    recargaData();
    btnCloseModalAddTraining.click();
    formAddTraining.reset();
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

formEditTraining.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formEditTraining = document.getElementById("formEditTraining");
  let inputs = formEditTraining.querySelectorAll("input");
  let select = formEditTraining.querySelectorAll("select");
  let textArea = formEditTraining.querySelectorAll("textarea");

  if (inputs.item(1).value === "") {
    alertTimeOut("error", "Campo tema vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(1).value, { min: 1, max: 50 }) ||
    !validator.matches(
      inputs.item(1).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Tema inválido", 3000);
    return;
  }

  if (select.item(0).value === "") {
    alertTimeOut("error", "Elija un tipo", 3000);
    return;
  }

  if (inputs.item(2).value === "") {
    alertTimeOut("errro", "Campo fecha vacío", 3000);
    return;
  }

  if (!validarFecha(inputs.item(2).value)) {
    alertTimeOut("error", "Fecha inválida", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(3).value, { min: 1, max: 4 }) ||
    !validator.matches(inputs.item(3).value, /^[0-9]+$/)
  ) {
    alertTimeOut("error", "Cantidad de Horas inválida", 3000);
    return;
  }

  if (textArea.item(0).value === "") {
    alertTimeOut("error", "Campo Motivo Actualización vacío", 3000);
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
      "Motivo Actualización Invalido, Caracteres permitidos de 8 a 200, no se permiten caracteres especiales",
      3000
    );
    return;
  }

  let btnCloseModalEditTraining = document.getElementById(
    "btnCloseModalEditTraining"
  );
  let formData = new FormData(formEditTraining);

  // ========== CARGAR DATOS PARA EL HISTORICO =============
  tipoOperacion = "Actualización";
  descripcionOperacion = `Actualizacion de Capacitación: <strong>${formData.get(
    "tema"
  )}</strong>\nMotivo: ${formData.get("motivo")}`;
  // ======================================================

  let query = await fetch(`${base_url}/Training/editTraining`, {
    method: "POST",
    body: formData,
  });

  let { status, msg, title } = await query.json();

  if (status) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: "Editado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    CAPACITACION_TABLE.ajax.reload();
    recargaData();
    btnCloseModalEditTraining.click();
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

selectCapacitacion.addEventListener("change", async (e) => {
  let option = selectCapacitacion.selectedOptions[0].textContent;
  datosFiltro = [];

  if (option == "---") {
    temaInscritos.textContent = "Inscribir Usuarios";
    listaInscritos.innerHTML = "";
    btnInscribirse.disabled = true;
    buscador.disabled = true;
    selectUnidad.disabled = true;
    btnInscribirseTodos.disabled = true;
    btnSubmit.disabled = true;
    btnDropdown.disabled = true;
    return;
  }

  llenarCard();
  btnInscribirse.disabled = false;
  buscador.disabled = false;
  selectUnidad.disabled = false;
  btnInscribirseTodos.disabled = false;
  btnSubmit.disabled = false;
  btnDropdown.disabled = false;
});

window.addEventListener("DOMContentLoaded", () => {
  fillSelect();
});

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

//////////////////// BORRAR USUARIO DE CAPACITACIÓN ///////////////////
async function deleteTrainingUser(id_usuario, id_capacitacion) {
  let query = await fetch(
    `${base_url}/Training/cancelTrainingUser/${id_usuario}/${id_capacitacion}`
  );
  let { status, title, msg } = await query.json();
  datosFiltro = [];

  if (status) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: "Eliminado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });

    llenarCard();
  } else {
    Swal.fire({
      icon: "error",
      title,
      text: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

async function fillSelectOptions(selectUnidad) {
  const response = await fetch(`${base_url}/Units/getUnits`);
  const data = await response.json();

  const fragment = document.createDocumentFragment();
  selectUnidad.innerHTML = "<option value=''> --- </option>";

  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id_unidad;
    option.textContent = item.nombre;
    fragment.appendChild(option);
  });

  selectUnidad.appendChild(fragment);
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
