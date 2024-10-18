import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const { currentUser } = useAuth();
  return currentUser ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
