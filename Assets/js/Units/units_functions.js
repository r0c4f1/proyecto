document.getElementById("formAddUnit").addEventListener("submit", addUnit);
document.getElementById("formEditUnit").addEventListener("submit", editUnit);

const UNIT_TABLE = new DataTable("#unidades", {
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
    url: `${base_url}/Units/getUnits`,
    dataSrc: "",
  },
  columns: [{ data: "nombre" }, { data: "opc" }],
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

function modalAddUnit() {
  const myModal = new bootstrap.Modal("#addUnit");
  myModal.show();
}
async function modalEditUnit(id) {
  // Inicializa el modal de Bootstrap
  const myModal = new bootstrap.Modal(document.getElementById("editUnit"));
  myModal.show();

  // Obtén el formulario y sus inputs
  let formEditUnit = document.getElementById("formEditUnit");
  let inputs = formEditUnit.querySelectorAll("input");

  // Realiza la petición para obtener los datos de la unidad
  let query = await fetch(`${base_url}/Units/getUnits/${id}`);
  let data = await query.json();
  console.log(data);

  // Asigna los valores de la respuesta a los inputs del formulario
  inputs.item(0).value = data.id_unidad;
  inputs.item(1).value = data.nombre;
}

async function addUnit(e) {
  e.preventDefault(); // Evita el envío normal del formulario

  let formAddUnit = document.getElementById("formAddUnit");
  let inputs = formAddUnit.querySelectorAll("input");

  if (
    !validator.isLength(inputs.item(0).value, { min: 1, max: 50 }) ||
    !validator.matches(
      inputs.item(0).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Nombre inválido", 3000);
    return;
  }

  const formData = new FormData(formAddUnit);

  // ==================== HISTORICO =================
  tipoOperacion = "Creación";
  descripcionOperacion = `Registro de Unidad: <strong>${formData.get(
    "nombre"
  )}</strong>`;
  // ================================================

  try {
    let query = await fetch(base_url + "/Units/registerUnit", {
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
      estadoOperacion = 1;
      historico(tipoOperacion, descripcionOperacion, estadoOperacion);
      document.getElementById("btnCloseAddUnit").click(); // Cierra el modal
      UNIT_TABLE.ajax.reload(); // Recarga la tabla
      formAddUnit.reset();
    } else {
      Swal.fire({
        icon: "error",
        title: response.title || "Error",
        text: response.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    }
  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "No disponible!",
      text: "Intente nuevamente...",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

async function editUnit(e) {
  e.preventDefault(); // Evita el envío normal del formulario

  let formEditUnit = document.getElementById("formEditUnit");
  let inputs = formEditUnit.querySelectorAll("input");
  let textArea = formEditUnit.querySelectorAll("textarea");

  // Validación del nombre de la unidad
  if (
    !validator.isLength(inputs.item(1).value, { min: 1, max: 50 }) ||
    !validator.matches(inputs.item(1).value, /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  ) {
    alertTimeOut("error", "Nombre inválido", 3000);
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
    alertTimeOut("error", "Descripción Motivo Actualización inválida", 3000);
    return;
  }

  const formData = new FormData(formEditUnit);

  // ============================== HISTORICO ===========================
  tipoOperacion = "Actualización";
  descripcionOperacion = `Se Actualizo Unidad: <strong>${formData.get(
    "nombre"
  )}</strong>, Motivo: ${formData.get("motivo")}`;
  // =================================================================
  console.log(inputs);
  try {
    let query = await fetch(base_url + "/Units/updateUnit", {
      method: "POST",
      body: formData,
    });

    let response = await query.json();

    if (response.status) {
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
      UNIT_TABLE.ajax.reload(); // Recarga la tabla
      formEditUnit.reset();
      document.getElementById("btnCloseEditUnit").click(); // Cierra el modal
    } else {
      Swal.fire({
        icon: "error",
        title: response.title || "Error",
        text: response.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    }
  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "No disponible!",
      text: "Intente nuevamente...",
      showConfirmButton: false,
      timer: 1500,
    });
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
      cancelarUnidad(id, motivo);
    }
  });
}

async function cancelarUnidad(id, motivo) {
  let queryGet = await fetch(`${base_url}/Units/getUnits/${id}`);
  let data = await queryGet.json();

  //================== HISTORICO DE OPERACIONES ======================

  tipoOperacion = "Eliminación";
  descripcionOperacion = `Se Elimino la Unidad: <strong>${data.nombre}</strong>\nMotivo: ${motivo}`;

  // ==================================================================

  let query = await fetch(`${base_url}/Units/cancelUnit/${id}`);
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
    UNIT_TABLE.ajax.reload();
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
