import { Route, Routes } from "react-router-dom"
import { lazy } from "react"
import NotFoundPage from "@/pages/NotFoundPage";


const LoginPage = lazy(() => import('@/pages/auth/login'));

function AuthLayout() {
  return (
    <main>
        <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/*" element={<NotFoundPage />}/>
        </Routes>  
    </main>
  )
}

export default AuthLayout