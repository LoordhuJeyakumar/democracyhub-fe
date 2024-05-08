import React from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import forgotpassword from "../assets/forgotpassword.svg";

function ForgotPassword() {
  return (
    <Wrapper>
      <div className="container">
        <h1 className="text-center mt-3 p-2 fw-bold m-0">Forgot Password</h1>
        <div className="row p-4 m-0">
          <div className="col-md-6  forgot-password">
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
                <div className="invalid-feedback">
                  Please enter your email!.
                </div>
                <div className="form-text">
                  Please enter your email to get password reset link.
                </div>
              </div>

              <div className="d-flex justify-content-evenly">
                <button className="btn btn-main w-25" type="submit">
                  Send Link
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
                  <small>If you remember your password? </small>
                  <Link to={"/login"}>Login here</Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <img src={forgotpassword} alt="forgot password" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default ForgotPassword;
