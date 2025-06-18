const express = require("express"); // Importa el framework Express.js para crear el servidor web
const path = require("path"); // Importa el módulo 'path' para trabajar con rutas de archivos y directorios

const cors = require("cors"); // Importa el middleware CORS para habilitar solicitudes desde diferentes dominios
const morgan = require("morgan"); // REGISTRAR LOGS Y MONITOREAR ACTIVIDAD
const helmet = require("helmet"); // HELMET Mejora la seguridad de las cabeceras HTTP
const cookieParser = require('cookie-parser'); // Importa el middleware para manejar cookies

/**
 * Instancia principal de la aplicación Express.
 * Configura middlewares de seguridad, CORS, logs, cookies y rutas estáticas.
 * @type {import('express').Express}
 */
const app = express();  // Crea una instancia de la aplicación Express

// Habilita trust proxy para que Express reconozca correctamente el header X-Forwarded-For en Render
app.set('trust proxy', 1);

// Cors seguro, solo dominios especificos - CORS SEGURO
const corsOptions = {
  origin : ['https://gestor-de-siniestros.onrender.com', 'http://localhost:5173'], // Permite solicitudes desde estos dominios
  methods : ['GET, POST,PUT,DELETE'],
  allowedHeaders : ['Content-Type', 'Authorization'],
  credentials: true // Permite el envío de cookies
}
app.use(helmet()); // HELMET 

// Configuración de logs según entorno
if (process.env.NODE_ENV === 'production') {
  const fs = require('fs');
  const path = require('path');
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: accessLogStream }));
} else {
  app.use(morgan('dev'));
}

app.use(cors(corsOptions)); // CORS SEGURO
app.use(cookieParser()); // Middleware para manejar cookies

app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.urlencoded({ extended: false })); // Middleware para analizar el cuerpo de las solicitudes URL-encoded


// Rutas de la API (devuelven JSON)

app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/usuario.routes"));
app.use("/", require("./routes/siniestros.routes"));

// Exporta la aplicación para su uso en otros módulos
module.exports = app;
