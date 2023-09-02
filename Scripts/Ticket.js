let _lstTickets= [];


class Ticket {
  constructor(Id, NroTicket, IdComercio, Fecha) {
    this.id = Id;
    this.nroTicket = NroTicket;
    this.idComercio = IdComercio;
    this.fecha = Fecha;
    this.lstItems = [];
  }

  static TraerTodos() {
    if (_lstTickets == undefined) {
      _lstTickets = [];
      _lstTickets.push(
        new Producto(1, 1, 1,'10/11/2023'),
        new Producto(2, 2, 1 , '10/10/2023'),
        new Producto(3, 3, 2,'15/12/2023'),
        new Producto(4, 4, 3,'16/12/2023'),
      );
    }
    return _lstTickets;
  }
}


let _lstItemTickets;

class ItemTicket {
  constructor() {
    this.id = 0;
    this.idTicket = 0;
    this.idProducto = 0;
    this.cant = 0;
  }
}
