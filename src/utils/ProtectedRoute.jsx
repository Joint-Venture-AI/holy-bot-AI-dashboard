import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/auth/sign-in" replace={true} />;
  }

  try {
    const decoded = jwtDecode(token); // Decode the token
    const role = decoded?.role;

    if (role !== "ADMIN") {
      return <Navigate to="/auth/sign-in" replace={true} />;
    }

    return children; // Allow access to children if role is ADMIN
  } catch (error) {
    console.error("Invalid token:", error); // Handle invalid token errors
    return <Navigate to="/auth/sign-in" replace={true} />;
  }
}

export default ProtectedRoute;
