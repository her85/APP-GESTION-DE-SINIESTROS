Gestion de siniestros

Funcionalidades

Registro de siniestros: Los usuarios pueden registrar nuevos siniestros proporcionando 
detalles como la descripción del incidente, fecha, ubicación, tipo de siniestro, etc.

Visualización: Los usuarios pueden ver un listado de todos los siniestros registrados.

Editar siniestros: Los usuarios con permisos adecuados pueden editar los detalles de un siniestro existente.

Eliminar siniestros: Los usuarios con permisos adecuados pueden eliminar un siniestro existente.


Búsqueda y filtrado: Herramientas para buscar siniestros patente, dni del cliente o filtrar por fecha.

Autenticación y autorización

Inicio de sesión seguro: Los usuarios pueden iniciar sesión con sus credenciales, 
recibiendo un JSON Web Token (JWT) para autenticación en solicitudes posteriores.

Roles de usuario: Implementación de diferentes roles (administrador, tramitador, consultas) 
para controlar el acceso a ciertas funcionalidades y datos. 
Por ejemplo, solo los administradores y tramitadores podrían eliminar siniestros.

Herramientas utilizadas

Node.js: Entorno de ejecución de JavaScript en el servidor para la lógica de la aplicación y la API RESTful.

Express: Framework web para Node.js que facilita la creación de la API, el manejo de rutas
y la implementación de middleware para la autenticación con JWT.
MongoDB: Base de datos NoSQL para almacenar información sobre usuarios, siniestros, documentos adjuntos, etc.

Vue 3: Framework progresivo de JavaScript para construir la interfaz de usuario del lado del cliente. 
Permite una experiencia de usuario dinámica y reactiva.

Vue Router: Para la gestión de rutas en el lado del cliente (SPA - Single Page Application).

Pinia: Para la gestión centralizada del estado de la aplicación, como la información del usuario autenticado o los datos de los siniestros.

Bootstrap: Framework CSS para el diseño y la presentación responsiva de la aplicación. Se utilizarán sus componentes (formularios, tablas, modales, alertas, etc.) para acelerar el desarrollo de la interfaz de usuario y asegurar una apariencia profesional.

JavaScript: Lenguaje de programación para la lógica del cliente (navegador) y la interacción con la API.

JSON Web Tokens (JWT): Estándar abierto para la creación de tokens de acceso que verifican la identidad del usuario y aseguran la comunicación entre el cliente y el servidor. Se utilizará para la autenticación y autorización en la API.




