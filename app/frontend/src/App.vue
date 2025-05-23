<template>
    <header>
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

// Una propiedad computada que devuelve true si la ruta actual es '/' o '/login'
const shouldShowFooter = computed(() => {
  return route.path === '/' || route.path === '/login';
});
</script>