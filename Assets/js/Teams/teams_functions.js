const EQUIPO_TABLE = new DataTable("#equipo", {
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
    url: `${base_url}/Teams/getTeams`,
    dataSrc: "",
  },
  columns: [
    { data: "nombre_equipo" },
    { data: "tipo_equipo" },
    { data: "opc" },
  ],
  // dom: "lfrtip",
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});
$("#equipo tbody").on("dblclick", "tr", function () {
  modalTeams();
});

let selectTeams = document.getElementById("selectTeams");
let temaInscritos = document.getElementById("temaInscritos");
let listaInscritos = document.getElementById("listaInscritos");
let buscador = document.getElementById("buscador");
let btnAddToTeams = document.getElementById("btnAddToTeams");
let formRegisterUserTeams = document.getElementById("formRegisterUserTeams");
let formAddTeams = document.getElementById("formAddTeams");
let formEditTeams = document.getElementById("formEditTeams");
// ===== HISTORICO DE OPERACIONES =====
let tipoOperacion = "";
let descripcionOperacion = "";
let estadoOperacion = "";
// ====================================

let datosFiltro = [];

function recargaData() {
  selectTeams.value = 0;

  temaInscritos.textContent = "Añadidos (Vacío)";
  listaInscritos.innerHTML = "";
  buscador.disabled = true;
  btnInscribirse.disabled = true;
  fillSelect();
}

async function fillSelect() {
  let query = await fetch(`${base_url}/Teams/getTeams`);
  let data = await query.json();
  selectTeams.innerHTML = `
    <option value='0'>---</option>
  `;

  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    let fragment = document.createDocumentFragment();
    option.value = data[i].id_equipo;
    option.textContent = data[i].nombre_equipo;
    fragment.appendChild(option);
    selectTeams.appendChild(fragment);
  }

  temaInscritos.textContent = `Añadidos (Vacío)`;
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
    card += `
        <div class="card ms-3 border border-success mt-2" style="width: 45%;">
            <header  class="card-header fw-bold text-white bg-success">
                <h6 class="text-wrap w-100 mt-2">${data[i].nombres} ${data[i].apellidos} 
                </h6>
                <button class='btn btn-outline-danger mt-1' onclick="deleteTeamUser('${data[i].id_equipo}','${data[i].id_usuario}')"><i class='fa-solid fa-trash'></i></button>
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

function modalAddUserTeams() {
  const myModal = new bootstrap.Modal("#addUserTeams");

  myModal.show();
}

function modalTeams() {
  const myModal = new bootstrap.Modal("#modalTeams");

  myModal.show();
}

function modalAddTeams() {
  const myModal = new bootstrap.Modal("#addTeams");

  myModal.show();
}

async function confirmed(id) {
  let query = await fetch(`${base_url}/Teams/TeamsActivos/${id}`);
  let { status, data } = await query.json();

  if (status && data.length > 0) {
    alertTimeOut(
      "error",
      "No se puede eliminar un equipo con asignaciones pendientes o en proceso",
      3500
    );
    return;
  }

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
      cancelarEquipo(id, motivo);
    }
  });
}

function confirmDeleteTeamUser(id_equipo, id_usuario) {
  Swal.fire({
    title: "¿Está seguro?",
    html: `
      <p>Se expulsara a este usuario del equipo. Por favor, especifique el motivo:</p>
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
      deleteTeamUser(id_equipo, id_usuario, motivo);
    }
  });
}

async function cancelarEquipo(id, motivo) {
  let queryGet = await fetch(`${base_url}/Teams/getTeams/${id}`);
  let data = await queryGet.json();

  //================== HISTORICO DE OPERACIONES ======================

  tipoOperacion = "Eliminación";
  descripcionOperacion = `Se elimino el Equipo De Trabajo: ${data.nombre_equipo},\nMotivo: ${motivo}`;

  // ==================================================================
  let query = await fetch(`${base_url}/Teams/cancelTeams/${id}`);
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
    EQUIPO_TABLE.ajax.reload();
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

//////////////////// BORRAR USUARIO DE EQUIPO  ///////////////////
async function deleteTeamUser(id_equipo, id_usuario, motivo) {
  //================== HISTORICO DE OPERACIONES ======================
  let queryUsers = await fetch(`${base_url}/Users/getUser/${id_usuario}`);
  let dataUsers = await queryUsers.json();

  let queryTeams = await fetch(`${base_url}/Teams/getTeams/${id_equipo}`);
  let dataTeams = await queryTeams.json();

  tipoOperacion = "Eliminación";
  descripcionOperacion = `Se elimino el Usuario: ${dataUsers.nombres} ${dataUsers.apellidos}, del Equipo De Trabajo: ${dataTeams.nombre_equipo},
  \nMotivo: ${motivo}`;

  // ==================================================================

  let query = await fetch(
    `${base_url}/Teams/cancelTeamsUser/${id_equipo}/${id_usuario}`
  );
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

async function modalEditarEquipo(id) {
  const myModal = new bootstrap.Modal("#modalEditTeams");
  myModal.show();
  let inputs = formEditTeams.querySelectorAll("input");
  let select = document.getElementById("select-team");
  console.log(id);

  let query = await fetch(`${base_url}/Teams/getTeams/${id}`);
  let { nombre_equipo, tipo_equipo } = await query.json();
  console.log(nombre_equipo);

  inputs.item(0).value = id;
  inputs.item(1).value = nombre_equipo;
  select.value = tipo_equipo;
}

async function llenarCard() {
  let query = await fetch(
    `${base_url}/Teams/getRegisteredUsers/${selectTeams.value}`
  );

  let data = await query.json();

  datosFiltro.push(...data);

  let card = ``;

  for (let i = 0; i < data.length; i++) {
    card += `
        <div class="card col-3 ms-3 border border-primary mt-2">
          <header class="card-header fw-bold bg-transparent">
              <h6 class="text-wrap w-100 mt-2">${data[i].nombres} ${data[i].apellidos} </h6>
             <button class='btn btn-outline-danger mt-1' onclick="confirmDeleteTeamUser('${data[i].id_equipo}', '${data[i].id_usuario}')"><i class='fa-solid fa-trash'></i></button>

          </header>
          <ul class="list-group list-group-flush">
              <li class="list-group-item"><b>Correo</b>: ${data[i].email}</li>
              <li class="list-group-item"><b>Cédula</b>: ${data[i].id_usuario}</li>
              <li class="list-group-item"><b>Teléfono</b>: ${data[i].telefono}</li>
              <li class="list-group-item"><b>Cargo</b>: ${data[i].cargo}</li>
          </ul>
        </div>
          `;
  }

  listaTeams.innerHTML = card;
  buscador.disabled = false;
  btnAddToTeams.disabled = false;
  temaInscritos.textContent = `Añadidos (${data.length})`;
}

formRegisterUserTeams.addEventListener("submit", async (e) => {
  e.preventDefault();

  let btnCloseModalAddUserTeams = document.getElementById(
    "btnCloseModalAddUserTeams"
  );
  let formData = new FormData(formRegisterUserTeams);
  formData.append("id_equipo", selectTeams.value);

  // ============== HISTORICO DE OPERACIONES ============
  let queryUsers = await fetch(
    `${base_url}/Users/getUser/${formData.get("id_usuario")}`
  );
  let dataUsers = await queryUsers.json();

  let queryTeams = await fetch(
    `${base_url}/Teams/getTeams/${formData.get("id_equipo")}`
  );
  let dataTeams = await queryTeams.json();

  tipoOperacion = "Asignación";
  descripcionOperacion = `El Usuario: ${dataUsers.nombres} ${dataUsers.apellidos} Fue asignado al Equipo De Trabajo: ${dataTeams.nombre_equipo}`;
  // ====================================================

  let query = await fetch(`${base_url}/Teams/registerTeamsUser`, {
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
    btnCloseModalAddUserTeams.click();
    formRegisterUserTeams.reset();
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

formAddTeams.addEventListener("submit", async (e) => {
  e.preventDefault();

  let btnCloseModalAddTeams = document.getElementById("btnCloseModalAddTeams");

  let inputs = formAddTeams.querySelectorAll("input");
  let select = formAddTeams.querySelectorAll("select");

  if (
    !validator.isLength(inputs.item(0).value, { min: 1, max: 30 }) ||
    !validator.matches(
      inputs.item(0).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Nombre inválido", 3000);
    return;
  }

  if (
    !validator.matches(select.item(0).textContent, /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  ) {
    alertTimeOut("error", "Tipo inválido", 3000);
    return;
  }

  let formData = new FormData(formAddTeams);

  // ===== HISTORICO DE OPERACIONES =====

  tipoOperacion = "Creación";
  descripcionOperacion = `Registro de Equipo De Trabajo: ${formData.get(
    "nombre"
  )}`;

  // ====================================

  let query = await fetch(`${base_url}/Teams/addTeams`, {
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
    EQUIPO_TABLE.ajax.reload();
    fillSelect();
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    btnCloseModalAddTeams.click();
    formAddTeams.reset();
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

formEditTeams.addEventListener("submit", async (e) => {
  e.preventDefault();

  let btnCloseModalEditTeams = document.getElementById(
    "btnCloseModalEditTeams"
  );

  let inputs = formEditTeams.querySelectorAll("input");
  let select = formEditTeams.querySelectorAll("select");
  let textArea = formEditTeams.querySelectorAll("textarea");

  if (
    !validator.isLength(inputs.item(1).value, { min: 1, max: 30 }) ||
    !validator.matches(
      inputs.item(1).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Nombre inválido", 3000);
    return;
  }

  if (
    !validator.matches(select.item(0).textContent, /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  ) {
    alertTimeOut("error", "Tipo inválido", 3000);
    return;
  }

  if (textArea.item(0).value === "") {
    alertTimeOut("error", "Campo Motivo Actualizacion vacío", 3000);
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
      "Motivo no valido, Numero de caracteres permitido de (8 a 200), Permite solo letras (mayúsculas y minúsculas), números, espacios y ciertos caracteres como @, ., ,, -, _.",
      3000
    );
    return;
  }

  let formData = new FormData(formEditTeams);

  // ===== HISTORICO DE OPERACIONES =====

  tipoOperacion = "Actualización";
  descripcionOperacion = `Actualización de Equipo De Trabajo: ${formData.get(
    "nombre"
  )}, Motivo: ${formData.get("motivo")}`;

  // ====================================

  let query = await fetch(`${base_url}/Teams/editTeams`, {
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
    EQUIPO_TABLE.ajax.reload();
    fillSelect();
    btnCloseModalEditTeams.click();
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

selectTeams.addEventListener("change", async (e) => {
  let option = selectTeams.selectedOptions[0].textContent;
  datosFiltro = [];

  if (option == "---") {
    temaInscritos.textContent = "Inscritos (Vacío)";
    listaInscritos.innerHTML = "";
    buscador.disabled = true;
    btnInscribirse.disabled = true;
    return;
  }

  llenarCard();
});

window.addEventListener("DOMContentLoaded", () => {
  fillSelect();
});

//VALIDAR INPUTS
document.querySelectorAll(".validate-input").forEach(function (inputField) {
  inputField.addEventListener("input", function (event) {
    const inputValue = event.target.value;

    // Expresión regular para validar que solo contenga letras y números
    const regex = /^[a-zA-Z0-9\s]*$/;

    // Validar longitud y caracteres permitidos
    if (inputValue.length > 30) {
      event.target.setCustomValidity(
        "El texto no puede tener más de 30 caracteres"
      );
    } else if (!regex.test(inputValue)) {
      event.target.setCustomValidity(
        "El texto no puede contener caracteres especiales"
      );
    } else {
      event.target.setCustomValidity(""); // Restablecer mensaje de error si es válido
    }

    event.target.reportValidity(); // Mostrar mensaje de error
  });
});

document.querySelector("form").addEventListener("submit", function (event) {
  // Solo evitará el envío si hay inputs inválidos
  if (!event.target.checkValidity()) {
    event.preventDefault();
  }
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

async function modalViewUser(id) {
  let query = await fetch(`${base_url}/Teams/getUserForTeam/${id}`);
  let data = await query.json();

  datosFiltro.push(...data);

  let card = ``;

  if (data.length === 0) {
    card = `
    <div class= "d-flex justify-content-center align-items-center flex-column mt-2"> 
    <i class="fas fa-exclamation-triangle text-danger fa-2x fa-fade mt-2"></i>
      <h4 class="mt-2">Sin personal asignado</h2></div>
    `;
  } else {
    for (let i = 0; i < data.length; i++) {
      card += `
        <div class="col-4 mb-3"> 
          <div class="card border-primary" style="min-height: 150px;">
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
  }

  let listaUsuarios = document.getElementById("listaUsuarios");
  if (listaUsuarios) {
    listaUsuarios.innerHTML = card;
  } else {
    console.error("Elemento 'listaUsuarios' no encontrado");
  }

  const myModal = new bootstrap.Modal("#modalViewUser");
  myModal.show();
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
