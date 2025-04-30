import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import PaginaPrincipal from '@/views/PaginaPrincipal.vue'
import CrearUsuario from '@/views/CrearUsuario.vue'
import ConsultarUsuarios from '@/views/ConsultarUsuarios.vue'
import IngresarSiniestro from '@/views/IngresarSiniestro.vue'
import ConsultarSiniestro from '@/views/ConsultarSiniestro.vue'


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/pagina_principal',
    name: 'PaginaPrincipal',
    component: PaginaPrincipal,
    meta: { requiresAuth: true } // ✅ protegida
  },
  {
    path: '/crear_usuario',
    name: 'CrearUsuario',
    component: CrearUsuario,
    meta: { requiresAuth: true } // ✅ protegida
  },
  {
    path: '/listar_usuarios',
    name: 'ConsultarUsuarios',
    component: ConsultarUsuarios,
    meta: { requiresAuth: true } // ✅ protegida
  },
  {
    path: '/ingresar_siniestro',
    name: 'IngresarSiniestro',
    component: IngresarSiniestro,
    meta: { requiresAuth: true } // ✅ protegida
  },
  {
    path: '/consultar_siniestro',
    name: 'ConsultarSiniestro',
    component: ConsultarSiniestro,
    meta: { requiresAuth: true } // ✅ protegida
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VUE_APP_API_URL),
  routes
})

// ✅ Middleware de autenticación
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
