document.addEventListener("DOMContentLoaded", () => {
  const btnAbrirModal = document.getElementById("btn-agregar-curso");
  const modal = document.getElementById("modal-agregar-curso");
  const btnCancelar = document.getElementById("btn-cancelar");
  const btnConfirmar = document.getElementById("btn-confirmar-curso");

  const inputNombre = document.getElementById("nombre-curso");
  const inputSigla = document.getElementById("sigla-curso");
  const inputCreditos = document.getElementById("creditos-curso");
  const inputSemestre = document.getElementById("semestre-curso");

  btnAbrirModal.addEventListener("click", () => {
    modal.classList.remove("modal-oculto");
  });

  btnCancelar.addEventListener("click", () => {
    modal.classList.add("modal-oculto");
    limpiarCampos();
  });

  btnConfirmar.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    const sigla = inputSigla.value.trim();
    const creditos = inputCreditos.value.trim();
    const semestre = inputSemestre.value.trim();

    if (!nombre || !sigla || !creditos || !semestre) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    agregarCurso({ nombre, sigla, creditos, semestre });
    modal.classList.add("modal-oculto");
    limpiarCampos();
  });

  function limpiarCampos() {
    inputNombre.value = "";
    inputSigla.value = "";
    inputCreditos.value = "";
    inputSemestre.value = "";
  }

  function agregarCurso({ nombre, sigla, creditos, semestre }) {
    // Buscar semestre existente o crear uno nuevo
    let contenedorMalla = document.getElementById("contenedor-malla");
    let semestreDiv = contenedorMalla.querySelector(`.semestre[data-semestre='${semestre}']`);

    if (!semestreDiv) {
      semestreDiv = document.createElement("div");
      semestreDiv.classList.add("semestre");
      semestreDiv.dataset.semestre = semestre;

      const h2 = document.createElement("h2");
      h2.textContent = `Semestre ${semestre}`;
      semestreDiv.appendChild(h2);

      const grid = document.createElement("div");
      grid.classList.add("grid");
      semestreDiv.appendChild(grid);

      contenedorMalla.appendChild(semestreDiv);
    }

    const grid = semestreDiv.querySelector(".grid");

    // Crear tarjeta curso
    const cursoDiv = document.createElement("div");
    cursoDiv.classList.add("curso");
    cursoDiv.dataset.id = Date.now(); // ID único simple

    const estadoDiv = document.createElement("div");
    estadoDiv.classList.add("estado", "pendiente");
    estadoDiv.textContent = "Pendiente";

    const contenidoCentral = document.createElement("div");
    contenidoCentral.classList.add("contenido-central");

    const nombreDiv = document.createElement("div");
    nombreDiv.classList.add("nombre");
    nombreDiv.textContent = nombre;

    const datosInferiores = document.createElement("div");
    datosInferiores.classList.add("datos-inferiores");

    const siglaSpan = document.createElement("span");
    siglaSpan.classList.add("sigla");
    siglaSpan.textContent = sigla;

    const creditosSpan = document.createElement("span");
    creditosSpan.classList.add("creditos");
    creditosSpan.textContent = `${creditos} cr.`;

    datosInferiores.appendChild(siglaSpan);
    datosInferiores.appendChild(creditosSpan);

    contenidoCentral.appendChild(nombreDiv);
    cursoDiv.appendChild(estadoDiv);
    cursoDiv.appendChild(contenidoCentral);
    cursoDiv.appendChild(datosInferiores);

    grid.appendChild(cursoDiv);
  }
});