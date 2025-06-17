<template>
  <nav class="d-flex justify-content-center align-items-center">
    <ul class="pagination mb-0">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link" @click="$emit('go-to-page', currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
      </li>
      <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
        <button class="page-link" @click="$emit('go-to-page', page)">{{ page }}</button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button class="page-link" @click="$emit('go-to-page', currentPage + 1)" :disabled="currentPage === totalPages">Siguiente</button>
      </li>
    </ul>
  </nav>
</template>


<script setup>
/**
 * Componente de paginación reutilizable.
 * @component
 * @prop {number} currentPage - Página actual
 * @prop {number} totalPages - Total de páginas
 * @emits go-to-page - Evento emitido al cambiar de página
 */
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
})
</script>

<style scoped>
.pagination .page-item.active .page-link {
  background: #0d6efd;
  border-color: #0d6efd;
  color: #fff;
  font-weight: bold;
}
</style>
