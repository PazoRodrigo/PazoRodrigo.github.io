// Declaro las variables del DOM
// Buscador
let txtBusqueda = document.querySelector("#txtBusqueda");
let btnBusqueda = document.querySelector("#btnBusqueda");
let btnBusquedaTodos = document.querySelector("#btnBusquedaTodos");
let btnNuevo = document.querySelector("#btnNuevo");
// Entidad
let txtNombre = document.querySelector("#txtNombre");
let txtUnidad = document.querySelector("#txtUnidad");
let txtDescripcion = document.querySelector("#txtDescripcion");
let cboRubros = document.querySelector("#cboRubros");
let idEntidad = document.querySelector("#idEntidad");
let btnGuardar = document.querySelector("#btnGuardar");
// Tabla
let divTabla = document.querySelector("#tblEntidades");
let btnBorrarTodos = document.querySelector("#btnBorrarTodos");

// Inicio de Página
obtenerClima();
ArmarTabla(Producto.TraerTodos());
ArmarCombo(Rubro.TraerTodos(), "cboRubroSelected");
LimpiarEntidad();

// Eventos Mouse
btnBusqueda.addEventListener("click", (evt) => {
  let lista = Producto.TraerTodosXBusqueda(txtBusqueda.value);
  if (lista?.length > 0) {
    divTabla.innerHTML = Producto.ArmarTabla(lista);
  }
});
btnBusquedaTodos.addEventListener("click", (evt) => {
  txtBusqueda.value = "";
  let lista = Producto.TraerTodosXBusqueda(txtBusqueda.value);
  if (lista?.length > 0) {
    divTabla.innerHTML = Producto.ArmarTabla(lista);
  }
});
btnGuardar.addEventListener("click", () => {
  GuardarEntidad();
});
btnNuevo.addEventListener("click", () => {
  LimpiarEntidad();
});
btnBorrarTodos.addEventListener("click", () => {
  Producto.BorrarTodos();
  ArmarTabla();
  LimpiarEntidad();
});

// Eventos Teclado
txtNombre.addEventListener("keyup", (evt) => {
  // Si presiona el Enter desde el txt lo guarda
  if (evt.keyCode == 13) {
    GuardarEntidad();
    ArmarTabla(Producto.TraerTodos());
  }
});
txtDescripcion.addEventListener("keyup", (evt) => {
  // Si presiona el Enter desde el txt lo guarda
  if (evt.keyCode == 13) {
    GuardarEntidad();
    ArmarTabla(Producto.TraerTodos());
  }
});
txtUnidad.addEventListener("keyup", (evt) => {
  // Si presiona el Enter desde el txt lo guarda
  if (evt.keyCode == 13) {
    GuardarEntidad();
    ArmarTabla(Producto.TraerTodos());
  }
});

// Eventos Personalizados
document.addEventListener(
  "eventoProductoSeleccionado",
  function (objResultante) {
    LlenarEntidad(objResultante.detail);
  }
);
document.addEventListener(
  "eventoBorrarProductoSeleccionado",
  function (objResultante) {
    let objBorrar = new Rubro();
    objBorrar.id = objResultante.detail.id;
    objBorrar.Borrar();
    LimpiarEntidad();
    ArmarTabla(Rubro.TraerTodos());
  }
);
// Eventos Personalizados
// document.addEventListener("eventoRubroSeleccionado", function (objResultante) {
//   let lista = Producto.TraerTodosXRubro(objResultante.detail.id);
//   ArmarTabla(lista);
// });

// Tabla
function ArmarTabla(lista) {
  divTabla.innerHTML = Producto.ArmarTabla(lista);
}
// Combo
function ArmarCombo(lista, seleccionado) {
  cboRubros.innerHTML = Rubro.ArmarCombo(
    lista,
    seleccionado,
    "eventoRubroSeleccionado"
  );
}
// Entidad
function LimpiarEntidad() {
  idEntidad.textContent = "0";
  txtNombre.value = "";
  txtDescripcion.value = "";
  cboRubros.value = 0;
  const $select = document.querySelector("#cboRubroSelected");
  $select.value = "0";
  txtUnidad.value = "";
  txtNombre.focus();
}
function LlenarEntidad(obj) {
  idEntidad.textContent = obj.id;
  txtNombre.value = obj.nombre;
  txtDescripcion.value = obj.descripcion;
  const $select = document.querySelector("#cboRubroSelected");
  $select.value = obj.idRubro;
  txtUnidad.value = obj.unidad;
  txtNombre.focus();
}
function GuardarEntidad() {
  try {
    ValidarEntidad();
    let obj = new Producto;
    if (idEntidad.textContent != "") {
      obj.id = idEntidad.textContent;
    }
    obj.nombre = txtNombre.value;
    obj.descripcion = txtDescripcion.value;
    obj.unidad = txtUnidad.value;
    obj.idRubro = document.getElementById("cboRubroSelected").value
    obj.Guardar();
    ArmarTabla(Producto.TraerTodos());
    LimpiarEntidad();
  } catch (e) {
    alertAlerta(e.message);
  }
}
function ValidarEntidad() {
  let error = "";
  if (txtNombre?.value.length == 0) {
    error += "- Debe completar el nombre.<br>";
  }
  if (txtUnidad?.value.length == 0) {
    error += "- Debe completar la unidad.<br>";
  }
  if (document.getElementById("cboRubroSelected").value == 0) {
    error += "- Debe seleccionar el rubro.<br>";
  }
  if (error.length > 0) {
    let result =
      "Debe corregir los siguientes errores para guardar los cambios<br><br>" +
      error;
    throw new Error(result);
  }
}
