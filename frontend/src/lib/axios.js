import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://intervue-t8xv.onrender.com", 
  withCredentials: true,
});

export default axiosInstance;