import axios from "axios";
// import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export const baseURL = "https:web.narmr.com/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    // "Cookie": "session_id=59613d1968c56038004b3609653b45d7975eb186"
  },
  withCredentials: true
});

api.interceptors.request.use((config) => {
  // const user = JSON.parse(Cookies.get("user") || "{}");
  // console.log(user?.user_id);
  // config.headers.body = user?.user_id || ""
  // // if (session_id) {
    // config.headers["Set-Cookie"] = `frontend_lang=en_US;session_id=2f0e3c7443c20e0697df09b11273bfbc2c3dde60`;
  // }
  // const session_id = localStorage.getItem("session_id");
  // if (session_id) {
    // config.headers.Authorization = `Bearer 2f0e3c7443c20e0697df09b11273bfbc2c3dde6`;
  // }
  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    let message = "حدث خطأ ما، حاول مرة أخرى";
    if (error.response.status === 404) {
      // const pathname = location.pathname.split('/')
      // location.href= `/${pathname[1]}/not-found`
      message="غير موجود"
    }
    
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
