// src/services/api.js
import axios from "axios";

// Si VITE_API_URL no está definida, usa un valor por defecto (por ejemplo, localhost para desarrollo).
const API_BASE_URL = import.meta.env.VITE_API_URL;//|| "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true // Permite enviar cookies en las peticiones
});

export default api;
