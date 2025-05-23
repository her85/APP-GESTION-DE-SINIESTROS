// src/services/api.js
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

// Si VITE_API_URL no está definida, usa un valor por defecto (por ejemplo, localhost para desarrollo).
const API_BASE_URL = import.meta.env.VITE_API_URL;//|| "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const auth = useAuthStore(); // Instancia del store
      const token = auth.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      //loguear el error para depuración.
      console.error("Error al añadir el token de autenticación:", error);
      return Promise.reject(error); // Rechaza la petición para evitar que continúe sin el token
    }
  },
  (error) => {
    // Esto se ejecuta si la configuración de la petición falla antes de ser enviada.
    console.error("Error en la configuración de la petición:", error);
    return Promise.reject(error);
  }
);

export default api;
