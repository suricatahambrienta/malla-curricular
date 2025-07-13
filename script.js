const estados = ["Pendiente", "Cursando", "Aprobado", "Reprobado", "Retirado"];

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".curso").forEach(curso => {
    curso.addEventListener("click", () => mostrarMenu(curso));
  });
});

function mostrarMenu(curso) {
  document.querySelectorAll(".menu-estado").forEach(m => m.remove());

  const menu = document.createElement("div");
  menu.className = "menu-estado";

  estados.forEach(estado => {
    const opcion = document.createElement("div");
    opcion.className = "opcion";
    opcion.textContent = estado;
    opcion.addEventListener("click", () => {
      cambiarEstado(curso, estado);
      menu.remove();
    });
    menu.appendChild(opcion);
  });

  curso.appendChild(menu);
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
    [nombre, sigla, creditos].forEach(el => el?.classList.add("tachado"));
  } else {
    [nombre, sigla, creditos].forEach(el => el?.classList.remove("tachado"));
  }
}
