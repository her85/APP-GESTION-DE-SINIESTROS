# Frontend – Gestión de Siniestros

SPA desarrollada en Vue 3 para la gestión de siniestros, usuarios y autenticación segura, con experiencia de usuario moderna y responsiva.

## Características principales
- Login seguro con JWT en cookie httpOnly
- Control de acceso y visibilidad por roles (Administrador, Tramitador, Consulta)
- Formularios reactivos y validados, feedback visual centralizado
- Componentes reutilizables (tablas, modales, loader, navbar, paginación)
- Gestión de estado global con Pinia
- Consumo de API backend vía Axios
- Diseño responsivo con Bootstrap 5

## Estructura del frontend
```
frontend/
  src/
    assets/        # Estilos y recursos
    components/    # Componentes Vue reutilizables
    composables/   # Lógica reutilizable (useForm, useFeedback, etc.)
    router/        # Definición de rutas
    services/      # Llamadas a la API (Axios)
    stores/        # Estado global (Pinia)
    views/         # Vistas principales (Login, Siniestros, Usuarios, etc.)
    constants.js   # Constantes centralizadas
    App.vue        # Componente raíz
    main.js        # Punto de entrada
  public/          # Archivos estáticos
  vite.config.js   # Configuración de Vite
```

## Instalación y ejecución
1. Instala dependencias:
   ```sh
   npm install
   ```
2. Configura la variable de entorno `VITE_API_URL` en `.env` si es necesario (por defecto apunta a `http://localhost:3000`).
3. Inicia la app:
   ```sh
   npm run dev
   ```

## Funcionalidades principales
- Login y logout seguro
- Alta, edición, consulta y borrado de siniestros
- Gestión de usuarios (solo Administrador)
- Filtros y paginación en tablas
- Feedback visual y validación en todos los formularios

## Notas de seguridad
- El token JWT se maneja solo por cookie httpOnly (no se expone en JS)
- Axios está configurado con `withCredentials: true` para enviar cookies
- CSP y Helmet activos en backend para proteger la app

---
