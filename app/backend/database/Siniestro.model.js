const { database } = require('./db');
const siniestros = database.collection("siniestros");

/**
 * Inserta un nuevo siniestro en la base de datos.
 * @async
 * @param {Object} siniestro - Objeto siniestro a insertar.
 * @returns {Promise<void>}
 */
async function ingresarSiniestro(siniestro) {
  await siniestros.insertOne(siniestro);
}

/**
 * Genera un nuevo número de siniestro incremental.
 * @async
 * @returns {Promise<number>}
 */
async function generarNumeroSiniestro() {
  let nuevoNumero = 1;
  const ultimoSiniestro = await siniestros.findOne({}, {
    sort: { numeroSiniestro: -1 },
  });
  if (ultimoSiniestro) {
    nuevoNumero = ultimoSiniestro.numeroSiniestro + 1;
  }
  return nuevoNumero;
}

/**
 * Retorna todos los siniestros de la base de datos.
 * @async
 * @returns {Promise<Object[]>}
 */
async function mostrarTodo() {
  return await siniestros.find({}).toArray();
}

/**
 * Busca siniestros según los criterios dados.
 * @async
 * @param {Object} query - Criterios de búsqueda.
 * @returns {Promise<Object[]>}
 */
async function buscarSiniestros(query) {
  return await siniestros.find(query).toArray();
}

/**
 * Modifica un siniestro existente.
 * @async
 * @param {number} numeroSiniestro
 * @param {number} numeroPoliza
 * @param {string} tipoDocumento
 * @param {number} documentoCliente
 * @param {string} nombreCliente
 * @param {string} direccionCliente
 * @param {string} telefonoCliente
 * @param {string} mailCliente
 * @param {string} tipoVehiculo
 * @param {string} patente
 * @param {string} marca
 * @param {string} modelo
 * @param {number} anioFabricacion
 * @param {string} numeroDeMotor
 * @param {string} numeroDeChasis
 * @param {string} tipoSiniestro
 * @param {Date} fechaSiniestro
 * @param {string} direccionSiniestro
 * @param {string} descripcionSiniestro
 * @returns {Promise<void>}
 */
async function modificarSiniestro(
  numeroSiniestro,
  numeroPoliza,
  tipoDocumento,
  documentoCliente,
  nombreCliente,
  direccionCliente,
  telefonoCliente,
  mailCliente,
  tipoVehiculo,
  patente,
  marca,
  modelo,
  anioFabricacion,
  numeroDeMotor,
  numeroDeChasis,
  tipoSiniestro,
  fechaSiniestro,
  direccionSiniestro,
  descripcionSiniestro
) {
  await siniestros.updateOne(
    { numeroSiniestro },
    {
      $set: {
        numeroPoliza,
        tipoDocumento,
        documento: documentoCliente,
        cliente: nombreCliente,
        direccionCliente,
        telefonoCliente,
        mailCliente,
        tipoVehiculo,
        patente,
        marca,
        modelo,
        anioFabricacion,
        numeroDeMotor,
        numeroDeChasis,
        tipoSiniestro,
        fechaSiniestro,
        direccionSiniestro,
        descripcionSiniestro,
      },
    }
  );
}

/**
 * Elimina un siniestro por su número.
 * @async
 * @param {number} numeroSiniestro - Número de siniestro a eliminar.
 * @returns {Promise<void>}
 */
async function borrarPorNumeroSiniestro(numeroSiniestro) {
  await siniestros.deleteOne({ numeroSiniestro });
}

module.exports = {
  ingresarSiniestro,
  generarNumeroSiniestro,
  mostrarTodo,
  buscarSiniestros,
  modificarSiniestro,
  borrarPorNumeroSiniestro,
};
