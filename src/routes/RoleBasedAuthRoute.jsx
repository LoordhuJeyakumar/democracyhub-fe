import React from "react";
import authUtils from "../services/authUtils";
import Wrapper from "../components/Wrapper";
import MainWrapper from "../components/MainWrapper";

function RoleBasedAuthRoute({ children }) {
  const isLoggedIn = authUtils.isAuthenticated();
  const isAdmin = authUtils.isAdmin();
  console.log(isLoggedIn, isAdmin);
  if (isAdmin && isLoggedIn) {
    return <AdminDashboardWrapper>{children}</AdminDashboardWrapper>;
  } else if (isLoggedIn) {
    return <MainWrapper>{children}</MainWrapper>;
  } else {
    return <Wrapper>{children}</Wrapper>;
  }
}

export default RoleBasedAuthRoute;
