import React from "react";
import Wrapper from "../components/Wrapper";
import SideNavbar from "../components/SideNavbar";
import DashboardNav from "../components/DashboardNav";
import TopNavBar from "../components/TopNavBar";

function Dashboard() {
  return (
    <div className="g-sidenav-show bg-gray-200 dark-version">
      <SideNavbar />
      <TopNavBar />
    </div>
  );
}

export default Dashboard;
