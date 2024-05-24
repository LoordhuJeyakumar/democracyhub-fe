import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import authUtils from "../services/authUtils";
import MainWrapper from "../components/MainWrapper";

function ProtectedRoutes({ children }) {
  const isLoggedIn = authUtils.isAuthenticated();

  return isLoggedIn ? (
    <MainWrapper>{children}</MainWrapper>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoutes;
