<template>
  <div class="contenedor-inicio">
    <section class="container text-center">
      <!-- Menú desplegable -->
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" id="menuDropdown" data-bs-toggle="dropdown"
          aria-expanded="false">
          Eliga una opción
        </button>
       <!-- Solo visible para Administrador -->
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li v-if="rolUsuario === 'Administrador'"><RouterLink class="dropdown-item" to="/crear_usuario">Crear usuario</RouterLink></li>
            <li v-if="rolUsuario === 'Administrador'"><RouterLink class="dropdown-item" to="/listar_usuarios">Consultar usuarios</RouterLink></li>
           <!-- Visible para Admininistrador, Tramitador-->
            <li v-if="rolUsuario !== 'Consulta'"><RouterLink class="dropdown-item" to="/ingresar_siniestro">Ingresar siniestro</RouterLink></li>
            <!-- Visible para Admininistrador, Tramitador y Consulta -->
            <li><RouterLink class="dropdown-item" to="/consultar_siniestro">Consultar siniestro</RouterLink></li>
          </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const rolUsuario = computed(() => auth.getRol())

console.log('Rol de usuario:', rolUsuario.value)

</script>
