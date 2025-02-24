import axios, { AxiosInstance, AxiosResponse } from "axios";

const apiUrl: string = import.meta.env.VITE_API_URL;

export function createApi(): AxiosInstance {
  const api = axios.create({
    baseURL:  apiUrl || "http://localhost:3333",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response) {
        return alert("Servidor não encontrado");
      }

      return Promise.reject(error);
    }
  );

  return api;
}
