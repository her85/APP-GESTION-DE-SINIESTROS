<template>
  <header v-if="showNavbar">
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
  <Footer v-if="shouldShowFooter"/>
</template>


<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
/**
 * Componente raíz de la aplicación.
 * Muestra el Navbar y Footer según la ruta actual.
 * @component
 */
const route = useRoute();

// Navbar solo se muestra si la ruta no es '/'
const showNavbar = computed(() => { return route.path !== '/' && route.path !== '/login';});

// Footer solo en '/' o '/login'
const shouldShowFooter = computed(() => {
  return route.path === '/' || route.path === '/login';
});
</script>