<template>
  <div>
    <header>
      <nav class="navbar">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="@/components/icons/logo.jpg" alt="Logo empresa" width="50" height="50" />
          </a>
          <div class="boton-inicio">
            <RouterLink to="/pagina_principal" class="btn btn-primary btn-block">Inicio</RouterLink>
            <RouterLink to="/consultar_usuarios" class="btn btn-primary btn-block">Consultar usuarios</RouterLink>
            <RouterLink to="/" class="btn btn-primary btn-block">Salir</RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <main class="container mt-4">
      <h3 class="text-center">Usuarios Registrados</h3>

          <!-- Formulario de búsqueda -->
          <form @submit.prevent="buscarUsuarios" class="mb-4">
        <div class="row">
          <div class="col-md-6">
            <input type="text" class="form-control" v-model="searchParams.nombre" placeholder="Buscar por nombre de usuario" />
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
        <button type="submit" class="btn btn-primary mt-2">Buscar</button>
      </form>

      <div v-if="isAdmin">
        <table class="table table-bordered mt-4">
          <thead class="table-light">
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Acciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuariosFiltrados" :key="usuario._id">
              <td>{{ usuario.username }}</td>
              <td>{{ usuario.role }}</td>
              <td>
                <button @click="editarUsuario(usuario)" class="btn btn-warning btn-sm" data-bs-toggle="modal"
                  :data-bs-target="'#editUsuarioModal-' + usuario._id">
                  Editar
                </button>
              </td>

              <td>
                <button @click="borrarUsuario(usuario._id)" class="btn btn-danger btn-sm">
                  Borrar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="usuariosFiltrados.length === 0" class="alert alert-info">No hay usuarios registrados.</div>
      </div>
      <div v-else class="alert alert-warning text-center mt-4">
        No tienes permisos para ver esta página.
      </div>
    </main>
    <!-- Modal para editar usuario -->
    <div v-for="usuario in usuarios" :key="'modal-' + usuario._id" class="modal fade"
      :id="'editUsuarioModal-' + usuario._id" tabindex="-1" aria-labelledby="editUsuarioModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editUsuarioModalLabel">Editar Usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarUsuarioEditado(usuario._id)">
              <div class="mb-3">
                <label for="username" class="form-label">Nombre de usuario</label>
                <input type="text" class="form-control" id="username" v-model="usuarioEditado.username" required />
              </div>
              <div class="mb-3">
                <label for="role" class="form-label">Rol</label>
                <select class="form-select" id="role" v-model="usuarioEditado.role" required>
                  <option value="Administrador">Administrador</option>
                  <option value="Tramitador">Tramitador</option>
                  <option value="Consulta">Consulta</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Guardar Cambios</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p class="container text-center">&copy; {{ new Date().getFullYear() }} - Gestión de Siniestros</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const usuarios = ref([]);
const usuarioEditado = ref({ username: '', role: '' });
const searchParams = ref({ nombre: '', rol: '' });

const userRole = localStorage.getItem('userRole');
const isAdmin = computed(() => userRole === 'Administrador');

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    router.push('/');
    throw new Error('Token no encontrado. Debes iniciar sesión.');
  }
  return { Authorization: `Bearer ${token}` };
};

const cargarUsuarios = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get('http://localhost:3000/listar_usuarios', { headers });
    usuarios.value = response.data;
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
};

const buscarUsuarios = () => {
  cargarUsuarios(); // Recargamos los usuarios al realizar una búsqueda
};

const editarUsuario = (usuario) => {
  usuarioEditado.value = { ...usuario };
};

const guardarUsuarioEditado = async (id) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(`http://localhost:3000/modificar_usuario/${id}`, usuarioEditado.value, { headers });
    if (response.data.success) {
      alert('Usuario actualizado correctamente.');
      cargarUsuarios(); // Recargar usuarios después de la actualización
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    alert('Hubo un error al actualizar el usuario.');
  }
};

const borrarUsuario = async (id) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(`http://localhost:3000/borrar_usuario/${id}`, { headers });
    if (response.data.success) {
      alert('Usuario borrado correctamente.');
      cargarUsuarios(); // Recargar usuarios después de borrar
    }
  } catch (error) {
    console.error('Error al borrar usuario:', error);
    alert('Hubo un error al borrar el usuario.');
  }
};

const usuariosFiltrados = computed(() => {
  return usuarios.value.filter(usuario => {
    const nombreCoincide = usuario.username.toLowerCase().includes(searchParams.value.nombre.toLowerCase());
    const rolCoincide = searchParams.value.rol ? usuario.role === searchParams.value.rol : true;
    return nombreCoincide && rolCoincide;
  });
});


onMounted(() => {
  if (isAdmin.value) {
    cargarUsuarios();
  }
});
</script>

<style scoped></style>