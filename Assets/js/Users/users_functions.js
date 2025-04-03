// Definir las columnas de la tabla
let columns = [
  { data: "id_usuario" },
  { data: "nombres" },
  { data: "apellidos" },
  { data: "email" },
  { data: "cargo" },
  { data: "telefono" },
  { data: "fecha_nacimiento_formateada" },
  { data: "id_unidad" },
  { data: "sexo" },
  { data: "discapacidad" },
  { data: "nivel" },
];

// Agregar la columna "opc" si el nivel del usuario no es 0
if (typeof nivelUsuario !== "undefined" && nivelUsuario != 0) {
  columns.push({ data: "opc" });
}

// Inicializar la DataTable
const USUARIOS_TABLE = new DataTable("#usuarios", {
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
    url: `${base_url}/Users/getUsers`,
    dataSrc: "",
  },
  columns: columns,
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
let chartInstance; // Declaración global
let selectUnidad = document.getElementById("selectUnit");
let selectEditUnit = document.getElementById("selectEditUnit");
let selectDiscapacidadEdit = document.getElementById("selectDiscapacidadEdit");

async function editar(id) {
  let query = await fetch(`${base_url}/Users/getUser/${id}`);
  let data = await query.json();
  let selectSexEdit = document.getElementById("selectSexEdit");
  let selectEditUnit = document.getElementById("selectEditUnit");
  let queryUnit = await fetch(`${base_url}/Units/getUnits/`);
  let dataUnit = await queryUnit.json();
  let fragment = document.createDocumentFragment();

  selectEditUnit.innerHTML = "<option value='0'> --- </option>";

  for (let i = 0; i < dataUnit.length; i++) {
    let option = document.createElement("option");
    option.value = dataUnit[i].id_unidad;
    option.textContent = dataUnit[i].nombre;
    fragment.appendChild(option);
  }

  selectEditUnit.appendChild(fragment);

  let formUsers = document.getElementById("formEditUsers");

  formUsers.querySelectorAll("input").item(0).value = data.id_usuario;
  formUsers.querySelectorAll("input").item(1).value = data.nombres;
  formUsers.querySelectorAll("input").item(2).value = data.apellidos;
  formUsers.querySelectorAll("input").item(3).value = data.email;
  formUsers.querySelectorAll("input").item(4).value = data.telefono;
  formUsers.querySelectorAll("input").item(5).value = data.cargo;
  formUsers.querySelectorAll("input").item(6).value = data.fecha_nacimiento;

  selectEditUnit.value = data.id_unidad;
  selectSexEdit.value = data.sexo;
  selectDiscapacidadEdit.value = data.discapacidad;

  const myModal = new bootstrap.Modal("#userModal", {
    keyboard: false,
  });

  myModal.show();
}

function confirmed(id) {
  Swal.fire({
    title: "¿Está seguro?",
    text: "Este cambio no será reversible",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminar(id);
    }
  });
}

async function eliminar(id) {
  const formData = new FormData();
  formData.append("id_usuario", id);
  formData.append("status", 0);

  let query = await fetch(`${base_url}/Users/setStatus`, {
    method: "POST",
    body: formData,
  });

  let { status, msg } = await query.json();

  if (status) {
    USUARIOS_TABLE.ajax.reload();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      text: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

function modalAddUserModal() {
  const myModal = new bootstrap.Modal("#addUserModal");
  fillSelectOptions(document.getElementById("selectUnit"));
  myModal.show();
}

function closeModalAddUserModal() {
  let btn = document.getElementById("btnCloseAddUsermodal");
  btn.click();
}

function closeModalEditUserModal() {
  let btn = document.getElementById("btnCloseEditUsermodal");
  btn.click();
}

// Validaciones
// =====================================
// Validación de Cédula: Solo 8 números
// let cedulaInput = document.getElementById("cedula");
// let cedulaPattern = /^\d{0,8}$/; // Permitir solo números y hasta 8 caracteres
// let cedulaErrorMessage = "La cédula debe tener exactamente 8 números.";
// validarInputRealTime(cedulaInput, cedulaPattern, cedulaErrorMessage);
// Aquí puedes agregar más validaciones siguiendo el mismo patrón
// =====================================

async function addUser(e) {
  e.preventDefault();

    const formDataVerifyId = new FormData();

  formDataVerifyId.append("id_usuario", document.getElementById("cedulaId").value);

  let queryVerifyId = await fetch(`${base_url}/Users/verifyId`, {
    method: "POST",
    body: formDataVerifyId,
  });

  let dataUsuarioSistema = await queryVerifyId.json();

  if (!dataUsuarioSistema.status) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: dataUsuarioSistema.msg,
      showConfirmButton: false,
      timer: 1500,
    })

    return;
  }

  let formAddUsers = document.getElementById("formAddUsers");
  let inputs = formAddUsers.querySelectorAll("input");
  let formatoTelefono = ["0424", "0414", "0426", "0416", "0412"];

  if (inputs.item(0).value === "") {
    alertTimeOut("error", "Campo cédula vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(0).value, { min: 1, max: 10 }) ||
    !validator.matches(inputs.item(0).value, /^[0-9]+$/)
  ) {
    alertTimeOut("error", "Cédula inválida", 3000);
    return;
  }

  if (inputs.item(2).value === "") {
    alertTimeOut("error", "Campo nombre vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(2).value, { min: 1, max: 50 }) ||
    !validator.matches(inputs.item(2).value, /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  ) {
    alertTimeOut("error", "Nombre inválido", 3000);
    return;
  }

  if (inputs.item(3).value === "") {
    alertTimeOut("error", "Campo apellido vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(3).value, { min: 1, max: 50 }) ||
    !validator.matches(inputs.item(3).value, /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  ) {
    alertTimeOut("error", "Apellido inválido", 3000);
    return;
  }

  if (inputs.item(4).value === "") {
    alertTimeOut("error", "Campo email vacío");
    return;
  }

  if (!validator.isEmail(inputs.item(4).value)) {
    alertTimeOut("error", "Email inválido", 3000);
    return;
  }

  if (inputs.item(5).value === "") {
    alertTimeOut("error", "Campo teléfono vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(5).value, { min: 11, max: 11 }) ||
    !validator.matches(inputs.item(5).value, /^[0-9]+$/)
  ) {
    alertTimeOut("error", "Teléfono inválido", 3000);
    return;
  }

  let validacionFormato = formatoTelefono.some((item) => {
    let formato = inputs.item(5).value.substring(0, 4);

    return formato === item;
  });

  if (!validacionFormato) {
    alertTimeOut("error", "Formato de teléfono inválido", 3500);
    return;
  }

  if (inputs.item(6).value === "") {
    alertTimeOut("error", "Campo cargo vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(6).value, { min: 1, max: 30 }) ||
    !validator.matches(inputs.item(6).value, /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  ) {
    alertTimeOut("error", "Cargo inválido", 3000);
    return;
  }

  if (inputs.item(7).value === "") {
    alertTimeOut("error", "Campo fecha vacío", 3000);
    return;
  }

  if (!validarFecha(inputs.item(7).value) || inputs.item(7).value === "") {
    alertTimeOut("error", "Fecha inválida", 3000);
    return;
  }
  if (selectUnit.value === "" || selectUnit.value === "0") {
    alertTimeOut("error", "Seleccione una unidad válida", 3000);
    return;
  }

  if (inputs.item(9).value === "") {
    alertTimeOut("error", "Campo clave vacío", 3000);
    return;
  }

  if (
    !validator.matches(
      inputs.item(9).value,
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,12}$/
    )
  ) {
    alertTimeOut(
      "error",
      "Asegúrese que su clave contenga al menos una letra, un número y un carácter especial, y que tenga al menos 6 caracteres. Ejemplo: Ex@mple123",
      5000
    );
    return;
  }

  if (inputs.item(9).value === "") {
    alertTimeOut("error", "Campo repetir clave vacío", 3000);
    return;
  }

  // if (!validator.equals(inputs.item(9).value, inputs.item(10).value)) {
  //   alertTimeOut("error", "Claves distintas", 3000);
  //   return;
  // }

  // VARIABLES PARA VALIDACIONES
  // ====================================
  let { checked } = document.getElementById("isAdmin");
  // =====================================

  const formData = new FormData(formAddUsers);
  formData.append("nivel", checked ? 1 : 0);

  let query = await fetch(base_url + "/Users/registerUser", {
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
    closeModalAddUserModal();
    graficoDiscapacitados();
    USUARIOS_TABLE.ajax.reload();
    formAddUsers.reset();
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

// Añadir evento de escucha para cuando el DOM esté cargado
// document.addEventListener("DOMContentLoaded", function () {
//   // Añade las validaciones en tiempo real
//   validarInputRealTime(cedulaInput, cedulaPattern, cedulaErrorMessage);
// });

async function updateUser(e) {
  e.preventDefault();

  let formAddUsers = document.getElementById("formEditUsers");
  // let { checked } = document.getElementById("isAdmin");
  let inputs = formAddUsers.querySelectorAll("input");
  let selects = formAddUsers.querySelectorAll("select");
  let formatoTelefono = ["0424", "0414", "0426", "0416", "0412"];

  if (selects.item(0).value === "" || selects.item(0).value === "0") {
    alertTimeOut("error", "Campo unidad vacío", 3000);
    return;
  }

  if (inputs.item(1).value === "") {
    alertTimeOut("error", "Campo nombre vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(1).value, { min: 1, max: 50 }) ||
    !validator.matches(inputs.item(1).value, /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  ) {
    alertTimeOut("error", "Nombre inválido", 3000);
    return;
  }

  if (inputs.item(2).value === "") {
    alertTimeOut("error", "Campo apellido vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(2).value, { min: 1, max: 50 }) ||
    !validator.matches(inputs.item(2).value, /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  ) {
    alertTimeOut("error", "Apellido inválido", 3000);
    return;
  }

  if (inputs.item(3).value === "") {
    alertTimeOut("error", "Campo email vacío", 3000);
    return;
  }

  if (!validator.isEmail(inputs.item(3).value)) {
    alertTimeOut("error", "Email inválido", 3000);
    return;
  }

  if (inputs.item(4).value === "") {
    alertTimeOut("error", "Campo teléfono vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(4).value, { min: 11, max: 11 }) ||
    !validator.matches(inputs.item(4).value, /^[0-9]+$/)
  ) {
    alertTimeOut("error", "Teléfono inválido", 3000);
    return;
  }

  let validacionFormato = formatoTelefono.some((item) => {
    let formato = inputs.item(4).value.substring(0, 4);

    return formato === item;
  });

  if (!validacionFormato) {
    alertTimeOut("error", "Formato de teléfono inválido", 3500);
    return;
  }

  if (inputs.item(5).value === "") {
    alertTimeOut("error", "Campo cargo vacío", 3000);
    return;
  }

  if (
    !validator.isLength(inputs.item(5).value, { min: 1, max: 30 }) ||
    !validator.matches(inputs.item(5).value, /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  ) {
    alertTimeOut("error", "Cargo inválido", 3000);
    return;
  }

  if (inputs.item(6).value === "") {
    alertTimeOut("error", "Campo fecha vacío", 3000);
    return;
  }

  if (!validarFecha(inputs.item(6).value) || inputs.item(6).value === "") {
    alertTimeOut("error", "Fecha inválida", 3000);
    return;
  }

  // if (inputs.item(7).value == "") {
  //   alertTimeOut("error", "Campo unidad vacío", 3000);
  //   return;
  // }

  // if (
  //   !validator.isLength(inputs.item(7).value, { min: 1, max: 3 }) ||
  //   !validator.matches(inputs.item(7).value, /^[0-9]+$/)
  // ) {
  //   alertTimeOut("error", "Unidad inválida", 3000);
  //   return;
  // }

  const formData = new FormData(formAddUsers);
  // formData.append("admin", checked ? 1 : 0);

  let query = await fetch(base_url + "/Users/updateUser", {
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
    closeModalEditUserModal();
    graficoDiscapacitados();
    USUARIOS_TABLE.ajax.reload();
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

// async function verifyId(e) {
//   let id = e.target;

//   const formData = new FormData();

//   formData.append("id_usuario", id.value);

//   let query = await fetch(`${base_url}/Users/verifyId`, {
//     method: "POST",
//     body: formData,
//   });

//   let { status, msg } = await query.json();

//   if (!status) {
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: msg,
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   }
// }

function changeType() {
  const visible = document.getElementById("visible");
  const invisible = document.getElementById("invisible");
  const visible2 = document.getElementById("visible2");
  const invisible2 = document.getElementById("invisible2");
  const claveInput = document.getElementById("claveInput");
  const repetidaInput = document.getElementById("claveRepetida");

  if (visible.classList.contains("visually-hidden")) {
    visible.classList.remove("visually-hidden");
    invisible.classList.add("visually-hidden");
    claveInput.type = "password";
    visible2.classList.remove("visually-hidden");
    invisible2.classList.add("visually-hidden");
    repetidaInput.type = "password";
  } else {
    visible.classList.add("visually-hidden");
    invisible.classList.remove("visually-hidden");
    claveInput.type = "text";
    visible2.classList.add("visually-hidden");
    invisible2.classList.remove("visually-hidden");
    repetidaInput.type = "text";
  }
}

function validarFecha(fechaInput) {
  // Validar que el formato sea correcto (YYYY-MM-DD)
  if (!validator.isDate(fechaInput)) return false;

  const hoy = new Date();
  const hace15Anios = new Date();
  hace15Anios.setFullYear(hoy.getFullYear() - 15);

  // Convertir las fechas a objetos Date
  const fechaIngresada = new Date(fechaInput);

  // Validar que no sea hoy ni una fecha futura
  if (
    fechaIngresada.toDateString() === hoy.toDateString() ||
    fechaIngresada > hoy
  ) {
    return false;
  }

  // Validar que tenga al menos 15 años
  if (fechaIngresada > hace15Anios) {
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  const selectUnidad = document.getElementById("selectUnit");

  if (selectUnidad) {
    fillSelectOptions(selectUnidad);
  }
});

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

// ========================================= GRAFICO DE DISCAPACIDAD =====================
async function graficoDiscapacitados() {
  try {
    // Realiza la consulta a tu API para obtener los datos
    let queryGoals = await fetch(`${base_url}/Users/getDisabled`);
    let dataGoals = await queryGoals.json();

    // Extraer etiquetas y valores
    const labels = Object.keys(dataGoals); // ['Ninguna', 'Física', 'Intelectual', 'Mental', 'Sensorial']
    const valores = Object.values(dataGoals); // [50, 20, 15, 10, 5]

    // Destruir el gráfico existente, si lo hay
    if (chartInstance) {
      chartInstance.destroy(); // Destruye el gráfico actual
    }

    // Crear un nuevo gráfico
    const ctx = document.getElementById("barChart").getContext("2d");
    chartInstance = new Chart(ctx, {
      type: "doughnut", // Tipo de gráfico
      data: {
        labels: labels,
        datasets: [
          {
            label: "Cantidad de Discapacidades",
            data: valores,
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(255, 205, 86, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Distribución de Tipos de Discapacidades",
          },
        },
      },
    });
  } catch (error) {
    console.error("Error al obtener los datos o renderizar el gráfico:", error);
  }
}

graficoDiscapacitados();

async function consulta(point, params, method) {
  let url_api = "http://api.uptos.edu.ve/1.7.7";
  let service_point = `${url_api}${point}`;

  return $.ajax({
    url: service_point,
    type: method || "POST",
    data: params,
    error: function (response, t) {
      let data = {};
      if (response.contentType == "application/json") {
        // console.log(response.responseText);
        data = $.parseJSON(response.responseText);
      }
      return data;
    },
    success: function (plain, status, response) {
      let data = {};
      if (response.contentType == "application/json") {
        data = $.parseJSON(response.responseText);
      }
      return data;
    },
  });
}

async function verifyId(e) {
  let id = e.target.value;

  if (id === "") {
    alertTimeOut("error", "Campo cédula vacío", 3000);
    return;
  }

   let formAddUsers = document.getElementById("formAddUsers");
    let inputs = formAddUsers.querySelectorAll("input");
    let selects = formAddUsers.querySelectorAll("select");

    

  // try {
  //   const params = {
  //     pin: id /* datos a consultar 16818597 13942458 15934877 16701874  */,
  //     token: "123ssss",
  //   };

  //   const resp = await consulta("/directory/search_person.json", params, "GET");

  //   if (resp[0].data.length === 0) {
  //     alertTimeOut("error", "Cédula no encontrada en el sistema", 3000);
  //     document.getElementById("btnAddUserSubmit").disabled = true;
  //     return;
  //   }else {
  //      document.getElementById("btnAddUserSubmit").disabled = false;
  //  }

  //   inputs.item(2).value = resp[0].data[0].firstnames;
  //   inputs.item(3).value = resp[0].data[0].lastnames;
  //   selects.item(1).value = resp[0].data[0].sex;
  //   inputs.item(6).value = data[0].data[0].type_str;

  // } catch (e) {
  //   alertTimeOut("error", "Sin acceso al servidor", 3000);
  // document.getElementById("btnAddUserSubmit").disabled = true;
  //   console.log(inputs);

  //   return;
  // }


  let query = await fetch(`${base_url}/Api/getApi`);
  let data = await query.json();

  if(data[0].data.length === 0) {
    alertTimeOut("error", "Cedula no encontrada", 2000);
    document.getElementById("btnAddUserSubmit").disabled = true;
    return;
  }else {
    document.getElementById("btnAddUserSubmit").disabled = false;
  }

  let encontrado = 0;

  for (let i = 0; i < data[0].data.length; i++) {
    const el = data[0].data[i];

    if(el.pin === id) {
       inputs.item(2).value = data[0].data[i].firstnames;
       inputs.item(3).value = data[0].data[i].lastnames;
       inputs.item(6).value = data[0].data[i].type_str;
       selects.item(1).value = data[0].data[i].sex;
       encontrado = 1;

       break;
    }
    
  }

  if(encontrado === 0) {
     inputs.item(2).value = "";
    inputs.item(3).value = "";
    inputs.item(6).value = "";
    selects.item(1).value = 0;
    alertTimeOut("error", "Usuario no encontrado en el sistema", 2000);
    document.getElementById("btnAddUserSubmit").disabled = true;
  }
 


  console.log(data);
  

 
}
