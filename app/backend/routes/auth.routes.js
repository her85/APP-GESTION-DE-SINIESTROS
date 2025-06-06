//src/routes/auth.routes.js

const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/auth.controller");
const rateLimit = require("express-rate-limit") // LIMITA PETICIONES PARA PREVENIR ATAQUES DE FUERZA BRUTA

const limit = rateLimit({
    windowMs : 15 * 60 * 1000, //15 minutos
    max : 10, // Maximo de peticiones por IP
    message : "Demasiadas solicitudes, intente mas tarde",
});

router.post("/login", limit ,ctrl.login);
router.post("/logout", ctrl.logout);

module.exports = router;