// Referencias DOM
const btnAbrirModal = document.getElementById('btn-agregar-curso');
const modalAgregarCurso = document.getElementById('modal-agregar-curso');
const btnCancelar = document.getElementById('btn-cancelar');
const btnAceptar = document.getElementById('btn-aceptar');

const inputNombre = document.getElementById('input-nombre');
const inputSigla = document.getElementById('input-sigla');
const inputCreditos = document.getElementById('input-creditos');
const inputSemestre = document.getElementById('input-semestre');

// Abrir modal
btnAbrirModal.addEventListener('click', () => {
  modalAgregarCurso.classList.remove('modal-oculto');
});

// Cerrar modal con cancelar
btnCancelar.addEventListener('click', () => {
  modalAgregarCurso.classList.add('modal-oculto');
  limpiarCampos();
});

// Cerrar modal y agregar curso (aquí debes agregar lógica para guardar)
btnAceptar.addEventListener('click', () => {
  // Aquí validar datos y guardar curso en la estructura de datos
  // Por ahora solo cerramos modal y limpiamos campos

  if (!inputNombre.value.trim() || !inputSigla.value.trim() || !inputCreditos.value.trim() || !inputSemestre.value.trim()) {
    alert('Por favor completa todos los campos');
    return;
  }

  // Aquí se debería agregar el curso a la malla y actualizar vista

  alert(`Curso "${inputNombre.value}" agregado al semestre ${inputSemestre.value}`);

  modalAgregarCurso.classList.add('modal-oculto');
  limpiarCampos();
});

// Función para limpiar campos del modal
function limpiarCampos() {
  inputNombre.value = '';
  inputSigla.value = '';
  inputCreditos.value = '';
  inputSemestre.value = '';
}
