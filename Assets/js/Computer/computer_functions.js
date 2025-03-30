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
  }
});

// =================================================== ELIMINAR REGISTRO ====================================================== //

function confirmed(id) {
  console.log(id);
  Swal.fire({
    title: "¿Está seguro?",
    text: "Este cambio no será reversible",
    icon: "warning",
    iconColor: "#d33",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteComputer(id);
    }
  });
}

async function deleteComputer(id) {
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
    COMPUTER_TABLE.ajax.reload();
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

  let formData = new FormData(formEditComputer);

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
  }
});
