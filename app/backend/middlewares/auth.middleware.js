// src/middlewares/auth.middleware.js

//01-Usar Autenticación Segura (JWT) y 02-Implementar Autorización con RBAC

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Token requerido" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido o expirado" });
    req.user = user;
    console.log("verificacion token");
    next();
  });
};

// Middleware para verificar roles
const authorizeRole = (rolesPermitidos = []) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({ error: "Acceso no autorizado" });
    }
    console.log("Verificacion roles")
    next();
  };
};


//module.exports = authenticateToken;
module.exports = { authenticateToken, authorizeRole };