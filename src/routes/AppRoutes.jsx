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
import PasswordResetPage from "../pages/PasswordResetPage";
import SendEmail from "../components/SendEmail";
import Elections, { ElectionsDashboard } from "../pages/Elections";
import ElectionsHomePage from "../pages/Elections";
import ProtectedRoutes from "./ProtectedRoutes";

function AppRoutes() {
  const { user, isLoggedIn } = sessionStorage;
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

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/users/:userId/:verifyToken"
          element={<AccountVerification />}
        />
        <Route
          path="/resetPassword/:userId/:resetToken"
          element={<ResetLinkVerification />}
        />
        <Route
          path="/resetPassword"
          state={"reset"}
          element={<PasswordResetPage />}
        />
        <Route
          path="/elections"
          element={isLoggedIn ? <ElectionsDashboard /> : <ElectionsHomePage />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
