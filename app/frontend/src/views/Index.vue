<template>
  <div class="contenedor-inicio bg-light d-flex align-items-center justify-content-center min-vh-100">
    <section class="welcome-card card text-center p-4">
      <img src="/src/components/icons/logo.jpg" alt="Logo" class="mb-3 welcome-logo" height="80" />
      <div class="mb-4">
        <h1 class="fw-bold text-primary mb-2">Claims Service Integrate</h1>
        <p class="lead text-secondary">Gestione los siniestros de forma fácil y rápida.</p>
      </div>
      <router-link to="/login" class="btn btn-primary btn-lg rounded-pill shadow-sm mt-2 px-5">
        Iniciar Sesión
      </router-link>
    </section>
  </div>
</template>

<style scoped>
.welcome-card {
  max-width: 420px;
  margin: 0 auto;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  background: #fff;
}
.welcome-logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(13,110,253,0.12);
  background: #fff;
  object-fit: cover;
  height: 90px;
  width: 90px;
  margin-bottom: 1.2rem;
  border: 3px solid #0d6efd;
  transition: transform 0.2s;
}
.welcome-logo:hover {
  transform: scale(1.07) rotate(-2deg);
  box-shadow: 0 8px 32px rgba(13,110,253,0.18);
}
</style>
