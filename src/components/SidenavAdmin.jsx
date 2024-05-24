import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function SidenavAdmin() {
  const user = useSelector((state) => state.user);

  const location = useLocation();
  const userParsed = JSON.parse(localStorage.getItem("user"));
  const [profileTabActive, setProfileTabActive] = useState(false);
  const [dashboardTabActive, setDashboardTabActive] = useState(false);
  const [electionsTabActive, setElectionsTabActive] = useState(false);

  const [navTabOpen, setNavTabOpen] = useState({
    profile: false,
    dashboard: false,
    election: false,
  });

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
  useEffect(() => {}, []);

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
          <div className="logoBox d-flex flex-column  justify-content-center align-items-center">
            <h1 className="logoName text-center fs-3 fw-bold ">DemocracyHUB</h1>
            <small className="mt-0 pt-0  tagline">
              Empowering citizens to make informed decisions
            </small>
          </div>
        </div>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <div
        className="collapse navbar-collapse w-auto h-auto "
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item mb-2 mt-0 ">
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
                {user?.details?.name}
              </span>
            </a>
            <div
              className={profileTabActive ? "collapse show" : "collapse"}
              id="ProfileNav"
            >
              <ul className="nav ">
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    to={"/profile"}
                    onClick={handleProfileTabOpen}
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
                    onClick={handleProfileTabOpen}
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

          <li className="nav-item">
            <a
              data-bs-toggle="collapse"
              href="#dashboardsExamples"
              className="nav-link  active"
              aria-controls="dashboardsExamples"
              role="button"
              aria-expanded="false"
            >
              <span className="material-icons-round">widgets</span>
              <span className="nav-link-text ms-2 ps-1">Menu</span>
            </a>
            <div
              className={dashboardTabActive ? "collapse show" : "collapse"}
              id="dashboardsExamples"
            >
              <ul className="nav ">
                <li className="nav-item ">
                  <NavLink
                    className="nav-link  d-flex justify-content-between"
                    to="/admin-dashboard"
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
          {/* ******************************************** */}
          {/*  */}
        </ul>
      </div>
    </aside>
  );
}

export default SidenavAdmin;
