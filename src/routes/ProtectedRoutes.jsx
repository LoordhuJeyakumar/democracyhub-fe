import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import authUtils from "../services/authUtils";

function ProtectedRoutes({ children }) {
  const isLoggedIn = authUtils.isAuthenticated();
  console.log(isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
