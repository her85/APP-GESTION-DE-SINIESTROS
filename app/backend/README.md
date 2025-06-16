# Backend – Gestión de Siniestros

API RESTful desarrollada en Node.js y Express para la gestión de siniestros, usuarios y autenticación segura con JWT.

## Características principales
- Autenticación segura con JWT en cookies httpOnly
- Control de acceso por roles (Administrador, Tramitador, Consulta)
- Validación y sanitización de datos con express-validator y sanitize-html
- Lógica de negocio modularizada en controladores y modelos
- Logger centralizado (Winston) y logs de acceso (Morgan)
- Seguridad reforzada con Helmet y CORS
- Conexión a MongoDB Atlas o local

## Estructura del backend
```
backend/
  app.js           # Configuración principal de la app Express
  server.js        # Punto de entrada (levanta el servidor)
  config/          # Variables de entorno y configuración
  controllers/     # Lógica de negocio (auth, usuario, siniestros)
  database/        # Modelos y conexión a MongoDB
  middlewares/     # Middlewares de autenticación, validación, etc.
  routes/          # Definición de rutas de la API
  utils/           # Logger y utilidades
```

## Instalación y ejecución
1. Instala dependencias:
   ```sh
   npm install
   ```
2. Configura las variables de entorno en `.env` (ver ejemplo en el proyecto).
3. Inicia el servidor:
   ```sh
   npm start
   ```

## Variables de entorno requeridas
- `MONGODB_USR` y `MONGODB_PWD`: Credenciales de MongoDB Atlas
- `SECRET_KEY`: Clave secreta para firmar JWT
- `PORT`: Puerto del servidor (por defecto 3000)

## Endpoints principales
- `POST /login` – Login de usuario (devuelve cookie JWT y rol)
- `POST /logout` – Cierra sesión (borra cookie JWT)
- `GET /listar_usuarios` – Listar usuarios (solo Administrador)
- `POST /crear_usuario` – Crear usuario (solo Administrador)
- `PUT /modificar_usuario` – Modificar usuario (solo Administrador)
- `DELETE /borrar_usuario` – Borrar usuario (solo Administrador)
- `POST /ingresar_siniestro` – Registrar siniestro (Administrador/Tramitador)
- `GET /consultar_siniestro` – Consultar siniestros (todos los roles)

## Seguridad
- JWT en cookies httpOnly para autenticación
- Helmet para cabeceras seguras
- CORS restringido a frontend
- Winston y Morgan para logs y auditoría
- Validación y sanitización de entradas


