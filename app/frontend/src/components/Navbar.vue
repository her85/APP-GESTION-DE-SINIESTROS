<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-sm">
      <RouterLink class="navbar-brand" to="/">
        <img src="@/components/icons/logo.jpg" alt="Logo empresa" width="50" height="50" />
      </RouterLink>

      <div class="ms-auto d-flex align-items-center gap-3">
        <!-- Botón Ingresar (solo en /) -->
        <div v-if="$route.path === '/'">
          <RouterLink to="/login" class="btn btn-primary">Ingresar</RouterLink>
        </div>

        <!-- Menú desplegable (excepto en /, /login y /pagina_principal) -->
        <div class="dropdown" v-if="showDropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" v-if="rolUsuario !== 'Consulta'">
            Menú
          </button>
          
          <!-- Solo visible para Administrador -->
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li v-if="rolUsuario === 'Administrador' && $route.path !== '/crear_usuario'"><RouterLink class="dropdown-item" to="/crear_usuario">Crear usuario</RouterLink></li>
            <li v-if="rolUsuario === 'Administrador' && $route.path !== '/listar_usuarios'"><RouterLink class="dropdown-item" to="/listar_usuarios">Consultar usuarios</RouterLink></li>
           <!-- Visible para Admininistrador, Tramitador-->
            <li v-if="route.path !== '/ingresar_siniestro'"><RouterLink class="dropdown-item" to="/ingresar_siniestro">Ingresar siniestro</RouterLink></li>
            <!-- Visible para Admininistrador, Tramitador y Consulta -->
            <li v-if="$route.path !== '/consultar_siniestro'"><RouterLink class="dropdown-item" to="/consultar_siniestro">Consultar siniestro</RouterLink></li>
          </ul>
        </div>

        <!-- Botón salir (excepto en / y /login) -->
        <div v-if="$route.path !== '/' && $route.path !== '/login'">
          <button @click="logout" class="btn btn-primary">Salir</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()

const showDropdown = computed(() => {
  return !['/', '/login', '/pagina_principal'].includes(route.path)
})

const auth = useAuthStore()

const rolUsuario = computed(() => auth.getRol())

console.log('Rol de usuario:', rolUsuario.value)
const logout = () => {
  auth.clearAuth()
  router.push('/')
}
</script>