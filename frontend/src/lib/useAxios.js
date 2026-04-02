import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export const useAxios = () => {
  const { getToken } = useAuth();

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // ✅ FIXED
    withCredentials: true,
  });

  instance.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return instance;
};