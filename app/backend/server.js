const app = require("./app");
const { PORT } = require("./config/config");

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});