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

  // Validación del nombre de la unidad
  if (
    !validator.isLength(inputs.item(1).value, { min: 1, max: 50 }) ||
    !validator.matches(inputs.item(1).value, /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  ) {
    alertTimeOut("error", "Nombre inválido", 3000);
    return;
  }

  const formData = new FormData(formEditUnit);
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
