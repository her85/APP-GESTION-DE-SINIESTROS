<template>
  <div class="contenedor-inicio bg-light d-flex align-items-center justify-content-center min-vh-100">
    <section class="consultar-siniestro-card card col-12 col-lg-10 p-4">
      <h2 class="fw-bold text-primary mb-4 text-center">Consultar Siniestros</h2>
      <form id="siniestro-search-form" @submit.prevent="buscarSiniestros" class="mb-4">
        <div class="row g-3">
          <div class="col-md-4">
            <input type="number" class="form-control" id="numeroSiniestro" v-model="searchParams.numeroSiniestro" placeholder="N° de siniestro" />
          </div>
          <div class="col-md-4">
            <input type="number" class="form-control" id="documentoCliente" v-model="searchParams.documentoCliente" placeholder="Documento del cliente" />
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" id="patente" v-model="searchParams.patente" placeholder="Patente del vehículo" />
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
        <div class="d-grid gap-2 mt-3">
          <button type="submit" class="btn btn-primary btn-lg">Buscar Siniestros</button>
        </div>
      </form>
      <section class="mt-5">
        <h2 class="text-center text-secondary mb-3">Lista de siniestros</h2>
        <div class="table-responsive">
          <table class="table table-bordered align-middle mt-4">
            <thead class="table-light">
              <tr>
                <th scope="col">N° Siniestro</th>
                <th scope="col" class="ocultar-en-movil">Cliente</th>
                <th scope="col" class="ocultar-en-movil">Documento</th>
                <th scope="col">Patente</th>
                <th scope="col" class="ocultar-en-movil">Tipo de siniestro</th>
                <th scope="col" class="ocultar-en-movil">Fecha del siniestro</th>
                <th scope="col">Editar</th>
                <th scope="col" v-if="rolUsuario !== 'Consulta'">Borrar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="siniestro in paginatedSiniestros" :key="siniestro.numeroSiniestro">
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
                  <button @click="borrarSiniestro(siniestro.numeroSiniestro)" class="btn btn-outline-danger btn-sm px-3">Borrar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <!-- Modales de edición -->
      <div v-for="siniestro in siniestros" :key="siniestro.numeroSiniestro" class="modal fade" :id="'editSiniestroModal-' + siniestro.numeroSiniestro" tabindex="-1" aria-labelledby="editSiniestroModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow-lg rounded-4 animate__animated animate__fadeInDown">
            <div class="modal-header bg-primary text-white rounded-top-4 border-0">
              <h3 class="modal-title fw-bold w-100 text-center" id="editSiniestroModalLabel">Siniestro {{ siniestro.numeroSiniestro }}</h3>
            </div>
            <div class="modal-body bg-light">
              <form :id="'edit-siniestro-form-' + siniestro.numeroSiniestro">
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label for="editarPoliza" class="form-label">N° poliza</label>
                      <input type="number" class="form-control rounded-pill" :id="'editarPoliza-' + siniestro.numeroSiniestro" v-model="siniestro.numeroPoliza" name="editarPoliza" :disabled="rolUsuario === 'Consulta'" />
                    </div>
                    <div class="mb-3">
                      <label for="editarTipoDocumentoCliente" class="form-label">Tipo documento</label>
                      <select class="form-select rounded-pill" :id="'editarTipoDocumentoCliente-' + siniestro.numeroSiniestro" v-model="siniestro.tipoDocumento" name="editarTipoDocumentoCliente" :disabled="rolUsuario === 'Consulta'">
                        <option value="DNI">DNI</option>
                        <option value="LE">LE</option>
                        <option value="Pasaporte">Pasaporte</option>
                        <option value="CUIT">CUIT</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="editarDocumentoCliente" class="form-label">Documento</label>
                      <input type="number" class="form-control rounded-pill" :id="'editarDocumentoCliente-' + siniestro.numeroSiniestro" v-model="siniestro.documento" name="editarDocumentoCliente" :disabled="rolUsuario === 'Consulta'" />
                    </div>
                    <div class="mb-3">
                      <label for="editarCliente" class="form-label">Nombre completo</label>
                      <input type="text" class="form-control rounded-pill" :id="'editarCliente-' + siniestro.numeroSiniestro" v-model="siniestro.cliente" name="editarCliente" :disabled="rolUsuario === 'Consulta'" />
                    </div>
                    <div class="mb-3">
                      <label for="editarDireccionCliente" class="form-label">Direccion del cliente</label>
                      <input type="text" class="form-control rounded-pill" :id="'editarDireccionCliente-' + siniestro.numeroSiniestro" v-model="siniestro.direccionCliente" name="editarDireccionCliente" :disabled="rolUsuario === 'Consulta'" />
                    </div>
                    <div class="mb-3">
                      <label for="editarTelefonoCliente" class="form-label">Telefono del cliente</label>
                      <input type="number" class="form-control rounded-pill" :id="'editarTelefonoCliente-' + siniestro.numeroSiniestro" v-model="siniestro.telefonoCliente" name="editarTelefonoCliente" :disabled="rolUsuario === 'Consulta'" />
                    </div>
                    <div class="mb-3">
                      <label for="editarMailCliente" class="form-label">Email del cliente</label>
                      <input type="email" class="form-control rounded-pill" :id="'editarMailCliente-' + siniestro.numeroSiniestro" v-model="siniestro.mailCliente" name="editarMailCliente" :disabled="rolUsuario === 'Consulta'" />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label for="editarTipoVehiculo" class="form-label">Tipo de vehiculo</label>
                      <select class="form-select rounded-pill" :id="'editarTipoVehiculo-' + siniestro.numeroSiniestro" v-model="siniestro.tipoVehiculo" name="editarTipoVehiculo" :disabled="rolUsuario === 'Consulta'">
                        <option value="Auto">Auto</option>
                        <option value="Moto">Moto</option>
                        <option value="Camioneta">Camioneta</option>
                        <option value="Camion">Camion</option>
                        <option value="Acoplado">Acoplado</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="editarPatente" class="form-label">Patente</label>
                      <input type="text" class="form-control rounded-pill" :id="'editarPatente-' + siniestro.numeroSiniestro" v-model="siniestro.patente" name="editarPatente" :disabled="rolUsuario === 'Consulta'" />
                    </div>
                    <div class="mb-3">
                      <label for="editarMarca" class="form-label">Marca</label>
                      <input type="text" class="form-control rounded-pill" :id="'editarMarca-' + siniestro.numeroSiniestro" v-model="siniestro.marca" name="editarMarca" :disabled="rolUsuario === 'Consulta'" />
                    </div>
                    <div class="mb-3">
                      <label for="editarModelo" class="form-label">Modelo</label>
                      <input type="text" class="form-control rounded-pill" :id="'editarModelo-' + siniestro.numeroSiniestro" v-model="siniestro.modelo" name="editarModelo" :disabled="rolUsuario === 'Consulta'" />
                    </div>
                    <div class="mb-3">
                      <label for="editarAnioFabricacion" class="form-label">Año de fabricación</label>
                      <input type="number" class="form-control rounded-pill" :id="'editarAnioFabricacion-' + siniestro.numeroSiniestro" v-model="siniestro.anioFabricacion" name="editarAnioFabricacion" :disabled="rolUsuario === 'Consulta'" />
                    </div>
                    <div class="mb-3">
                      <label for="editarNumeroDeMotor" class="form-label">N° motor</label>
                      <input type="text" class="form-control rounded-pill" :id="'editarNumeroDeMotor-' + siniestro.numeroSiniestro" v-model="siniestro.numeroDeMotor" name="editarNumeroDeMotor" :disabled="rolUsuario === 'Consulta'" />
                    </div>
                    <div class="mb-3">
                      <label for="editarNumeroDeChasis" class="form-label">N° de chasis</label>
                      <input type="text" class="form-control rounded-pill" :id="'editarNumeroDeChasis-' + siniestro.numeroSiniestro" v-model="siniestro.numeroDeChasis" name="editarNumeroDeChasis" :disabled="rolUsuario === 'Consulta'" />
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="editarTipoSiniestro" class="form-label">Tipo de siniestro</label>
                  <select class="form-select rounded-pill" :id="'editarTipoSiniestro-' + siniestro.numeroSiniestro" v-model="siniestro.tipoSiniestro" name="editarTipoSiniestro" :disabled="rolUsuario === 'Consulta'">
                    <option value="Cristales">Cristales</option>
                    <option value="Cerrajeria">Cerrajeria</option>
                    <option value="Daño parcial">Daño parcial</option>
                    <option value="Destruccion Total">Destruccion Total</option>
                    <option value="Granizo">Granizo</option>
                    <option value="Incendio">Incendio</option>
                    <option value="Responsabilidad civil">Responsabilidad civil</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="editarFechaSiniestro" class="form-label">Fecha del siniestro</label>
                  <input type="date" class="form-control rounded-pill" :id="'editarFechaSiniestro-' + siniestro.numeroSiniestro" v-model="siniestro.fechaSiniestro" name="editarFechaSiniestro" :disabled="rolUsuario === 'Consulta'" />
                </div>
                <div class="mb-3">
                  <label for="editarDireccionSiniestro" class="form-label">Lugar del siniestro</label>
                  <input type="text" class="form-control rounded-pill" :id="'editarDireccionSiniestro-' + siniestro.numeroSiniestro" v-model="siniestro.direccionSiniestro" name="editarDireccionSiniestro" :disabled="rolUsuario === 'Consulta'" />
                </div>
                <div class="mb-3">
                  <label for="editarDescripcionSiniestro" class="form-label">Descripción del siniestro</label>
                  <input type="text" class="form-control rounded-pill" :id="'editarDescripcionSiniestro-' + siniestro.numeroSiniestro" v-model="siniestro.descripcionSiniestro" name="editarDescripcionSiniestro" :disabled="rolUsuario === 'Consulta'" />
                </div>
              </form>
            </div>
            <div class="modal-footer bg-light border-0 rounded-bottom-4">
              <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">Cerrar</button>
              <button type="submit" :form="'edit-siniestro-form-' + siniestro.numeroSiniestro" class="btn btn-primary rounded-pill px-4" @click="modificarSiniestro(siniestro)" v-if="rolUsuario !== 'Consulta'">Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Controles de paginación -->
      <div v-if="totalPages > 1" class="d-flex justify-content-center align-items-center mt-3">
        <nav>
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
              <button class="page-link" @click="goToPage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Siguiente</button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

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
const error = ref(null);

const rolUsuario = ref('')

// Obtener el rol al montar el componente
onMounted(() => {
  rolUsuario.value = localStorage.getItem('userRole') || '' // Ej: 'admin', 'consulta', 'tramitador'
})

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    error.value = 'Token no encontrado. Por favor, inicie sesión.';
    throw new Error('Token no encontrado.');
  }
  return { Authorization: `Bearer ${token}` };
};

const fetchSiniestros = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get('http://localhost:3000/consultar_siniestro', { headers });
    siniestros.value = response.data;
    siniestrosOriginales.value = [...response.data];
    error.value = null;
  } catch (err) {
    console.error('Error al cargar siniestros:', err);
    error.value = 'Error al cargar los siniestros.';
  }
};

// 🔍 Búsqueda con filtros
const buscarSiniestros = async () => {
  try {
    const headers = getAuthHeaders();
    const params = new URLSearchParams();
    if (searchParams.value.numeroSiniestro) params.append('numeroSiniestro', searchParams.value.numeroSiniestro);
    if (searchParams.value.documentoCliente) params.append('documentoCliente', searchParams.value.documentoCliente);
    if (searchParams.value.patente) params.append('patente', searchParams.value.patente);
    if (searchParams.value.desdeFechaSiniestro) params.append('desdeFechaSiniestro', searchParams.value.desdeFechaSiniestro);
    if (searchParams.value.hastaFechaSiniestro) params.append('hastaFechaSiniestro', searchParams.value.hastaFechaSiniestro);

    const response = await axios.get(`http://localhost:3000/consultar_siniestro/datos?${params.toString()}`, { headers });
    siniestros.value = response.data;
    error.value = null;
  } catch (err) {
    console.error('Error al buscar siniestros:', err);
    error.value = 'Error al buscar los siniestros.';
  }
};

// 🗑️ Borrar siniestro
const borrarSiniestro = async (numeroSiniestro) => {
  try {
    const headers = getAuthHeaders();
    await axios.delete('http://localhost:3000/borrar_siniestro', {
      data: { numeroSiniestro },
      headers
    });
    siniestros.value = siniestros.value.filter((s) => s.numeroSiniestro !== numeroSiniestro);
    siniestrosOriginales.value = siniestrosOriginales.value.filter((s) => s.numeroSiniestro !== numeroSiniestro);
    error.value = null;
  } catch (err) {
    console.error('Error al borrar siniestro:', err);
    error.value = 'Error al borrar el siniestro.';
  }
};

// ✏️ Modificar siniestro
const modificarSiniestro = async (siniestro) => {
  try {
    const headers = getAuthHeaders();
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

    await axios.put('http://localhost:3000/modificar_siniestro', dataToSend, { headers });

    const index = siniestros.value.findIndex((s) => s.numeroSiniestro === siniestro.numeroSiniestro);
    if (index !== -1) {
      siniestros.value.splice(index, 1, siniestro);
    }

    const indexOriginal = siniestrosOriginales.value.findIndex((s) => s.numeroSiniestro === siniestro.numeroSiniestro);
    if (indexOriginal !== -1) {
      siniestrosOriginales.value.splice(indexOriginal, 1, siniestro);
    }
  } catch (err) {
    console.error('Error al modificar siniestro:', err);
    error.value = 'Error al modificar el siniestro.';
  }
};

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-AR', options);
};

// Estado de paginación
const currentPage = ref(1);
const pageSize = ref(8); // Cantidad de siniestros por página
const totalPages = computed(() => Math.ceil(siniestros.value.length / pageSize.value));

const paginatedSiniestros = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return siniestros.value.slice(start, start + pageSize.value);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

watch(siniestros, () => {
  currentPage.value = 1; // Reiniciar a la primera página al filtrar/buscar
});

onMounted(fetchSiniestros);

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