const bcrypt = require("bcryptjs")
const { ObjectId } = require('mongodb'); 
const {
  crearUsuario,
  listarUsuarios,
  buscarUsuario,
  modificarUsuario,
  borrarUsuario
} = require("../database/Usuario.model");

/**
 * Crea un nuevo usuario en la base de datos.
 * @async
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const crear_usuario = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    await crearUsuario({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
    });
    res.json({ message: "Usuario ingresado correctamente" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Lista todos los usuarios registrados.
 * @async
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const listar_usuarios = async (req, res) => {
  try {
    const usuarios = await listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Busca un usuario por su ID.
 * @async
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const buscar_usuario = async (req, res) => {
  try {
    const usuario = await buscarUsuario({ id: req.params.id });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Modifica los datos de un usuario existente.
 * @async
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const modificar_usuario = async (req, res) => {
  try {
    const nuevosDatos = { ...req.body };
    // Eliminar el _id para evitar modificar un campo inmutable
    delete nuevosDatos._id;
    if (nuevosDatos.password) {
      nuevosDatos.password = bcrypt.hashSync(nuevosDatos.password, 10);
    }
    const idParaModificar = req.body._id;
    // Convertir el string _id a ObjectId
    const objectIdParaModificar = new ObjectId(idParaModificar);
    const modificado = await modificarUsuario(objectIdParaModificar, nuevosDatos);
    if (!modificado) {
      return res.status(404).json({ message: "Usuario no encontrado o no modificado" });
    }
    res.json({ success: true, message: "Usuario modificado correctamente" });
  } catch (error) {
    console.error("Error al modificar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Elimina un usuario por su ID.
 * @async
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const borrar_usuario = async (req, res) => {
  try {
    const idParaBorrar = req.body._id;
    // Convertir el string _id a ObjectId
    const objectIdParaBorrar = new ObjectId(idParaBorrar);
    const borrado = await borrarUsuario(objectIdParaBorrar);
    if (!borrado) {
      return res.status(404).json({ message: "Usuario no encontrado o no borrado" });
    }
    res.json({ success: true, message: "Usuario borrado correctamente" });
  } catch (error) {
    console.error("Error al borrar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  crear_usuario,
  listar_usuarios,
  buscar_usuario,
  modificar_usuario,
  borrar_usuario,
};
