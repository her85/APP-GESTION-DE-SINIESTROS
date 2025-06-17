const { config } = require("dotenv"); // Importamos el módulo dotenv para cargar variables de entorno desde un archivo .env
config(); // Cargamos las variables de entorno desde el archivo .env

/**
 * Usuario de MongoDB obtenido de las variables de entorno.
 * @type {string}
 */
const MONGODB_USR = process.env.MONGODB_USR; // Usuario de MongoDB
/**
 * Contraseña de MongoDB obtenida de las variables de entorno.
 * @type {string}
 */
const MONGODB_PWD = process.env.MONGODB_PWD; // Contraseña de MongoDB

if (!MONGODB_USR || !MONGODB_PWD) { // Verificamos si las variables de entorno están definidas
  throw new Error("Faltan las variables de entorno MONGODB_USR o MONGODB_PWD"); // Lanzamos un error si faltan las variables
}
 /**
 * Clave secreta para JWT.
 * @type {string}
 */
const SECRET_KEY = process.env.SECRET_KEY; // Usa una clave segura y mantenla en tus variables de entorno en producción
/**
 * Puerto de escucha del servidor.
 * @type {string|number}
 */
const PORT= process.env.PORT || 3000; // Definimos el puerto del servidor, si no está definido en las variables de entorno, usamos el 3000 por defecto

// Exportamos las variables de entorno para que puedan ser utilizadas en otros módulos
module.exports = { MONGODB_USR, MONGODB_PWD, SECRET_KEY, PORT };