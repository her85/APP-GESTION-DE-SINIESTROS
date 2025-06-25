<template>
  <div class="contenedor-inicio bg-light d-flex align-items-center justify-content-center min-vh-100">
    <section class="consultar-siniestro-card card col-12 col-lg-10 p-4">
      <h2 class="fw-bold text-primary mb-4 text-center">Consultar siniestros</h2>
      <form id="siniestro-search-form" @submit.prevent="searchClaims" class="mb-4">
        <div class="row g-3">
          <div class="col-md-4">
            <input type="number" class="form-control" id="numeroSiniestro" v-model="searchParams.numeroSiniestro" placeholder="N° de siniestro" @input="removeSpecialChars" />
          </div>
          <div class="col-md-4">
            <input type="number" class="form-control" id="documentoCliente" v-model="searchParams.documentoCliente" placeholder="Documento del cliente" @input="removeSpecialChars" />
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" id="patente" v-model="searchParams.patente" placeholder="Patente del vehículo" @input="removeSpecialChars" />
          </div>
        </div>
        <div class="row g-3 mt-2">
          <div class="col-md-6">
            <label for="desdeFechaSiniestro" class="form-label">Fecha desde</label>
            <input type="date" class="form-control" id="desdeFechaSiniestro" v-model="searchParams.desdeFechaSiniestro" />
          </div>
          <div class="col-md-6">
            <label for="hastaFechaSiniestro" class="form-label">Fecha hasta</label>
            <input type="date" class="form-control" id="hastaFechaSiniestro" v-model="searchParams.hastaFechaSiniestro" />
          </div>
        </div>
        <div class="d-grid gap-2 mt-3 d-md-flex justify-content-md-end">
          <button type="button" class="btn btn-outline-secondary btn-md" @click="clearFilters">Limpiar filtros</button>
          <button type="submit" class="btn btn-primary btn-md me-2">Buscar</button>
        </div>
      </form>
      <section class="mt-5">
        <h2 class="text-center text-secondary mb-3">Lista de siniestros</h2>
        <div v-if="isLoadingSiniestros" class="text-center py-5">
          <span class="spinner-border text-primary" role="status"></span>
          <span class="ms-2">Cargando siniestros...</span>
        </div>
        <div v-else-if="siniestros.length === 0" class="alert alert-info text-center">No hay siniestros para mostrar.</div>
        <div v-else class="table-responsive">
          <ReusableTable :items="siniestros" :pageSize="8">
            <template #header>
              <th scope="col">N° Siniestro</th>
              <th scope="col" class="ocultar-en-movil">Cliente</th>
              <th scope="col" class="ocultar-en-movil">Documento</th>
              <th scope="col">Patente</th>
              <th scope="col" class="ocultar-en-movil">Tipo de siniestro</th>
              <th scope="col" class="ocultar-en-movil">Fecha del siniestro</th>
              <th scope="col">Editar</th>
              <th scope="col" v-if="rolUsuario !== 'Consulta'">Borrar</th>
            </template>
            <template #body="{ items }">
              <tr v-for="siniestro in items" :key="siniestro.numeroSiniestro">
                <th scope="row">{{ siniestro.numeroSiniestro }}</th>
                <td class="ocultar-en-movil">{{ siniestro.cliente }}</td>
                <td class="ocultar-en-movil">{{ siniestro.documento }}</td>
                <td>{{ siniestro.patente }}</td>
                <td class="ocultar-en-movil">{{ siniestro.tipoSiniestro }}</td>
                <td class="ocultar-en-movil">{{ formatDate(siniestro.fechaSiniestro) }}</td>
                <td>
                  <button type="button" class="btn btn-outline-secondary btn-sm px-3" data-bs-toggle="modal" :data-bs-target="'#editSiniestroModal-' + siniestro.numeroSiniestro">
                    {{ rolUsuario === 'Consulta' ? 'Ver información' : 'Editar' }}
                  </button>
                </td>
                <td v-if="rolUsuario !== 'Consulta'">
                  <button @click="deleteClaim(siniestro.numeroSiniestro)" class="btn btn-outline-danger btn-sm px-3">Borrar</button>
                </td>
              </tr>
            </template>
          </ReusableTable>
        </div>
      </section>
      <!-- Modales de edición -->
      <ModalSiniestro
        v-for="siniestro in siniestros"
        :key="siniestro.numeroSiniestro"
        :modalId="'editSiniestroModal-' + siniestro.numeroSiniestro"
        :siniestro="siniestro"
        :isReadOnly="rolUsuario === 'Consulta'"
        @save="onModalSave"
        @close="onModalClose"
      />
    </section>
    <!-- Mensajes de feedback globales SIEMPRE visibles -->
    <transition name="fade">
      <div v-if="success" class="alert alert-success mt-3 text-center position-fixed top-0 start-50 translate-middle-x" style="z-index: 2000; min-width: 300px; max-width: 90vw;">{{ success }}</div>
    </transition>
    <transition name="fade">
      <div v-if="error" class="alert alert-danger mt-3 text-center position-fixed top-0 start-50 translate-middle-x" style="z-index: 2000; min-width: 300px; max-width: 90vw;">{{ error }}</div>
    </transition>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ReusableTable from '@/components/ReusableTable.vue';
import ModalSiniestro from '@/components/ModalSiniestro.vue';
import { useFeedback } from '@/composables/useFeedback'
import api from '@/services/api';
import { removeSpecialChars } from '@/utils/sanitize.js';
/**
 * Vista para consultar y filtrar siniestros registrados.
 * Permite buscar por número, documento, patente y fechas.
 * @component
 */
const router = useRouter();
const siniestros = ref([]);
const siniestrosOriginales = ref([]);
const searchParams = ref({
  numeroSiniestro: null,
  documentoCliente: null,
  patente: null,
  desdeFechaSiniestro: null,
  hastaFechaSiniestro: null,
});
const rolUsuario = ref('')
const { error, success, setError, setSuccess, clearFeedback } = useFeedback()
const isLoadingSiniestros = ref(true);
const searchFieldErrors = ref({})

const fetchSiniestros = async () => {
  isLoadingSiniestros.value = true;
  try {
    const response = await api.get('/consultar_siniestro');
    siniestros.value = response.data;
    siniestrosOriginales.value = [...response.data];
    setSuccess('Siniestros cargados correctamente.');
    clearFeedback();
  } catch (err) {
    setError('No se pudieron cargar los siniestros. Intenta nuevamente.');
  } finally {
    isLoadingSiniestros.value = false;
  }
};

function validateSearchFields(params) {
  const errors = {}
  if (params.numeroSiniestro && isNaN(Number(params.numeroSiniestro))) {
    errors.numeroSiniestro = 'El número de siniestro debe ser numérico.'
  }
  if (params.documentoCliente && isNaN(Number(params.documentoCliente))) {
    errors.documentoCliente = 'El documento debe ser numérico.'
  }

  // Validación de fechas (opcional)
  if (params.desdeFechaSiniestro && params.hastaFechaSiniestro && params.desdeFechaSiniestro > params.hastaFechaSiniestro) {
    errors.hastaFechaSiniestro = 'La fecha hasta debe ser posterior a la fecha desde.'
  }
  return errors
}

const searchClaims = async () => {
  Object.keys(searchFieldErrors.value).forEach(k => delete searchFieldErrors.value[k])
  const errors = validateSearchFields(searchParams.value)
  if (Object.keys(errors).length > 0) {
    Object.assign(searchFieldErrors.value, errors)
    return
  }
  isLoadingSiniestros.value = true;
  try {
    const params = { ...searchParams.value };
    const response = await api.get('/consultar_siniestro/datos', { params });
    siniestros.value = response.data;
    setSuccess('Búsqueda realizada correctamente.');
    clearFeedback();
  } catch (err) {
    setError('No se pudo realizar la búsqueda. Intenta nuevamente.');
  } finally {
    isLoadingSiniestros.value = false;
  }
};

const deleteClaim = async (numeroSiniestro) => {
  try {
    await api.delete('/borrar_siniestro', {
      data: { numeroSiniestro },
    });
    siniestros.value = siniestros.value.filter((s) => s.numeroSiniestro !== numeroSiniestro);
    siniestrosOriginales.value = siniestrosOriginales.value.filter((s) => s.numeroSiniestro !== numeroSiniestro);
    setSuccess('Siniestro eliminado correctamente.');
  } catch (err) {
    setError('No se pudo eliminar el siniestro. Intenta nuevamente.');
    //console.error('Error al borrar el siniestro:', err);
  }
};

const updateClaim = async (siniestro) => {
  try {
    const dataToSend = {
      numeroSiniestro: siniestro.numeroSiniestro,
      numeroPoliza: siniestro.numeroPoliza,
      tipoDocumento: siniestro.tipoDocumento,
      documentoCliente: siniestro.documento,
      nombreCliente: siniestro.cliente,
      direccionCliente: siniestro.direccionCliente,
      telefonoCliente: siniestro.telefonoCliente,
      mailCliente: siniestro.mailCliente,
      tipoVehiculo: siniestro.tipoVehiculo,
      patente: siniestro.patente,
      marca: siniestro.marca,
      modelo: siniestro.modelo,
      anioFabricacion: siniestro.anioFabricacion,
      numeroDeMotor: siniestro.numeroDeMotor,
      numeroDeChasis: siniestro.numeroDeChasis,
      tipoSiniestro: siniestro.tipoSiniestro,
      fechaSiniestro: siniestro.fechaSiniestro,
      direccionSiniestro: siniestro.direccionSiniestro,
      descripcionSiniestro: siniestro.descripcionSiniestro,
    };
    await api.put('/modificar_siniestro', dataToSend);
    const index = siniestros.value.findIndex((s) => s.numeroSiniestro === siniestro.numeroSiniestro);
    if (index !== -1) {
      siniestros.value.splice(index, 1, { ...siniestro });
    }
    const indexOriginal = siniestrosOriginales.value.findIndex((s) => s.numeroSiniestro === siniestro.numeroSiniestro);
    if (indexOriginal !== -1) {
      siniestrosOriginales.value.splice(indexOriginal, 1, { ...siniestro });
    }
    setSuccess('Siniestro actualizado correctamente.');
  } catch (err) {
    setError('No se pudo actualizar el siniestro. Intenta nuevamente.');
  }
};

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-AR', options);
};

const clearFilters = () => {
  searchParams.value = {
    numeroSiniestro: null,
    documentoCliente: null,
    patente: null,
    desdeFechaSiniestro: null,
    hastaFechaSiniestro: null,
  };
  fetchSiniestros();
};

function onModalSave(editedSiniestro) {
  // Validación ya fue hecha en el modal
  updateClaim(editedSiniestro);
  // Cerrar el modal programáticamente tras guardar
  const modalId = `editSiniestroModal-${editedSiniestro.numeroSiniestro}`;
  const modalEl = document.getElementById(modalId);
  if (modalEl) {
    // Bootstrap 5 Modal API
    const modalInstance = window.bootstrap?.Modal.getOrCreateInstance(modalEl);
    modalInstance?.hide();
  }
}
function onModalClose() {
  // Limpia errores si es necesario
}

onMounted(() => {
  rolUsuario.value = localStorage.getItem('userRole') || ''
  fetchSiniestros();
});
</script>

<style scoped>
.consultar-siniestro-card {
  max-width: 1100px;
  margin: 60px auto 30px auto;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  background: #fff;
}
.modal-content {
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(13,110,253,0.10);
  animation-duration: 0.4s;
}
.modal-header {
  border-bottom: none;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}
.modal-body {
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}
.modal-footer {
  border-top: none;
}
</style>