import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="header fixed-top ">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid d-flex">
          <Link to="/" className="navbar-brand ">
            <h3 className="fw-bold brand">DemocracyHUB</h3>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to={"/"}>
                  About us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"elections"}
                  className="nav-link "
                  aria-current="page"
                >
                  Elections
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"manifestos"}
                  className="nav-link "
                  aria-current="page"
                >
                  Manifestos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"localIssues"}
                  className="nav-link "
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
