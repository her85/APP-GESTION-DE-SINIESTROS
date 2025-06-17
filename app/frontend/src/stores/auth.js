// src/stores/auth.js
import { defineStore } from "pinia";
import { ref } from 'vue'

/**
 * Store de autenticación para gestionar el rol del usuario.
 * @see https://pinia.vuejs.org/
 */
export const useAuthStore = defineStore('auth', () => {
  /**
   * Rol actual del usuario autenticado.
   * @type {import('vue').Ref<string>}
   */
  const rol = ref(localStorage.getItem('userRole') || '')

  /**
   * Establece el rol de usuario y lo guarda en localStorage.
   * @param {string} rolValue
   */
  function setAuth(rolValue) {
    rol.value = rolValue
    localStorage.setItem('userRole', rolValue)
  }

  /**
   * Limpia la autenticación y el rol del usuario.
   */
  function clearAuth() {
    rol.value = ''
    localStorage.removeItem('userRole')
  }

  /**
   * Obtiene el rol actual del usuario.
   * @returns {string}
   */
  function getRol() {
    return rol.value
  }

  return { rol, setAuth, clearAuth, getRol }
})
