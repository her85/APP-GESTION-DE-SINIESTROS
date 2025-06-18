<!-- src/components/ModalSiniestro.vue -->
<template>
  <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="editSiniestroModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg rounded-4 animate__animated animate__fadeInDown">
        <div class="modal-header bg-primary text-white rounded-top-4 border-0">
          <h3 class="modal-title fw-bold w-100 text-center" id="editSiniestroModalLabel">Siniestro {{ localSiniestro.numeroSiniestro }}</h3>
        </div>
        <div class="modal-body bg-light">
          <form :id="'edit-siniestro-form-' + localSiniestro.numeroSiniestro">
            <div class="row">
              <div class="col-6">
                <div class="mb-3">
                  <label for="editarPoliza" class="form-label">N° poliza</label>
                  <input type="number" class="form-control rounded-pill" :id="'editarPoliza-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.numeroPoliza" name="editarPoliza" :disabled="isReadOnly" />
                </div>
                <div class="mb-3">
                  <label for="editarTipoDocumentoCliente" class="form-label">Tipo documento</label>
                  <select class="form-select rounded-pill" :id="'editarTipoDocumentoCliente-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.tipoDocumento" name="editarTipoDocumentoCliente" :disabled="isReadOnly">
                    <option value="DNI">DNI</option>
                    <option value="LE">LE</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="CUIT">CUIT</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="editarDocumentoCliente" class="form-label">Documento</label>
                  <input type="number" class="form-control rounded-pill" :id="'editarDocumentoCliente-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.documento" name="editarDocumentoCliente" :disabled="isReadOnly" />
                </div>
                <div class="mb-3">
                  <label for="editarCliente" class="form-label">Nombre completo</label>
                  <input type="text" class="form-control rounded-pill" :id="'editarCliente-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.cliente" name="editarCliente" :disabled="isReadOnly" :class="{'is-invalid': localFieldErrors?.cliente}" />
                  <div v-if="localFieldErrors?.cliente" class="invalid-feedback d-block">
                    {{ localFieldErrors.cliente }}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="editarDireccionCliente" class="form-label">Direccion del cliente</label>
                  <input type="text" class="form-control rounded-pill" :id="'editarDireccionCliente-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.direccionCliente" name="editarDireccionCliente" :disabled="isReadOnly" />
                </div>
                <div class="mb-3">
                  <label for="editarTelefonoCliente" class="form-label">Telefono del cliente</label>
                  <input type="number" class="form-control rounded-pill" :id="'editarTelefonoCliente-' + siniestro.numeroSiniestro" v-model="localSiniestro.telefonoCliente" name="editarTelefonoCliente" :disabled="isReadOnly" />
                </div>
                <div class="mb-3">
                  <label for="editarMailCliente" class="form-label">Email del cliente</label>
                  <input type="email" class="form-control rounded-pill" :id="'editarMailCliente-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.mailCliente" name="editarMailCliente" :disabled="isReadOnly" />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label for="editarTipoVehiculo" class="form-label">Tipo de vehiculo</label>
                  <select class="form-select rounded-pill" :id="'editarTipoVehiculo-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.tipoVehiculo" name="editarTipoVehiculo" :disabled="isReadOnly">
                    <option value="Auto">Auto</option>
                    <option value="Moto">Moto</option>
                    <option value="Camioneta">Camioneta</option>
                    <option value="Camion">Camion</option>
                    <option value="Acoplado">Acoplado</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="editarPatente" class="form-label">Patente</label>
                  <input type="text" class="form-control rounded-pill" :id="'editarPatente-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.patente" name="editarPatente" :disabled="isReadOnly" :class="{'is-invalid': localFieldErrors?.patente}" />
                  <div v-if="localFieldErrors?.patente" class="invalid-feedback d-block">
                    {{ localFieldErrors.patente }}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="editarMarca" class="form-label">Marca</label>
                  <input type="text" class="form-control rounded-pill" :id="'editarMarca-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.marca" name="editarMarca" :disabled="isReadOnly" />
                </div>
                <div class="mb-3">
                  <label for="editarModelo" class="form-label">Modelo</label>
                  <input type="text" class="form-control rounded-pill" :id="'editarModelo-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.modelo" name="editarModelo" :disabled="isReadOnly" />
                </div>
                <div class="mb-3">
                  <label for="editarAnioFabricacion" class="form-label">Año de fabricación</label>
                  <input type="number" class="form-control rounded-pill" :id="'editarAnioFabricacion-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.anioFabricacion" name="editarAnioFabricacion" :disabled="isReadOnly" />
                </div>
                <div class="mb-3">
                  <label for="editarNumeroDeMotor" class="form-label">N° motor</label>
                  <input type="text" class="form-control rounded-pill" :id="'editarNumeroDeMotor-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.numeroDeMotor" name="editarNumeroDeMotor" :disabled="isReadOnly" />
                </div>
                <div class="mb-3">
                  <label for="editarNumeroDeChasis" class="form-label">N° de chasis</label>
                  <input type="text" class="form-control rounded-pill" :id="'editarNumeroDeChasis-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.numeroDeChasis" name="editarNumeroDeChasis" :disabled="isReadOnly" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="editarTipoSiniestro" class="form-label">Tipo de siniestro</label>
              <select class="form-select rounded-pill" :id="'editarTipoSiniestro-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.tipoSiniestro" name="editarTipoSiniestro" :disabled="isReadOnly">
                <option value="Cristales">Cristales</option>
                <option value="Cerrajeria">Cerrajeria</option>
                <option value="Daño parcial">Daño parcial</option>
                <option value="Destruccion Total">Destruccion Total</option>
                <option value="Granizo">Granizo</option>
                <option value="Incendio">Incendio</option>
                <option value="Responsabilidad civil">Responsabilidad civil</option>
              </select>
              <div v-if="localFieldErrors?.tipoSiniestro" class="invalid-feedback d-block">
                {{ localFieldErrors.tipoSiniestro }}
              </div>
            </div>
            <div class="mb-3">
              <label :for="'editarFechaSiniestro-' + localSiniestro.numeroSiniestro" class="form-label">Fecha del siniestro</label>
              <input type="date"
                     class="form-control rounded-pill"
                     :id="'editarFechaSiniestro-' + localSiniestro.numeroSiniestro"
                     v-model="localSiniestro.fechaSiniestro"
                     name="editarFechaSiniestro"
                     :disabled="isReadOnly"
                     :max="new Date().toISOString().slice(0,10)"
                     :class="{'is-invalid': localFieldErrors?.fechaSiniestro}" />
              <div v-if="localFieldErrors?.fechaSiniestro" class="invalid-feedback d-block">
                {{ localFieldErrors.fechaSiniestro }}
              </div>
            </div>
            <div class="mb-3">
              <label for="editarDireccionSiniestro" class="form-label">Lugar del siniestro</label>
              <input type="text" class="form-control rounded-pill" :id="'editarDireccionSiniestro-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.direccionSiniestro" name="editarDireccionSiniestro" :disabled="isReadOnly" />
            </div>
            <div class="mb-3">
              <label for="editarDescripcionSiniestro" class="form-label">Descripción del siniestro</label>
              <input type="text" class="form-control rounded-pill" :id="'editarDescripcionSiniestro-' + localSiniestro.numeroSiniestro" v-model="localSiniestro.descripcionSiniestro" name="editarDescripcionSiniestro" :disabled="isReadOnly" :class="{'is-invalid': localFieldErrors?.descripcionSiniestro}" />
              <div v-if="localFieldErrors?.descripcionSiniestro" class="invalid-feedback d-block">
                {{ localFieldErrors.descripcionSiniestro }}
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer bg-light border-0 rounded-bottom-4">
          <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal" @click="$emit('close')">Cerrar</button>
          <button type="submit" :form="'edit-siniestro-form-' + localSiniestro.numeroSiniestro" class="btn btn-primary rounded-pill px-4" @click="handleSave" v-if="!isReadOnly">Guardar Cambios</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { reactive, watch} from 'vue';
/**
 * Modal para visualizar y editar datos de un siniestro.
 * @component
 * @prop {Object} siniestro - Objeto siniestro a editar o visualizar
 * @prop {boolean} isReadOnly - Si el modal está en modo solo lectura
 * @prop {Object} fieldErrors - Errores de validación por campo
 */
const props = defineProps({
  siniestro: Object,
  modalId: String,
  isReadOnly: Boolean,
});
const emit = defineEmits(['save', 'close']);

const localSiniestro = reactive({ ...props.siniestro });
const localFieldErrors = reactive({});

const normalizeDate = (fecha) => {
  if (!fecha) return '';
  if (typeof fecha === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return fecha;
  }
  const d = new Date(fecha);
  if (!isNaN(d)) {
    return d.toISOString().slice(0, 10);
  }
  return '';
};

// Inicializar la fecha normalizada al crear el componente
localSiniestro.fechaSiniestro = normalizeDate(localSiniestro.fechaSiniestro);

watch(() => props.siniestro, (nuevo) => {
  Object.assign(localSiniestro, nuevo);
  localSiniestro.fechaSiniestro = normalizeDate(localSiniestro.fechaSiniestro);
}, { deep: true });

function validateEditFields(s) {
  const errors = {};
  if (!s.numeroPoliza || isNaN(Number(s.numeroPoliza))) {
    errors.numeroPoliza = 'El número de póliza es obligatorio y debe ser numérico.';
  }
  if (!s.tipoDocumento) {
    errors.tipoDocumento = 'El tipo de documento es obligatorio.';
  }
  if (!s.documento || isNaN(Number(s.documento))) {
    errors.documento = 'El documento es obligatorio y debe ser numérico.';
  }
  if (!s.cliente || s.cliente.trim().length < 3) {
    errors.cliente = 'El nombre del cliente es obligatorio (mín. 3 caracteres).';
  }
  if (!s.direccionCliente) {
    errors.direccionCliente = 'La dirección del cliente es obligatoria.';
  }
  if (!s.telefonoCliente) {
    errors.telefonoCliente = 'El teléfono del cliente es obligatorio.';
  }
  if (!s.mailCliente) {
    errors.mailCliente = 'El email del cliente es obligatorio.';
  }
  if (!s.tipoVehiculo) {
    errors.tipoVehiculo = 'El tipo de vehículo es obligatorio.';
  }
  if (!s.patente || s.patente.trim().length < 6) {
    errors.patente = 'La patente es obligatoria (mín. 6 caracteres).';
  }
  if (!s.marca) {
    errors.marca = 'La marca es obligatoria.';
  }
  if (!s.modelo) {
    errors.modelo = 'El modelo es obligatorio.';
  }
  if (!s.anioFabricacion || isNaN(Number(s.anioFabricacion))) {
    errors.anioFabricacion = 'El año de fabricación es obligatorio y debe ser numérico.';
  }
  if (!s.numeroDeMotor) {
    errors.numeroDeMotor = 'El número de motor es obligatorio.';
  }
  if (!s.numeroDeChasis) {
    errors.numeroDeChasis = 'El número de chasis es obligatorio.';
  }
  if (!s.tipoSiniestro) {
    errors.tipoSiniestro = 'El tipo de siniestro es obligatorio.';
  }
  if (!s.fechaSiniestro) {
    errors.fechaSiniestro = 'La fecha del siniestro es obligatoria.';
  }
  if (!s.direccionSiniestro) {
    errors.direccionSiniestro = 'El lugar del siniestro es obligatorio.';
  }
  if (!s.descripcionSiniestro || s.descripcionSiniestro.trim().length < 5) {
    errors.descripcionSiniestro = 'La descripción es obligatoria (mín. 5 caracteres).';
  }
  return errors;
}

function handleSave(e) {
  e.preventDefault();
  Object.keys(localFieldErrors).forEach(k => delete localFieldErrors[k]);
  const errors = validateEditFields(localSiniestro);
  if (Object.keys(errors).length > 0) {
    Object.assign(localFieldErrors, errors);
    return;
  }
  emit('save', { ...localSiniestro });
}
</script>

<style scoped>
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
