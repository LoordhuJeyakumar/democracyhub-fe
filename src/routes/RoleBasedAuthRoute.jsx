import React from "react";
import authUtils from "../services/authUtils";
import Wrapper from "../components/Wrapper";
import MainWrapper from "../components/MainWrapper";
import AdminDashboardWrapper from "../components/AdminDashboardWrapper";
import { Navigate, Outlet } from "react-router-dom";

function RoleBasedAuthRoute({ children }) {
  const isLoggedIn = authUtils.isAuthenticated();
  const isAdmin = authUtils.isAdmin();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (isAdmin) {
    return <AdminDashboardWrapper>{children}</AdminDashboardWrapper>;
  }

  return <MainWrapper>{children}</MainWrapper>;
}

export default RoleBasedAuthRoute;
