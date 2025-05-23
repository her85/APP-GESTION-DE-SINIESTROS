const express = require("express"); // Importa el framework Express.js para crear el servidor web
const path = require("path"); // Importa el módulo 'path' para trabajar con rutas de archivos y directorios

const cors = require("cors"); // Importa el middleware CORS para habilitar solicitudes desde diferentes dominios
const morgan = require("morgan"); // REGISTRAR LOGS Y MONITOREAR ACTIVIDAD
const helmet = require("helmet"); // HELMET Mejora la seguridad de las cabeceras HTTP

const app = express();  // Crea una instancia de la aplicación Express

const corsOptions = { // Cors seguro, solo dominios especificos - CORS SEGURO
  origin : ['http://localhost:5173'],
  methods : ['GET, POST,PUT,DELETE'],
  allowedHeaders : ['Content-Type', 'Authorization']
}
app.use(helmet()); // HELMET 
//app.use(morgan("combined")); // REGISTRAR LOGS Y MONITOREAR ACTIVIDAD
app.use(cors(corsOptions)); // CORS SEGURO

app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Servir archivos estáticos de la compilación de Vue.js
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.urlencoded({ extended: false })); // Middleware para analizar el cuerpo de las solicitudes URL-encoded


// Rutas de la API (devuelven JSON)

app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/usuario.routes"));
app.use("/", require("./routes/siniestros.routes"));

// Exporta la aplicación para su uso en otros módulos
module.exports = app;
