import React from "react";
import Wrapper from "../components/Wrapper";
import loginSvg from "../assets/login.svg";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <Wrapper>
      <div className="container">
        <h1 className="text-center mt-3 p-2 fw-bold">Login</h1>
        <div className="row">
          <div className="col-6">
            <img src={loginSvg} alt="" />
          </div>
          <div className="col-6 mt-5 pt-3">
            <form className="needs-validation" noValidate>
              <div className="input-box email mb-3">
                <label htmlFor="emailInput" className="form-label">
                  <i className="fa fa-envelope" aria-hidden="true"></i> Email
                </label>

                <input
                  name="email"
                  type="email"
                  id="emailInput"
                  className="form-control"
                  aria-describedby="emailInput"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Please enter your email.</div>
                <div className="form-text">Please enter your email</div>
              </div>
              <div className="input-box password mb-3">
                <label htmlFor="password" className="form-label">
                  <i className="fa fa-key" aria-hidden="true"></i> Password
                </label>

                <input
                  name="password"
                  type="password"
                  id="password"
                  className="form-control"
                  aria-describedby="passwordHelpBlock"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Please enter password.</div>
                <div id="passwordHelpBlock" className="form-text">
                  Please enter your password
                </div>
              </div>

              <div className="d-flex justify-content-evenly">
                <button className="btn btn-main w-25" type="submit">
                  Login
                </button>
                <button type="reset" className="btn btn-second w-25">
                  Clear
                </button>
              </div>
              <div>
                <p className="text-center mt-3 opacity-75">
                  If Don't have an account?{" "}
                  <Link to={"/register"}>Register here</Link>
                </p>
                <p className="text-center mt-3 opacity-75">
                  <small>If you forgot your password? </small>
                  <Link to={"/forget-password"}>Click here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default LoginPage;
