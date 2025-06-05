<template>
  <div class="contenedor-inicio min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <section class="login-card shadow p-4 rounded bg-white">
      <div class="mb-4">
        <h1 class="fw-bold text-primary">Iniciar sesión</h1>
      </div>
      <div class="row justify-content-md-center">
        <transition name="fade">
          <div v-if="success" class="alert alert-success mt-3 text-center">{{ success }}</div>
        </transition>
        <transition name="fade">
          <div v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</div>
        </transition>
        <form @submit.prevent="login" class="needs-validation" novalidate>
          <div class="mb-3 text-start">
            <label for="username" class="form-label">Usuario</label>
            <input type="text" id="username" v-model="form.username" class="form-control" :disabled="isLoading" required autocomplete="username" />
          </div>
          <div class="mb-3 text-start">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" id="password" v-model="form.password" class="form-control" :disabled="isLoading" required autocomplete="current-password" />
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary btn-lg" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ isLoading ? 'Ingresando...' : 'Aceptar' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useForm } from '@/composables/useForm'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { useFeedback } from '@/composables/useFeedback'

const router = useRouter()
const auth = useAuthStore()

const {
  form,
  isLoading,
  validate,
  resetForm
} = useForm({ username: '', password: '' })

const { error, success, setError, setSuccess, clearFeedback } = useFeedback()

const login = async () => {
  error.value = null
  isLoading.value = true
  try {
    if (!validate()) return
    const response = await api.post('/login', {
      username: form.value.username.trim(),
      password: form.value.password
    })
    if (response.status === 200 && response.data.token && response.data.role) {
      auth.setAuth(response.data.token, response.data.role)
      resetForm()
      router.push('/pagina_principal')
    } else {
      setError(response.data?.error || 'No se recibió el token o el rol del servidor.')
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      setError('Credenciales incorrectas.')
    } else if (err.response && err.response.data?.error) {
      setError(err.response.data.error)
    } else {
      setError('Error de conexión con el servidor.')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.contenedor-inicio {
  background: linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%);
}
.login-card {
  max-width: 400px;
  width: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
