const RECURSOS_TABLE = new DataTable("#recursos", {
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
    // responsive: true,
    iDisplayLength: 7,
    order: [[0, "desc"]],
  });
  
  async function editar(id) {
    let query = await fetch(`${base_url}/Users/getUser/${id}`);
    let data = await query.json();
    let selectSexEdit = document.getElementById("selectSexEdit");
  
    let formUsers = document.getElementById("formEditUsers");
  
    formUsers.querySelectorAll("input").item(0).value = data.id_usuario;
    formUsers.querySelectorAll("input").item(1).value = data.nombres;
    formUsers.querySelectorAll("input").item(2).value = data.apellidos;
    formUsers.querySelectorAll("input").item(3).value = data.email;
    formUsers.querySelectorAll("input").item(4).value = data.telefono;
    formUsers.querySelectorAll("input").item(5).value = data.cargo;
    formUsers.querySelectorAll("input").item(6).value = data.fecha_nacimiento;
    formUsers.querySelectorAll("input").item(7).value = data.id_unidad;
    selectSexEdit.value = data.sexo;
  
    console.log(data);
  
    const myModal = new bootstrap.Modal("#userModal", {
      keyboard: false,
    });
  
    myModal.show();
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
  
    console.log(data);
  }
  
  function modalAddUserModal() {
    const myModal = new bootstrap.Modal("#addUserModal");
  
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
  
  async function addUser(e) {
    e.preventDefault();
  
    let formAddUsers = document.getElementById("formAddUsers");
    let { checked } = document.getElementById("isAdmin");
  
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
      USUARIOS_TABLE.ajax.reload();
      document.querySelectorAll("input").forEach((input) => (input.value = ""));
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
  
  async function updateUser(e) {
    e.preventDefault();
  
    let formAddUsers = document.getElementById("formEditUsers");
    // let { checked } = document.getElementById("isAdmin");
  
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
  
  function claveRepetida(e) {
    let claveRepetida = e.target.value;
    let clave =
      e.target.parentElement.previousElementSibling.children.item(0).value;
  
    let btnAddUserSubmit = document.getElementById("btnAddUserSubmit");
  
    if (clave === claveRepetida) btnAddUserSubmit.removeAttribute("disabled");
    else btnAddUserSubmit.setAttribute("disabled", true);
  }
  