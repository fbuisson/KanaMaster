// src/utils/apiClient.ts
import axios from "axios";
import { API_URL } from "./config";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(`${API_URL}/auth/refresh-token`, {}, { withCredentials: true });

        return apiClient(originalRequest);
      } catch (refreshError) {
        window.location.href = "/connexion";
      }
    }

    return Promise.reject(error);
  }
);
