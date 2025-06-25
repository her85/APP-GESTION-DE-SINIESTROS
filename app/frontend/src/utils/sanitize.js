// utils/sanitize.js
// Función para eliminar caracteres especiales, permitiendo solo letras, números, espacios y guiones.
export function removeSpecialCharsFromString(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[^a-zA-Z0-9\s-]/g, '');
}

// Handler para usar en eventos de input (por ejemplo, @input)
export function removeSpecialCharsEvent(event) {
  const allowed = /^[a-zA-Z0-9\s-]*$/;
  if (!allowed.test(event.target.value)) {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9\s-]/g, '');
    event.target.dispatchEvent(new Event('input'));
  }
}
