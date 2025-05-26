<template>
  <footer class="footer-custom container-fluid text-white text-center py-3">
    <div class="footer-content d-flex flex-column flex-md-row justify-content-between align-items-center">
      <div class="footer-logo d-flex align-items-center mb-2 mb-md-0">
        <img src="/src/components/icons/logo.jpg" alt="Logo" class="footer-logo-img me-2" height="32" />
        <span class="fw-bold">Gestión de Siniestros</span>
      </div>
      <div class="footer-copy small">
        &copy; 2024 - Todos los derechos reservados
      </div>
      <div class="footer-links mt-2 mt-md-0">
        <a href="#" class="text-white text-decoration-none mx-2 footer-link">Política de Privacidad</a>
        <a href="#" class="text-white text-decoration-none mx-2 footer-link">Contacto</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-custom {
  background: linear-gradient(90deg, #0d6efd 0%, #0a4275 100%);
  box-shadow: 0 -2px 16px 0 rgba(0, 0, 0, 0.08);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1030;
}

.footer-logo-img {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.footer-link {
  transition: color 0.2s;
}

.footer-link:hover {
  color: #ffc107;
  text-decoration: underline;
}

.footer-content {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 767px) {
  .footer-content {
    flex-direction: column !important;
    text-align: center;
  }

  .footer-links {
    margin-top: 8px;
  }
}
</style>