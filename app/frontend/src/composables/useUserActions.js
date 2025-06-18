// src/composables/useUserActions.js
import { ref } from 'vue';
import api from '@/services/api'; // Importamos la instancia de axios preconfigurada
import { useFeedback } from '@/composables/useFeedback'

/**
 * Composable para acciones relacionadas a usuarios: crear, listar, actualizar y eliminar usuarios.
 * @returns {{
 *   isCreating: import('vue').Ref<boolean>,
 *   createError: import('vue').Ref<string|null>,
 *   createSuccessMessage: import('vue').Ref<string|null>,
 *   users: import('vue').Ref<Array>,
 *   isLoadingUsers: import('vue').Ref<boolean>,
 *   usersError: import('vue').Ref<string|null>,
 *   isUpdating: import('vue').Ref<boolean>,
 *   updateError: import('vue').Ref<string|null>,
 *   updateSuccessMessage: import('vue').Ref<string|null>,
 *   isDeleting: import('vue').Ref<boolean>,
 *   deleteError: import('vue').Ref<string|null>,
 *   deleteSuccessMessage: import('vue').Ref<string|null>,
 *   createUser: function, fetchUsers: function, updateUser: function, deleteUser: function,
 *   error: import('vue').Ref<string|null>, success: import('vue').Ref<string|null>, setError: function, setSuccess: function, clearFeedback: function
 * }}
 */
export function useUserActions() {
  // Estado para la creación de usuario 
  const isCreating = ref(false);
  const createError = ref(null);
  const createSuccessMessage = ref(null);

  // Nuevo estado para la carga de usuarios
  const users = ref([]);
  const isLoadingUsers = ref(false);
  const usersError = ref(null);

  // Nuevo estado para la edición de usuario
  const isUpdating = ref(false);
  const updateError = ref(null);
  const updateSuccessMessage = ref(null);

  // Nuevo estado para la eliminación de usuario
  const isDeleting = ref(false);
  const deleteError = ref(null);
  const deleteSuccessMessage = ref(null);

  const { error, success, setError, setSuccess, clearFeedback } = useFeedback()

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {Object} userData - Datos del usuario a crear
   * @returns {Promise<boolean>} true si fue exitoso, false si hubo error
   */
  const createUser = async (userData) => {
    isCreating.value = true;
    createError.value = null;
    createSuccessMessage.value = null;

    try {
      const response = await api.post('/crear_usuario', userData);
      createSuccessMessage.value = response.data.message || 'Usuario creado con éxito.';
      return true; // Indicamos éxito
    } catch (err) {
      console.error('Error en createUser:', err);
      if (err.response && err.response.data && err.response.data.errors) {
        createError.value = err.response.data.errors.map(e => e.msg).join(' | ');
      } else {
        createError.value = err.response?.data?.message || err.response?.data?.error || 'Error desconocido al crear usuario.';
      }
      return false; // Indicamos fallo
    } finally {
      isCreating.value = false;
    }
  };

  /**
   * Obtiene la lista de usuarios desde la API.
   * @returns {Promise<boolean>} true si fue exitoso, false si hubo error
   */
  const fetchUsers = async () => {
    isLoadingUsers.value = true;
    usersError.value = null;
    try {
      // Si la API de listar usuarios soporta parámetros de búsqueda, los pasarías aquí
      const response = await api.get('/listar_usuarios');
      users.value = response.data;
      return true;
    } catch (err) {
      console.error('Error en fetchUsers:', err);
      usersError.value = err.response?.data?.message || err.response?.data?.error || 'Error al cargar los usuarios.';
      return false;
    } finally {
      isLoadingUsers.value = false;
    }
  };

  /**
   * Actualiza los datos de un usuario existente.
   * @param {string} userId - ID del usuario
   * @param {Object} userData - Nuevos datos del usuario
   * @returns {Promise<boolean>} true si fue exitoso, false si hubo error
   */
  const updateUser = async (userId, userData) => {
    isUpdating.value = true;
    updateError.value = null;
    updateSuccessMessage.value = null;
    try {
      const response = await api.put('/modificar_usuario', { _id: userId, ...userData });
      updateSuccessMessage.value = response.data.message || 'Usuario actualizado correctamente.';
      return true;
    } catch (err) {
      console.error('Error en updateUser:', err);
      if (err.response && err.response.data && err.response.data.errors) {
        updateError.value = err.response.data.errors.map(e => e.msg).join(' | ');
      } else {
        updateError.value = err.response?.data?.message || err.response?.data?.error || 'Error al actualizar el usuario.';
      }
      return false;
    } finally {
      isUpdating.value = false;
    }
  };

  /**
   * Elimina un usuario por su ID.
   * @param {string} userId - ID del usuario a eliminar
   * @returns {Promise<boolean>} true si fue exitoso, false si hubo error
   */
  const deleteUser = async (userId) => {
    isDeleting.value = true;
    deleteError.value = null;
    deleteSuccessMessage.value = null;
    try {
      const response = await api.delete('/borrar_usuario', { data: { _id: userId } });
      deleteSuccessMessage.value = response.data.message || 'Usuario borrado correctamente.';
      return true;
    } catch (err) {
      console.error('Error en deleteUser:', err);
      if (err.response && err.response.data && err.response.data.errors) {
        deleteError.value = err.response.data.errors.map(e => e.msg).join(' | ');
      } else {
        deleteError.value = err.response?.data?.message || err.response?.data?.error || 'Error al borrar el usuario.';
      }
      return false;
    } finally {
      isDeleting.value = false;
    }
  };


  return {
    // Para Crear Usuario
    createUser,
    isCreating,
    createError,
    createSuccessMessage,

    // Para Listar Usuarios
    users,
    fetchUsers,
    isLoadingUsers,
    usersError,

    // Para Actualizar Usuario
    updateUser,
    isUpdating,
    updateError,
    updateSuccessMessage,

    // Para Eliminar Usuario
    deleteUser,
    isDeleting,
    deleteError,
    deleteSuccessMessage,

    // Feedback
    error,
    success,
    setError,
    setSuccess,
    clearFeedback,
  };
}