<template>
  <div class="table-responsive">
    <table class="table table-bordered align-middle mt-4">
      <thead class="table-light">
        <tr>
          <slot name="header" />
        </tr>
      </thead>
      <tbody>
        <slot name="body" :items="paginatedItems" />
      </tbody>
    </table>
    <Pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @go-to-page="goToPage"
      class="mt-3"
    />
  </div>
</template>


<script setup>
import { computed, ref, watch } from 'vue'
import Pagination from './Pagination.vue'
/**
 * Tabla reutilizable con paginación.
 * @component
 * @prop {Array} items - Lista de elementos a mostrar
 * @prop {number} [pageSize=8] - Cantidad de elementos por página
 */
const props = defineProps({
  items: { type: Array, required: true },
  pageSize: { type: Number, default: 8 }
})

const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(props.items.length / props.pageSize))
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return props.items.slice(start, start + props.pageSize)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

watch(() => props.items, () => {
  currentPage.value = 1
})
</script>
