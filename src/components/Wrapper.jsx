import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Wrapper({ children }) {
  return (
    <div>
      <Navbar />
      <div className="wrapper">
        {children}
        <Footer />
      </div>

      <Outlet />
    </div>
  );
}

export default Wrapper;
