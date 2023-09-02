let _lstProductos = [];

class Producto {
  constructor(Id, IdRubro, Nombre, Descripcion, Unidad) {
    this.id = Id;
    this.idRubro = IdRubro;
    this.nombre = Nombre;
    this.descripcion = Descripcion;
    this.unidad = Unidad;
  }

  static TraerTodos() {
    let _lstProductosStorage = JSON.parse(
      localStorage.getItem("__lstProductos")
    );
    if (_lstProductos?.length == 0 && _lstProductosStorage?.length > 0) {
      for (let item of _lstProductosStorage) {
        _lstProductos.push(SerEntidad(item));
      }
    }
    return _lstProductos;
  }

  static TraerTodosXRubro(idRubro) {
    return _lstProductos.filter((elemento) => elemento.idRubro == idRubro);
  }

  static TraerTodosXBusqueda(busqueda) {
    let lstResult = [];
    if (_lstProductos != undefined && _lstProductos.length > 0) {
      for (let index = 0; index < _lstProductos.length; index++) {
        let minuscula = _lstProductos[index].nombre.toLowerCase();
        if (minuscula.indexOf(busqueda.toLowerCase()) > -1) {
          lstResult.push(_lstProductos[index]);
        }
      }
    }
    return lstResult;
  }

  static TraerUno(id) {
    _lstProductos == undefined && this.TraerTodos();
    const result = _lstProductos.filter((elemento) => elemento.id == id);
    return result[0];
  }

  static BorrarTodos() {
    _lstProductos = [];
    localStorage.setItem("__lstProductos", JSON.stringify(_lstProductos));
  }

  Guardar() {
    if (this.id == 0) {
      this.id = uuidv4();
      this.nombre = this.nombre.toUpperCase();
      _lstProductos.push(this);
    } else {
      for (let index = 0; index < _lstR_lstProductosubros.length; index++) {
        if (_lstProductos[index].id == this.id) {
          _lstProductos.splice(index, 1, this);
        }
      }
    }
    localStorage.setItem("__lstProductos", JSON.stringify(_lstProductos));
  }

  // Tools
  static ArmarTabla(lista) {
    let str = `
    <table class='table table-striped'>
      <thead class='thead-dark'>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Nombre</th>
          <th scope='col'>Rubro</th>
          <th scope='col'>Unidad</th>
          <th scope='col'>Borrar</th>
          </tr>
      </thead>`;
    if (lista?.length > 0) {
      str += `    <tbody>`;
      for (let item of lista) {
        str += `
          <tr>
            <td class='text-center'><a href='#' id="sel_${item.id}" data-id="${
          item.id
        }" class='btn btn-secondary' data-Evento='eventoProductoSeleccionado' onclick='SeleccionProducto(this)'><i class="fa-solid fa-magnifying-glass"></i></a></td>
            <td>${item.nombre}</td>
            <td>${Rubro.TraerUno(item.idRubro).nombre}</td>
            <td>${item.unidad}</td>
            <td class='text-center'><a href='#' id="del_${item.id}" data-id="${
          item.id
        }" class='btn btn-danger' data-Evento='eventoBorrarProductoSeleccionado' onclick='SeleccionProducto(this)'><i class="fa-solid fa-trash"></i></a></td>
          </tr>`;
      }
      str += `    </tbody>`;
    }
    return str;
  }
}
function SeleccionProducto(MiElemento) {
  try {
    let elemento = document.getElementById(MiElemento.id);
    let idBuscado = elemento.getAttribute("data-id");
    let buscado = _lstProductos.filter((entidad) => entidad.id == idBuscado);
    let Seleccionado = buscado[0];
    if (Seleccionado != undefined) {
      let evento = elemento.getAttribute("data-Evento");
      let event = new CustomEvent(evento, { detail: Seleccionado });
      document.dispatchEvent(event);
    }
  } catch (e) {
    alertError(e.message);
  }
}
function SerEntidad(entidad) {
  let obj = new Producto();
  // Entidad
  obj.id = entidad.id;
  obj.idRubro = entidad.idRubro;
  obj.nombre = entidad.nombre;
  obj.descripcion = entidad.descripcion;
  obj.unidad = entidad.unidad;
  return obj;
}
