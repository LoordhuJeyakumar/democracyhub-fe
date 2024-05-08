import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetLinkVerification from "../pages/ResetLinkVerification";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/verification" element={<ResetLinkVerification />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
