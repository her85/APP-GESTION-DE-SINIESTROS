// routes/siniestros.routes.js

const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/siniestros.controller");
const rateLimit = require("express-rate-limit") // LIMITA PETICIONES PARA PREVENIR
const { body, validationResult } = require('express-validator'); // VALIDACIONES DE ENTRADA

const limit = rateLimit({
    windowMs : 15 * 60 * 1000, //15 minutos
    max : 10, // Maximo de peticiones por IP
    message : "Demasiadas solicitudes, intente mas tarde",
});

// Manejar los errores de validación
const validarSiniestro = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Ingreso (Administrador y Tramitador)
//router.post("/ingresar_siniestro", limit, authenticateToken, authorizeRole(["Administrador", "Tramitador"]), ctrl.ingresar_siniestro);
router.post("/ingresar_siniestro", limit, authenticateToken, authorizeRole(["Administrador", "Tramitador"]), [
    body('numeroPoliza').notEmpty().withMessage('El número de póliza es obligatorio').isInt().withMessage('El número de póliza debe ser un entero'),
    body('tipoDocumento').notEmpty().withMessage('El tipo de documento es obligatorio').isIn(['DNI', 'CUIT', 'CUIL']).withMessage('El tipo de documento no es válido'),
    body('documentoCliente').notEmpty().withMessage('El documento del cliente es obligatorio').isInt().withMessage('El documento del cliente debe ser un entero'),
    body('nombreCliente').notEmpty().withMessage('El nombre del cliente es obligatorio').trim(),
    body('direccionCliente').notEmpty().withMessage('La dirección del cliente es obligatoria').trim(),
    body('telefonoCliente').notEmpty().withMessage('El teléfono del cliente es obligatorio').trim(),
    body('mailCliente').isEmail().withMessage('El correo electrónico del cliente no es válido').optional({ nullable: true }),
    body('tipoVehiculo').notEmpty().withMessage('El tipo de vehículo es obligatorio').trim(),
    body('patente').notEmpty().withMessage('La patente es obligatoria').trim().isLength({ min: 6, max: 7 }).withMessage('La patente debe tener entre 6 y 7 caracteres'),
    body('marca').notEmpty().withMessage('La marca es obligatoria').trim(),
    body('modelo').notEmpty().withMessage('El modelo es obligatorio').trim(),
    body('anioFabricacion').notEmpty().withMessage('El año de fabricación es obligatorio').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('El año de fabricación no es válido'),
    body('numeroDeMotor').notEmpty().withMessage('El número de motor es obligatorio').trim(),
    body('numeroDeChasis').notEmpty().withMessage('El número de chasis es obligatorio').trim(),
    body('tipoSiniestro').notEmpty().withMessage('El tipo de siniestro es obligatorio').trim(),
    body('fechaSiniestro').notEmpty().withMessage('La fecha del siniestro es obligatoria').isISO8601().withMessage('La fecha del siniestro debe ser una fecha válida'),
    body('direccionSiniestro').notEmpty().withMessage('La dirección del siniestro es obligatoria').trim(),
    body('descripcionSiniestro').notEmpty().withMessage('La descripción del siniestro es obligatoria').trim(),
], validarSiniestro, ctrl.ingresar_siniestro);

// Consultas (Administrador, Tramitador y Consulta)
router.get("/consultar_siniestro", authenticateToken, authorizeRole(["Administrador", "Tramitador", "Consulta"]), ctrl.consultar_siniestro);
router.get("/consultar_siniestro/datos", authenticateToken, authorizeRole(["Administrador", "Tramitador", "Consulta"]), ctrl.consultar_siniestro_datos);

// Modificación (Administrador y Tramitador)
router.put("/modificar_siniestro",limit, authenticateToken, authorizeRole(["Administrador", "Tramitador"]), ctrl.modificar_siniestro);
/*router.put("/modificar_siniestro",limit, authenticateToken, authorizeRole(["Administrador", "Tramitador"]), [
    body('numeroSiniestro').notEmpty().withMessage('El número de siniestro es obligatorio').isInt().withMessage('El número de siniestro debe ser un entero'),
    body('numeroPoliza').optional().isInt().withMessage('El número de póliza debe ser un entero'),
    body('tipoDocumento').optional().isIn(['DNI', 'CUIT', 'CUIL']).withMessage('El tipo de documento no es válido'),
    body('documentoCliente').optional().isInt().withMessage('El documento del cliente debe ser un entero'),
    body('nombreCliente').optional().trim(),
    body('direccionCliente').optional().trim(),
    body('telefonoCliente').optional().trim(),
    body('mailCliente').optional().isEmail().withMessage('El correo electrónico del cliente no es válido').optional({ nullable: true }),
    body('tipoVehiculo').optional().trim(),
    body('patente').optional().trim().isLength({ min: 6, max: 7 }).withMessage('La patente debe tener entre 6 y 7 caracteres'),
    body('marca').optional().trim(),
    body('modelo').optional().trim(),
    body('anioFabricacion').optional().isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('El año de fabricación no es válido'),
    body('numeroDeMotor').optional().trim(),
    body('numeroDeChasis').optional().trim(),
    body('tipoSiniestro').optional().trim(),
    body('fechaSiniestro').optional().isISO8601().withMessage('La fecha del siniestro debe ser una fecha válida'),
    body('direccionSiniestro').optional().trim(),
    body('descripcionSiniestro').optional().trim(),
], validarSiniestro, ctrl.modificar_siniestro);*/

// Borrado (solo Administrador)
router.delete("/borrar_siniestro",limit, authenticateToken, authorizeRole(["Administrador", "Tramitador"]), ctrl.borrar_siniestro);

module.exports = router;
