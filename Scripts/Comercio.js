let _lstComercios = [];

class Comercio {
  constructor() {
    this.id = 0;
    this.nombre = "";
  }

  static TraerTodos() {
    let _lstComerciosStorage = JSON.parse(
      localStorage.getItem("__lstComercios")
    );
    if (_lstComercios?.length == 0 && _lstComerciosStorage?.length > 0) {
      for (let item of _lstComerciosStorage) {
        _lstComercios.push(SerEntidad(item));
      }
    }
    return _lstComercios;
  }

  static TraerTodosXBusqueda(busqueda) {
    let lstResult = [];
    if (_lstComercios != undefined && _lstComercios.length > 0) {
      for (let index = 0; index < _lstComercios.length; index++) {
        let minuscula = _lstComercios[index].nombre.toLowerCase();
        if (minuscula.indexOf(busqueda.toLowerCase()) > -1) {
          lstResult.push(_lstComercios[index]);
        }
      }
    }
    return lstResult;
  }

  static TraerUno(id) {
    _lstComercios == undefined && this.TraerTodos();
    const result = _lstComercios.filter((elemento) => elemento.id == id);
    return result[0];
  }

  static BorrarTodos() {
    _lstComercios = [];
    localStorage.setItem("__lstComercios", JSON.stringify(_lstComercios));
  }

  Guardar() {
    if (this.id == 0) {
      this.id = uuidv4();
      _lstComercios.push(this);
    } else {
      for (let index = 0; index < _lstComercios.length; index++) {
        if (_lstComercios[index].id == this.id) {
          _lstComercios.splice(index, 1, this);
        }
      }
    }
    localStorage.setItem("__lstComercios", JSON.stringify(_lstComercios));
  }

  Borrar() {
    if (_lstComercios?.length > 0) {
      for (let index = 0; index < _lstComercios.length; index++) {
        if (_lstComercios[index].id == this.id) {
          _lstComercios.splice(index, 1);
        }
      }
    }
    localStorage.setItem("__lstComercios", JSON.stringify(_lstComercios));
  }

  // Tools
  static ArmarTabla(lista) {
    let str = `
      <table class='table table-striped'>
        <thead class='thead-dark'>
          <tr>
            <th class='col-1 text-center'>#</th>
            <th class='col-5 text-center'>Nombre</th>
            <th class='col-5 text-center'>Borrar</th>
          </tr>
        </thead>`;
    if (lista?.length > 0) {
      str += `    <tbody>`;
      for (let item of lista) {
        str += `
          <tr>
            <td class='text-center'><a href='#' id="sel_${item.id}" data-id="${item.id}" class='btn btn-secondary' data-Evento='eventoComercioSeleccionado' onclick='SeleccionComercio(this)'><i class="fa-solid fa-magnifying-glass"></i></a></td>
            <td class='text-start pl-1'>${item.nombre}</td>
            <td class='text-center'><a href='#' id="del_${item.id}" data-id="${item.id}" class='btn btn-danger' data-Evento='eventoBorrarComercioSeleccionado' onclick='SeleccionComercio(this)'><i class="fa-solid fa-trash"></i></a></td>
          </tr>`;
      }
      str += `    </tbody>`;
    }
    return str;
  }
  static ArmarCombo(lista, IdSelect, evento) {
    let seleccione = "Seleccione";
    if (lista == undefined || lista?.length == 0) {
      seleccione = "Configurar Comercios";
    }
    let str = `
      <select style='width: 100%;' id='${IdSelect}' onchange='SeleccionComercioCombo(this)' data-Evento='${evento}'>
        <option value='0'>${seleccione}</option>`;
    if (lista?.length > 0) {
      for (let item of lista) {
        let selected = "";
        if (IdSelect == item.id) {
          selected = "selected";
        }
        str += ` <option value='${item.id}' ${selected}>${item.nombre}</option>`;
      }
      str += `</select>`;
    }
    return str;
  }
}

function SeleccionComercio(MiElemento) {
  try {
    let elemento = document.getElementById(MiElemento.id);
    let idBuscado = elemento.getAttribute("data-id");
    let buscado = _lstComercios.filter((entidad) => entidad.id == idBuscado);
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
function SeleccionComercioCombo(MiElemento) {
  try {
    let elemento = document.getElementById(MiElemento.id);
    let buscado = _lstComercios.filter(
      (entidad) => entidad.id == elemento.options[elemento.selectedIndex].value
    );
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
  let obj = new Comercio();
  // Entidad
  obj.id = entidad.id;
  obj.nombre = entidad.nombre;
  return obj;
}
