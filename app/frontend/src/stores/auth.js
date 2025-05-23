// src/stores/auth.js
import { defineStore } from "pinia";
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('authToken') || '')
  const rol = ref(localStorage.getItem('userRole') || '')

  function setAuth(tokenValue, rolValue) {
    token.value = tokenValue
    rol.value = rolValue
    localStorage.setItem('authToken', tokenValue)
    localStorage.setItem('userRole', rolValue)
  }

  function clearAuth() {
    token.value = ''
    rol.value = ''
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
  }

  function getToken() {
    return token.value
  }

  function getRol() {
    return rol.value
  }

  return { token, rol, setAuth, clearAuth, getToken, getRol }
})
