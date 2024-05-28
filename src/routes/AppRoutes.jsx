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

import ElectionsHomePage from "../pages/Elections";
import ProtectedRoutes from "./ProtectedRoutes";
import UserProfile from "../pages/UserProfile";
import ProfileSettings from "../pages/ProfileSettings";
import authUtils from "../services/authUtils";
import RoleBasedAuthRoute from "./RoleBasedAuthRoute";
import Elections from "../pages/Elections";
import AdminDashboard from "../pages/AdminDashboard";
import AdminRoutes from "./AdminRoutes";
import Wrapper from "../components/Wrapper";
import LocalIssues from "../pages/LocalIssues";
import LocalIssuesUser from "../pages/LocalIssuesUser";

function AppRoutes() {
  const { user, isLoggedIn } = localStorage;

  return (
    <Router>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/verification" element={<ResetLinkVerification />} />
        <Route path="/emailSent" element={<EmailSent />} />
        <Route path="/redirect" element={<Redirect />} />
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

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profileSettings" element={<ProfileSettings />} />
        </Route>

        <Route
          path="/elections"
          element={isLoggedIn ? <ElectionsDashboard /> : <ElectionsHomePage />}
        />
      </Routes> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/verification" element={<ResetLinkVerification />} />
        <Route path="/emailSent" element={<EmailSent />} />
        <Route path="/redirect" element={<Redirect />} />
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
          element={
            <Wrapper>
              <Elections />
            </Wrapper>
          }
        />
        <Route
          path="/localIssues"
          element={
            <Wrapper>
              <LocalIssues />
            </Wrapper>
          }
        />
        <Route element={<AdminRoutes />}>
          <Route
            path="/admin-dashboard"
            element={
              <RoleBasedAuthRoute>
                <AdminDashboard />
              </RoleBasedAuthRoute>
            }
          />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/elections" element={<Elections />} />
          <Route path="/user/localIssues" element={<LocalIssuesUser />} />
        </Route>

        <Route
          path="/profile"
          element={
            <RoleBasedAuthRoute>
              <UserProfile />
            </RoleBasedAuthRoute>
          }
        />
        <Route
          path="/profileSettings"
          element={
            <RoleBasedAuthRoute>
              <ProfileSettings />
            </RoleBasedAuthRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
