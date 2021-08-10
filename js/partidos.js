let inputBusqueda = document.getElementById("busqueda");
let selectorJornadas = document.getElementById("jornada");
let buscaJornada = document.getElementById("buscaJornada");
let mostrarTodasJornadas = document.getElementById("todasJornadas");

datos();

async function datos() {
  loader();
  const url =
    "https://api.football-data.org/v2/competitions/2014/matches?season=2020";
  const token = "91401ee930a240caa286d2d4f8677a67";
  const header = {
    method: "GET",
    headers: {
      "X-Auth-Token": token,
    },
  };
  const response = await fetch(url, header);
  const data = await response.json();

  borrarLoader();

  tablaPartidos(data.matches);
  busqueda(data.matches);

  mostrarTodasJornadas.addEventListener("click", function () {
    tablaPartidos(data.matches);
    document.getElementById("errorJornada").style.display = "none";
    selectorJornadas.value = "";
  });

  buscaJornada.addEventListener("click", function () {
    jornadas(data.matches, parseInt(selectorJornadas.value));
    if (selectorJornadas.value == "") {
      document.getElementById("errorJornada").style.display = "block";
    } else if (selectorJornadas.value != "") {
      document.getElementById("errorJornada").style.display = "none";
    }
  });

  inputBusqueda.addEventListener("keyup", function () {
    busqueda(data.matches);
  });
}

function tablaPartidos(partidos) {
  let tbody__partidos = document.getElementById("tbody__partidos");

  tbody__partidos.innerHTML = "";

  for (let i = 0; i < partidos.length; i++) {
    const tr = document.createElement("tr");

    let fechaPartidos = new Date(partidos[i].utcDate);
    let fechaClean = fechaPartidos.toLocaleDateString();
    let hora = fechaPartidos.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let equipoLocal = partidos[i].homeTeam.name;
    let equipoVisitante = partidos[i].awayTeam.name;

    let imgEL = document.createElement("img");
    imgEL.src =
      "https://crests.football-data.org/" + partidos[i].homeTeam.id + ".svg";

    let imgEV = document.createElement("img");
    imgEV.src =
      "https://crests.football-data.org/" + partidos[i].awayTeam.id + ".svg";
    imgEL.classList.add("img");
    imgEV.classList.add("img2");

    let resultado =
      partidos[i].score.fullTime.homeTeam +
      "-" +
      partidos[i].score.fullTime.awayTeam;

    let jornada = partidos[i].matchday;

    let arbitro = partidos[i].referees[1].name;

    let datosPartidos = [
      jornada,
      fechaClean,
      hora,
      equipoLocal,
      imgEL,
      resultado,
      imgEV,
      equipoVisitante,
      arbitro,
    ];

    datosPartidos.forEach((crearTabla) => {
      const td = document.createElement("td");
      td.append(crearTabla);
      tr.appendChild(td);
      tbody__partidos.appendChild(tr);
    });
  }
}

function busqueda(partidos) {
  if (inputBusqueda.value == "") {
    tablaPartidos(partidos);
  }
  let datosFiltrados = partidos.filter((nombres) => {
    return (
      nombres.homeTeam.name
        .toLowerCase()
        .includes(inputBusqueda.value.toLowerCase()) ||
      nombres.awayTeam.name
        .toLowerCase()
        .includes(inputBusqueda.value.toLowerCase())
    );
  });

  if (datosFiltrados.length == 0) {
    document.getElementById("noExiste").style.display = "block";
  } else if (datosFiltrados.length != 0) {
    document.getElementById("noExiste").style.display = "none";
  }

  tablaPartidos(datosFiltrados);
}

function jornadas(partidos, jornadaSeleccionada) {
  let partidosSeleccionados = partidos.filter((partido) => {
    return partido.matchday === jornadaSeleccionada;
  });
  tablaPartidos(partidosSeleccionados);
}
