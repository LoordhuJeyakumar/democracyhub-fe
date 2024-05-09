import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetLinkVerification from "../pages/ResetLinkVerification";
import EmailSent from "../pages/EmailSent";
import Redirect from "../pages/Redirect";
import Dashboard from "../pages/Dashboard";
import AccountVerification from "../pages/AccountVerification";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/verification" element={<ResetLinkVerification />} />
        <Route path="/emailSent" element={<EmailSent />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/users/:userId/:verifyToken"
          element={<AccountVerification />}
        />
        <Route
          path="/users/:userId/:resetToken"
          element={<ResetLinkVerification />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
