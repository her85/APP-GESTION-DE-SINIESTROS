import './assets/estilo.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //Si deseas usar el javascript de bootstrap

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; //Si usas vue-router


createApp(App).use(router).mount('#app'); //Si usas vue-router
//createApp(App).mount('#app'); //Si no usas vue-router
