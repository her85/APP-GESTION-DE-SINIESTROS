<template>
  <div class="container-sm">
    <div class="card col-6 container text-center">
      <section class="container mt-5">
        <div v-if="isAdmin" class="col-12">
          <h3 class="mb-3">Crear nuevo usuario</h3>
          <div>
            <form id="crear-usuario-form" @submit.prevent="handleCrearUsuario">
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="nuevoUsuario.username"
                  placeholder="Nombre de usuario"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="nuevoUsuario.password"
                  placeholder="Contraseña"
                  required
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
              <div class="boton">
                <button type="submit" class="btn btn-primary mt-2" :disabled="isLoading">
                  {{ isLoading ? 'Creando...' : 'Crear usuario' }}
                </button>
              </div>
              <div
                v-if="successMessage"
                class="alert alert-success mt-3"
              >
                {{ successMessage }}
              </div>
              <div
                v-if="error"
                class="alert alert-danger mt-3"
              >
                {{ error }}
              </div>
            </form>
          </div>
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
const { createUser, isLoading, error, successMessage } = useUserActions(); // Usamos el composable

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
/* Aquí puedes poner estilos personalizados si lo deseas */
</style>
