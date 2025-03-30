// =====================  TABLA HISTORICO DE OPERACIONES ======================
const SETTINGS_TABLE = new DataTable("#historico", {
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
    url: `${base_url}/Settings/getHistorico`,
    dataSrc: "",
  },
  columns: [
    { data: "fecha_operacion_formateada" },
    { data: "nombres" },
    { data: "tipo_operacion" },
    { data: "descripcion_operacion" },
    {
      data: "estado",
      render: function (data, type, row) {
        return data == 0 ? "Fallido" : "Exitoso";
      },
    },
  ],
  // dom: "lfrtip",
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});

const selectIndicadores = document.getElementById("indicadores");
const selectDesactivarIndicador = document.getElementById(
  "desactivarIndicador"
);
const btnInsertarIndicador = document.getElementById("btnInsertar");
const btnDesactivarIndicador = document.getElementById("btnDesactivar");

class Indicador {
  constructor() {
    this.status = 0;
    this.valor = 0;
  }

  async getIndicadores() {
    let lista = await this.listaIndicadores();
    console.log(lista);

    selectIndicadores.innerHTML = "<option value='0'>Activar</option>";
    selectDesactivarIndicador.innerHTML =
      "<option value='0'>Desactivar</option>";

    for (let i = 0; i < lista.length; i++) {
      let indicador = lista[i];
      if (indicador.status === 1) {
        selectDesactivarIndicador.innerHTML += `<option value='${indicador.id_graficos}'>${indicador.nombre}</option>`;
        continue;
      }

      selectIndicadores.innerHTML += `<option value='${indicador.id_graficos}'>${indicador.nombre}</option>`;
    }
  }
  #activar() {
    this.status = 1;
    this.valor = selectIndicadores.value;
  }
  #desactivar() {
    this.status = 0;
    this.valor = selectDesactivarIndicador.value;
  }
  async insertar() {
    this.#activar();

    if (this.valor === "0") {
      this.alertTimeOut("error", "Debe seleccionar un indicador", 2000);
      return;
    }

    const formData = new FormData();
    formData.append("status", this.status);
    formData.append("id_grafico", this.valor);

    let query = await fetch(`${base_url}/Settings/setGrafico`, {
      method: "POST",
      body: formData,
    });

    let data = await query.json();

    if (data.status) {
      this.alertTimeOut("success", "Activado", 2500);
      this.getIndicadores();
      this.#desactivar();
      this.valor = 0;
      return;
    }

    this.alertTimeOut("error", data.msg, 3000);
  }
  async eliminar() {
    this.#desactivar();

    if (this.valor === "0") {
      this.alertTimeOut("error", "Debe seleccionar un indicador", 2000);
      return;
    }

    const formData = new FormData();
    formData.append("status", this.status);
    formData.append("id_grafico", this.valor);

    let query = await fetch(`${base_url}/Settings/delGrafico`, {
      method: "POST",
      body: formData,
    });

    let data = await query.json();

    if (data.status) {
      this.alertTimeOut("success", "Desactivado", 2500);
      this.getIndicadores();
      this.#desactivar();
      this.valor = 0;
      return;
    }

    this.alertTimeOut("error", data.msg, 3000);
  }
  async listaIndicadores() {
    let query = await fetch(`${base_url}/Settings/getGraficos`);
    let data = await query.json();

    return data;
  }
  alertTimeOut(icon, text, timer) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      text,
      showConfirmButton: false,
      timer,
    });
  }
}

let newIndicador = new Indicador();

addEventListener("DOMContentLoaded", (e) => {
  newIndicador.getIndicadores();
});

btnInsertarIndicador.addEventListener("click", () => {
  newIndicador.insertar();
});

btnDesactivarIndicador.addEventListener("click", () => {
  newIndicador.eliminar();
});

const uploadHandlers = [
  {
    inputId: "fileInput",
    buttonId: "uploadButton",
    fieldName: "imageCintillo",
  },
  {
    inputId: "fileInput2",
    buttonId: "uploadButtonSeal",
    fieldName: "imageSello",
  },
  {
    inputId: "fileInput3",
    buttonId: "uploadButtonFirm",
    fieldName: "imageFirma",
  },
];

uploadHandlers.forEach((handler) => {
  const fileInput = document.getElementById(handler.inputId);
  const uploadButton = document.getElementById(handler.buttonId);

  uploadButton.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        const formData = new FormData();
        formData.append(handler.fieldName, file);
        try {
          const response = await fetch("upload.php", {
            method: "POST",
            body: formData,
          });
          if (response.ok) {
            alertTimeOut(
              "success",
              "Imagen subida y reemplazada con éxito.",
              2500
            );
            fileInput.value = "";
            return;
          } else {
            const errorText = await response.text();
            console.log("Error al subir la imagen: " + errorText);
            alertTimeOut(
              "error",
              "Error al subir la imagen. Por favor, intente de nuevo.",
              2500
            );
          }
        } catch (error) {
          console.log("Error de red: " + error.message);
        }
      } else {
        alertTimeOut(
          "info",
          "Por favor selecciona un archivo JPG o PNG.",
          3000
        );
      }
    } else {
      alertTimeOut("info", "Por favor selecciona una imagen.", 3000);
    }
  });
});

function alertTimeOut(icon, text, timer) {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    text: text,
    showConfirmButton: false,
    timer: timer,
  });
}
