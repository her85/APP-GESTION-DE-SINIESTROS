// routes/siniestros.routes.js

const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/siniestros.controller");
const rateLimit = require("express-rate-limit") // LIMITA PETICIONES PARA PREVENIR
const { body, validationResult } = require('express-validator'); // VALIDACIONES DE ENTRADA

/**
 * Límite de peticiones para rutas de siniestros.
 * @type {import('express-rate-limit').RateLimit}
 */
const limit = rateLimit({
    windowMs : 15 * 60 * 1000, //15 minutos
    max : 10, // Maximo de peticiones por IP
    message : "Demasiadas solicitudes, intente mas tarde",
});

/**
 * Middleware para validar los datos de entrada de un siniestro.
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const validarSiniestro = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

/**
 * Rutas para gestión de siniestros.
 * @module siniestros.routes
 */

// Ingreso (Administrador y Tramitador)
router.post("/ingresar_siniestro", limit, authenticateToken, authorizeRole(["Administrador", "Tramitador"]), [
    body('numeroPoliza').notEmpty().isInt().withMessage('Debe ser un número').toInt(),
    body('tipoDocumento').notEmpty().trim().escape(),
    body('documentoCliente').notEmpty().isInt().withMessage('Debe ser un número').toInt(),
    body('nombreCliente').notEmpty().trim().escape(),
    body('direccionCliente').notEmpty().trim().escape(),
    body('telefonoCliente').notEmpty().trim().escape(),
    body('mailCliente').notEmpty().isEmail().normalizeEmail(),
    body('tipoVehiculo').notEmpty().trim().escape(),
    body('patente').notEmpty().trim().escape(),
    body('marca').notEmpty().trim().escape(),
    body('modelo').notEmpty().trim().escape(),
    body('anioFabricacion').notEmpty().isInt().withMessage('Debe ser un número').toInt(),
    body('numeroDeMotor').notEmpty().trim().escape(),
    body('numeroDeChasis').notEmpty().trim().escape(),
    body('tipoSiniestro').notEmpty().trim().escape(),
    body('fechaSiniestro').notEmpty().isISO8601().toDate(),
    body('direccionSiniestro').notEmpty().trim().escape(),
    body('descripcionSiniestro').notEmpty().trim().escape(),
], validarSiniestro, ctrl.ingresar_siniestro);

// Consultas (Administrador, Tramitador y Consulta)
router.get("/consultar_siniestro", authenticateToken, authorizeRole(["Administrador", "Tramitador", "Consulta"]), ctrl.consultar_siniestro);
router.get("/consultar_siniestro/datos", authenticateToken, authorizeRole(["Administrador", "Tramitador", "Consulta"]), ctrl.consultar_siniestro_datos);

// Modificación (Administrador y Tramitador)
router.put("/modificar_siniestro",limit, authenticateToken, authorizeRole(["Administrador", "Tramitador"]), [
    body('numeroSiniestro').notEmpty().isInt().withMessage('Debe ser un número').toInt(),
    body('numeroPoliza').optional().isInt().toInt(),
    body('tipoDocumento').optional().trim().escape(),
    body('documentoCliente').optional().isInt().toInt(),
    body('nombreCliente').optional().trim().escape(),
    body('direccionCliente').optional().trim().escape(),
    body('telefonoCliente').optional().trim().escape(),
    body('mailCliente').optional().isEmail().normalizeEmail(),
    body('tipoVehiculo').optional().trim().escape(),
    body('patente').optional().trim().escape(),
    body('marca').optional().trim().escape(),
    body('modelo').optional().trim().escape(),
    body('anioFabricacion').optional().isInt().toInt(),
    body('numeroDeMotor').optional().trim().escape(),
    body('numeroDeChasis').optional().trim().escape(),
    body('tipoSiniestro').optional().trim().escape(),
    body('fechaSiniestro').optional().isISO8601().toDate(),
    body('direccionSiniestro').optional().trim().escape(),
    body('descripcionSiniestro').optional().trim().escape(),
], validarSiniestro, ctrl.modificar_siniestro);

// Borrado (solo Administrador)
router.delete("/borrar_siniestro",limit, authenticateToken, authorizeRole(["Administrador", "Tramitador"]), ctrl.borrar_siniestro);

module.exports = router;
