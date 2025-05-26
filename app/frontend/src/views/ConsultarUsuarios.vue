<!--src/views/ConsultarUsuarios.vue-->
<template>
  <div class="contenedor-inicio bg-light d-flex align-items-center justify-content-center min-vh-100">
    <section class="usuarios-card card col-12 col-lg-10 p-4">
      <h3 class="text-center fw-bold text-primary mb-4">Usuarios Registrados</h3>
      <form @submit.prevent="applyFilters" class="mb-4">
        <div class="row g-3">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              v-model="searchParams.nombre"
              placeholder="Buscar por nombre de usuario"
            />
          </div>
          <div class="col-md-6">
            <select class="form-select" v-model="searchParams.rol" aria-label="Filtrar por rol">
              <option value="">Filtrar por rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Tramitador">Tramitador</option>
              <option value="Consulta">Consulta</option>
            </select>
          </div>
        </div>
      </form>
      <div v-if="isAdmin">
        <div v-if="isLoadingUsers" class="text-center py-4">
          <span class="spinner-border text-primary" role="status"></span>
        </div>
        <div v-else-if="usersError" class="alert alert-danger text-center">{{ usersError }}</div>
        <div v-else-if="users.length === 0" class="alert alert-info text-center">No hay usuarios registrados.</div>
        <div v-else class="table-responsive">
          <table class="table table-bordered align-middle mt-4">
            <thead class="table-light">
              <tr>
                <th>Id</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Editar</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in paginatedUsers" :key="usuario._id">
                <td>{{ usuario._id }}</td>
                <td>{{ usuario.username }}</td>
                <td>{{ usuario.role }}</td>
                <td>
                  <button
                    @click="openEditModal(usuario)"
                    class="btn btn-outline-secondary btn-sm px-3"
                    data-bs-toggle="modal"
                    data-bs-target="#editUsuarioModal"
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    @click="confirmDeleteUser(usuario._id, usuario.username)"
                    class="btn btn-outline-danger btn-sm px-3"
                    :disabled="isDeleting"
                  >
                    <span v-if="isDeleting">Borrando...</span>
                    <span v-else>Borrar</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Controles de paginación -->
        <div v-if="totalPages > 1" class="d-flex justify-content-center align-items-center mt-3">
          <nav>
            <ul class="pagination mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
              </li>
              <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                <button class="page-link" @click="goToPage(page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Siguiente</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div v-else class="alert alert-warning text-center mt-4">
        No tienes permisos para ver esta página.
      </div>
      <transition name="fade">
        <div v-if="updateSuccessMessage" class="alert alert-success mt-3 text-center">{{ updateSuccessMessage }}</div>
      </transition>
      <transition name="fade">
        <div v-if="updateError" class="alert alert-danger mt-3 text-center">{{ updateError }}</div>
      </transition>
      <transition name="fade">
        <div v-if="deleteSuccessMessage" class="alert alert-success mt-3 text-center">{{ deleteSuccessMessage }}</div>
      </transition>
      <transition name="fade">
        <div v-if="deleteError" class="alert alert-danger mt-3 text-center">{{ deleteError }}</div>
      </transition>
      <!-- Modal de edición -->
      <div class="modal fade" id="editUsuarioModal" tabindex="-1" aria-labelledby="editUsuarioModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow-lg rounded-4 animate__animated animate__fadeInDown">
            <div class="modal-header bg-primary text-white rounded-top-4 border-0">
              <h5 class="modal-title fw-bold" id="editUsuarioModalLabel">Editar Usuario</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body bg-light">
              <form @submit.prevent="handleUpdateUser">
                <div class="mb-3">
                  <label for="editUsername" class="form-label">Nombre de usuario</label>
                  <input type="text" class="form-control rounded-pill" id="editUsername" v-model="selectedUser.username" required />
                </div>
                <div class="mb-3">
                  <label for="editRole" class="form-label">Rol</label>
                  <select class="form-select rounded-pill" id="editRole" v-model="selectedUser.role" required>
                    <option value="Administrador">Administrador</option>
                    <option value="Tramitador">Tramitador</option>
                    <option value="Consulta">Consulta</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary w-100 rounded-pill shadow-sm" :disabled="isUpdating">
                  <span v-if="isUpdating" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ isUpdating ? 'Guardando...' : 'Guardar Cambios' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserActions } from '@/composables/useUserActions'; // Importamos el composable

const authStore = useAuthStore();
const {
  users, fetchUsers, isLoadingUsers, usersError, // Para listar
  updateUser, isUpdating, updateError, updateSuccessMessage, // Para actualizar
  deleteUser, isDeleting, deleteError, deleteSuccessMessage, // Para eliminar
} = useUserActions(); // Usamos el composable

// Estado local para el formulario de búsqueda
const searchParams = ref({ nombre: '', rol: '' });
// Estado local para el usuario seleccionado para edición
const selectedUser = ref({ _id: null, username: '', role: '' });

// Obtener el rol del usuario de forma reactiva desde el store
const isAdmin = computed(() => authStore.getRol() === 'Administrador');

// Filtrado de usuarios en el frontend (reactivo a searchParams)
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesName = user.username.toLowerCase().includes(searchParams.value.nombre.toLowerCase());
    const matchesRole = searchParams.value.rol ? user.role === searchParams.value.rol : true;
    return matchesName && matchesRole;
  });
});

// Estado de paginación
const currentPage = ref(1);
const pageSize = ref(8); // Cantidad de usuarios por página
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / pageSize.value));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredUsers.value.slice(start, start + pageSize.value);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

watch(filteredUsers, () => {
  currentPage.value = 1; // Reiniciar a la primera página al filtrar
});

// Watchers para limpiar mensajes de éxito/error después de un tiempo
watch(updateSuccessMessage, (newValue) => {
  if (newValue) {
    setTimeout(() => updateSuccessMessage.value = null, 3000);
  }
});
watch(updateError, (newValue) => {
  if (newValue) {
    setTimeout(() => updateError.value = null, 3000);
  }
});
watch(deleteSuccessMessage, (newValue) => {
  if (newValue) {
    setTimeout(() => deleteSuccessMessage.value = null, 3000);
  }
});
watch(deleteError, (newValue) => {
  if (newValue) {
    setTimeout(() => deleteError.value = null, 3000);
  }
});


// Función para abrir el modal de edición y copiar los datos del usuario
const openEditModal = (user) => {
  selectedUser.value = { ...user }; // Copia profunda para evitar mutar directamente el original
};

// Función para manejar la actualización de usuario
const handleUpdateUser = async () => {
  const success = await updateUser(selectedUser.value._id, {
    username: selectedUser.value.username,
    role: selectedUser.value.role,
  });

  if (success) {
    // Si la actualización fue exitosa, recargar la lista de usuarios
    // Y cerrar el modal
    await fetchUsers(); // Recargar los usuarios para reflejar el cambio
    const modalElement = document.getElementById('editUsuarioModal');
    if (modalElement) {
      // Usa el objeto Modal de Bootstrap directamente si está disponible globalmente
      // Asegúrate de que Bootstrap JS esté cargado antes de que se monte este componente
      const bootstrapModal = window.bootstrap?.Modal.getInstance(modalElement) || new window.bootstrap.Modal(modalElement);
      bootstrapModal.hide();
    }
  }
};

// Función para confirmar y borrar usuario
const confirmDeleteUser = async (userId, username) => {
  if (confirm(`¿Estás seguro de que quieres borrar al usuario ${username}?`)) {
    const success = await deleteUser(userId);
    if (success) {
      await fetchUsers(); // Recargar la lista de usuarios para reflejar la eliminación
    }
  }
};

// Se ejecuta al montar el componente
onMounted(async () => {
  if (isAdmin.value) {
    await fetchUsers(); // Cargar usuarios solo si es administrador
  } else {
    // Opcional: Redirigir si no tiene permisos al cargar la página
    // router.push('/unauthorized');
  }
});
</script>

<style scoped>
.usuarios-card {
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  background: #fff;
}
.modal-content {
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(13,110,253,0.10);
  animation-duration: 0.4s;
}
.modal-header {
  border-bottom: none;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}
.modal-body {
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}
</style>