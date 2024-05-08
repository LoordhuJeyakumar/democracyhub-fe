import React from "react";
import Wrapper from "../components/Wrapper";
import illustration from "../assets/img.svg";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div>
      <Wrapper>
        <div className="container h-100">
          <div>
            <h1 className="text-center p-2 mt-2">Register</h1>
            <div className="row">
              <div className="col-6">
                <img src={illustration} alt="" />
              </div>
              <div className="col-6">
                <form className="needs-validation" noValidate>
                  <div className="input-box name mb-3">
                    <label htmlFor="nameInput" className="form-label">
                      <i class="fa fa-user" aria-hidden="true"></i> Full Name
                    </label>

                    <input
                      name="name"
                      type="text"
                      id="nameInput"
                      className="form-control"
                      aria-describedby="nameInput"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      Please enter your full name.
                    </div>
                  </div>
                  <div className="input-box email mb-3">
                    <label htmlFor="emailInput" className="form-label">
                      <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
                      Email
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
                    <div className="invalid-feedback">
                      Please enter your email.
                    </div>
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
                    <div className="invalid-feedback">
                      Please enter password.
                    </div>
                    <div id="passwordHelpBlock" className="form-text">
                      Your password must be 6-15 characters long, contain
                      letters and numbers, and must not contain spaces, special
                      characters, or emoji.
                    </div>
                  </div>
                  <div className="input-box confirmPassword mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      <i className="fa fa-key" aria-hidden="true"></i> Confirm
                      Password
                    </label>

                    <input
                      name="confirmPassword"
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      aria-describedby="confirmPassword"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      Please re-enter password.
                    </div>
                    <div className="form-text">
                      Please re-enter your password
                    </div>
                  </div>
                  <div className="d-flex justify-content-evenly">
                    <button className="btn btn-main w-25" type="submit">
                      Register
                    </button>
                    <button type="reset" className="btn btn-second w-25">
                      Reset
                    </button>
                  </div>
                  <div>
                    <p className="text-center mt-3 opacity-75">
                      If already have an account?{" "}
                      <Link to={"/login"}>Login here</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default RegisterPage;
