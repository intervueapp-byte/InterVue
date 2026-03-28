import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://intervue-qfif.onrender.com/api",
  withCredentials: true,
});

// 🔥 DEBUG: shows every API call
axiosInstance.interceptors.request.use((config) => {
  console.log("🚀 API CALL:", config.baseURL + config.url);
  return config;
});

// 🔥 ERROR HANDLER
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("❌ API ERROR:", error?.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;