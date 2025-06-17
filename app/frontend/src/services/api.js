// src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
//const API_BASE_URL = import.meta.env.VITE_API_URL_TEST;
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true // Permite enviar cookies en las peticiones
});

export default api;
