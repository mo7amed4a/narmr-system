import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

type ProtectedRouteProps = {
    children: React.ReactNode;
    route: string;
  };
  const ProtectedRoute = ({ children, route}: ProtectedRouteProps) => {
    const type = JSON.parse(Cookies.get("user") || "{}").user_category as "admin" | "accounting_employee" | "transformer_employee" | null;
    if (type) {
        if (type === "admin" && route === "admin") {
          return children;
        }
        if (type === "accounting_employee" && route === "accounting") {
          return children;
        }
        if (type === "transformer_employee" && route === "booking") {
          return children;
        }
    }
    return <Navigate to="/" replace />;
  };

  type NotProtectedRouteProps = {
    children: React.ReactNode;
  };
  const NotProtectedRoute = ({ children }: NotProtectedRouteProps) => {
    const type = JSON.parse(Cookies.get("user") || "{}").user_category as "admin" | "accounting_employee" | "transformer_employee" | null;
    if (type === "admin") {
      return <Navigate to="/admin" replace />;
    }
    if (type === "accounting_employee") {
      return <Navigate to="/accounting" replace />;
    }
    if (type === "transformer_employee") {
      return <Navigate to="/booking" replace />;
    }
    return children;
  };

  export { NotProtectedRoute, ProtectedRoute }