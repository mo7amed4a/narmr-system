import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: React.ReactNode;
    route: string;
  };
  const ProtectedRoute = ({ children, route}: ProtectedRouteProps) => {
    const type = JSON.parse(localStorage.getItem("user") || "{}").user_category as "admin" | "accounting" | "booking" | null;
    if (type) {
        if (type === "admin" && route === "admin") {
          return children;
        }
        if (type === "accounting" && route === "accounting") {
          return children;
        }
        if (type === "booking" && route === "booking") {
          return children;
        }
    }
    return <Navigate to="/" replace />;
  };

  type NotProtectedRouteProps = {
    children: React.ReactNode;
  };
  const NotProtectedRoute = ({ children }: NotProtectedRouteProps) => {
    const type = localStorage.getItem("userType");
    if (type === "admin") {
      return <Navigate to="/admin" replace />;
    }
    if (type === "accounting") {
      return <Navigate to="/accounting" replace />;
    }
    if (type === "booking") {
      return <Navigate to="/booking" replace />;
    }
    return children;
  };

  export { NotProtectedRoute, ProtectedRoute }