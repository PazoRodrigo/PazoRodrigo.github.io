//  Declaro las variables del DOM
let btnProximaCompra = document.querySelector("#btnProximaCompra");
let btnNuevoTicket = document.querySelector("#btnNuevoTicket");
let divNvoTicket = document.querySelector("#divNvoTicket");
let divProximaCompra = document.querySelector("#divProximaCompra");

let cboComercios = document.querySelector("#cboComercios");


// Inicio de  Página
obtenerClima();

// Combo
function ArmarCombo(lista, seleccionado) {
  cboComercios.innerHTML = Comercio.ArmarCombo(
    lista,
    seleccionado,
    "eventoComercioSeleccionado"
  );
}

//  Escuchadores
btnProximaCompra.addEventListener("click", (evt) => {
  divNvoTicket.style.display = "none";
  divProximaCompra.style.display = "block";
  // TODO: Hacer
});
btnNuevoTicket.addEventListener("click", (evt) => {
  // TODO: Hacer
  divProximaCompra.style.display = "none";
  divNvoTicket.style.display = "block";
  ArmarCombo(Comercio.TraerTodos(), "cboComercioSelected");
});