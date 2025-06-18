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
    body('numeroPoliza').notEmpty().trim(), 
    body('tipoDocumento').notEmpty().trim(), 
    body('documentoCliente').notEmpty().trim(), 
    body('nombreCliente').notEmpty().trim(),
    body('direccionCliente').notEmpty().trim(),
    body('telefonoCliente').notEmpty().trim(),
    body('mailCliente').notEmpty().trim(), 
    body('tipoVehiculo').notEmpty().trim(),
    body('patente').notEmpty().trim(), 
    body('marca').notEmpty().trim(),
    body('modelo').notEmpty().trim(),
    body('anioFabricacion').notEmpty().trim(), 
    body('numeroDeMotor').notEmpty().trim(),
    body('numeroDeChasis').notEmpty().trim(),
    body('tipoSiniestro').notEmpty().trim(),
    body('fechaSiniestro').notEmpty(), 
    body('direccionSiniestro').notEmpty().trim(),
    body('descripcionSiniestro').notEmpty().trim(),
], validarSiniestro, ctrl.ingresar_siniestro);

// Consultas (Administrador, Tramitador y Consulta)
router.get("/consultar_siniestro", authenticateToken, authorizeRole(["Administrador", "Tramitador", "Consulta"]), ctrl.consultar_siniestro);
router.get("/consultar_siniestro/datos", authenticateToken, authorizeRole(["Administrador", "Tramitador", "Consulta"]), ctrl.consultar_siniestro_datos);

// Modificación (Administrador y Tramitador)
router.put("/modificar_siniestro",limit, authenticateToken, authorizeRole(["Administrador", "Tramitador"]), [
    body('numeroSiniestro').notEmpty().trim(), 
    body('numeroPoliza').notEmpty().trim(), 
    body('tipoDocumento').notEmpty().trim(),
    body('documentoCliente').notEmpty().trim(), 
    body('nombreCliente').notEmpty().trim(),
    body('direccionCliente').notEmpty().trim(),
    body('telefonoCliente').notEmpty().trim(),
    body('mailCliente').notEmpty().notEmpty().trim(), 
    body('tipoVehiculo').notEmpty().trim(),
    body('patente').notEmpty().trim().trim(), 
    body('marca').notEmpty().trim(),
    body('modelo').notEmpty().trim(),
    body('anioFabricacion').notEmpty().trim(), 
    body('numeroDeMotor').notEmpty().trim(),
    body('numeroDeChasis').notEmpty().trim(),
    body('tipoSiniestro').notEmpty().trim(),
    body('fechaSiniestro').notEmpty().trim(), 
    body('direccionSiniestro').notEmpty().trim(),
    body('descripcionSiniestro').notEmpty().trim(),
], validarSiniestro, ctrl.modificar_siniestro);

// Borrado (solo Administrador)
router.delete("/borrar_siniestro",limit, authenticateToken, authorizeRole(["Administrador", "Tramitador"]), ctrl.borrar_siniestro);

module.exports = router;
