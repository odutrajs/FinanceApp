// @configs/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const message = error?.response?.data?.error;

    if (message === "Token inválido ou ausente") {
      localStorage.removeItem("accessToken");
      window.location.href = "/sign-in";
      return;
    }

    return Promise.reject(error);
  }
);
