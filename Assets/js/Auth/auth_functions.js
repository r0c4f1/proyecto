let formLogin = document.getElementById("formLogin");
const cedula = document.getElementById("cedula");

let i = document.getElementById("navMenu");
let a = document.getElementById("loginBtn");

let x = document.getElementById("login");

let claveRepetida = document.getElementById("claveRepetida");

// =============== HISTORICO DE OPERACIONES ===============
let tipoOperacion = "";
let descripcionOperacion = "";
let estadoOperacion = "";
let id_usuario = "";
// ========================================================

function myMenuFunction() {
  if (i.className === "nav-menu") {
    i.className += " responsive";
  } else {
    i.className = "nav-menu";
  }
}

cedula.addEventListener("keypress", (e) => {
  e.target.value >= 8 ? (e.target.value = e.target.value.slice(0, 8)) : null;
});

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(formLogin);

  // === HISTORICO DE OPERACIONES CARGAR DATOS ===
  id_usuario = formData.get("cedula");
  tipoOperacion = "Inicio de Sesión";
  descripcionOperacion = `Inicio de Sesión, Usuario Portador de la cédula: ${id_usuario}`;
  // =============================================

  fetch(base_url + "/Auth/LoginUser", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status) {
        estadoOperacion = 1;
        historico(
          id_usuario,
          tipoOperacion,
          descripcionOperacion,
          estadoOperacion
        );
        location.href = base_url + "/Home";
      } else {
        Swal.fire({
          icon: "error",
          title: res.title,
          text: res.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        historico(
          id_usuario,
          tipoOperacion,
          descripcionOperacion,
          estadoOperacion
        );
      }
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "No disponible!",
        text: "Intente nuevamente...",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  historico(id_usuario, tipoOperacion, descripcionOperacion, estadoOperacion);
});

function changeType() {
  const visible = document.getElementById("visible");
  const invisible = document.getElementById("invisible");
  const claveInput = document.getElementById("claveInput");

  if (visible.classList.contains("visually-hidden")) {
    visible.classList.remove("visually-hidden");
    invisible.classList.add("visually-hidden");
    claveInput.type = "password";
  } else {
    visible.classList.add("visually-hidden");
    invisible.classList.remove("visually-hidden");
    claveInput.type = "text";
  }
}

// ===================== HISTORICO DE OPERACIONES ======================
async function historico(
  id_usuario,
  tipoOperacion,
  descripcionOperacion,
  estadoOperacion
) {
  // // Primera solicitud: obtener nombres del usuario
  // const formDataUser = new FormData();
  // formDataUser.append("id_usuario", id_usuario);

  // let queryUser = await fetch(base_url + "/Users/getUserPost", {
  //   method: "POST",
  //   body: formDataUser,
  // });
  // let dataUser = await queryUser.json();
  // console.log(dataUser);
  // id_usuario = dataUser.id_usuario;

  // Segunda solicitud: insertar histórico
  const formData = new FormData();
  formData.append("id_usuario", id_usuario);
  formData.append("tipoOperacion", tipoOperacion);
  formData.append("descripcionOperacion", descripcionOperacion);
  formData.append("estadoOperacion", estadoOperacion);

  let query = await fetch(base_url + "/Settings/insertHistorico", {
    method: "POST",
    body: formData,
  });
  let data = await query.json();

  return data; // Retorno de la respuesta final
}
