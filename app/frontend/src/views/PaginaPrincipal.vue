<template>
  <div>
    <header>
      <nav class="navbar">
        <div class="container-sm">
          <a class="navbar-brand">
            <img src="@/components/icons/logo.jpg" alt="Logo empresa" width="50" height="50" />
          </a>
          <div>
            <button @click="logout" class="btn btn-primary btn-block salir-sesion">
              Salir
            </button>
          </div>
        </div>
      </nav>
    </header>

    <main class="contenedor-inicio">
      <section class="container text-center">
       <!-- <div>
          <h2>Siniestros</h2>
        </div>
        <div class="row justify-content-md-center">
          <div class="boton-inicio">
            <RouterLink to="/crear_usuario" class="btn btn-primary btn-block crear-usuario">Crear usuario</RouterLink>
            <RouterLink to="/listar_usuarios" class="btn btn-primary btn-block listar_usuarios">Consultar usuarios</RouterLink>
            <RouterLink to="/ingresar_siniestro" class="btn btn-primary btn-block ingresar-siniestro">
              Ingresar siniestro
            </RouterLink>
            <RouterLink to="/consultar_siniestro" class="btn btn-primary btn-block consultar-siniestro">
              Consultar siniestro
            </RouterLink>
          </div>
        </div>-->
          <!-- Menú desplegable -->
            <div class="dropdown">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="menuDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Eliga una opción
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="menuDropdown">
                <li><RouterLink to="/crear_usuario" class="dropdown-item">Crear usuario</RouterLink></li>
                <li><RouterLink to="/listar_usuarios" class="dropdown-item">Consultar usuarios</RouterLink></li>
                <li><RouterLink to="/ingresar_siniestro" class="dropdown-item">Ingresar siniestro</RouterLink></li>
                <li><RouterLink to="/consultar_siniestro" class="dropdown-item">Consultar siniestro</RouterLink></li>
              </ul>
            </div>
      </section>
    </main>

    <footer>
      <p class="container text-center">&copy; 2024 - Gestión de Siniestros</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('authToken')
  router.push('/')
}
</script>

<style scoped>
/* Puedes incluir estilos personalizados aquí */
</style>
