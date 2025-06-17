// src/composables/useForm.js
import { ref } from 'vue'
import { useFeedback } from '@/composables/useFeedback'

/**
 * Composable para lógica de formularios: validación, reset y feedback visual.
 * @param {Object} initialState Estado inicial del formulario
 * @param {Function} [validateFn] Función de validación personalizada (opcional)
 * @returns {{ form: import('vue').Ref<Object>, isLoading: import('vue').Ref<boolean>, error: import('vue').Ref<string|null>, success: import('vue').Ref<string|null>, validate: function, resetForm: function, setError: function, setSuccess: function, clearFeedback: function }}
 */
export function useForm(initialState, validateFn) {
  const form = ref({ ...initialState })
  const isLoading = ref(false)
  const { error, success, setError, setSuccess, clearFeedback } = useFeedback()

  /**
   * Sanitiza y escapa un string para evitar XSS y eliminar espacios innecesarios.
   * Elimina etiquetas HTML, recorta espacios y escapa caracteres especiales.
   * @param {string} str - Texto a sanitizar
   * @returns {string} Texto limpio y seguro
   */
  function sanitizeInput(str) {
    if (typeof str !== 'string') return str;
    // Elimina etiquetas HTML
    let clean = str.replace(/<[^>]*>?/gm, '').trim();
    // Escapa caracteres especiales
    clean = clean
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    return clean;
  }

  /**
   * Valida el formulario actual. Si se pasa una función de validación personalizada, la usa.
   * Si no, valida que no haya campos vacíos y sanitiza los textos.
   * @returns {boolean} true si es válido, false si hay errores
   */
  const validate = () => {
    if (validateFn) return validateFn(form.value)
    // Validación básica: no permitir campos vacíos y sanitizar texto
    for (const key in form.value) {
      let value = form.value[key]
      if (typeof value === 'string') {
        value = sanitizeInput(value)
        form.value[key] = value
      }
      if (value === null || value === '') {
        error.value = 'Por favor, completa todos los campos.'
        return false
      }
    }
    error.value = null
    return true
  }

  /**
   * Restaura el formulario a su estado inicial y limpia mensajes de feedback.
   */
  const resetForm = () => {
    for (const key in initialState) {
      let value = initialState[key];
      if (typeof value === 'string') {
        value = sanitizeInput(value);
      }
      form.value[key] = value;
    }
    error.value = null
    success.value = null
  }

  return {
    form,
    isLoading,
    error,
    success,
    validate,
    resetForm,
    setError,
    setSuccess,
    clearFeedback
  }
}
