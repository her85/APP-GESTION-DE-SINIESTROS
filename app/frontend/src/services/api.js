// src/services/api.js
import axios from "axios";

/**
 * URL base de la API, obtenida de las variables de entorno.
 * @type {string}
 */
const API_BASE_URL = import.meta.env.VITE_API_URL;
//const API_BASE_URL = import.meta.env.VITE_API_URL_TEST;

/**
 * Instancia de Axios preconfigurada para consumir la API del backend.
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true // Permite enviar cookies en las peticiones
});

export default api;
