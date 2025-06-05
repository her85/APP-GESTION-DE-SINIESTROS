// src/composables/useFeedback.js
import { ref } from 'vue'

/**
 * Composable para centralizar feedback visual (errores y mensajes de éxito)
 * Uso: const { error, success, setError, setSuccess, clearFeedback } = useFeedback()
 */
export function useFeedback() {
  const error = ref(null)
  const success = ref(null)

  function setError(msg, timeout = 3500) {
    error.value = msg
    setTimeout(() => (error.value = null), timeout)
  }

  function setSuccess(msg, timeout = 3500) {
    success.value = msg
    setTimeout(() => (success.value = null), timeout)
  }

  function clearFeedback() {
    error.value = null
    success.value = null
  }

  return { error, success, setError, setSuccess, clearFeedback }
}
