import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppLayout from './layouts/app.layout.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoadingPage from './pages/LoadingPage.tsx'
import AuthLayout from './layouts/auth.layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
          <Routes>
            <Route path="/*" element={<AppLayout />}/>
            <Route path="/auth/*" element={<AuthLayout />}/>
            <Route path="*" element={<NotFoundPage />}/>
          </Routes>
    </BrowserRouter>
  </Suspense>
  </StrictMode>,
)
