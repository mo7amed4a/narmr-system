import api from "@/lib/axios";
import axios from "axios";
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
        if (Cookies.get("user")) {
          const t = JSON.parse(Cookies.get("user") || "{}");
          const response = await api.get(`/user_info/${t.user_id}`);
          if (response?.data?.data) {
            setUser(response?.data?.data);
            Cookies.set("user", JSON.stringify(response?.data?.data));
          } else {
            Cookies.remove("user");
            location.reload()
          }
        }
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
      const response = await axios.post("https://bms-apps.com/api/login", credentials, {
        withCredentials: true
      });  
      if (response.status === 200) {
        setUser(response.data);
        Cookies.set("user", JSON.stringify(response.data));
        setTimeout(() => {
          navigate(`/${role(response?.data?.user_category)}`);
          location.reload()
        }, 200)
      }
    } catch (error) {
      console.error("Login failed: ", error);
      throw error;
    }
  };
  

  const logout = async () => {
    try {
      const response = await api.post("/logout",{
        // @ts-ignore
        user_id: user?.user_id
      }, {
        withCredentials: true
      });
      
      if (response.status == 200) {
        setUser(null);
        Cookies.remove("user");
        window.location.reload();
      }
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
