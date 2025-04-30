<template>
  <div>
    <header>
      <nav class="navbar">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
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
        <div>
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
  router.push('/login')
}
</script>

<style scoped>
/* Puedes incluir estilos personalizados aquí */
</style>
