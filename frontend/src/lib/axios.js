import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://intervue-t8xv.onrender.com/api", 
  withCredentials: true, //// ✅ FORCE FIX
});

axiosInstance.interceptors.request.use((config) => {
  console.log("🚀 FINAL URL:", config.baseURL + config.url);
  return config;
});

export default axiosInstance;