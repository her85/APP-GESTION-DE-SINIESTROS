<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
</script>