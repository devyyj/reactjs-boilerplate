import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 쿠키 포함
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
