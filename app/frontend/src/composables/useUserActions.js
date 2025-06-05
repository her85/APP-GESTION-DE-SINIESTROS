// src/composables/useUserActions.js
import { ref } from 'vue';
import api from '@/services/api'; // Importamos la instancia de axios preconfigurada
import { useFeedback } from '@/composables/useFeedback'

export function useUserActions() {
  // Estado para la creación de usuario (ya existía)
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

  // Acción para crear usuario (ya existía)
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
      createError.value = err.response?.data?.message || err.response?.data?.error || 'Error desconocido al crear usuario.';
      return false; // Indicamos fallo
    } finally {
      isCreating.value = false;
    }
  };

  // Acción para cargar/listar usuarios
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

  // Acción para actualizar usuario
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
      updateError.value = err.response?.data?.message || err.response?.data?.error || 'Error al actualizar el usuario.';
      return false;
    } finally {
      isUpdating.value = false;
    }
  };

  // Acción para eliminar usuario
  const deleteUser = async (userId) => {
    isDeleting.value = true;
    deleteError.value = null;
    deleteSuccessMessage.value = null;
    try {
      // Axios para DELETE con body se usa con la opción `data`
      const response = await api.delete(`/borrar_usuario`, { data: { _id: userId } });
      deleteSuccessMessage.value = response.data.message || 'Usuario borrado correctamente.';
      return true;
    } catch (err) {
      console.error('Error en deleteUser:', err);
      deleteError.value = err.response?.data?.message || err.response?.data?.error || 'Error al borrar el usuario.';
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