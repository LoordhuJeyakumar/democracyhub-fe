import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function SidenavAdmin() {
  const user = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const userParsed = JSON.parse(localStorage.getItem("user"));

  const [profileTabActive, setProfileTabActive] = useState(false);
  const [dashboardTabActive, setDashboardTabActive] = useState(false);
  const handleTabOpen = (tabName) => {
    setActiveTab(tabName);
  };
  const tabPaths = {
    profile: ["/profile", "/profileSettings"],
    dashboard: ["/dashboard", "/admin-dashboard"],
    users: ["/viewAllUsers"],
    elections: ["/admin/elections", "/createElection"],
    // ... other paths
  };

  useEffect(() => {
    for (const [tabName, paths] of Object.entries(tabPaths)) {
      if (paths.includes(location.pathname)) {
        handleTabOpen(tabName);
        break;
      }
    }
  }, [location.pathname]);

  const navigate = useNavigate();
  const handleSignOut = async () => {
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const profilePaths = ["/profile", "/profileSettings"];
    if (profilePaths.includes(location.pathname)) {
      handleProfileTabOpen();
      setProfileTabActive(true);
      setDashboardTabActive(false);
    } else {
      setProfileTabActive(false);
      setDashboardTabActive(true);
      handleDashboardTabOpen();
    }
  }, [location.pathname]);

  const handleProfileTabOpen = () => {
    setProfileTabActive(true);
    setDashboardTabActive(false);
  };

  const handleElectionTabOpen = () => {};
  const handleDashboardTabOpen = () => {
    setDashboardTabActive(true);
    setProfileTabActive(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <aside
      className="sidenav  navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark "
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <div className="p-1 m-1">
          <div className="logoBox d-flex flex-column p-3 justify-content-center align-items-center">
            <h1 className="logoName text-center fs-4  fw-bold ">
              DemocracyHUB
            </h1>
            <small className="mt-0 pt-0  tagline" style={{ fontSize: 12 }}>
              Empowering citizens to make informed decisions
            </small>
          </div>
        </div>
      </div>
      <hr className="horizontal light" />
      <div
        className="collapse navbar-collapse w-auto h-auto "
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item mb-2 mt-0 main-menu">
            <a
              data-bs-toggle="collapse"
              href="#ProfileNav"
              className="nav-link active"
              aria-controls="ProfileNav"
              role="button"
              aria-expanded="false"
            >
              <span className="material-symbols-outlined">account_circle</span>
              <span className="nav-link-text ms-2 ps-1 text-capitalize">
                {userParsed?.name}
              </span>
            </a>
            <div
              className={activeTab === "profile" ? "collapse show" : "collapse"}
              id="ProfileNav"
            >
              <ul className="nav ">
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    to={"/profile"}
                    onClick={() => handleTabOpen("profile")}
                  >
                    <span className="material-symbols-outlined sidenav-mini-icon">
                      badge
                    </span>
                    <span className="sidenav-normal  ms-3  ps-1">
                      {" "}
                      My Profile{" "}
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link  "
                    to={"/profileSettings"}
                    onClick={() => handleTabOpen("profileSettings")}
                  >
                    <span className="material-symbols-outlined sidenav-mini-icon">
                      manage_accounts
                    </span>
                    <span className="sidenav-normal  ms-3  ps-1">
                      {" "}
                      Settings{" "}
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/login"}
                    onClick={handleLogout}
                    className="nav-link "
                  >
                    <span className="material-symbols-outlined sidenav-mini-icon">
                      logout
                    </span>
                    <span className="sidenav-normal  ms-3  ps-1"> Logout </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <hr className="horizontal light mt-0" />

          <li className="nav-item main-menu">
            <a
              data-bs-toggle="collapse"
              href="#dashboards"
              className="nav-link  active"
              aria-controls="dashboardsExamples"
              role="button"
              aria-expanded="false"
            >
              <span className="material-icons-round">widgets</span>
              <span className="nav-link-text ms-2 ps-1">Menu</span>
            </a>
            <div
              className={
                ["dashboard", "users", "elections"].includes(activeTab)
                  ? "collapse show"
                  : "collapse"
              }
              id="dashboards"
            >
              <ul className="nav ">
                <li className="nav-item ">
                  <NavLink
                    className="nav-link  d-flex justify-content-between"
                    to="/admin-dashboard"
                    onClick={() => handleTabOpen("dashboard")}
                  >
                    <span className="sidenav-normal  ms-2  ps-1">
                      Dashboard
                    </span>
                    <lord-icon
                      src="https://cdn.lordicon.com/epietrpn.json"
                      trigger="morph"
                      state="morph-mantion"
                      style={{ width: "30px", height: "30px" }}
                    ></lord-icon>
                  </NavLink>
                </li>
                <li className="nav-item sub-menu-head">
                  <a
                    data-bs-toggle="collapse"
                    href="#users"
                    className="nav-link  sub-menu-link  "
                    aria-controls="users"
                    role="button"
                    aria-expanded="false"
                  >
                    <div className="d-flex justify-content-start align-items-center w-100">
                      <lord-icon
                        src="https://cdn.lordicon.com/fmasbomy.json"
                        trigger="in"
                        delay="1000"
                        state="morph-group"
                        colors="primary:#121331,secondary:#acd0c0,tertiary:#f3ffbd"
                        style={{ width: "30px", height: "30px" }}
                      ></lord-icon>
                      <span className="nav-link-text ms-2 ps-1 ">Users</span>
                    </div>
                  </a>
                  <div
                    className={
                      activeTab === "users" ? "collapse show" : "collapse"
                    }
                    id="users"
                  >
                    <ul className="nav ">
                      <li className="nav-item ">
                        <NavLink
                          className="nav-link  d-flex justify-content-between"
                          to="/viewAllUsers"
                          onClick={() => handleTabOpen("users")}
                        >
                          <span className="sidenav-normal  ms-2  ps-1">
                            View All Users
                          </span>
                          <lord-icon
                            src="https://cdn.lordicon.com/epietrpn.json"
                            trigger="morph"
                            state="morph-mantion"
                            style={{ width: "30px", height: "30px" }}
                          ></lord-icon>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item sub-menu-head">
                  <a
                    data-bs-toggle="collapse"
                    href="#elections"
                    className="nav-link  sub-menu-link  "
                    aria-controls="elections"
                    role="button"
                    aria-expanded="false"
                  >
                    <div className="d-flex justify-content-start align-items-center w-100">
                      <lord-icon
                        src="https://cdn.lordicon.com/fmasbomy.json"
                        trigger="in"
                        delay="1000"
                        state="morph-group"
                        colors="primary:#121331,secondary:#acd0c0,tertiary:#f3ffbd"
                        style={{ width: "30px", height: "30px" }}
                      ></lord-icon>
                      <span className="nav-link-text ms-2 ps-1 ">
                        Elections
                      </span>
                    </div>
                  </a>
                  <div
                    className={
                      activeTab === "elections" ? "collapse show" : "collapse"
                    }
                    id="elections"
                  >
                    <ul className="nav ">
                      <li className="nav-item ">
                        <NavLink
                          className="nav-link  d-flex justify-content-between"
                          to="/createElection"
                          onClick={() => handleTabOpen("elections")}
                        >
                          <span className="sidenav-normal  ms-2  ps-1">
                            Create Election
                          </span>
                          <lord-icon
                            src="https://cdn.lordicon.com/epietrpn.json"
                            trigger="morph"
                            state="morph-mantion"
                            style={{ width: "30px", height: "30px" }}
                          ></lord-icon>
                        </NavLink>
                      </li>
                      <li className="nav-item ">
                        <NavLink
                          to="/elections"
                          className="nav-link  d-flex justify-content-between"
                        >
                          <span className="sidenav-normal  ms-2  ps-1">
                            Elections
                          </span>
                          <lord-icon
                            src="https://cdn.lordicon.com/svsiboke.json"
                            trigger="morph"
                            state="morph-open"
                            style={{ width: "30px", height: "30px" }}
                          ></lord-icon>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          {/* ******************************************** */}
          {/*  */}
        </ul>
      </div>
    </aside>
  );
}

export default SidenavAdmin;
