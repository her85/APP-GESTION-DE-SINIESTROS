//controllers/siniestros.controllers.js
const {
  ingresarSiniestro, // Importa la función para insertar un nuevo siniestro en la base de datos
  generarNumeroSiniestro, // Importa la función para generar un número único de siniestro
  mostrarTodo, // Importa la función para obtener todos los siniestros de la base de datos
  buscarSiniestros, // Importa la función para buscar siniestros en la base de datos según ciertos criterios
  modificarSiniestro, // Importa la función para modificar un siniestro existente en la base de datos
  borrarPorNumeroSiniestro, // Importa la función para eliminar un siniestro por su número
} = require("../database/Siniestro.model"); // Importa las funciones de la base de datos desde el módulo 'db.js'

const sanitizeHtml = require('sanitize-html'); //SANITIZAR HTML PARA EVITAR INYECCIONES DE CÓDIGO MALICIOSO

/**
 * Registra un nuevo siniestro en la base de datos.
 * @async
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const ingresar_siniestro = async (req, res) => {
  // Ruta para ingresar un nuevo siniestro
  try{
  const numeroSiniestro = await generarNumeroSiniestro(); // Llama a la función para generar un número único de siniestro
    // Realizar la misma validación para los campos
    const { numeroPoliza, tipoDocumento, documentoCliente, nombreCliente, direccionCliente, telefonoCliente, mailCliente, tipoVehiculo, patente, marca, modelo, anioFabricacion, numeroDeMotor, numeroDeChasis, tipoSiniestro, fechaSiniestro, direccionSiniestro, descripcionSiniestro } = req.body;

    if (!numeroPoliza || !tipoDocumento || !documentoCliente || !nombreCliente || !direccionCliente || !telefonoCliente || !mailCliente || !tipoVehiculo || !patente || !marca || !modelo || !anioFabricacion || !numeroDeMotor || !numeroDeChasis || !tipoSiniestro || !fechaSiniestro || !direccionSiniestro || !descripcionSiniestro) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    const descripcionSanitizada = sanitizeHtml(req.body.descripcionSiniestro);
  await ingresarSiniestro({
    // Llama a la función para insertar un nuevo siniestro en la base de datos
    numeroSiniestro: numeroSiniestro, // Asigna el número de siniestro generado
    numeroPoliza: parseInt(req.body.numeroPoliza), // Convierte el número de póliza a entero
    tipoDocumento: req.body.tipoDocumento, // Asigna el tipo de documento
    documento: parseInt(req.body.documentoCliente), // Convierte el documento de cliente a entero
    cliente: req.body.nombreCliente.toUpperCase(), // Asigna el nombre del cliente en mayúsculas
    direccionCliente: req.body.direccionCliente.toUpperCase(), // Asigna la dirección del cliente en mayúsculas
    telefonoCliente: req.body.telefonoCliente, // Asigna el teléfono del cliente
    mailCliente: req.body.mailCliente, // Asigna el correo electrónico del cliente
    tipoVehiculo: req.body.tipoVehiculo, // Asigna el tipo de vehículo
    patente: req.body.patente.toUpperCase(), // Asigna la patente del vehículo en mayúsculas
    marca: req.body.marca.toUpperCase(), // Asigna la marca del vehículo en mayúsculas
    modelo: req.body.modelo.toUpperCase(), // Asigna el modelo del vehículo en mayúsculas
    anioFabricacion: req.body.anioFabricacion, // Asigna el año de fabricación del vehículo
    numeroDeMotor: req.body.numeroDeMotor.toUpperCase(), // Asigna el número de motor del vehículo en mayúsculas
    numeroDeChasis: req.body.numeroDeChasis.toUpperCase(), // Asigna el número de chasis del vehículo en mayúsculas
    tipoSiniestro: req.body.tipoSiniestro, // Asigna el tipo de siniestro
    //fechaSiniestro: new Date(req.body.fechaSiniestro), // Convierte la fecha de siniestro a un objeto Date
    fechaSiniestro: new Date(req.body.fechaSiniestro).setMinutes(
      new Date(req.body.fechaSiniestro).getMinutes() +
        new Date(req.body.fechaSiniestro).getTimezoneOffset()
    ), // Ajusta la fecha para la zona horaria local
    direccionSiniestro: req.body.direccionSiniestro.toUpperCase(), // Asigna la dirección del siniestro en mayúsculas
    descripcionSiniestro: descripcionSanitizada, // SANITIZA LA DESCRIPCIÓN DEL SINIESTRO
  }); // Inserta el nuevo siniestro en la base de datos
  res.json({ message: "Siniestro ingresado correctamente" }); // Devuelve un mensaje de éxito
} catch (error) {
  console.error("Error al modificar siniestro:", error);
  res.status(500).json({ error: "Error interno del servidor" });
}
};

/**
 * Obtiene todos los siniestros registrados.
 * @async
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const consultar_siniestro = async (req, res) => {
  // Ruta para consultar todos los siniestros
  try {
    const siniestros = await mostrarTodo(); // Llama a la función para obtener todos los siniestros de la base de datos
    res.json(siniestros); // Devuelve la lista de siniestros como respuesta JSON
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" }); // Si ocurre un error en la consulta, devuelve un error 500
    console.error("Error al consultar siniestros:", error); // Agrega este log para depuración
  }
};

/**
 * Consulta siniestros aplicando filtros por query params.
 * @async
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const consultar_siniestro_datos = async (req, res) => {
  try {
    // Ruta para consultar siniestros con filtros
    const query = {}; // Inicializa un objeto de consulta vacío
    if (req.query.numeroSiniestro) {
      // Si se proporciona un número de siniestro en la consulta
      query.numeroSiniestro = parseInt(req.query.numeroSiniestro); // Convierte el número de siniestro a entero
    }
    if (req.query.documentoCliente) {
      // Si se proporciona un documento de cliente en la consulta
      query.documento = parseInt(req.query.documentoCliente); // Convierte el documento de cliente a entero
    }
    if (req.query.patente) {
      // Si se proporciona una patente en la consulta
      query.patente = req.query.patente.toUpperCase(); // Convierte la patente a mayúsculas
    }
    if (req.query.desdeFechaSiniestro || req.query.hastaFechaSiniestro) {
      // Si se proporcionan fechas de siniestro en la consulta
      query.fechaSiniestro = {}; // Inicializa un objeto de fecha vacío
      if (req.query.desdeFechaSiniestro) {
        // Si se proporciona una fecha de inicio
        query.fechaSiniestro.$gte = new Date(req.query.desdeFechaSiniestro); // Convierte la fecha de inicio a un objeto Date
      }
      if (req.query.hastaFechaSiniestro) {
        // Si se proporciona una fecha de fin
        query.fechaSiniestro.$lte = new Date(req.query.hastaFechaSiniestro); // Convierte la fecha de fin a un objeto Date
      }
    }
    const siniestros = await buscarSiniestros(query); // Llama a la función para buscar siniestros en la base de datos según los criterios de consulta
    res.json(siniestros); // Devuelve la lista de siniestros como respuesta JSON
    if (siniestros.length === 0) {
      // Si no se encuentran siniestros
      console.log("No se encontraron siniestros"); // Agrega este log
    }
  } catch (error) {
    console.error("Error al consultar siniestros con filtros:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * Elimina un siniestro por su número.
 * @async
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const borrar_siniestro = async (req, res) => {
  // Ruta para borrar un siniestro
  const numeroSiniestro = parseInt(req.body.numeroSiniestro); // Accede a la propiedad numeroSiniestro y la convierte a entero
  await borrarPorNumeroSiniestro(numeroSiniestro); // Llama a la función para eliminar el siniestro de la base de datos
  res.json({ message: "Siniestro borrado correctamente" });
};

/**
 * Modifica los datos de un siniestro existente.
 * @async
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const modificar_siniestro = async (req, res) => {
  // Ruta para modificar un siniestro
  const numeroSiniestro = parseInt(req.body.numeroSiniestro); // Convierte el número de siniestro a entero
  const numeroPoliza = parseInt(req.body.numeroPoliza); // Convierte el número de póliza a entero
  const tipoDocumento = req.body.tipoDocumento; // Asigna el tipo de documento
  const documentoCliente = parseInt(req.body.documentoCliente); // Convierte el documento de cliente a entero
  const nombreCliente = req.body.nombreCliente.toUpperCase(); // Asigna el nombre del cliente en mayúsculas
  const direccionCliente = req.body.direccionCliente.toUpperCase(); // Asigna la dirección del cliente en mayúsculas
  const telefonoCliente = req.body.telefonoCliente; // Asigna el teléfono del cliente
  const mailCliente = req.body.mailCliente; // Asigna el correo electrónico del cliente
  const tipoVehiculo = req.body.tipoVehiculo; // Asigna el tipo de vehículo
  const patente = req.body.patente.toUpperCase(); // Asigna la patente del vehículo en mayúsculas
  const marca = req.body.marca.toUpperCase(); // Asigna la marca del vehículo en mayúsculas
  const modelo = req.body.modelo.toUpperCase(); // Asigna el modelo del vehículo en mayúsculas
  const anioFabricacion = req.body.anioFabricacion; // Asigna el año de fabricación del vehículo
  const numeroDeMotor = req.body.numeroDeMotor.toUpperCase(); // Asigna el número de motor del vehículo en mayúsculas
  const numeroDeChasis = req.body.numeroDeChasis.toUpperCase(); // Asigna el número de chasis del vehículo en mayúsculas
  const tipoSiniestro = req.body.tipoSiniestro; // Asigna el tipo de siniestro
  const nuevaFecha = req.body.fechaSiniestro; // Asigna la nueva fecha de siniestro
  const fechaSiniestro = new Date(nuevaFecha); // Convierte la nueva fecha de siniestro a un objeto Date
  fechaSiniestro.setMinutes(
    fechaSiniestro.getMinutes() + fechaSiniestro.getTimezoneOffset()
  ); // Ajusta la fecha para la zona horaria local
  const direccionSiniestro = req.body.direccionSiniestro.toUpperCase(); // Asigna la dirección del siniestro en mayúsculas
  // Sanitiza la descripción del siniestro
  const descripcionSiniestro = sanitizeHtml(req.body.descripcionSiniestro); // SANITIZA LA DESCRIPCIÓN DEL SINIESTRO
  await modificarSiniestro(
    // Llama a la función para modificar el siniestro en la base de datos
    numeroSiniestro, // Asigna el número de siniestro
    numeroPoliza, // Asigna el número de póliza
    tipoDocumento, // Asigna el tipo de documento
    documentoCliente, // Asigna el documento de cliente
    nombreCliente, // Asigna el nombre del cliente
    direccionCliente, // Asigna la dirección del cliente
    telefonoCliente, // Asigna el teléfono del cliente
    mailCliente, // Asigna el correo electrónico del cliente
    tipoVehiculo, // Asigna el tipo de vehículo
    patente, // Asigna la patente del vehículo
    marca, // Asigna la marca del vehículo
    modelo, // Asigna el modelo del vehículo
    anioFabricacion, // Asigna el año de fabricación del vehículo
    numeroDeMotor, // Asigna el número de motor del vehículo
    numeroDeChasis, // Asigna el número de chasis del vehículo
    tipoSiniestro, // Asigna el tipo de siniestro
    fechaSiniestro, // Asigna la fecha de siniestro
    direccionSiniestro, // Asigna la dirección del siniestro
    descripcionSiniestro // Asigna la descripción del siniestro
  ); // Modifica el siniestro en la base de datos
  res.json({ message: "Siniestro modificado correctamente" }); // Devuelve un mensaje de éxito
};

module.exports = {// Exporta las funciones para que puedan ser utilizadas en otros módulos
  ingresar_siniestro, // Exporta la función para ingresar un nuevo siniestro
  consultar_siniestro, // Exporta la función para consultar todos los siniestros
  consultar_siniestro_datos, // Exporta la función para consultar siniestros con filtros
  borrar_siniestro, // Exporta la función para borrar un siniestro
  modificar_siniestro, // Exporta la función para modificar un siniestro
};
