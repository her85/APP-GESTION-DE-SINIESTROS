const bcrypt = require("bcryptjs")
const {
    crearUsuario,
    listarUsuarios,
    buscarUsuario,
    modificarUsuario,
    borrarUsuario
} = require("../database/Usuario.model");

const crear_usuario = async (req, res) => {
  try{
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    await crearUsuario({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
    });
    res.json({ message: "Usuario ingresado correctamente" });
  }catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear usuario" });
}
};

const listar_usuarios = async (req, res) => {
  try {
    const usuarios = await listarUsuarios();
    res.json(usuarios);
} catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ message: "Error al listar usuarios" });
}
};

const buscar_usuario = async (req, res) => {
};

const modificar_usuario = async (req, res) => {};

const borrar_usuario = async (req, res) => {
};

module.exports = {
  crear_usuario,
  listar_usuarios,
  buscar_usuario,
  modificar_usuario,
  borrar_usuario,
};
