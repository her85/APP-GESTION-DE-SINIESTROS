// src/middlewares/auth.middleware.js

//AUTENTICACION SEGURA (JWT) y AUTORIZACION CON RBAC

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

/**
 * Middleware para autenticar el token JWT de la solicitud.
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Busca el token primero en la cookie, luego en el header
  const token = req.cookies?.token || (authHeader && authHeader.split(' ')[1]);

  if (!token) return res.status(401).json({ error: "Token requerido" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido o expirado" });
    req.user = user;
    next();
  });
};

/**
 * Middleware para autorizar el acceso según el rol del usuario.
 * @function
 * @param {string[]} [rolesPermitidos=[]] - Lista de roles permitidos.
 * @returns {function(import('express').Request, import('express').Response, import('express').NextFunction): void}
 */
const authorizeRole = (rolesPermitidos = []) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.role)) { 
      return res.status(403).json({ error: "Acceso no autorizado" });
    }
    next();
  };
};


module.exports = { authenticateToken, authorizeRole };