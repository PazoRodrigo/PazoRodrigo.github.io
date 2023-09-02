let _lstRubros = [];

class Rubro {
  constructor() {
    this.id = 0;
    this.nombre = "";
  }

  static TraerTodos() {
    let _lstRubrosStorage = JSON.parse(localStorage.getItem("__lstRubros"));
    if (_lstRubros?.length == 0 && _lstRubrosStorage?.length > 0) {
      for (let item of _lstRubrosStorage) {
        _lstRubros.push(SerEntidad(item));
      }
    }
    return _lstRubros;
  }

  static TraerTodosXBusqueda(busqueda) {
    let lstResult = [];
    if (_lstRubros != undefined && _lstRubros.length > 0) {
      for (let index = 0; index < _lstRubros.length; index++) {
        let minuscula = _lstRubros[index].nombre.toLowerCase();
        if (minuscula.indexOf(busqueda.toLowerCase()) > -1) {
          lstResult.push(_lstRubros[index]);
        }
      }
    }
    return lstResult;
  }

  static TraerUno(id) {
    _lstRubros == undefined && this.TraerTodos();
    const result = _lstRubros.filter((elemento) => elemento.id == id);
    return result[0];
  }

  static BorrarTodos() {
    _lstRubros = [];
    localStorage.setItem("__lstRubros", JSON.stringify(_lstRubros));
  }

  Guardar() {
    if (this.id == 0) {
      this.id = uuidv4();
      _lstRubros.push(this);
    } else {
      for (let index = 0; index < _lstRubros.length; index++) {
        if (_lstRubros[index].id == this.id) {
          _lstRubros.splice(index, 1, this);
        }
      }
    }
    localStorage.setItem("__lstRubros", JSON.stringify(_lstRubros));
  }

  Borrar() {
    if (_lstRubros?.length > 0) {
      for (let index = 0; index < _lstRubros.length; index++) {
        if (_lstRubros[index].id == this.id) {
          _lstRubros.splice(index, 1);
        }
      }
    }
    localStorage.setItem("__lstRubros", JSON.stringify(_lstRubros));
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
            <td class='text-center'><a href='#' id="sel_${item.id}" data-id="${item.id}" class='btn btn-secondary' data-Evento='eventoRubroSeleccionado' onclick='SeleccionRubro(this)'><i class="fa-solid fa-magnifying-glass"></i></a></td>
            <td class='text-start pl-1'>${item.nombre}</td>
            <td class='text-center'><a href='#' id="del_${item.id}" data-id="${item.id}" class='btn btn-danger' data-Evento='eventoBorrarRubroSeleccionado' onclick='SeleccionRubro(this)'><i class="fa-solid fa-trash"></i></a></td>
          </tr>`;
      }
      str += `    </tbody>`;
    }
    return str;
  }

  static ArmarCombo(lista, IdSelect, evento) {
    let seleccione = "Seleccione";
    if (lista == undefined || lista?.length == 0) {
      seleccione = "Configurar Rubros";
    }
    let str = `
      <select style='width: 100%;' id='${IdSelect}' onchange='SeleccionRubroCombo(this)' data-Evento='${evento}'>
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

function SeleccionRubro(MiElemento) {
  try {
    let elemento = document.getElementById(MiElemento.id);
    let idBuscado = elemento.getAttribute("data-id");
    let buscado = _lstRubros.filter((entidad) => entidad.id == idBuscado);
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
function SeleccionRubroCombo(MiElemento) {
  try {
    let elemento = document.getElementById(MiElemento.id);
    let buscado = _lstRubros.filter(
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
  let obj = new Rubro();
  // Entidad
  obj.id = entidad.id;
  obj.nombre = entidad.nombre;
  return obj;
}
