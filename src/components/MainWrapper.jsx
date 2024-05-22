import React, { useState } from "react";
import SideNavbar from "./SideNavbar";
import TopNavBar from "./TopNavBar";
import { Outlet } from "react-router-dom";

function MainWrapper({ children }) {
  const [sideNavShow, setSideNavShow] = useState(false);
  return (
    <div
      className={
        sideNavShow
          ? "g-sidenav-show g-sidenav-pinned bg-gray-200 dark-version "
          : "g-sidenav-show bg-gray-200 dark-version "
      }
    >
      <SideNavbar />
      <div className="main-content position-relative max-height-vh-100 h-100 border-radius-lg  ">
        <TopNavBar sideNavShow={sideNavShow} setSideNavShow={setSideNavShow} />
        {children}
        <Outlet />
      </div>
    </div>
  );
}

export default MainWrapper;
