//src/routes/auth.routes.js

const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/auth.controller");
const rateLimit = require("express-rate-limit") // LIMITA PETICIONES PARA PREVENIR ATAQUES DE FUERZA BRUTA
const { body, validationResult } = require('express-validator');

/**
 * Límite de peticiones para rutas de autenticación.
 * @type {import('express-rate-limit').RateLimit}
 */
const limit = rateLimit({
    windowMs : 15 * 60 * 1000, //15 minutos
    max : 10, // Maximo de peticiones por IP
    message : "Demasiadas solicitudes, intente mas tarde",
});

/**
 * Middleware de validación para el login.
 */
const validarLogin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

/**
 * Rutas de autenticación (login y logout).
 * @module auth.routes
 */
router.post(
  "/login",
  limit,
  [
    body('username').notEmpty().trim().escape(),
    body('password').notEmpty().trim().escape()
  ],
  validarLogin,
  ctrl.login
);
router.post("/logout", ctrl.logout);

module.exports = router;