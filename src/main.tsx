import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage.tsx";

const AuthLayout = lazy(() => import("./layouts/auth.layout.tsx"));
const AdminLayout = lazy(() => import("./layouts/admin.layout.tsx"));
const AccountingLayout = lazy(() => import("./layouts/accounting.layout.tsx"));
const BookingLayout = lazy(() => import("./layouts/booking.layout.tsx"));

import { NotProtectedRoute, ProtectedRoute } from "./guard/auth.guard.tsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./hooks/auth.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <UserProvider>
          {/* Toast */}
          <Toaster />

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
        </UserProvider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>
);
