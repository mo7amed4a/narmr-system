import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: "https://bms-apps.com/api",
  headers: {
    "Content-Type": "application/json",
    // "Cookie": "session_id=59613d1968c56038004b3609653b45d7975eb186"
  },
});

api.interceptors.request.use((config) => {
  const session_id = localStorage.getItem("session_id");
  if (session_id) {
    config.headers.Authorization = `Bearer ${session_id}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "حدث خطأ ما، حاول مرة أخرى";
    if (error.response) {
      message = error.response.data.message || message;
    } else if (error.request) {
      console.log(error.request);
      message = "تعذر الاتصال بالسيرفر، تحقق من الإنترنت";
    }
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
