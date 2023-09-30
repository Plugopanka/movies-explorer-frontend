import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, element: Component, ...props }) => {
  return isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;