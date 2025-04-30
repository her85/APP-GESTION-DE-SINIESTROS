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
            <RouterLink to="/ingresar_siniestro" class="btn btn-primary btn-block">Ingresar siniestro</RouterLink>
            <RouterLink to="/consultar_siniestro" class="btn btn-primary btn-block">Consultar siniestro</RouterLink>
            <RouterLink to="/" class="btn btn-primary btn-block">Salir</RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <div class="container-sm">
        <div class="card col-3 container text-center">
          <section class="container mt-5">
            <div v-if="isAdmin" class="col-12">
              <h3 class="mb-3">Crear nuevo usuario</h3>
              <div>
                <form id="crear-usuario-form" @submit.prevent="crearNuevoUsuario">
                  <div class="mb-3">
                    <input type="text" class="form-control" id="username" v-model="nuevoUsuario.username"
                      placeholder="Nombre de usuario" required />
                  </div>
                  <div class="mb-3">
                    <input type="password" class="form-control" id="password" v-model="nuevoUsuario.password"
                      placeholder="Contraseña" required />
                  </div>
                  <div class="mb-3">
                    <label for="role" class="form-label">Rol</label>
                    <select class="form-select" id="role" v-model="nuevoUsuario.role" required>
                      <option value="Administrador">Administrador</option>
                      <option value="Tramitador">Tramitador</option>
                      <option value="Consulta">Consulta</option>
                    </select>
                  </div>
                  <div class="boton"><button type="submit" class="btn btn-primary mt-2">Crear usuario</button></div>
                  <div v-if="mensaje" :class="{ 'alert': true, 'alert-success': esExito, 'alert-danger': !esExito }"
                    class="mt-3">
                    {{ mensaje }}
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
    </main>

    <footer>
      <p class="container text-center">&copy; {{ new Date().getFullYear() }} - Gestión de Siniestros</p>
    </footer>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Asumiendo que tienes un mecanismo para obtener la información del usuario logueado
// y su rol. Esto podría ser desde un store (como Pinia o Vuex) o desde localStorage
// después del inicio de sesión.
const loggedInUserRole = localStorage.getItem('userRole'); // Ejemplo: obtener el rol desde localStorage
const isAdmin = computed(() => loggedInUserRole === 'Administrador');

const nuevoUsuario = reactive({
  username: '',
  password: '',
  role: 'Consulta', // Rol por defecto
});

const mensaje = ref('');
const esExito = ref(false);
const router = useRouter();
//const route = useRoute();

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    // Redirigir al login si no hay token
    router.push('/');
    throw new Error('Token no encontrado. Debes iniciar sesión.');
  }
  return { Authorization: `Bearer ${token}` };
};

const crearNuevoUsuario = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post('http://localhost:3000/crear_usuario', nuevoUsuario, { headers });

    mensaje.value = response.data.message || 'Usuario creado con éxito.';
    esExito.value = true;
    // Limpiar el formulario después de la creación exitosa
    Object.keys(nuevoUsuario).forEach((key) => (nuevoUsuario[key] = ''));
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    mensaje.value = error.response?.data?.error || 'Error al crear el usuario.';
    esExito.value = false;
  }
};
</script>

<style scoped>
/* Aquí puedes poner estilos personalizados si lo deseas */
</style>