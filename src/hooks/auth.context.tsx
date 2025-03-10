import api from "@/lib/axios";
import { role } from "@/utils/roleStatic";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        //   const response = await api.get("/user");
        //   setUser(response.data);
        const t = JSON.parse(localStorage.getItem("user") || "{}");
        setUser(t.user_id === null ? null : t);
      } catch (error) {
        console.error("Error fetching user: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials: any) => {
    try {
      const response = await api.post("/login", credentials, {
          // withCredentials: true, // ⬅️ تأكد من إرسال الكوكيز
        
      });
  
      if (response.status === 200) {
        // استخراج `session_id` من الـ Cookies
        const cookies = response;
        // const sessionCookie = cookies?.find((cookie: string) => cookie.startsWith("session_id="));
  console.log(JSON.stringify(cookies));
  
        // if (sessionCookie) {
        //   const session_id = sessionCookie.split(";")[0].split("=")[1]; // استخراج `session_id`
        //   Cookies.set("session_id", session_id, { path: "/", expires: 7 }); // تخزينه في الكوكيز
        // }
  
        // setUser(response.data);
        // localStorage.setItem("user", JSON.stringify(response.data));
        // navigate(`/${role(response?.data?.user_category)}`);
      }
    } catch (error) {
      console.error("Login failed: ", error);
      throw error;
    }
  };
  

  const logout = async () => {
    try {
    //   const response = await api.post("/logout", {}, {
    //     headers: {
    //       "Cookie": `session_id=${user?.session_id}`,
    //     },
    //   });
    //   if (response.status == 200) {
        setUser(null);
        localStorage.removeItem("user");
        window.location.reload();
    //   }
    } catch (error) {
      console.error("Logout failed: ", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
