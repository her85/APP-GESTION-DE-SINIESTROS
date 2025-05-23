<template>
  
    <main>
      <div class="container-sm">
        <div v-if="isAdminOrTram" class="card">
          <section class="container mt-5">
            <form id="siniestro-form" @submit.prevent="enviarFormulario">
              <div class="row">
                <!-- Datos de la persona -->
                <div class="col-6">
                  <h3 class="mb-3">Datos de la persona</h3>
                  <div class="mb-3">
                    <input type="number" class="form-control" v-model="formulario.numeroPoliza"
                      placeholder="Número de poliza" required />
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
                    <input type="number" class="form-control" v-model="formulario.documentoCliente"
                      placeholder="Número de documento" required />
                  </div>
                  <div class="mb-3">
                    <input type="text" class="form-control" v-model="formulario.nombreCliente"
                      placeholder="Nombre completo" required />
                  </div>
                  <div class="mb-3">
                    <input type="text" class="form-control" v-model="formulario.direccionCliente"
                      placeholder="Dirección" required />
                  </div>
                  <div class="mb-3">
                    <input type="tel" class="form-control" v-model="formulario.telefonoCliente" placeholder="Teléfono"
                      required />
                  </div>
                  <div class="mb-3">
                    <input type="email" class="form-control" v-model="formulario.mailCliente" placeholder="E-mail"
                      required />
                  </div>
                </div>

                <!-- Datos del vehículo -->
                <div class="col-6">
                  <h3 class="mb-3">Datos del vehículo</h3>
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
                    <input type="text" class="form-control" v-model="formulario.patente" placeholder="Patente"
                      required />
                  </div>
                  <div class="mb-3">
                    <input type="text" class="form-control" v-model="formulario.marca" placeholder="Marca" required />
                  </div>
                  <div class="mb-3">
                    <input type="text" class="form-control" v-model="formulario.modelo" placeholder="Modelo" required />
                  </div>
                  <div class="mb-3">
                    <input type="number" class="form-control" v-model="formulario.anioFabricacion"
                      placeholder="Año de fabricación" required />
                  </div>
                  <div class="mb-3">
                    <input type="text" class="form-control" v-model="formulario.numeroDeMotor"
                      placeholder="Número de motor" required />
                  </div>
                  <div class="mb-3">
                    <input type="text" class="form-control" v-model="formulario.numeroDeChasis"
                      placeholder="Número de chasis" required />
                  </div>
                </div>
              </div>

              <!-- Datos del siniestro -->
              <h3 class="text-center my-4">Datos del siniestro</h3>
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
                <div class="col-6 mb-3">
                  <label for="fechaSiniestro" class="form-label">Fecha</label>
                  <input type="date" class="form-control" v-model="formulario.fechaSiniestro" required />
                </div>
                <div class="col-6 mb-3">
                  <label for="direccionSiniestro" class="form-label">Lugar del siniestro</label>
                  <input type="text" class="form-control" v-model="formulario.direccionSiniestro" required />
                </div>
              </div>
              <div class="mb-3">
                <label for="descripcionSiniestro" class="form-label">Descripción</label>
                <textarea class="form-control" v-model="formulario.descripcionSiniestro" rows="3" required></textarea>
              </div>

              <div class="boton">
                <button type="submit" class="btn btn-primary mt-2">Crear siniestro</button>
              </div>
            </form>
          </section>
        </div>
        <div v-else>
          <p class="mt-3 alert alert-warning">No tienes permisos para ver esta página.</p>
        </div>
      </div>
    </main>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'

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

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken')
  if (!token) {
    throw new Error('Token no encontrado. Debes iniciar sesión.')
  }
  return { Authorization: `Bearer ${token}` }
}

const enviarFormulario = async () => {
  try {
    const headers = getAuthHeaders()
    await axios.post('http://localhost:3000/ingresar_siniestro', formulario, { headers })
    alert('Siniestro creado con éxito')
    Object.keys(formulario).forEach((key) => (formulario[key] = ''))
  } catch (error) {
    console.error('Error al enviar el formulario:', error)
    alert('Error al crear el siniestro')
  }
}

</script>

<style scoped>
/* Aquí puedes poner estilos personalizados */
</style>
