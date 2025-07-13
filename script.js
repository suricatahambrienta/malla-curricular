window.addEventListener("DOMContentLoaded", () => {
  const estados = ["Pendiente", "Cursando", "Aprobado", "Reprobado", "Retirado"];

  document.querySelectorAll(".curso").forEach((curso) => {
    aplicarEstadoDesdeStorage(curso);
    curso.addEventListener("click", () => mostrarMenu(curso));
  });

  // Botón para abrir modal
  const btnAgregarCurso = document.getElementById("btn-agregar-curso");
  const modalAgregarCurso = document.getElementById("modal-agregar-curso");
  const formAgregarCurso = document.getElementById("form-agregar-curso");
  const btnCancelar = document.getElementById("btn-cancelar");

  btnAgregarCurso.addEventListener("click", () => {
    formAgregarCurso.reset();
    modalAgregarCurso.classList.remove("modal-oculto");
  });

  btnCancelar.addEventListener("click", () => {
    modalAgregarCurso.classList.add("modal-oculto");
  });

  formAgregarCurso.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("input-nombre").value.trim();
    const sigla = document.getElementById("input-sigla").value.trim();
    const creditos = parseInt(document.getElementById("input-creditos").value);
    const semestre = parseInt(document.getElementById("input-semestre").value);

    if (!nombre || !sigla || !creditos || !semestre || creditos <= 0 || semestre <= 0) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }

    agregarCurso(nombre, sigla, creditos, semestre);

    modalAgregarCurso.classList.add("modal-oculto");
    formAgregarCurso.reset();
  });

  function mostrarMenu(curso) {
    document.querySelectorAll(".menu-estado").forEach((m) => m.remove());

    const menu = document.createElement("div");
    menu.className = "menu-estado";

    estados.forEach((estado) => {
      const opcion = document.createElement("div");
      opcion.className = "opcion";
      opcion.textContent = estado;
      opcion.addEventListener("click", () => {
        cambiarEstado(curso, estado);
        menu.remove();
        document.removeEventListener("click", clickFuera);
      });
      menu.appendChild(opcion);
    });

    curso.appendChild(menu);

    function clickFuera(event) {
      if (!menu.contains(event.target) && event.target !== curso) {
        menu.remove();
        document.removeEventListener("click", clickFuera);
      }
    }

    setTimeout(() => {
      document.addEventListener("click", clickFuera);
    }, 0);
  }

  function cambiarEstado(curso, estado) {
    const estadoDiv = curso.querySelector(".estado");
    const nombre = curso.querySelector(".nombre");
    const sigla = curso.querySelector(".sigla");
    const creditos = curso.querySelector(".creditos");

    estadoDiv.className = "estado";
    estadoDiv.classList.add(estado.toLowerCase());

    if (estado === "Aprobado" || estado === "Reprobado") {
      const nota = prompt(`Ingresa la nota final del curso (${estado.toLowerCase()}):`);
      if (nota) {
        estadoDiv.textContent = `${estado} con ${nota}`;
      } else {
        estadoDiv.textContent = estado;
      }
    } else {
      estadoDiv.textContent = estado;
    }

    if (estado === "Reprobado" || estado === "Retirado") {
      [nombre, sigla, creditos].forEach((el) => el?.classList.add("tachado"));
    } else {
      [nombre, sigla, creditos].forEach((el) => el?.classList.remove("tachado"));
    }

    guardarEstado(curso, estadoDiv.textContent);
  }

  function guardarEstado(curso, estadoTexto) {
    const sigla = curso.querySelector(".sigla")?.textContent;
    if (sigla) {
      localStorage.setItem("estado-" + sigla, estadoTexto);
    }
  }

  function aplicarEstadoDesdeStorage(curso) {
    const sigla = curso.querySelector(".sigla")?.textContent;
    const estadoDiv = curso.querySelector(".estado");
    const nombre = curso.querySelector(".nombre");
    const creditos = curso.querySelector(".creditos");

    if (sigla) {
      const estadoTexto = localStorage.getItem("estado-" + sigla);
      if (estadoTexto) {
        const estadoBase = estadoTexto.split(" ")[0];

        estadoDiv.className = "estado";
        estadoDiv.classList.add(estadoBase.toLowerCase());
        estadoDiv.textContent = estadoTexto;

        if (estadoBase === "Reprobado" || estadoBase === "Retirado") {
          [nombre, curso.querySelector(".sigla"), creditos].forEach((el) => el?.classList.add("tachado"));
        }
      }
    }
  }

  function agregarCurso(nombre, sigla, creditos, semestre) {
    const malla = document.querySelector(".malla-horizontal");

    let semestreDiv = Array.from(malla.children).find((s) => s.querySelector("h2").textContent === `Semestre ${semestre}`);

    if (!semestreDiv) {
      semestreDiv = document.createElement("div");
      semestreDiv.className = "semestre";
      semestreDiv.innerHTML = `<h2>Semestre ${semestre}</h2><div class="grid"></div>`;
      malla.appendChild(semestreDiv);
    }

    const grid = semestreDiv.querySelector(".grid");

    // Crear nueva tarjeta de curso
    const curso = document.createElement("div");
    curso.className = "curso";

    curso.innerHTML = `
      <div class="estado pendiente">Pendiente</div>
      <div class="contenido-central">
        <div class="nombre">${nombre}</div>
      </div>
      <div class="datos-inferiores">
        <div class="sigla">${sigla}</div>
        <div class="creditos">${creditos} cr.</div>
      </div>
    `;

    curso.addEventListener("click", () => mostrarMenu(curso));

    grid.appendChild(curso);

    aplicarEstadoDesdeStorage(curso);
  }
});
