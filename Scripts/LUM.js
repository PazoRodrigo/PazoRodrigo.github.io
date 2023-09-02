function alertOk(mensaje) {
  Swal.fire("", mensaje.toString(), "success");
}

function alertInfo(mensaje) {
  Swal.fire("", mensaje.toString(), "info");
}

function alertAlerta(mensaje) {
  Swal.fire("", mensaje.toString(), "warning");
}

function alertError(mensaje) {
  Swal.fire("", mensaje.toString(), "error");
}

function alertConsulta(mensaje) {
  Swal.fire("", mensaje.toString(), "question");
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function obtenerClima() {
  let temperatura = 0;
  let ciudad = "Buenos Aires";
  ciudad = encodeURIComponent(ciudad);
  const key = "1568e07390d1aa1fd72d877b7f9e2003"; // pazo.rodrigo/pazo.rodrigo76
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((respClima) => {
      mostrarClima(respClima.main);
    })
    .catch((er) => {
      alertError(er);
    });
}

function mostrarClima(clima) {
  const spanTemp = document.querySelector("#spanTemp");
  let tempC = clima.temp - 273.15;
  tempC = `${Math.trunc(tempC)} °`;
  document.querySelector("#spanTemp").innerText = tempC;
}
