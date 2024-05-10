import React from "react";
import { Link, useParams } from "react-router-dom";
import SendEmail from "./SendEmail";

function Invalid() {
  const params = useParams();

  return (
    <div className="d-flex align-items-center flex-column flex-md-row justify-content-evenly vh-100">
      <div>
        <h1 className="Verifying fw-bold position-absolut text-warning">
          Invalid Link!
        </h1>
        <lord-icon
          src="https://cdn.lordicon.com/ezjqphcn.json"
          trigger="in"
          delay="1500"
          state="in-reveal"
          style={{ width: "250px", height: "250px" }}
        ></lord-icon>
      </div>
      {/*  <div>
        <h1 className="text-center mt-3 p-2 fw-bold m-0">Get reset link</h1>
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
            <div className="invalid-feedback">Please enter your email!.</div>
            <div className="form-text">
              Please enter your email to get password reset link.
            </div>
          </div>

          <div className="d-flex justify-content-evenly">
            <button className="btn btn-main " type="submit">
              Send Link
            </button>
            <button type="reset" className="btn btn-second ">
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
          <div className="text-center">
            <Link to={"/"} className="btn btn-info">
              Back to Home
            </Link>
          </div>
        </form>
      </div> */}
      <SendEmail type={"accountVerification"} />
    </div>
  );
}

export default Invalid;
