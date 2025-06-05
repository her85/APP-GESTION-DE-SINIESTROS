// src/middlewares/auth.middleware.js

//AUTENTICACION SEGURA (JWT) y AUTORIZACION CON RBAC

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

//AUTENTICACION SEGURA (JWT)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Token requerido" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido o expirado" });
    req.user = user;
    next();
  });
};

// Middleware para verificar roles - AUTORIZACION CON RBAC
const authorizeRole = (rolesPermitidos = []) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.role)) { 
      return res.status(403).json({ error: "Acceso no autorizado" });
    }
    next();
  };
};


module.exports = { authenticateToken, authorizeRole };