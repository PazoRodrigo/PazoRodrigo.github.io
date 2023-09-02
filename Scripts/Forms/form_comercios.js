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
ArmarTabla(Comercio.TraerTodos());
LimpiarEntidad();

// Eventos Mouse
btnBusqueda.addEventListener("click", (evt) => {
  let lista = Comercio.TraerTodosXBusqueda(txtBusqueda.value);
  if (lista?.length > 0) {
    divTabla.innerHTML = Comercio.ArmarTabla(lista);
  }
});
btnBusquedaTodos.addEventListener("click", (evt) => {
  txtBusqueda.value = "";
  let lista = Comercio.TraerTodosXBusqueda(txtBusqueda.value);
  if (lista?.length > 0) {
    divTabla.innerHTML = Comercio.ArmarTabla(lista);
  }
});
btnGuardar.addEventListener("click", () => {
  GuardarEntidad();
  LimpiarEntidad();
  ArmarTabla(Comercio.TraerTodos());
});
btnNuevo.addEventListener("click", () => {
  LimpiarEntidad();
});
btnBorrarTodos.addEventListener("click", () => {
  Comercio.BorrarTodos();
  ArmarTabla();
  LimpiarEntidad();
});

// Eventos Teclado
txtNombre.addEventListener("keyup", (evt) => {
  // Si presiona el Enter desde el txt lo guarda
  if (evt.keyCode == 13) {
    GuardarEntidad();
    LimpiarEntidad();
    ArmarTabla(Comercio.TraerTodos());
  }
});

// Eventos Personalizados
document.addEventListener(
  "eventoComercioSeleccionado",
  function (objResultante) {
    LlenarEntidad(objResultante.detail);
  }
);
document.addEventListener(
  "eventoBorrarComercioSeleccionado",
  function (objResultante) {
    let objBorrar = new Comercio();
    objBorrar.id = objResultante.detail.id;
    objBorrar.Borrar();
    LimpiarEntidad();
    ArmarTabla(Comercio.TraerTodos());
  }
);

// Tabla
function ArmarTabla(lista) {
  divTabla.innerHTML = Comercio.ArmarTabla(lista);
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
    let obj = new Comercio();
    if (idEntidad.textContent != "") {
      obj.id = idEntidad.textContent;
    }
    obj.nombre = txtNombre.value;
    obj.Guardar();
  } catch (e) {
    alertAlerta(e.message);
  }
}
function ValidarEntidad() {
  if (txtNombre?.value.length == 0) {
    throw new Error("Debe completar el nombre");
  }
}
