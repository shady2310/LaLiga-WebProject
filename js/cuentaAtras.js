// CUENTA ATRAS
let intervalo = setInterval(cuentaAtras, 1000);
let ocultarContador = document.getElementById("cuenta__contenedor");
const diasEL = document.getElementById("dias");
const horasEL = document.getElementById("horas");
const minutosEL = document.getElementById("minutos");
const segundosEL = document.getElementById("segundos");

const fecha = "13 Aug 2021";
// const fecha = "10 Aug 2021";

function cuentaAtras() {
  const fechaInicio = new Date(fecha);
  const fechaActual = new Date();
  const totalSegundos = (fechaInicio - fechaActual) / 1000;

  const dias = Math.floor(totalSegundos / 3600 / 24);
  const horas = Math.floor(totalSegundos / 3600) % 24;
  const minutos = Math.floor(totalSegundos / 60) % 60;
  const segundos = Math.floor(totalSegundos) % 60;

  diasEL.innerHTML = dias;
  horasEL.innerHTML = dosdigitos(horas);
  minutosEL.innerHTML = dosdigitos(minutos);
  segundosEL.innerHTML = dosdigitos(segundos);
  // console.log (dias, horas, minutos, segundos);

  if (fechaInicio <= fechaActual) {
    console.log(`La Liga ya ha empezado!`);
    clearInterval(intervalo);
    ocultarContador.style.display = "none";
  }
}

function dosdigitos(time) {
  return time < 10 ? `0${time}` : time;
}
// cuentaAtras();
  

// FIN CUENTA ATRAS
