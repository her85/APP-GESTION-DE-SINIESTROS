// src/services/api.js
import axios from "axios";
import { useAuthStore } from "@/stores/auth";


const api = axios.create({
  baseURL: "http://localhost:3000", // Ajusta la URL base de tu backend
});

api.interceptors.request.use(
  (config) => {
    const auth = useAuthStore(); // Instancia del store
    const token = auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
