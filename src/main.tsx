import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage.tsx";
import AuthLayout from "./layouts/auth.layout.tsx";
import AdminLayout from "./layouts/admin.layout.tsx";
import AccountingLayout from "./layouts/accounting.layout.tsx";
import BookingLayout from "./layouts/booking.layout.tsx";
import { NotProtectedRoute, ProtectedRoute } from "./guard/auth.guard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <NotProtectedRoute>
                <AuthLayout />
              </NotProtectedRoute>
            }
          />
          <Route
            path="/booking/*"
            element={
              <ProtectedRoute route="booking">
                <BookingLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accounting/*"
            element={
              <ProtectedRoute route="accounting">
                <AccountingLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute route="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </StrictMode>
);
