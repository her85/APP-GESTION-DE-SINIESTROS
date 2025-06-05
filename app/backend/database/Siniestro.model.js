const { database } = require('./db');
const siniestros = database.collection("siniestros");

async function ingresarSiniestro(siniestro) {
  await siniestros.insertOne(siniestro);
}

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

async function mostrarTodo() {
  return await siniestros.find({}).toArray();
}

async function buscarSiniestros(query) {
  return await siniestros.find(query).toArray();
}

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
