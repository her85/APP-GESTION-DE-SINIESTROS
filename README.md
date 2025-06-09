# Gestión de Siniestros

Sistema web para la gestión integral de siniestros, con autenticación segura, control de roles y experiencia de usuario moderna.

## Funcionalidades
- **Registro de siniestros:** Alta de siniestros con descripción, fecha, ubicación, tipo, etc.
- **Visualización:** Listado y detalle de siniestros registrados.
- **Edición:** Modificación de siniestros por usuarios autorizados.
- **Eliminación:** Borrado de siniestros por usuarios autorizados.
- **Búsqueda y filtrado:** Por patente, DNI del cliente o rango de fechas.
- **Autenticación y autorización:**
  - Inicio de sesión seguro (JWT en cookie httpOnly).
  - Control de acceso por roles: Administrador, Tramitador, Consulta.

## Herramientas utilizadas
- **Backend:**
  - Node.js, Express, MongoDB
  - JWT para autenticación
  - Helmet y CORS para seguridad
  - Winston y Morgan para logs
- **Frontend:**
  - Vue 3, Pinia, Vue Router
  - Bootstrap 5 para UI
  - Axios para consumo de API

## Requisitos previos
- Node.js >= 16
- MongoDB Atlas o local

## Instalación
1. Clona el repositorio y entra a la carpeta del proyecto.
2. Instala dependencias en backend y frontend:
   ```sh
   cd app/backend
   npm install
   cd ../frontend
   npm install
   ```
3. Configura las variables de entorno en `app/backend/.env` .

## Ejecución
### Backend
```sh
cd app/backend
npm start
```
### Frontend
```sh
cd app/frontend
npm run dev
```

## Usuarios de prueba
| Rol           | Usuario        | Contraseña  |
|---------------|---------------|-------------|
| Administrador | Administrador  | string   |
| Tramitador    | Tramitador    | string    |
| Consulta      | Consulta      | string    |

## Estructura del proyecto
```
app/
  backend/   # API Express, controladores, modelos, middlewares
  frontend/  # Vue 3, Pinia, componentes, vistas, servicios
```

## Ejemplos de uso de la API
### Login (autenticación)
```http
POST /login
Content-Type: application/json
{
  "username": "Administrador",
  "password": "string"
}
```
Respuesta:
```json
{
  "message": "Login exitoso",
  "role": "Administrador"
}
```

### Listar usuarios (requiere rol Administrador)
```http
GET /listar_usuarios
Cookie: token=... (se envía automáticamente si usas el frontend)
```

### Ingresar siniestro (requiere rol Administrador o Tramitador)
```http
POST /ingresar_siniestro
Content-Type: application/json
{
  "numeroPoliza": 12345,
  "tipoDocumento": "DNI",
  ...otros campos...
}
```

### Consultar siniestros
```http
GET /consultar_siniestro
```

## Notas de seguridad
- El sistema usa JWT en cookies httpOnly para autenticación.
- Helmet y CORS están configurados para máxima seguridad.
- (Opcional) Puedes activar CSRF y CSP según tus necesidades.
- Variables sensibles se gestionan en `.env` y nunca se suben al repositorio.

## Notas de desarrollo
- **Frontend:**
  - Lógica de formularios y feedback centralizada en composables (`useForm.js`, `useFeedback.js`).
  - Componentes reutilizables y estructura modular.
- **Backend:**
  - Lógica de negocio en controladores, validación y autenticación en middlewares.
  - Logger centralizado (Winston) y logs de acceso (Morgan).
- **Extensión:**
  - Para agregar nuevas vistas, crea un componente en `src/views` y registra la ruta en `src/router/index.js`.
- **Pruebas:**
  - Usuarios de prueba y datos de ejemplo están en el README y `.env`.

---




