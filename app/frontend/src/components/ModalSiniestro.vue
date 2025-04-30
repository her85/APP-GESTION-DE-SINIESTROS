<!-- src/components/ModalSiniestro.vue -->
<template>
    <div class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="guardar">
            <div class="modal-header">
              <h5 class="modal-title">Editar Siniestro</h5>
              <button type="button" class="btn-close" @click="$emit('cerrar')"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Fecha</label>
                <input v-model="form.fecha" type="date" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Estado</label>
                <select v-model="form.estado" class="form-select">
                  <option>Pendiente</option>
                  <option>En Proceso</option>
                  <option>Finalizado</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">Guardar</button>
              <button type="button" class="btn btn-secondary" @click="$emit('cerrar')">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, watch, toRefs } from 'vue';
  import api from '@/services/api';
  
  const props = defineProps({
    siniestro: Object
  });
  const emit = defineEmits(['cerrar', 'guardado']);
  
  const form = reactive({
    fecha: '',
    estado: ''
  });
  
  watch(() => props.siniestro, (nuevo) => {
    if (nuevo) {
      form.fecha = nuevo.fecha;
      form.estado = nuevo.estado;
    }
  }, { immediate: true });
  
  async function guardar() {
    try {
      await api.put(`/siniestros/${props.siniestro._id}`, form);
      emit('guardado');
      emit('cerrar');
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }
  </script>
  