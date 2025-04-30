const { database } = require('./db');
const usuarios = database.collection("usuarios");

async function crearUsuario(usuario) {
  await usuarios.insertOne(usuario);
}

async function listarUsuarios(){
  return await usuarios.find({}).toArray();
};

async function buscarUsuario(usuario) {
  return await usuarios.findOne(usuario);
}

async function modificarUsuario(id, nuevosDatos){
  const resultado = await usuarios.updateOne(
    { id: id },
    { $set: nuevosDatos }
  );
  return resultado.modifiedCount > 0;
};

async function borrarUsuario(id){
  const resultado = await usuarios.deleteOne({ id: id });
  return resultado.deletedCount > 0;
};


module.exports = {
  crearUsuario,
  listarUsuarios,
  buscarUsuario,
  modificarUsuario,
  borrarUsuario
};