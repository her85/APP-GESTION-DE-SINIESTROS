// src/composables/useUserActions.js
import { ref } from 'vue';
import api from '@/services/api'; // Importamos la instancia de axios preconfigurada

export function useUserActions() {
  const isLoading = ref(false); // Para indicar si una operación está en curso
  const error = ref(null);      // Para almacenar errores de la API
  const successMessage = ref(null); // Para almacenar mensajes de éxito

  const createUser = async (userData) => {
    isLoading.value = true;
    error.value = null;
    successMessage.value = null;

    try {
      const response = await api.post('/crear_usuario', userData);
      successMessage.value = response.data.message || 'Usuario creado con éxito.';
      return true; // Indicamos éxito
    } catch (err) {
      console.error('Error en createUser:', err);
      error.value = err.response?.data?.message || err.response?.data?.error || 'Error desconocido al crear usuario.';
      return false; // Indicamos fallo
    } finally {
      isLoading.value = false;
    }
  };

  // Puedes añadir más acciones aquí, como updateUser, deleteUser, fetchUsers, etc.

  return {
    createUser,
    isLoading,
    error,
    successMessage,
  };
}