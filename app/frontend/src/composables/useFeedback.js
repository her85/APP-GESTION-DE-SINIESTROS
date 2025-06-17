// src/composables/useFeedback.js
import { ref } from 'vue'

/**
 * Composable para centralizar feedback visual (errores y mensajes de éxito)
 * @returns {{ error: import('vue').Ref<string|null>, success: import('vue').Ref<string|null>, setError: function, setSuccess: function, clearFeedback: function }} API del composable
 */
export function useFeedback() {
  const error = ref(null)
  const success = ref(null)

  /**
   * Establece un mensaje de error y lo limpia automáticamente tras un tiempo.
   * @param {string} msg - Mensaje de error
   * @param {number} [timeout=3500] - Tiempo en ms antes de limpiar el error
   */
  function setError(msg, timeout = 3500) {
    error.value = msg
    setTimeout(() => (error.value = null), timeout)
  }

  /**
   * Establece un mensaje de éxito y lo limpia automáticamente tras un tiempo.
   * @param {string} msg - Mensaje de éxito
   * @param {number} [timeout=3500] - Tiempo en ms antes de limpiar el mensaje
   */
  function setSuccess(msg, timeout = 3500) {
    success.value = msg
    setTimeout(() => (success.value = null), timeout)
  }

  /**
   * Limpia los mensajes de error y éxito.
   */
  function clearFeedback() {
    error.value = null
    success.value = null
  }

  return { error, success, setError, setSuccess, clearFeedback }
}
