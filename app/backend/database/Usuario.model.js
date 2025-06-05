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

async function modificarUsuario(_id, nuevosDatos){
  const resultado = await usuarios.updateOne(
    { _id: _id },
    { $set: nuevosDatos }
  );
  return resultado.modifiedCount > 0;
};

async function borrarUsuario(_id){
  const resultado = await usuarios.deleteOne({ _id:_id });
  return resultado.deletedCount > 0;
};


module.exports = {
  crearUsuario,
  listarUsuarios,
  buscarUsuario,
  modificarUsuario,
  borrarUsuario
};