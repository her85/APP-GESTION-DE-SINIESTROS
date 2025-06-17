// src/composables/useFilter.js
import { computed, ref, watch } from 'vue'

/**
 * Composable para filtrado genérico de listas.
 * @param {import('vue').Ref<Array>} itemsRef - Ref a la lista de items a filtrar
 * @param {Object} filterConfig - Configuración de filtros: { nombre: '', rol: '' } o similar
 * @param {Function} [filterFn] - Función personalizada de filtrado (opcional)
 * @returns {{ filteredItems: import('vue').ComputedRef<Array>, searchParams: import('vue').Ref<Object> }}
 */
export function useFilter(itemsRef, filterConfig, filterFn) {
  const searchParams = ref({ ...filterConfig })
  const filteredItems = computed(() => {
    if (filterFn) return itemsRef.value.filter(item => filterFn(item, searchParams.value))
    // Filtrado básico: busca coincidencias en todas las claves de searchParams
    return itemsRef.value.filter(item => {
      return Object.keys(searchParams.value).every(key => {
        if (!searchParams.value[key]) return true
        const value = (item[key] || '').toString().toLowerCase()
        return value.includes(searchParams.value[key].toString().toLowerCase())
      })
    })
  })
  return { filteredItems, searchParams }
}
