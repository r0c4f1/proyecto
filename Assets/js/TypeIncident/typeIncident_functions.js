const TYPEINCIDENT_TABLE = new DataTable("#type", {
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
    url: `${base_url}/TypeIncident/getTypeIncident`,
    dataSrc: "",
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
    { data: "opc" },
  ],
  // dom: "lfrtip",
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});

function modalAddTypeIncident() {
  const myModal = new bootstrap.Modal("#addTypeIncident");

  myModal.show();
}

//BOTONES PARA CERRAR LOS MODALES
let btnCloseAddTypeIncident = document.getElementById(
  "btnCloseAddTypeIncident"
);
let btnCloseEditTypeIncident = document.getElementById(
  "btnCloseEditTypeIncident"
);
// =============================

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

async function addTypeIncident(e) {
  e.preventDefault(); // Evita el envío normal del formulario

  let formAddTypeIncident = document.getElementById("formAddTypeIncident");
  let inputs = formAddTypeIncident.querySelectorAll("input");
  let selects = formAddTypeIncident.querySelectorAll("select");

  if (
    !validator.isLength(inputs.item(0).value, { min: 8, max: 40 }) ||
    !validator.matches(
      inputs.item(0).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Nombre inválido, entre 8 y 40 caracteres", 3000);
    return;
  }

  if (selects.item(0).value === "" || selects.item(1).value === "") {
    alertTimeOut("error", "Elija un tipo", 3000);
    return;
  }

  const formData = new FormData(formAddTypeIncident);

  try {
    let query = await fetch(base_url + "/TypeIncident/registerTypeIncident", {
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
      btnCloseAddTypeIncident.click(); // Cierra el modal
      TYPEINCIDENT_TABLE.ajax.reload(); // Recarga la tabla
      formAddTypeIncident.reset();
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

async function updateTypeIncident(e) {
  e.preventDefault();

  let formEditTypeIncident = document.getElementById("formEditTypeIncident");
  let inputs = formEditTypeIncident.querySelectorAll("input");
  let selects = formEditTypeIncident.querySelectorAll("select");

  if (
    !validator.isLength(inputs.item(1).value, { min: 8, max: 40 }) ||
    !validator.matches(
      inputs.item(1).value,
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9@.,\-\_\s]+$/
    )
  ) {
    alertTimeOut("error", "Nombre inválido, entre 8 y 40 caracteres", 3000);
    return;
  }

  if (selects.item(0).value === "" || selects.item(1).value === "") {
    alertTimeOut("error", "Elija un tipo", 3000);
    return;
  }

  const formData = new FormData(formEditTypeIncident);
  // formData.append("admin", checked ? 1 : 0);

  let query = await fetch(base_url + "/TypeIncident/updateTypeIncident", {
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
    btnCloseEditTypeIncident.click();
    TYPEINCIDENT_TABLE.ajax.reload();
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
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

async function modalEditTypeIncident(id) {
  const myModal = new bootstrap.Modal("#modalEditTypeIncident");
  myModal.show();

  let formEditTypeIncident = document.getElementById("formEditTypeIncident");
  let inputs = formEditTypeIncident.querySelectorAll("input");
  let selectCategory = document.getElementById("selectCategory");
  let selectSubtipo = document.getElementById("selectSubtipo");

  let query = await fetch(`${base_url}/TypeIncident/getTypeIncident/${id}`);
  let { nombre_tipo, categoria, subtipo } = await query.json();

  inputs.item(0).value = id;
  inputs.item(1).value = nombre_tipo;
  selectCategory.value = categoria;
  selectSubtipo.value = subtipo;
}

function confirmed(id) {
  //AHORA CUANDO LE DAS AL BOTON DE BORRAR LO RECIBE AQUI
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
      //SI LE DAS QUE SI LLAMA A LA FUNCION DE BORRAR QUE YA CONOCEMOS
      cancelTypeIncident(id);
    }
  });
}

async function cancelTypeIncident(id) {
  //ESTA ES LA DE BORRAR QUE YA CONOCEMOS
  let query = await fetch(`${base_url}/TypeIncident/cancelTypeIncident/${id}`);
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
    TYPEINCIDENT_TABLE.ajax.reload();
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

async function restaurarProyecto(id) {
  let query = await fetch(`${base_url}/Project/restoreProject/${id}`);
  let { status, title, msg } = await query.json();

  if (status) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: "Restaurado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
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
  }
}
