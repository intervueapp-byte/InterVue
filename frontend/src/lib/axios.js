import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: "https://intervue-t8xv.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;