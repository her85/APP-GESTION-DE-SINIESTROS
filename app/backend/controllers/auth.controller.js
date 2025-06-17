const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Importa bcryptjs
const { SECRET_KEY } = require("../config/config");
const { buscarUsuario } = require("../database/Usuario.model");
const logger = require("../utils/logger");

/**
 * Inicia sesión de usuario, valida credenciales y genera un token JWT.
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await buscarUsuario({ username });
    if (!user) {
      logger.warn(`Intento de login fallido: usuario inexistente (${username})`, { username, ip: req.ip });
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Intento de login fallido: contraseña incorrecta para usuario (${username})`, { username, ip: req.ip });
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    // Genera el token //AUTENTICACION SEGURA (JWT) y AUTORIZACION CON RBAC
    const token = jwt.sign(
      { username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        //secure: process.env.NODE_ENV === 'production',
        sameSite: 'none', // Permite cookies entre dominios (cross-site)
        maxAge: 60 * 60 * 1000 // 1 hora
      })
      .json({ message: "Login exitoso", role: user.role  });
  } catch (error) {
    logger.error("Error al ingresar a la app", { error, username, ip: req.ip });
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * Cierra la sesión del usuario eliminando la cookie del token.
 * @function
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 */
const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    //secure: process.env.NODE_ENV === 'production'
  });
  res.json({ message: 'Logout exitoso' });
};

module.exports = { login, logout };
