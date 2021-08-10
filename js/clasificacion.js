async function datos() {
  loader();
  const url = "https://api.football-data.org/v2/competitions/2014/standings";
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
  tablaClasificacion(data.standings[0].table);
}
datos();

function tablaClasificacion(arrayclasificacion) {
  let tbody__clasificacion = document.getElementById("tbody__clasificacion");

  for (let i = 0; i < arrayclasificacion.length; i++) {
    const tr = document.createElement("tr");

    let posicion = arrayclasificacion[i].position;

    let equipo = arrayclasificacion[i].team.name;

    let img = document.createElement("img");
    img.src = arrayclasificacion[i].team.crestUrl;

    tr.appendChild(img);
    img.classList.add("img");

    let puntos = arrayclasificacion[i].points;

    let pj = arrayclasificacion[i].playedGames;

    let pg = arrayclasificacion[i].won;

    let pe = arrayclasificacion[i].draw;

    let pp = arrayclasificacion[i].lost;

    let datosClasificacion = [posicion, img, equipo, puntos, pj, pg, pe, pp];

    datosClasificacion.forEach((elemento) => {
      const td = document.createElement("td");
      td.append(elemento);
      tr.appendChild(td);
      tbody__clasificacion.appendChild(tr);
    });
  }
}
