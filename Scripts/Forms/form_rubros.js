// Declaro las variables del DOM
// Buscador
let txtBusqueda = document.querySelector("#txtBusqueda");
let btnBusqueda = document.querySelector("#btnBusqueda");
let btnBusquedaTodos = document.querySelector("#btnBusquedaTodos");
let btnNuevo = document.querySelector("#btnNuevo");
// Entidad
let txtNombre = document.querySelector("#txtNombre");
let idEntidad = document.querySelector("#idEntidad");
let btnGuardar = document.querySelector("#btnGuardar");
// Tabla
let divTabla = document.querySelector("#tblEntidades");
let btnBorrarTodos = document.querySelector("#btnBorrarTodos");

// Inicio de Página
obtenerClima();
ArmarTabla(Rubro.TraerTodos());
LimpiarEntidad();

// Eventos Mouse
btnBusqueda.addEventListener("click", (evt) => {
  let lista = Rubro.TraerTodosXBusqueda(txtBusqueda.value);
  if (lista?.length > 0) {
    divTabla.innerHTML = Rubro.ArmarTabla(lista);
  }
});
btnBusquedaTodos.addEventListener("click", (evt) => {
  txtBusqueda.value = "";
  let lista = Rubro.TraerTodosXBusqueda(txtBusqueda.value);
  if (lista?.length > 0) {
    divTabla.innerHTML = Rubro.ArmarTabla(lista);
  }
});
btnGuardar.addEventListener("click", () => {
  GuardarEntidad();
  LimpiarEntidad();
  ArmarTabla(Rubro.TraerTodos());
});
btnNuevo.addEventListener("click", () => {
  LimpiarEntidad();
});
btnBorrarTodos.addEventListener("click", () => {
  Rubro.BorrarTodos();
  ArmarTabla();
  LimpiarEntidad();
});

// Eventos Teclado
txtNombre.addEventListener("keyup", (evt) => {
  // Si presiona el Enter desde el txt lo guarda
  if (evt.keyCode == 13) {
    GuardarEntidad();
    LimpiarEntidad();
    ArmarTabla(Rubro.TraerTodos());
  }
});

// Eventos Personalizados
document.addEventListener(
  "eventoRubroSeleccionado",
  function (objResultante) {
    LlenarEntidad(objResultante.detail);
  }
);
document.addEventListener(
  "eventoBorrarRubroSeleccionado",
  function (objResultante) {
    let objBorrar = new Rubro();
    objBorrar.id = objResultante.detail.id;
    objBorrar.Borrar();
    LimpiarEntidad();
    ArmarTabla(Rubro.TraerTodos());
  }
);

// Tabla
function ArmarTabla(lista) {
  divTabla.innerHTML = Rubro.ArmarTabla(lista);
}
// Entidad
function LimpiarEntidad() {
  idEntidad.textContent = "0";
  txtNombre.value = "";
  txtNombre.focus();
}
function LlenarEntidad(obj) {
  idEntidad.textContent = obj.id;
  txtNombre.value = obj.nombre;
}
function GuardarEntidad() {
  try {
    ValidarEntidad();
    let obj = new Rubro();
    if (idEntidad.textContent != "") {
      obj.id = idEntidad.textContent;
    }
    obj.nombre = txtNombre.value;
    obj.Guardar();
    alertOk(
      `<strong>${obj.nombre} </strong> Se ha guardado correctamente. `
    );
  } catch (e) {
    alertAlerta(e.message);
  }
}
function ValidarEntidad() {
  if (txtNombre?.value.length == 0) {
    throw new Error("Debe completar el nombre");
  }
}
