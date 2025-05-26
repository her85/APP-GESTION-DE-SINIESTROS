<template>
  <div class="contenedor-inicio bg-light d-flex align-items-center justify-content-center min-vh-100">
    <section class="ingresar-siniestro-card card col-12 col-lg-10 p-4">
      <div v-if="isAdminOrTram">
        <h2 class="fw-bold text-primary mb-4 text-center">Ingresar Siniestro</h2>
        <form id="siniestro-form" @submit.prevent="enviarFormulario">
          <div class="row">
            <!-- Datos de la persona -->
            <div class="col-12 col-md-6">
              <h4 class="mb-3 text-secondary">Datos de la persona</h4>
              <div class="mb-3">
                <input type="number" class="form-control" v-model="formulario.numeroPoliza" placeholder="Número de póliza" required />
              </div>
              <div class="mb-3">
                <select class="form-select" v-model="formulario.tipoDocumento" required>
                  <option value="">Seleccione el tipo de documento</option>
                  <option value="DNI">DNI</option>
                  <option value="LE">LE</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="CUIT">CUIT</option>
                </select>
              </div>
              <div class="mb-3">
                <input type="number" class="form-control" v-model="formulario.documentoCliente" placeholder="Número de documento" required />
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.nombreCliente" placeholder="Nombre completo" required />
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.direccionCliente" placeholder="Dirección" required />
              </div>
              <div class="mb-3">
                <input type="tel" class="form-control" v-model="formulario.telefonoCliente" placeholder="Teléfono" required />
              </div>
              <div class="mb-3">
                <input type="email" class="form-control" v-model="formulario.mailCliente" placeholder="E-mail" required />
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
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.patente" placeholder="Patente" required />
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.marca" placeholder="Marca" required />
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.modelo" placeholder="Modelo" required />
              </div>
              <div class="mb-3">
                <input type="number" class="form-control" v-model="formulario.anioFabricacion" placeholder="Año de fabricación" required />
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.numeroDeMotor" placeholder="Número de motor" required />
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" v-model="formulario.numeroDeChasis" placeholder="Número de chasis" required />
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
          </div>
          <div class="row">
            <div class="col-12 col-md-6 mb-3">
              <label for="fechaSiniestro" class="form-label">Fecha</label>
              <input type="date" class="form-control" v-model="formulario.fechaSiniestro" required />
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label for="direccionSiniestro" class="form-label">Lugar del siniestro</label>
              <input type="text" class="form-control" v-model="formulario.direccionSiniestro" required />
            </div>
          </div>
          <div class="mb-3">
            <label for="descripcionSiniestro" class="form-label">Descripción</label>
            <textarea class="form-control" v-model="formulario.descripcionSiniestro" rows="3" required></textarea>
          </div>
          <div class="d-grid gap-2 mt-3">
            <button type="submit" class="btn btn-primary btn-lg">Crear siniestro</button>
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
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import api from '@/services/api';

const router = useRouter()
//obtener la información del usuario logueado y su rol del inicio de sesión.
const loggedInUserRole = localStorage.getItem('userRole'); // Ejemplo: obtener el rol desde localStorage
const isAdminOrTram = computed(() => loggedInUserRole === 'Administrador' || loggedInUserRole === 'Tramitador');

const formulario = reactive({
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

/*const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken')
  if (!token) {
    throw new Error('Token no encontrado. Debes iniciar sesión.')
  }
  return { Authorization: `Bearer ${token}` }
}*/

const enviarFormulario = async () => {
  try {
    await api.post('/ingresar_siniestro', formulario)
    alert('Siniestro creado con éxito')
    Object.keys(formulario).forEach((key) => (formulario[key] = ''))
  } catch (error) {
    console.error('Error al enviar el formulario:', error)
    alert('Error al crear el siniestro')
  }
}

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
