import '@/assets/estilo.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router'; 
import { createPinia } from 'pinia'; // Importa createPinia

/**
 * Punto de entrada principal de la aplicación Vue.
 * Configura Pinia, el router y monta la app.
 */
const pinia = createPinia(); // Crea la instancia de Pinia  
const app = createApp(App);
app.use(pinia); // Usa Pinia antes de montar la aplicación
app.use(router).mount('#app');
