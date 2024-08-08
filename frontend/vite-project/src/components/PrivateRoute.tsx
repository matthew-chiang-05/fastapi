import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login"></Navigate>;
};
