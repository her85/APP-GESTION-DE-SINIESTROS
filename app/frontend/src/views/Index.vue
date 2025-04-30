<template>
  <div>
    <header>
      <nav class="navbar">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="@/components/icons/logo.jpg" alt="Logo empresa" width="50" height="50" />
          </a>
          <div>
            <RouterLink to="/login" class="btn btn-primary btn-block ingresar-sesion">
              Ingresar
            </RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <main class="contenedor-inicio">
      <section class="container text-center">
        <div>
          <h1>Claims Service Integrate</h1>
          <p class="lead">Gestione los siniestros de forma fácil y rápida.</p>
        </div>
      </section>
    </main>

    <footer>
      <p class="container text-center">&copy; 2024 - Gestión de Siniestros</p>
    </footer>
  </div>
</template>

<script setup>
// No se necesita lógica por ahora
</script>

<style scoped>
/* Puedes importar tus estilos o agregar personalizados aquí */
</style>
