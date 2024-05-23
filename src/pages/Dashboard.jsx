import React from "react";

import MainWrapper from "../components/MainWrapper";
import authUtils from "../services/authUtils";
import { useSelector } from "react-redux";

function Dashboard() {
  const userDetails = useSelector((state) => state.user);

  return <div>Dashboard</div>;
}

export default Dashboard;
