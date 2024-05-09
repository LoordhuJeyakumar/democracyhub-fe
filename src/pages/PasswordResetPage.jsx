import React, { useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import { Link, useNavigate } from "react-router-dom";
import passwordresetSVG from "../assets/passwordreset.svg";
import userService from "../services/userService";

function PasswordResetPage() {
  const [isSubmit, setIsSubmit] = useState(false);
  const passwordResetRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  console.log(newPassword);
  const handleInputChange = (event) => {
    setNewPassword((preveState) => {
      return {
        ...preveState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handlePasswordReset = async (event) => {
    setIsSubmit(true);
    event.preventDefault();

    if (!passwordResetRef.current.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      setIsSubmit(false);
    }

    passwordResetRef.current.classList.add("was-validated");
    if (passwordResetRef.current.checkValidity()) {
     const res = await userService.resetPassword()
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <h1 className="text-center mt-3 p-2 fw-bold">Reset Password</h1>
        <div className="row">
          <div className="col-6">
            <img src={passwordresetSVG} alt="password reset" />
          </div>
          <div className="col-6 mt-5 pt-3">
            <form
              className="needs-validation"
              noValidate
              onSubmit={handlePasswordReset}
              ref={passwordResetRef}
            >
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
                  onChange={handleInputChange}
                  value={newPassword.password}
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Please enter password.</div>
              </div>
              <div className="input-box confirmPassword mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  <i className="fa fa-key" aria-hidden="true"></i> Confirm
                  Password
                </label>

                <input
                  ref={confirmPasswordRef}
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  aria-describedby="confirmPassword"
                  required
                  onChange={handleInputChange}
                  value={newPassword.confirmPassword}
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please re-enter password.
                </div>
                <div className="form-text">Please re-enter your password</div>
              </div>

              <div className="d-flex justify-content-evenly">
                <button
                  className="btn btn-main  align-items-center d-flex justify-content-center"
                  type="submit"
                >
                  Change password
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
                <button
                  type="reset"
                  className="btn btn-second w-25"
                  onClick={() =>
                    setNewPassword({
                      password: "",
                      confirmPassword: "",
                    })
                  }
                >
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
        </div>
      </div>
    </Wrapper>
  );
}

export default PasswordResetPage;
