import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: "https://bms-apps.com/api",
  headers: {
    "Content-Type": "application/json",
    // "Cookie": "session_id=59613d1968c56038004b3609653b45d7975eb186"
  },
  withCredentials: true
});

api.interceptors.request.use((config) => {
  // console.log(Cookies.get("session_id", { path: "/" }));

  // const session_id = JSON.parse(localStorage.getItem("user") || "{}").session_id;
  // console.log(session_id);
  
  // if (session_id) {
    // config.headers["Set-Cookie"] = `frontend_lang=en_US;session_id=2f0e3c7443c20e0697df09b11273bfbc2c3dde60`;
  // }
  // const session_id = localStorage.getItem("session_id");
  // if (session_id) {
    config.headers.Authorization = `Bearer 2f0e3c7443c20e0697df09b11273bfbc2c3dde6`;
  // }
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
