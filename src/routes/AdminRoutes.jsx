import React from "react";
import authUtils from "../services/authUtils";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoutes() {
  const isLoggedIn = authUtils.isAuthenticated();
  const isAdmin = authUtils.isAdmin();

  return isLoggedIn && isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AdminRoutes;
