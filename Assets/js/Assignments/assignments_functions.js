const ASIGNACIONES_TABLE = new DataTable("#asignaciones", {
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
    url: `${base_url}/Assignments/getAssignments/${userLevel}/${unidad}`,
    dataSrc: "",
  },
  columns: [
    { data: "nombre_tipo" },
    { data: "categoria" },
    { data: "descripcion" },
    {
      data: null,
      render: function (data) {
        return data.nombres + " " + data.apellidos;
      },
    },
    { data: "nombre_equipo" },
    { data: "fecha_reporte_formateada" },
    { data: "fecha_asignacion_formateada" },
    { data: "fecha_solucion_formateada" },
    { data: "estado" },
    { data: "opc" },
  ],
  // dom: "lfrtip",
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});

const ASIGNACIONESPROYECTO_TABLE = new DataTable("#asignacionesProyecto", {
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
    url: `${base_url}/Assignments/getAssignmentsProjects/${userLevel}/${unidad}`,
    dataSrc: "",
  },
  columns: [
    { data: "nombre" },
    { data: "nombre_equipo" },
    { data: "fecha_inicio_formateada" },
    { data: "fecha_fin_formateada" },
    { data: "fecha_asignacion_formateada" },
    { data: "estado" },
    {
      data: "opc",
      render: function (data, type, row) {
        return data && data.trim() !== "" ? data : "Sin opciones";
      },
    },
  ],
  // dom: "lfrtip",
  paging: true,
  responsive: true,
  iDisplayLength: 10,
  order: [[0, "desc"]],
});
// ============== VARIALBLES HISTORICO =================
let tipoOperacion = "";
let descripcionOperacion = "";
let estadoOperacion = 0;

// =====================================================

let listaRecursos = document.getElementById("listaRecursos");
let listaCantidad = document.getElementById("listaCantidad");
let datosFiltro = [];

async function modalVerRecursos(id) {
  let query = await fetch(
    `${base_url}/Assignments/getResourcesForAssignments/${id}`
  );
  let data = await query.json();

  datosFiltro.push(...data);

  let firstList = ``;
  let secondList = ``;

  for (let i = 0; i < data.length; i++) {
    firstList += `
        <li class="list-group-item"><h6>${data[i].nombre}:</h6></li>
      `;
    secondList += `
        <li class="list-group-item"><h6>${data[i].cantidad_asignada}</h6></li>
      `;
  }

  listaRecursos.innerHTML = firstList;
  listaCantidad.innerHTML = secondList;

  Swal.fire({
    title: "Lista de recursos utilizados",
    html: `
        <div class="modal-body d-flex justify-content-center">
          <ul>
            ${firstList}
          </ul>
          <ul>
            ${secondList}
          </ul>
        </div>
      `,
    icon: "info",
  });
}

function confirmed(id_asignacion, id_incidencia) {
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
      cancelarAsignacion(id_asignacion, id_incidencia, motivo);
    }
  });
}

async function cancelarAsignacion(id_asignacion, id_incidencia, motivo) {
  //================== HISTORICO DE OPERACIONES ======================
  let queryIncidencia = await fetch(
    `${base_url}/Assignments/getIdTipo/${id_incidencia}`
  );
  let dataIncidencia = await queryIncidencia.json();

  let queryTipoIncidencia = await fetch(
    `${base_url}/TypeIncident/getTypeIncident/${dataIncidencia.id_tipo}`
  );
  let dataTipoIncidencia = await queryTipoIncidencia.json();

  tipoOperacion = "Eliminación";
  descripcionOperacion = `Se cancelo la Asignacion: <strong>${dataTipoIncidencia.nombre_tipo}</strong>\nMotivo: ${motivo}`;

  // ==================================================================
  let query = await fetch(
    `${base_url}/Assignments/delAssignments/${id_asignacion}`
  );
  let { status, msg, title } = await query.json();

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
    ASIGNACIONES_TABLE.ajax.reload();
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

// function confirmedProject(id) {
//   Swal.fire({
//     title: "¿Está seguro?",
//     text: "Este cambio no será reversible",
//     icon: "warning",
//     iconColor: "#d33",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Sí",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       cancelarProyecto(id);
//     }
//   });
// }

function confirmedProject(id_proyecto, id_asignacion) {
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
      cancelarProyecto(id_asignacion, id_proyecto, motivo);
    }
  });
}

async function cancelarProyecto(id_asignacion, id_proyecto, motivo) {
  let query = await fetch(
    `${base_url}/Assignments/delAssignmentsProject/${id_asignacion}`
  );
  let { status, msg, title } = await query.json();

  if (status) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: "Cancelado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    ASIGNACIONESPROYECTO_TABLE.ajax.reload();
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
