const app = require("./app");
const { PORT } = require("./config/config");

/**
 * Inicia el servidor Express en el puerto configurado.
 * @function
 */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});