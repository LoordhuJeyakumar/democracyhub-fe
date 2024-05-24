import React, { useState } from "react";
import SideNavbar from "./SideNavbar";
import TopNavBar from "./TopNavBar";
import { Outlet } from "react-router-dom";
import SidenavAdmin from "./SidenavAdmin";

function AdminDashboardWrapper({ children }) {
  const [sideNavShow, setSideNavShow] = useState(false);
  return (
    <div
      className={
        sideNavShow
          ? "g-sidenav-show g-sidenav-pinned bg-gray-200 dark-version "
          : "g-sidenav-show bg-gray-200 dark-version "
      }
    >
      <SidenavAdmin />
      <div className="main-content position-relative max-height-vh-100 h-100 border-radius-lg  ">
        <TopNavBar sideNavShow={sideNavShow} setSideNavShow={setSideNavShow} />
        {children}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboardWrapper;
