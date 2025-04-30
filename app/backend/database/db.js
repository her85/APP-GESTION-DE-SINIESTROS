// Importamos las clases necesarias de MongoDB
const { MongoClient, ServerApiVersion } = require("mongodb");
// Importamos las credenciales de la base de datos desde un archivo de configuración
const  { MONGODB_USR, MONGODB_PWD } = require('../config/config.js');

// Construimos la URI de conexión a MongoDB Atlas usando las credenciales importadas
const uri =
"mongodb+srv://" + MONGODB_USR + ":" + MONGODB_PWD + "@cluster0.hloqam6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {// Creamos un nuevo cliente de MongoDB con la versión estable de la API
  serverApi: {
    version: ServerApiVersion.v1, // Establecemos la versión de la API del servidor
    strict: true, // Habilitamos el modo estricto para la API del servidor
    deprecationErrors: true, // Habilitamos los errores de deprecación para la API del servidor
  },
});

async function connectToDb() { // Función para conectar a la base de datos
  try {
    await client.connect(); // Intentamos conectar al cliente de MongoDB
    console.log("Conectado a MongoDB!");
    // Ahora puedes realizar operaciones de MongoDB usando el objeto `client`
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error); // Si hay un error, lo mostramos en la consola
    process.exit(1); // Termina el proceso si la conexión falla
  }
}

process.on('SIGINT', async () => { // Cierra la conexión cuando la aplicación se cierra
  if (client) { // Si el cliente de MongoDB está definido
    await client.close(); // Cerramos la conexión al cliente de MongoDB
    console.log('Conexión a MongoDB cerrada'); // Mostramos un mensaje en la consola
  }
  process.exit(); // Salimos del proceso
});

// Conectamos a la base de datos
connectToDb();
// Seleccionamos la base de datos y la colección con la que vamos a trabajar
const database = client.db("database"); // Selecciona la base de datos llamada "database"

module.exports = {database};
