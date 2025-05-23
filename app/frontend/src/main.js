import '@/assets/estilo.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //Si deseas usar el javascript de bootstrap

import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router'; //Si usas vue-router
import { createPinia } from 'pinia'; // Importa createPinia

const pinia = createPinia(); // Crea la instancia de Pinia  
const app = createApp(App);
app.use(pinia); // Usa Pinia antes de montar la aplicación
app.use(router).mount('#app'); //Si usas vue-router
//createApp(App).mount('#app'); //Si no usas vue-router
