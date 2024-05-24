import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../components/Wrapper";

function PublicRoute() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

export default PublicRoute;
