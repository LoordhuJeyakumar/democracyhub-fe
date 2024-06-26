import React, { useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import { Link, useNavigate } from "react-router-dom";
import forgotpassword from "../assets/forgotpassword.svg";
import userService from "../services/userService";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const forgotpasswordREf = useRef(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleForgotPasswordLink = async (event) => {
    setIsSubmit(true);
    event.preventDefault();

    if (!forgotpasswordREf.current.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      setIsSubmit(false);
    }

    forgotpasswordREf.current.classList.add("was-validated");
    if (forgotpasswordREf.current.checkValidity()) {
      let res = await userService.sendResetLink(email);
      console.log(res);

      if (res?.response?.status === 401) {
        toast.info(res?.response?.data?.message);
        setIsSubmit(false);
        setEmail("");
        forgotpasswordREf.current.classList.remove("was-validated");
      }
      if (res?.response?.status === 403) {
        toast.info(res?.response?.data?.message);
        setIsSubmit(false);
        setEmail("");
        forgotpasswordREf.current.classList.remove("was-validated");
      }
      if (res?.message === "Network Error") {
        toast.error(res.message);
        setIsSubmit(false);
        setEmail("");
        forgotpasswordREf.current.classList.remove("was-validated");
      }
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        setIsSubmit(false);
        setEmail("");
        forgotpasswordREf.current.classList.remove("was-validated");
        setIsEmailSent(true);
      }
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <h1 className="text-center mt-3 p-2 fw-bold m-0">Forgot Password</h1>
        <div className="row p-4 m-0">
          <div className="col-md-6  forgot-password">
            <form
              ref={forgotpasswordREf}
              className="needs-validation"
              noValidate
              onSubmit={handleForgotPasswordLink}
            >
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please enter your email!.
                </div>
                <div className="form-text">
                  Please enter your email to get password reset link.
                </div>
              </div>

              {isEmailSent ? (
                <div
                  className="alert alert-success d-flex align-items-center"
                  role="alert"
                >
                  <small>
                    Verification link succesfully sent, please check it out your
                    email! <i className="bi bi-check-circle-fill"></i>
                  </small>
                </div>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-evenly">
                <button
                  className="btn btn-main align-items-center d-flex justify-content-center"
                  type="submit"
                >
                  Send Link
                  {isSubmit ? (
                    <>
                      &nbsp;{" "}
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
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
