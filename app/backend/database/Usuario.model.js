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

async function modificarUsuario(){
};

async function borrarUsuario(id){
  await usuarios.deleteOne({id})
};


module.exports = {
  crearUsuario,
  listarUsuarios,
  buscarUsuario,
  modificarUsuario,
  borrarUsuario
};