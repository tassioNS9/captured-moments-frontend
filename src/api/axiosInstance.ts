import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  // Timeout um pouco elevado por conta da requisição da IA
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("cm:token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
