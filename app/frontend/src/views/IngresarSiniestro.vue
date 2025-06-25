<template>
  <div class="contenedor-inicio bg-light d-flex align-items-center justify-content-center min-vh-100">
    <section class="ingresar-siniestro-card card col-12 col-lg-10 p-4">
      <div v-if="isAdminOrTram">
        <h2 class="fw-bold text-primary mb-4 text-center">Ingresar siniestro</h2>
        <form id="siniestro-form" @submit.prevent="submitForm">
          <div class="row">
            <!-- Datos de la persona -->
            <div class="col-12 col-md-6">
              <h4 class="mb-3 text-secondary">Datos de la persona</h4>
              <div class="mb-3">
                <input type="number" class="form-control" v-model="formulario.numeroPoliza" placeholder="Número de póliza" required />
                <div v-if="fieldErrors.numeroPoliza" class="invalid-feedback d-block">{{ fieldErrors.numeroPoliza }}</div>
              </div>
              <div class="mb-3">
                <select class="form-select" v-model="formulario.tipoDocumento" required>
                  <option value="">Seleccione el tipo de documento</option>
                  <option value="DNI">DNI</option>
                  <option value="LE">LE</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="CUIT">CUIT</option>
                </select>
                <div v-if="fieldErrors.tipoDocumento" class="invalid-feedback d-block">{{ fieldErrors.tipoDocumento }}</div>
              </div>
              <div class="mb-3">
                <input type="number" class="form-control" v-model="formulario.documentoCliente" placeholder="Número de documento" required />
                <div v-if="fieldErrors.documentoCliente" class="invalid-feedback d-block">{{ fieldErrors.documentoCliente }}</div>
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.nombreCliente" placeholder="Nombre completo" required />
                <div v-if="fieldErrors.nombreCliente" class="invalid-feedback d-block">{{ fieldErrors.nombreCliente }}</div>
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.direccionCliente" placeholder="Dirección" required />
                <div v-if="fieldErrors.direccionCliente" class="invalid-feedback d-block">{{ fieldErrors.direccionCliente }}</div>
              </div>
              <div class="mb-3">
                <input type="tel" class="form-control" v-model="formulario.telefonoCliente" placeholder="Teléfono" required />
                <div v-if="fieldErrors.telefonoCliente" class="invalid-feedback d-block">{{ fieldErrors.telefonoCliente }}</div>
              </div>
              <div class="mb-3">
                <input type="email" class="form-control" v-model="formulario.mailCliente" placeholder="E-mail" required />
                <div v-if="fieldErrors.mailCliente" class="invalid-feedback d-block">{{ fieldErrors.mailCliente }}</div>
              </div>
            </div>
            <!-- Datos del vehículo -->
            <div class="col-12 col-md-6">
              <h4 class="mb-3 text-secondary">Datos del vehículo</h4>
              <div class="mb-3">
                <select class="form-select" v-model="formulario.tipoVehiculo" required>
                  <option value="">Seleccione el tipo de vehículo</option>
                  <option value="Auto">Auto</option>
                  <option value="Moto">Moto</option>
                  <option value="Camioneta">Camioneta</option>
                  <option value="Camion">Camion</option>
                  <option value="Acoplado">Acoplado</option>
                </select>
                <div v-if="fieldErrors.tipoVehiculo" class="invalid-feedback d-block">{{ fieldErrors.tipoVehiculo }}</div>
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.patente" placeholder="Patente" required />
                <div v-if="fieldErrors.patente" class="invalid-feedback d-block">{{ fieldErrors.patente }}</div>
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.marca" placeholder="Marca" required />
                <div v-if="fieldErrors.marca" class="invalid-feedback d-block">{{ fieldErrors.marca }}</div>
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.modelo" placeholder="Modelo" required />
                <div v-if="fieldErrors.modelo" class="invalid-feedback d-block">{{ fieldErrors.modelo }}</div>
              </div>
              <div class="mb-3">
                <input type="number" class="form-control" v-model="formulario.anioFabricacion" placeholder="Año de fabricación" required />
                <div v-if="fieldErrors.anioFabricacion" class="invalid-feedback d-block">{{ fieldErrors.anioFabricacion }}</div>
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.numeroDeMotor" placeholder="Número de motor" required />
                <div v-if="fieldErrors.numeroDeMotor" class="invalid-feedback d-block">{{ fieldErrors.numeroDeMotor }}</div>
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.numeroDeChasis" placeholder="Número de chasis" required />
                <div v-if="fieldErrors.numeroDeChasis" class="invalid-feedback d-block">{{ fieldErrors.numeroDeChasis }}</div>
              </div>
            </div>
          </div>
          <!-- Datos del siniestro -->
          <h4 class="text-center my-4 text-secondary">Datos del siniestro</h4>
          <div class="mb-3">
            <select class="form-select" v-model="formulario.tipoSiniestro" required>
              <option value="">Seleccione el tipo de siniestro</option>
              <option value="Cristales">Cristales</option>
              <option value="Cerrajeria">Cerrajería</option>
              <option value="Daño parcial">Daño parcial</option>
              <option value="Destruccion Total">Destrucción total</option>
              <option value="Granizo">Granizo</option>
              <option value="Incendio">Incendio</option>
              <option value="Responsabilidad civil">Responsabilidad civil</option>
              <option value="Robo">Robo</option>
            </select>
            <div v-if="fieldErrors.tipoSiniestro" class="invalid-feedback d-block">{{ fieldErrors.tipoSiniestro }}</div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6 mb-3">
              <label for="fechaSiniestro" class="form-label">Fecha</label>
              <input type="date" class="form-control" v-model="formulario.fechaSiniestro" required :max="new Date().toISOString().slice(0,10)" />
              <div v-if="fieldErrors.fechaSiniestro" class="invalid-feedback d-block">{{ fieldErrors.fechaSiniestro }}</div>
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label for="direccionSiniestro" class="form-label">Lugar del siniestro</label>
              <input type="text" class="form-control" v-model="formulario.direccionSiniestro" required />
              <div v-if="fieldErrors.direccionSiniestro" class="invalid-feedback d-block">{{ fieldErrors.direccionSiniestro }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="descripcionSiniestro" class="form-label">Descripción</label>
            <textarea class="form-control" v-model="formulario.descripcionSiniestro" rows="3" required></textarea>
            <div v-if="fieldErrors.descripcionSiniestro" class="invalid-feedback d-block">{{ fieldErrors.descripcionSiniestro }}</div>
          </div>
             <div v-if="success" class="alert alert-success text-center mb-3">{{ success }}</div>
        <div v-if="error" class="alert alert-danger text-center mb-3">{{ error }}</div>
          <div class="d-grid gap-2 mt-3">
            <button type="submit" class="btn btn-primary btn-lg" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ isLoading ? 'Creando...' : 'Crear siniestro' }}
            </button>
          </div>
        </form>
      </div>
      <div v-else>
        <p class="mt-3 alert alert-warning text-center">No tienes permisos para ver esta página.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useForm } from '@/composables/useForm'
import { computed, ref } from 'vue'
import api from '@/services/api'
import { useFeedback } from '@/composables/useFeedback'
import { removeSpecialCharsEvent } from '@/utils/sanitize.js'

const loggedInUserRole = localStorage.getItem('userRole')
const isAdminOrTram = computed(() => loggedInUserRole === 'Administrador' || loggedInUserRole === 'Tramitador')

const {
  form: formulario,
  isLoading,
  validate,
  resetForm
} = useForm({
  numeroPoliza: null,
  tipoDocumento: '',
  documentoCliente: null,
  nombreCliente: '',
  direccionCliente: '',
  telefonoCliente: '',
  mailCliente: '',
  tipoVehiculo: '',
  patente: '',
  marca: '',
  modelo: '',
  anioFabricacion: null,
  numeroDeMotor: '',
  numeroDeChasis: '',
  tipoSiniestro: '',
  fechaSiniestro: '',
  direccionSiniestro: '',
  descripcionSiniestro: '',
})

const { error, success, setError, setSuccess, clearFeedback } = useFeedback()
const fieldErrors = ref({})

function validateSiniestroFields(f) {
  const errors = {}
  if (!f.numeroPoliza || isNaN(Number(f.numeroPoliza))) {
    errors.numeroPoliza = 'El número de póliza es obligatorio y debe ser numérico.'
  }
  if (!f.tipoDocumento) {
    errors.tipoDocumento = 'El tipo de documento es obligatorio.'
  }
  if (!f.documentoCliente || isNaN(Number(f.documentoCliente))) {
    errors.documentoCliente = 'El documento es obligatorio y debe ser numérico.'
  }
  if (!f.nombreCliente || f.nombreCliente.trim().length < 3) {
    errors.nombreCliente = 'El nombre es obligatorio (mín. 3 caracteres).'
  }
  if (!f.direccionCliente) {
    errors.direccionCliente = 'La dirección es obligatoria.'
  }
  if (!f.telefonoCliente) {
    errors.telefonoCliente = 'El teléfono es obligatorio.'
  }
  if (!f.mailCliente) {
    errors.mailCliente = 'El email es obligatorio.'
  }
  if (!f.tipoVehiculo) {
    errors.tipoVehiculo = 'El tipo de vehículo es obligatorio.'
  }
  if (!f.patente || f.patente.length < 6) {
    errors.patente = 'La patente es obligatoria (mín. 6 caracteres).'
  }
  if (!f.marca) {
    errors.marca = 'La marca es obligatoria.'
  }
  if (!f.modelo) {
    errors.modelo = 'El modelo es obligatorio.'
  }
  if (!f.anioFabricacion || isNaN(Number(f.anioFabricacion))) {
    errors.anioFabricacion = 'El año de fabricación es obligatorio y debe ser numérico.'
  }
  if (!f.numeroDeMotor) {
    errors.numeroDeMotor = 'El número de motor es obligatorio.'
  }
  if (!f.numeroDeChasis) {
    errors.numeroDeChasis = 'El número de chasis es obligatorio.'
  }
  if (!f.tipoSiniestro) {
    errors.tipoSiniestro = 'El tipo de siniestro es obligatorio.'
  }
  if (!f.fechaSiniestro) {
    errors.fechaSiniestro = 'La fecha del siniestro es obligatoria.'
  }
  if (!f.direccionSiniestro) {
    errors.direccionSiniestro = 'El lugar del siniestro es obligatorio.'
  }
  if (!f.descripcionSiniestro || f.descripcionSiniestro.trim().length < 5) {
    errors.descripcionSiniestro = 'La descripción es obligatoria (mín. 5 caracteres).'
  }
  return errors
}

const submitForm = async () => {
  Object.keys(fieldErrors.value).forEach(k => delete fieldErrors.value[k])
  const errors = validateSiniestroFields(formulario.value)
  if (Object.keys(errors).length > 0) {
    Object.assign(fieldErrors.value, errors)
    return
  }
  if (!validate()) return
  isLoading.value = true
  clearFeedback()
  try {
    await api.post('/ingresar_siniestro', formulario.value)
    setSuccess('Siniestro creado con éxito')
    resetForm()
  } catch (error) {
    setError('Error al crear el siniestro')
    console.error('Error al enviar el formulario:', error)
  } finally {
    isLoading.value = false
  }
}

// Aplica removeSpecialCharsEvent en los campos de texto relevantes para evitar caracteres especiales
removeSpecialCharsEvent('nombreCliente')
removeSpecialCharsEvent('direccionCliente')
removeSpecialCharsEvent('telefonoCliente')
removeSpecialCharsEvent('mailCliente')
removeSpecialCharsEvent('patente')
removeSpecialCharsEvent('marca')
removeSpecialCharsEvent('modelo')
removeSpecialCharsEvent('numeroDeMotor')
removeSpecialCharsEvent('numeroDeChasis')
removeSpecialCharsEvent('direccionSiniestro')
removeSpecialCharsEvent('descripcionSiniestro')
</script>

<style scoped>
.ingresar-siniestro-card {
  max-width: 1100px;
  margin: 60px auto 30px auto;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  background: #fff;
}
</style>
