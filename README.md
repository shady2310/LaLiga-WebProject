<!-- LOGO -->
<p align="center">
  <a href="https://github.com/shady2310/LaLiga-WebProject">
    <img src="ReadMe\logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">LaLiga WebProject</h3>

  <p align="center">
    Descripción del proyecto
    <br />
    <a href="https://github.com/shady2310/LaLiga-WebProject/blob/master/README.md"><strong>ReadMe »</strong></a>
    <br />
    <br />
    <a href="https://github.com/shady2310/LaLiga-WebProject">Ver archivos</a>
    ·
    <a href="https://github.com/shady2310/LaLiga-WebProject/issues">Reportar Bug</a>
    ·
    <a href="https://github.com/shady2310/LaLiga-WebProject/issues">Solicitar funcionalidad</a>
  </p>
</p>

---

<!-- CONTENIDO -->
<details open="open">
  <summary><h2 style="display: inline-block">Contenido</h2></summary>
  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#otras-tecnologías">Otras tecnologías</a></li>
      </ul>
    </li>
    <li>
      <a href="#descripción-técnica">Descripción técnica</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

---

<!-- Sobre el proyecto -->

## Sobre el proyecto

**Descripción del proyecto:**

El proyecto consistia en desarrollar una Web en la que poder consultar los datos de los partidos, clasificación y estadisticas de La Liga Santander.

A su vez, como extra, se diseñaron más apartados en la web con diferentes funcionalidades, como filtros a las tablas y otras instancias de navegación, como las noticias, la Landing Page, zona de vídeos y fotogalerías.

Y otrás cosas más que se explican más adelante.

### Built With

- <img src="ReadMe\html.ico" width="18" height="18"> HTML
- <img src="ReadMe\html.ico" width="18" height="18"> CSS
- <img src="ReadMe\html.ico" width="18" height="18"> JavaScript

### Otras tecnologías

- <img src="ReadMe\html.ico" width="18" height="18"> Git
- <img src="ReadMe\html.ico" width="18" height="18"> GitHub

---

<!-- Descripción funcional -->

## Descripción funcional

<h3 align="center">
<strong>Características principales</strong>
</h3>

**Página principal**

Cuando entras por primera vez a la web te encuentras con la página de bienvenida, en la cual en caso de que LaLiga no haya comenzado te mostrará un contador para el inicio de la misma, en caso contrario el contador desaparecerá automaticamente.

<div align="center">
<img src="ReadMe\index.png" height="250">
</div>

<br>

<div align="center">
<h4><strong>LaLiga Santander</strong></h4>
</div>

**Partidos y clasificación:**

Aquí podemos encontrar toda la información sobre los partidos y la clasificación de cada uno de los equipos en la competición. Además encontraremos varios filtros que nos permiten hacer una busqueda más precisa y comoda del equipo que más nos interese.

<div align="center">
<img src="ReadMe\partidos.png" height="190">
<img src="ReadMe\clasificacion.png" height="190">
</div>

<br>

**Noticias:**

Esta sección se encuentra aún en desarrollo.

<br>

**Vídeos:**

Aquí podemos encontrar una diferente variedad de vídeos relacionados con la competición.

<div align="center">
<img src="ReadMe\videos.png" height="250">
</div>

<br>

**Fotogalerías:**

Aquí encontramos diferentes galerías publicadas por temas, dentro de cada una podemos encontrar un carrusel con las imagenes descritas en cada uno de los titulos.

<div align="center">
<img src="ReadMe\fotogaleria.png" height="190">
<img src="ReadMe\fotogaleria2.png" height="190">
</div>

<br>

**Estadisticas:**

Por último tenemos la tabla de estadisticas, en ella podemos encontrar listados los 20 equipos que participan en LaLiga Santander. Además contamos con información relevante al rendimiento de los equipos en la tabla.

<div align="center">
<img src="ReadMe\estadisticas.png" height="250">
</div>

<br>

---

<!-- Descripcion técnica -->

## Descripción técnica

### Home Page:

En la página de inicio tenemos un contador que se encarga de indicar el tiempo que queda para el inicio de LaLiga, está pensado para que se le asigne la fecha de inicio y al llegar a la misma ocultarse automaticamente y detener su ejecución:

```js
let intervalo = setInterval(cuentaAtras, 1000); // Se establece un intervalo de ejecución de la función cada segundo para actulizar el contador

//Llamamos a todos los elementos del DOM que forman parte del contador
let ocultarContador = document.getElementById("cuenta__contenedor");
const diasEL = document.getElementById("dias");
const horasEL = document.getElementById("horas");
const minutosEL = document.getElementById("minutos");
const segundosEL = document.getElementById("segundos");

// Establecemos la fecha de fin del contador o fecha de inicio del evento (LaLiga en este caso)
const fecha = "13 Aug 2021";

function cuentaAtras() {
  const fechaInicio = new Date(fecha); // Tomamos la fecha indicada
  const fechaActual = new Date(); // Obtenemos la fecha actual

  //Obetenemos cada uno de los datos haciendo una operación matematica y lo redondeamos al mínimo número redondo con el "Math.floor"
  const totalSegundos = (fechaInicio - fechaActual) / 1000;
  const dias = Math.floor(totalSegundos / 3600 / 24);
  const horas = Math.floor(totalSegundos / 3600) % 24;
  const minutos = Math.floor(totalSegundos / 60) % 60;
  const segundos = Math.floor(totalSegundos) % 60;

  diasEL.innerHTML = dias;
  horasEL.innerHTML = dosdigitos(horas);
  minutosEL.innerHTML = dosdigitos(minutos);
  segundosEL.innerHTML = dosdigitos(segundos);

  if (fechaInicio <= fechaActual) {
    console.log(`La Liga ya ha empezado!`);
    clearInterval(intervalo);
    ocultarContador.style.display = "none";
  }
}
// Para tener un aspecto uniforme con todos los digitos añadimos un cero si el numero es menor que 10
function dosdigitos(time) {
  return time < 10 ? `0${time}` : time;
}
```

<br>

### Obtención de datos:

Para obtener los datos en tiempo real hacemos uso de una **API**.

Documentación de la **API** utilizada: [Documentación](https://www.football-data.org/documentation/quickstart).

Para comunicarnos con la **API** utilizamos un fetch dentro de una función async (asíncrona).

- Fetch

  ```js
  async function datos() {
    const url = "https://api.football-data.org/v2/competitions/2014/matches";
    const token = "XXXXX"; // Token privado proporcionado por la API
    const header = {
      method: "GET", // Utilizamos el método GET para la obtección de los datos
      headers: {
        "X-Auth-Token": token, // Añadimos el token
      },
    };
    const response = await fetch(url, header); // Esperamos la respuesta del Fetch con un "Await"

    const data = await response.json(); // Recibimos los datos en formato ".json"

    FuncionEjemplo(data); // Aquí ejecutamos cada una de las funciones que utilizamos en el código
  }
  ```

### Proceso de carga de los datos

Al recibir los datos mediante el fetch debido a que hacemos una llamada a una API externa añadimos un **Spinner** que se ejecuta cuando hacemos la llamada y termina su ejecución al recibir los datos. Está separado en dos funciones, una que se encarga de crear el Spinner y otra eliminarlo.

- Código del Spinner

  ```js
  // Mostramos el Spinner
  function loader() {
    let loader = document.getElementById("contenedor__loader");
    loader.style.visibility = "block";
  }
  // Ocultamos el Spinner
  function borrarLoader() {
    let loader = document.getElementById("contenedor__loader");
    loader.style.visibility = "hidden";
  }
  ```

  <div align="center">
  <img src="ReadMe\spinner.png" height="250">
  </div>

---

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/github_username/repo_name/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- Versiones -->

## Versiones

- []()
- []()
- []()
