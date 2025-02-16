import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CheckAuth({ isAuthenticated, user, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname, isAuthenticated); // Debugging

    // Define pages that do not require authentication
    const publicPages = ["/auth/login", "/auth/register", "/auth/verify-otp"];

    // If the user is not authenticated and tries to access a protected page, redirect to login
    if (!isAuthenticated && !publicPages.includes(location.pathname)) {
      navigate("/auth/login", { replace: true }); // Use `replace: true` to prevent back navigation
      return;
    }

    // If the user is authenticated and tries to access a public page, redirect based on role
    if (isAuthenticated && publicPages.includes(location.pathname)) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/shop/home", { replace: true });
      }
      return;
    }

    // If the user is authenticated and tries to access an admin page without admin role, redirect to unauth page
    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")) {
      navigate("/unauth-page", { replace: true });
      return;
    }

    // If the user is authenticated and tries to access a shop page with admin role, redirect to admin dashboard
    if (isAuthenticated && user?.role === "admin" && location.pathname.includes("/shop")) {
      navigate("/admin/dashboard", { replace: true });
      return;
    }

    // If the user is authenticated and tries to access the root path, redirect based on role
    if (isAuthenticated && location.pathname === "/") {
      if (user?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/shop/home", { replace: true });
      }
      return;
    }

  }, [isAuthenticated, navigate, location, user]);

  return children;
}