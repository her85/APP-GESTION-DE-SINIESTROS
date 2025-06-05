// src/composables/useForm.js
import { ref } from 'vue'
import { useFeedback } from '@/composables/useFeedback'

/**
 * Composable para lógica de formularios: validación, reset y feedback visual.
 * @param {Object} initialState Estado inicial del formulario
 * @param {Function} validateFn Función de validación personalizada (opcional)
 */
export function useForm(initialState, validateFn) {
  const form = ref({ ...initialState })
  const isLoading = ref(false)
  const { error, success, setError, setSuccess, clearFeedback } = useFeedback()

  /**
   * Sanitiza un string para evitar XSS y eliminar espacios innecesarios.
   * Elimina etiquetas HTML y recorta espacios.
   */
  function sanitizeInput(str) {
    if (typeof str !== 'string') return str
    return str.replace(/<[^>]*>?/gm, '').trim()
  }

  // Validación simple o personalizada
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

  // Resetear el formulario
  const resetForm = () => {
    for (const key in initialState) {
      form.value[key] = initialState[key]
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
