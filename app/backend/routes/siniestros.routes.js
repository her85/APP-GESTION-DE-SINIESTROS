// routes/siniestros.routes.js

const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/siniestros.controller");

// Ingreso (Administrador y Tramitador)
router.post("/ingresar_siniestro", authenticateToken, authorizeRole(["Administrador", "Tramitador"]), ctrl.ingresar_siniestro);

// Consultas (Administrador, Tramitador y Consulta)
router.get("/consultar_siniestro", authenticateToken, authorizeRole(["Administrador", "Tramitador", "Consulta"]), ctrl.consultar_siniestro);
router.get("/consultar_siniestro/datos", authenticateToken, authorizeRole(["Administrador", "Tramitador", "Consulta"]), ctrl.consultar_siniestro_datos);

// Modificación (Administrador y Tramitador)
router.put("/modificar_siniestro", authenticateToken, authorizeRole(["Administrador", "Tramitador"]), ctrl.modificar_siniestro);

// Borrado (solo Administrador)
router.delete("/borrar_siniestro", authenticateToken, authorizeRole(["Administrador", "Tramitador"]), ctrl.borrar_siniestro);

module.exports = router;
