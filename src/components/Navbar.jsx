import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const { user, isLoggedIn } = localStorage;
  const navigate = useNavigate();
  return (
    <header className="header navbarHome fixed-top rounded-pill">
      <nav className="navbar navbar-expand-lg rounded-pill">
        <div className="container-fluid d-flex">
          <Link to="/" className="navbar-brand ">
            <h3 className="fw-bold brand my-auto">DemocracyHUB</h3>
          </Link>

          <div
            className="d-flex justify-content-between  order-3
"
          >
            <button
              className="navbar-toggler order-2 mx-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <Link to="/login" className="btn btn-main mx-2">
              Login
            </Link>
          </div>
          <div className="collapse navbar-collapse home-navbar" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <NavLink className="nav-link " aria-current="page" to={"/"}>
                  About us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/elections"}
                  className="nav-link fw-medium"
                  aria-current="page"
                >
                  Elections
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"manifestos"}
                  className="nav-link fw-medium"
                  aria-current="page"
                >
                  Manifestos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/localIssues"}
                  className="nav-link fw-medium"
                  aria-current="page"
                >
                  Local Issues
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
