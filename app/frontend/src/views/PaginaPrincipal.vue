<!--src/views/PaginaPrincipal.vue-->
<template>
  <div class="contenedor-inicio bg-light d-flex align-items-center justify-content-center min-vh-100">
    <section class="main-menu-card card text-center p-4">
      <div class="mb-4">
        <h2 class="fw-bold text-primary mb-3">Bienvenido</h2>
        <p class="lead text-secondary">Seleccione una opción para continuar</p>
      </div>
      <div class="dropdown d-grid gap-2">
        <button
          class="btn btn-primary btn-lg dropdown-toggle"
          type="button"
          id="menuDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Elija una opción
        </button>
        <ul class="dropdown-menu shadow rounded-3 w-100 mt-2" aria-labelledby="dropdownMenuButton">
          <template v-if="isAdmin">
            <li><RouterLink class="dropdown-item" to="/crear_usuario">Crear usuario</RouterLink></li>
            <li><RouterLink class="dropdown-item" to="/listar_usuarios">Consultar usuarios</RouterLink></li>
          </template>

          <template v-if="isAdmin || isTramitador">
            <li><RouterLink class="dropdown-item" to="/ingresar_siniestro">Ingresar siniestro</RouterLink></li>
          </template>

          <li><RouterLink class="dropdown-item" to="/consultar_siniestro">Consultar siniestro</RouterLink></li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
//import api from '@/services/api';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
//const router = useRouter();
const userRole = computed(() => authStore.rol);
const isAdmin = computed(() => userRole.value === 'Administrador');
const isTramitador = computed(() => userRole.value === 'Tramitador');

//console.log('Rol en PaginaPrincipal:', userRole.value);

</script>

<style scoped>
.contenedor-inicio {
  margin-top: 10px; /* Ejemplo de estilo, ajusta según necesidad */
}

.main-menu-card {
  max-width: 420px;
  margin: 0 auto;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.08);
  background: #fff;
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
</style>