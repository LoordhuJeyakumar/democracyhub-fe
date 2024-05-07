import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Wrapper({ children }) {
  return (
    <div>
      <Navbar />
      <div className="wrapper">{children}</div>
      <Outlet />
    </div>
  );
}

export default Wrapper;
