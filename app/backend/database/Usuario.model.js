const { database } = require('./db');
const usuarios = database.collection("usuarios");

/**
 * Inserta un nuevo usuario en la base de datos.
 * @async
 * @param {Object} usuario - Objeto usuario a insertar.
 * @returns {Promise<void>}
 */
async function crearUsuario(usuario) {
  await usuarios.insertOne(usuario);
}

/**
 * Retorna todos los usuarios de la base de datos.
 * @async
 * @returns {Promise<Object[]>}
 */
async function listarUsuarios(){
  return await usuarios.find({}).toArray();
};

/**
 * Busca un usuario según los criterios dados.
 * @async
 * @param {Object} usuario - Criterios de búsqueda.
 * @returns {Promise<Object|null>}
 */
async function buscarUsuario(usuario) {
  return await usuarios.findOne(usuario);
}

/**
 * Modifica un usuario existente.
 * @async
 * @param {Object} _id - ID del usuario a modificar.
 * @param {Object} nuevosDatos - Datos a actualizar.
 * @returns {Promise<boolean>}
 */
async function modificarUsuario(_id, nuevosDatos){
  const resultado = await usuarios.updateOne(
    { _id: _id },
    { $set: nuevosDatos }
  );
  return resultado.modifiedCount > 0;
};

/**
 * Elimina un usuario por su ID.
 * @async
 * @param {Object} _id - ID del usuario a eliminar.
 * @returns {Promise<boolean>}
 */
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