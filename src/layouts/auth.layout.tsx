import { Route, Routes } from "react-router-dom"
import { lazy } from "react"
import NotFoundPage from "@/pages/NotFoundPage";
import RegisterPage from "@/pages/auth/register";
import ForgotPasswordPage from "@/pages/auth/forgot-password";


const LoginPage = lazy(() => import('@/pages/auth/login'));

function AuthLayout() {
  return (
    <main>
        <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
            <Route path="/*" element={<NotFoundPage />}/>
        </Routes>  
    </main>
  )
}

export default AuthLayout