// CUENTA ATRAS
let intervalo = setInterval(cuentaAtras, 1000);
let ocultarContador = document.getElementById("cuenta__contenedor");
const diasEL = document.getElementById("dias");
const horasEL = document.getElementById("horas");
const minutosEL = document.getElementById("minutos");
const segundosEL = document.getElementById("segundos");

datos();
async function datos() {
  
  const url =
    "https://api.football-data.org/v2/competitions/2014/matches";
  const token = "91401ee930a240caa286d2d4f8677a67";
  const header = {
    method: "GET",
    headers: {
      "X-Auth-Token": token,
    },
  };
  const response = await fetch(url, header);
  const data = await response.json();
  let fechaTexto = data.matches[0].utcDate;
  let fecha = Date.parse(fechaTexto);
  let fechaBuena = new Date (fecha);
  console.log(typeof fechaBuena);
  
  cuentaAtras(fechaBuena);
  
}

// const fecha = "13 Aug 2021";



// function cuentaAtras(fecha) {
function cuentaAtras(fecha) {
  const fechaInicio = new Date(fecha);
  const fechaActual = new Date();
  
  
  const totalSegundos = (fechaInicio - fechaActual) / 1000;
  
  
  const dias = Math.floor(totalSegundos / 3600 / 24);
  const horas = Math.floor(totalSegundos / 3600) % 24;
  const minutos = Math.floor(totalSegundos / 60) % 60;
  console.log(minutos);
  const segundos = Math.floor(totalSegundos) % 60;

  diasEL.innerHTML = dias;
  horasEL.innerHTML = dosdigitos(horas);
  minutosEL.innerHTML = dosdigitos(minutos);
  segundosEL.innerHTML = dosdigitos(segundos);

  if (fechaInicio <= fechaActual) {
    clearInterval(intervalo);
    ocultarContador.style.display = "none";
    console.log(`La Liga ya ha empezado!`);
  }
}

function dosdigitos(time) {
  return time < 10 ? `0${time}` : time;
}
