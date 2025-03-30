const RECURSOS_TABLE = new DataTable("#recursos", {
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
    url: `${base_url}/Resources/getResources`,
    dataSrc: "",
  },
  columns: [
    { data: "nombre" },
    { data: "tipo" },
    { data: "cantidad" },
    { data: "disponible" },
    { data: "opc" },
  ],
  // dom: "lfrtip",
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});
let selectResource = document.getElementById("recursoReciclado");
const btnAddResourceSubmit = document.querySelector("#btnAddResourceSubmit");

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

async function editar(id) {
  let query = await fetch(`${base_url}/Resources/getResources/${id}`);
  let data = await query.json();

  let formResource = document.getElementById("formEditResource");

  formResource.querySelectorAll("input").item(0).value = data.id_recurso;
  formResource.querySelectorAll("input").item(1).value = data.nombre;
  formResource.querySelectorAll("input").item(2).value = data.tipo;
  formResource.querySelectorAll("input").item(3).value = data.cantidad;

  // ============== VARIALBLES HISTORICO =================
  let tipoOperacion = "";
  let descripcionOperacion = "";
  let estadoOperacion = 0;

  // =====================================================

  console.log(data);

  const myModal = new bootstrap.Modal("#resourceModal", {
    keyboard: false,
  });

  myModal.show();
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
      eliminar(id, motivo);
    }
  });
}

async function eliminar(id, motivo) {
  const formData = new FormData();
  formData.append("id_recurso", id);
  formData.append("status", 0);

  // =============== HISTORICO ==================
  let queryResources = await fetch(`${base_url}/Resources/getResources/${id}`);
  let dataResources = await queryResources.json();

  tipoOperacion = "Eliminación";
  descripcionOperacion = `Se Elimino el Recurso: <strong>${dataResources.nombre}</strong>\nMotivo: ${motivo}`;
  // ============================================

  let query = await fetch(`${base_url}/Resources/cancelResource`, {
    method: "POST",
    body: formData,
  });

  let { status, msg } = await query.json();

  if (status) {
    RECURSOS_TABLE.ajax.reload();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: msg,
      showConfirmButton: false,
      timer: 1500,
    });
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
  } else {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      text: msg,
      showConfirmButton: false,
      timer: 1500,
    });
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
  }
}

function modalTest() {
  const myModal = new bootstrap.Modal("#testModal");

  myModal.show();
}

async function Test(e) {
  e.preventDefault();

  let formTest = document.getElementById("formTest");

  const formData = new FormData(formTest);

  let query = await fetch(base_url + "/Resources/registerTest", {
    method: "POST",
    body: formData,
  });
}

function modalAddResourceModal() {
  const myModal = new bootstrap.Modal("#addResourceModal");

  myModal.show();
}

function closeModalAddResourceModal() {
  let btn = document.getElementById("btnCloseAddResourceModal");
  btn.click();
}

function closeModalEditResourceModal() {
  let btn = document.getElementById("btnCloseEditResourceModal");
  btn.click();
}
//===============================RECURSO RECICLADO====================================
document
  .getElementById("addRecycledResource")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formAddRecycledResource = document.getElementById(
      "addRecycledResource"
    );
    const selectResource = document.getElementById("recursoReciclado");
    const inputCantidad = document.getElementById("cantidad");

    if (!selectResource.value || selectResource.value === "0") {
      alertTimeOut("error", "Seleccione un recurso válido", 3000);

      return;
    }

    if (
      inputCantidad.value === "" ||
      isNaN(inputCantidad.value) ||
      inputCantidad.value <= 0
    ) {
      alertTimeOut("error", "Ingrese una cantidad válida", 3000);

      return;
    }

    // ============================== HISTORICO =======================
    let queryResources = await fetch(
      `${base_url}/Resources/getResources/${selectResource.value}`
    );
    let dataResources = await queryResources.json();

    tipoOperacion = "Asignación";
    descripcionOperacion = `Se Asignarón <strong>${inputCantidad.value}</strong> - <strong>${dataResources.nombre}</strong> Como recursos reciclados`;
    // ================================================================

    // Proceso de agregar recurso reciclado
    let query = await fetch(base_url + "/Resources/registerRecycledResource", {
      method: "POST",
      body: new FormData(formAddRecycledResource),
    });

    let { status, msg } = await query.json();

    if (status) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        text: "Registrado Correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      estadoOperacion = 1;
      historico(tipoOperacion, descripcionOperacion, estadoOperacion);
      RECURSOS_TABLE.ajax.reload();
      formAddRecycledResource.reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: msg,
        showConfirmButton: false,
        timer: 1500,
      });
      historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const selectResource = document.getElementById("recursoReciclado");

  if (selectResource) {
    fillSelectOptions(selectResource);
  }
});

async function fillSelectOptions(selectResource) {
  const response = await fetch(`${base_url}/Resources/getResources`);
  console.log(response);
  if (response.ok) {
    const data = await response.json();

    const fragment = document.createDocumentFragment();
    selectResource.innerHTML = "<option value=''> --- </option>";

    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id_recurso;
      option.textContent = item.nombre;
      fragment.appendChild(option);
    });

    selectResource.appendChild(fragment);
  } else {
    alertTimeOut("error", "Error al cargar los recursos", 3000);
  }
}

//===============================FIN RECURSO RECICLADO====================================

async function addResource(e) {
  e.preventDefault();

  let formAddResource = document.getElementById("formAddResource");
  let inputs = formAddResource.querySelectorAll("input");

  if (inputs.item(0).value === "") {
    alertTimeOut("error", "Campo nombre vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(0).value, { min: 1, max: 40 }) ||
    !validator.matches(
      inputs.item(0).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Nombre del recurso inválido", 3000);
    return;
  }

  if (inputs.item(1).value === "") {
    alertTimeOut("error", "Campo tipo de recurso vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(1).value, { min: 1, max: 30 }) ||
    !validator.matches(
      inputs.item(1).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Tipo de recurso inválido", 3000);
    return;
  }

  if (inputs.item(2).value === "") {
    alertTimeOut("error", "Campo cantidad vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(2).value, { min: 1, max: 5 }) ||
    !validator.matches(inputs.item(2).value, /^[0-9]+$/)
  ) {
    alertTimeOut("error", "Cantidad de recursos inválida", 3000);
    return;
  }

  const formData = new FormData(formAddResource);
  // ====================== HISTORICO ====================
  tipoOperacion = "Creación";
  descripcionOperacion = `Registro de Recurso: <strong>${formData.get(
    "nombre"
  )}</strong> Cantidad: <strong>${formData.get("cantidad")}</strong>`;
  // =====================================================

  let query = await fetch(base_url + "/Resources/registerResource", {
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
  });

  console.log(query);
  let { status, msg } = await query.json();

  if (status) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: "Registrado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    estadoOperacion = 1;
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
    closeModalAddResourceModal();
    RECURSOS_TABLE.ajax.reload();
    formAddResource.reset();
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: msg,
      showConfirmButton: false,
      timer: 1500,
    });
    historico(tipoOperacion, descripcionOperacion, estadoOperacion);
  }
}

async function updateResource(e) {
  e.preventDefault();

  let formAddResource = document.getElementById("formEditResource");
  let inputs = formAddResource.querySelectorAll("input");
  let textArea = formAddResource.querySelectorAll("textArea");

  if (inputs.item(1).value === "") {
    alertTimeOut("error", "Campo nombre vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(1).value, { min: 1, max: 40 }) ||
    !validator.matches(
      inputs.item(1).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Nombre del recurso inválido", 3000);
    return;
  }

  if (inputs.item(2).value === "") {
    alertTimeOut("error", "Campo tipo de recurso vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(2).value, { min: 1, max: 30 }) ||
    !validator.matches(
      inputs.item(2).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Tipo de recurso inválido", 3000);
    return;
  }

  if (inputs.item(3).value === "") {
    alertTimeOut("error", "Campo cantidad vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(3).value, { min: 1, max: 5 }) ||
    !validator.matches(inputs.item(3).value, /^[0-9]+$/)
  ) {
    alertTimeOut("error", "Cantidad de recursos inválida", 3000);
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
      "Motivo Actualización inválido, Número de caracteres desde 8 a 200, No se Permiten caracteres especiales",
      3000
    );
    return;
  }

  const formData = new FormData(formAddResource);

  // ==================== HISTORICO DE OPERACIONES =============
  tipoOperacion = "Actualización";
  descripcionOperacion = `Actualizacion de Recurso <strong>${formData.get(
    "nombre"
  )}</strong>\nMotivo: <strong>${formData.get("motivo")}</strong>`;

  // ===========================================================

  let query = await fetch(base_url + "/Resources/updateResource", {
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
    closeModalEditResourceModal();
    RECURSOS_TABLE.ajax.reload();
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

async function verifyId(e) {
  let id = e.target;

  const formData = new FormData();

  formData.append("id_usuario", id.value);

  let query = await fetch(`${base_url}/Users/verifyId`, {
    method: "POST",
    body: formData,
  });

  let { status, msg } = await query.json();

  if (!status) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

// -------------
document.addEventListener("DOMContentLoaded", (event) => {
  const container = document.getElementById("container");
  const addButton = document.getElementById("addButton");
  let inputCount = 1;
  const maxInputs = 5;

  function createSelect(number) {
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group mt-2";

    const label = document.createElement("label");
    label.setAttribute("for", `item${number}`);
    label.className = "col-6";
    label.textContent = "Recurso";

    const select = document.createElement("select");
    select.id = `item${number}`;
    select.name = `item${number}`;
    select.className = "form-select";
    select.required = true;

    // Añadir opción predeterminada
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "---";
    select.appendChild(defaultOption);

    // Aquí puedes añadir más opciones si lo deseas
    const option1 = document.createElement("option");
    option1.value = "opcion1";
    option1.textContent = "Opción 1";
    select.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = "opcion2";
    option2.textContent = "Opción 2";
    select.appendChild(option2);

    label.appendChild(select);
    inputGroup.appendChild(label);

    return inputGroup;
  }

  addButton.addEventListener("click", () => {
    if (inputCount < maxInputs) {
      inputCount++;
      const newSelect = createSelect(inputCount);
      container.appendChild(newSelect);
    } else {
      alert("Se ha alcanzado el máximo de 5 inputs.");
    }
  });
});

// =========================== FUNCIONES PARA LOS REPORTES ============================
function reporteRecursosReciclaje() {
  window.open(`${base_url}/Report/listaReporteRecursosReciclaje`, "_blank");
}

// ================= GRAFICO ==================

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: Array.from({ length: 40 }, (_, i) => `Item ${i + 1}`), // Etiquetas
    datasets: [
      {
        label: "Random Dataset",
        data: Array.from({ length: 40 }, () => Math.floor(Math.random() * 100)), // Datos
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Example: Chart with 40 Data Points",
      },
      tooltip: {
        enabled: true, // Mostrar tooltip al pasar el ratón
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true, // Saltar etiquetas automáticamente
          maxTicksLimit: 10, // Mostrar un máximo de 10 etiquetas
          maxRotation: 45, // Rotar etiquetas
          minRotation: 45, // Asegurar rotación mínima
        },
      },
      y: {
        beginAtZero: true, // Comenzar en 0 en eje Y
      },
    },
  },
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

//   addButton.addEventListener('click', () => {
//       if (inputCount < maxInputs) {
//           inputCount++;
//           const newInput = createInput(inputCount);
//           container.appendChild(newInput);
//       } else {
//           alert('Se ha alcanzado el máximo de 5 inputs.');
//       }
//   });
// });
//---------------
