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

const route = useRoute();

// Navbar solo se muestra si la ruta no es '/'
const showNavbar = computed(() => route.path !== '/');

// Footer solo en '/' o '/login'
const shouldShowFooter = computed(() => {
  return route.path === '/' || route.path === '/login';
});
</script>