<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
    <div class="container-sm">
      <RouterLink class="navbar-brand d-flex align-items-center gap-2" to="/">
        <img src="@/components/icons/logo.jpg" alt="Logo empresa" width="48" height="48" class="rounded-circle border border-2 border-primary" />
        <span class="fw-bold text-primary fs-4">Siniestros</span>
      </RouterLink>

      <div class="ms-auto d-flex align-items-center gap-3">
        <!-- Botón Ingresar (solo en /) -->
        <div v-if="$route.path === '/'">
          <RouterLink to="/login" class="btn btn-primary px-4">Ingresar</RouterLink>
        </div>

        <!-- Menú desplegable (excepto en /, /login y /pagina_principal) -->
        <div class="dropdown" v-if="showDropdown">
          <button class="btn btn-outline-primary dropdown-toggle px-4" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" v-if="rolUsuario !== 'Consulta'">
            Menú
          </button>
          <ul class="dropdown-menu shadow rounded-3" aria-labelledby="dropdownMenuButton">
            <li v-if="rolUsuario === 'Administrador' && $route.path !== '/crear_usuario'"><RouterLink class="dropdown-item" to="/crear_usuario">Crear usuario</RouterLink></li>
            <li v-if="rolUsuario === 'Administrador' && $route.path !== '/listar_usuarios'"><RouterLink class="dropdown-item" to="/listar_usuarios">Consultar usuarios</RouterLink></li>
            <li v-if="route.path !== '/ingresar_siniestro'"><RouterLink class="dropdown-item" to="/ingresar_siniestro">Ingresar siniestro</RouterLink></li>
            <li v-if="$route.path !== '/consultar_siniestro'"><RouterLink class="dropdown-item" to="/consultar_siniestro">Consultar siniestro</RouterLink></li>
          </ul>
        </div>

        <!-- Botón salir (excepto en / y /login) -->
        <div v-if="$route.path !== '/' && $route.path !== '/login'">
          <button @click="logout" class="btn btn-outline-danger px-4">Salir</button>
        </div>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
/**
 * Barra de navegación principal de la aplicación.
 * Muestra enlaces y menú según el rol y la ruta actual.
 * @component
 */
const router = useRouter()
const route = useRoute()

const showDropdown = computed(() => {
  return !['/', '/login', '/pagina_principal'].includes(route.path)
})

const auth = useAuthStore()
const rolUsuario = computed(() => auth.getRol())

const logout = () => {
  auth.clearAuth()
  router.push('/')
}
</script>

<style scoped>
.navbar {
  border-bottom: 2px solid #e3f0ff;
  min-height: 64px;
}
.navbar-brand span {
  letter-spacing: 1px;
}
.dropdown-menu {
  min-width: 220px;
  font-size: 1rem;
}
.dropdown-item {
  border-radius: 6px;
  transition: background 0.2s;
}
.dropdown-item:hover {
  background: #e3f0ff;
}
.btn-outline-primary {
  border-width: 2px;
}
.btn-outline-danger {
  border-width: 2px;
}
</style>