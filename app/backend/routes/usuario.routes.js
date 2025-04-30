// routes/usuario.routes.js

const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/usuario.controller");

//crear rutas usuarios
// Solo el rol "Administrador" puede acceder a estas rutas
router.post("/crear_usuario", authenticateToken, authorizeRole(["Administrador"]), ctrl.crear_usuario);
router.get("/listar_usuarios", authenticateToken, authorizeRole(["Administrador"]), ctrl.listar_usuarios);
router.get("/buscar_usuario:id", authenticateToken, authorizeRole(["Administrador"]), ctrl.buscar_usuario);
router.put("/modificar_usuario", authenticateToken, authorizeRole(["Administrador"]), ctrl.modificar_usuario);
router.delete("/borrar_usuario", authenticateToken, authorizeRole(["Administrador"]), ctrl.borrar_usuario);

module.exports = router;
