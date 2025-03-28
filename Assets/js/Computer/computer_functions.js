const COMPUTER_TABLE = new DataTable("#computer", {
  layout: {
    topEnd: false,
    topStart: {
      search: {
        placeholder: "Search",
      },
    },
  },
  language: {
    url: `${base_url}/Assets/js/plugins/datatables/es-ES.json`,
  },
  ajax: {
    url: `${base_url}/Computer/getComputer`,
    dataSrc: "",
  },
  columns: [{ data: "codigo" }, { data: "modelo" }, { data: "opc" }],
  // dom: "lfrtip",
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
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
// ============== VARIALBLES HISTORICO =================
let tipoOperacion = "";
let descripcionOperacion = "";
let estadoOperacion = 0;
// =====================================================

// =============================================== AGREGAR REGISTRO ======================================================== //

function modalAddComputer() {
  const myModal = new bootstrap.Modal("#addComputer");

  myModal.show();
}

formAddComputer.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formAddComputer = document.getElementById("formAddComputer");
  let inputs = formAddComputer.querySelectorAll("input");

  if (
    !validator.isLength(inputs.item(1).value, { min: 1, max: 50 }) ||
    !validator.matches(inputs.item(1).value, /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s-()]+$/)
  ) {
    alertTimeOut("error", "Código inválido, entre 1 y 50 caracteres", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(1).value, { min: 1, max: 50 }) ||
    !validator.matches(inputs.item(1).value, /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/)
  ) {
    alertTimeOut("error", "Modelo inválido, entre 1 y 50 caracteres", 3000);
    return;
  }

  let formData = new FormData(formAddComputer);

  // ==================== HISTORICO ====================================
  tipoOperacion = "Creación";
  descripcionOperacion = `Se Registro el Computador: <strong>${formData.get(
    "codigo"
  )}</strong>, 
  Modelo: <strong>${formData.get("modelo")}</strong>`;
  // ==================== HISTORICO ====================================
  let query = await fetch(`${base_url}/Computer/insertComputer`, {
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
    COMPUTER_TABLE.ajax.reload();
    btnCloseModalAddComputer.click();
    formAddComputer.reset();
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

// =================================================== ELIMINAR REGISTRO ====================================================== //

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
      deleteComputer(id, motivo);
    }
  });
}

async function deleteComputer(id, motivo) {
  let queryGet = await fetch(`${base_url}/Computer/getComputer/${id}`);
  let data = await queryGet.json();

  //================== HISTORICO DE OPERACIONES ======================

  tipoOperacion = "Eliminación";
  descripcionOperacion = `Se Elimino el Computador: <strong>${data.codigo}</strong>, 
  Modelo: <strong>${data.modelo}</strong>, 
  \nMotivo: ${motivo}`;

  // ==================================================================

  let query = await fetch(`${base_url}/Computer/deleteComputer/${id}`);
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
    COMPUTER_TABLE.ajax.reload();
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

// =================================================== EDITAR REGISTRO ====================================================== //

async function modalEditComputer(id) {
  let query = await fetch(`${base_url}/Computer/getComputer/${id}`);
  let data = await query.json();

  let inputs = formEditComputer.querySelectorAll("input");

  inputs.item(0).value = data.id_computadora;
  inputs.item(1).value = data.codigo;
  inputs.item(2).value = data.modelo;

  const myModal = new bootstrap.Modal("#editComputer");

  myModal.show();
}

formEditComputer.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formEditComputer = document.getElementById("formEditComputer");
  let inputs = formEditComputer.querySelectorAll("input");
  let textArea = formEditComputer.querySelectorAll("textarea");

  if (
    !validator.isLength(inputs.item(1).value, { min: 1, max: 50 }) ||
    !validator.matches(inputs.item(1).value, /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/)
  ) {
    alertTimeOut("error", "Código inválido, entre 1 y 50 caracteres", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(1).value, { min: 1, max: 50 }) ||
    !validator.matches(inputs.item(1).value, /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/)
  ) {
    alertTimeOut("error", "Modelo inválido, entre 1 y 50 caracteres", 3000);
    return;
  }

  if (textArea.item(0).value === "") {
    alertTimeOut("error", "Campo Motivo Actualización vacío", 3000);
    return;
  }

  if (
    !validator.isLength(textArea.item(0).value, { min: 1, max: 500 }) ||
    !validator.matches(
      textArea.item(0).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Motivo Actualización inválida", 3000);
    return;
  }
  let formData = new FormData(formEditComputer);

  // ================== historico ==================================
  tipoOperacion = "Actualización";
  descripcionOperacion = `Se Actualizo el Registro del Computador: <strong>${formData.get(
    "codigo"
  )}</strong>, 
  Modelo: <strong>${formData.get("modelo")}</strong> 
  Motivo: ${formData.get("motivo")}`;
  // ================== historico ==================================

  let query = await fetch(`${base_url}/Computer/editComputer`, {
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
    COMPUTER_TABLE.ajax.reload();
    btnCloseModalEditComputer.click();
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
