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

  arrayclasificacion.forEach((datos) => {
    const tr = document.createElement("tr");

    let posicion = datos.position;

    let equipo = datos.team.name;

    let img = document.createElement("img");
    img.src = datos.team.crestUrl;

    tr.appendChild(img);
    img.classList.add("img");

    let puntos = datos.points;

    let pj = datos.playedGames;

    let pg = datos.won;

    let pe = datos.draw;

    let pp = datos.lost;

    let datosClasificacion = [posicion, img, equipo, puntos, pj, pg, pe, pp];

    datosClasificacion.forEach((elemento) => {
      const td = document.createElement("td");
      td.append(elemento);
      tr.appendChild(td);
      tbody__clasificacion.appendChild(tr);
    });
  });
}
