<!--src/views/CrearUsuario.vue-->
<template>
  <div class="contenedor-inicio bg-light d-flex align-items-center justify-content-center min-vh-100">
    <div class="crear-usuario-card card col-12 col-md-7 col-lg-5 p-4 text-center">
      <section>
        <div v-if="isAdmin">
          <h3 class="mb-3 fw-bold text-primary">Crear nuevo usuario</h3>
          <form id="crear-usuario-form" @submit.prevent="handleCrearUsuario" class="text-start">
            <div class="mb-3">
              <label for="username" class="form-label">Nombre de usuario</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="nuevoUsuario.username"
                placeholder="Nombre de usuario"
                required
                autocomplete="username"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="nuevoUsuario.password"
                placeholder="Contraseña"
                required
                autocomplete="new-password"
              />
            </div>
            <div class="mb-3">
              <label for="role" class="form-label">Rol</label>
              <select class="form-select" id="role" v-model="nuevoUsuario.role" required>
                <option value="Administrador">Administrador</option>
                <option value="Tramitador">Tramitador</option>
                <option value="Consulta">Consulta</option>
              </select>
            </div>
            <div class="d-grid gap-2 mt-3">
              <button type="submit" class="btn btn-primary btn-lg" :disabled="isCreating">
                <span v-if="isCreating" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ isCreating ? 'Creando...' : 'Crear usuario' }}
              </button>
            </div>
            <transition name="fade">
              <div v-if="createSuccessMessage" class="alert alert-success mt-3 text-center">{{ createSuccessMessage }}</div>
            </transition>
            <transition name="fade">
              <div v-if="createError" class="alert alert-danger mt-3 text-center">{{ createError }}</div>
            </transition>
          </form>
        </div>
        <div v-else>
          <p class="mt-3 alert alert-warning">No tienes permisos para ver esta página.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserActions } from '@/composables/useUserActions'; // Importamos el nuevo composable


const authStore = useAuthStore();
const { createUser, isCreating, createError, createSuccessMessage } = useUserActions(); // Usamos el composable

const isAdmin = computed(() => authStore.getRol() === 'Administrador');

const nuevoUsuario = reactive({
  username: '',
  password: '',
  role: 'Consulta',
});

const handleCrearUsuario = async () => {
  if (!isAdmin.value) {
    // Esto ya lo maneja el template, pero una capa extra de seguridad no está de más
    // Podrías mostrar un mensaje de error o redirigir aquí si lo deseas
    return;
  }

  const creationSuccessful = await createUser(nuevoUsuario);

  if (creationSuccessful) {
    resetForm();
  }
  // Los mensajes de éxito/error y el estado de carga ahora son manejados por el composable
};

const resetForm = () => {
  nuevoUsuario.username = '';
  nuevoUsuario.password = '';
  nuevoUsuario.role = 'Consulta';
};

// Puedes añadir aquí una lógica para redirigir si el usuario no es admin al cargar la página.
// import { onMounted } from 'vue';
// onMounted(() => {
//   if (!isAdmin.value) {
//     router.push('/unauthorized'); // O la ruta que definas para no autorizado
//   }
// });
</script>

<style scoped>
.crear-usuario-card {
  max-width: 420px;
  margin: 0 auto;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  background: #fff;
}
</style>
