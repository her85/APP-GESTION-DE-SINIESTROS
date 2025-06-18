// routes/usuario.routes.js

const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/usuario.controller");
const rateLimit = require("express-rate-limit") // LIMITA PETICIONES PARA PREVENIR
const { body, validationResult } = require('express-validator'); // VALIDACIONES DE ENTRADA

/**
 * Límite de peticiones para rutas de usuario.
 * @type {import('express-rate-limit').RateLimit}
 */
const limit = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutos
    max: 10, // Maximo de peticiones por IP
    message: "Demasiadas solicitudes, intente mas tarde",
});

/**
 * Middleware para validar los datos de entrada de usuario.
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const validarUsuario = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

/**
 * Rutas para gestión de usuarios.
 * @module usuario.routes
 */

//crear rutas usuarios
// Solo el rol "Administrador" puede acceder a estas rutas
router.post("/crear_usuario", limit, authenticateToken, authorizeRole(["Administrador"]), [
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio').trim(),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('role').isIn(['Administrador', 'Tramitador', 'Consulta']).withMessage('El rol debe ser Administrador, Tramitador o Consulta'),
], validarUsuario, ctrl.crear_usuario);
//router.post("/crear_usuario", limit, authenticateToken, authorizeRole(["Administrador"]), ctrl.crear_usuario);

router.get("/listar_usuarios", authenticateToken, authorizeRole(["Administrador"]), ctrl.listar_usuarios);
router.get("/buscar_usuario", authenticateToken, authorizeRole(["Administrador"]), ctrl.buscar_usuario);

//router.put("/modificar_usuario", limit, authenticateToken, authorizeRole(["Administrador"]), ctrl.modificar_usuario);
router.put(
    '/modificar_usuario',
    authenticateToken,
    authorizeRole(['Administrador']),
    [
        body('username').optional().notEmpty().withMessage('El nombre de usuario es obligatorio').trim(),
        body('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        body('role').optional().isIn(['Administrador', 'Tramitador', 'Consulta']).withMessage('El rol debe ser Administrador, Tramitador o Consulta'),    
    ],validarUsuario,ctrl.modificar_usuario);
    
router.delete("/borrar_usuario", limit, authenticateToken, authorizeRole(["Administrador"]), ctrl.borrar_usuario);
//router.delete("/borrar_usuario/:id", ctrl.borrar_usuario);

module.exports = router;
