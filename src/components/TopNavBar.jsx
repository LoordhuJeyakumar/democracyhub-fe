import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

function TopNavBar({ setSideNavShow, sideNavShow }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathName = location.pathname
    .slice(1)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  const handleSideNav = (event) => {
    event.preventDefault();
    if (sideNavShow) {
      setSideNavShow(false);
    } else {
      setSideNavShow(true);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl position-sticky top-1 z-index-sticky shadow-none shadow-blur top-navbar rounded-pill"
      id="navbarBlur"
      data-scroll="true"
    >
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm">
              <Link className="opacity-3 " to="/dashboard">
                <svg
                  width="12px"
                  height="12px"
                  className="mb-1 "
                  viewBox="0 0 45 40"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title>shop </title>
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="#1c140d"
                    fillRule="evenodd"
                  >
                    <g
                      transform="translate(-1716.000000, -439.000000)"
                      fill="#1c140d"
                      fillRule="nonzero"
                    >
                      <g transform="translate(1716.000000, 291.000000)">
                        <g transform="translate(0.000000, 148.000000)">
                          <path d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z"></path>
                          <path d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </Link>
            </li>
            <li className="breadcrumb-item text-sm">
              <Link
                className="opacity-5 text-decoration-none text-brown"
                to={"/dashboard"}
              >
                Pages
              </Link>
            </li>
            <li
              className="breadcrumb-item text-sm active  text-capitalize"
              aria-current="page"
            >
              {pathName}
            </li>
          </ol>
          <h6 className="font-weight-bolder mb-0 text-capitalize">
            {pathName}
          </h6>
        </nav>
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 d-flex justify-content-end"
          id="navbar"
        >
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-xl-none ps-3 pe-3 d-flex align-items-center">
              <button
                className="nav-link p-0 text-body"
                id="iconNavbarSidenav"
                onClick={handleSideNav}
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </button>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link p-0 position-relative text-body"
                to="/profile"
              >
                <i className="material-icons me-sm-1">account_circle</i>
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link p-0 text-body" href="/profileSettings">
                <i className="material-icons fixed-plugin-button-nav cursor-pointer">
                  settings
                </i>
              </Link>
            </li>
            <li className="nav-item dropdown pe-4">
              <Link className="nav-link p-0 position-relative text-body" to="/">
                <i className="material-icons cursor-pointer">notifications</i>
                <span className="position-absolute top-5 start-100 translate-middle badge rounded-pill  border border-white small py-1 px-2   bg-success">
                  <span className="small">0</span>
                  <span className="visually-hidden">unread notifications</span>
                </span>
              </Link>
            </li>
            <li className="nav-item ">
              <button
                className="nav-link p-0 position-relative text-body"
                onClick={handleLogout}
              >
                <i
                  className="fa-solid fa-right-from-bracket"
                  aria-hidden="true"
                ></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TopNavBar;
