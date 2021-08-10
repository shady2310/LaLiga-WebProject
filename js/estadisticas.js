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

  let partidos = data.matches;
  tablaEstadisticas(partidos);
}

function tablaEstadisticas(partidos) {
  let datosEstadisticas = [];

  for (let i = 0; i < partidos.length; i++) {
    let estadoPartido = partidos[i].status;
    if (estadoPartido !== "FINISHED") {
      continue;
    }

    let equipoLocal = partidos[i].homeTeam.name;
    let equipoLocalId = partidos[i].homeTeam.id;
    let equipoLocalGoles = 0;

    let incluido = false;

    datosEstadisticas.forEach((equipoLocalEncontrado) => {
      if (equipoLocalEncontrado.id == equipoLocalId) {
        incluido = true;
      }
    });
    if (incluido == false) {
      datosEstadisticas.push({
        id: equipoLocalId,
        name: equipoLocal,
        goals: equipoLocalGoles,
        matches: 0,
        avg: 0,
      });
    }
  }

  for (i = 0; i < datosEstadisticas.length; i++) {
    for (j = 0; j < partidos.length; j++) {
      if (datosEstadisticas[i].id == partidos[j].homeTeam.id) {
        datosEstadisticas[i].goals += partidos[j].score.fullTime.homeTeam;
        datosEstadisticas[i].matches++;
      } else if (datosEstadisticas[i].id == partidos[j].awayTeam.id) {
        datosEstadisticas[i].goals += partidos[j].score.fullTime.awayTeam;
        datosEstadisticas[i].matches++;
      }
    }
  }

  datosEstadisticas.forEach((media) => {
    let avg = media.goals / media.matches;
    let avgObj = {
      avg: avg.toFixed(2),
    };
    Object.assign(media, avgObj);
    datosEstadisticas.sort((a, b) => b.avg - a.avg);
  });

  function crearTablaEstadisticas(partidos) {
    let tbody__estadisticas = document.getElementById("tbody__estadisticas");
    tbody__estadisticas.innerHTML = "";
    partidos.forEach((elementos) => {
      const tr = document.createElement("tr");

      let img = document.createElement("img");
      img.src = "https://crests.football-data.org/" + elementos.id + ".svg";
      img.classList.add("img");

      let datosPartidos = [
        img,
        elementos.name,
        elementos.goals,
        elementos.matches,
        elementos.avg,
      ];

      datosPartidos.forEach((elemento) => {
        const td = document.createElement("td");
        td.append(elemento);
        tr.appendChild(td);
        tbody__estadisticas.appendChild(tr);
      });
    });
  }
  crearTablaEstadisticas(datosEstadisticas);

  function top5() {
    let top5 = datosEstadisticas.slice(0, 5);
    crearTablaEstadisticas(top5);
  }

  let botonTop5 = document.getElementById("top5");
  botonTop5.addEventListener("click", function () {
    top5(datosEstadisticas);
  });

  let botonTop20 = document.getElementById("top20");
  botonTop20.addEventListener("click", function () {
    crearTablaEstadisticas(datosEstadisticas);
  });
}
