import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import illustration from "../assets/img.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userService from "../services/userService";
import { toast } from "react-toastify";

function RegisterPage() {
  const signupUser = useSelector((state) => state.user.signup);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const registerFormRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleInputChange = (event) => {
    if (event.target.name === "email") {
      event.target.value.toLowerCase();
    }
    dispatch({
      type: "SET_REGISTER_USER",
      payload: { name: event.target.name, value: event.target.value },
    });
  };

  const handleRegister = async (event) => {
    setIsSubmit(true);
    event.preventDefault();

    if (!registerFormRef.current.checkValidity() || !signupUser.passwordMatch) {
      event.preventDefault();
      event.stopPropagation();
      setIsSubmit(false);
      if (registerFormRef) {
        registerFormRef.current.reportValidity();
      }
    }
    if (!signupUser.passwordMatch) {
      registerFormRef.current.reportValidity();
      confirmPasswordRef.current.setCustomValidity("Passwords do not match");
    } else {
      confirmPasswordRef.current.setCustomValidity("");
    }

    registerFormRef.current.classList.add("was-validated");
    if (registerFormRef.current.checkValidity()) {
      const res = await userService.register(signupUser);

      if (res?.response?.status === 409) {
        toast.info(res?.response?.data?.message);
        setIsSubmit(false);
        dispatch({ type: "UNSET_REGISTER_USER" });
        registerFormRef.current.classList.remove("was-validated");
      }

      if (res?.message === "Network Error") {
        toast.error(res.message);
        setIsSubmit(false);
        dispatch({ type: "UNSET_REGISTER_USER" });
        registerFormRef.current.classList.remove("was-validated");
      }

      if (res?.status === 201) {
        toast.success(res?.data?.message);
        setIsSubmit(false);

        registerFormRef.current.classList.remove("was-validated");
        navigate("/emailSent");
      }
    }
  };

  return (
    <div className="vh-100">
      <Wrapper>
        <div className="container ">
          <div>
            <h1 className="text-center mt-3 p-2 fw-bold">Register</h1>
            <div className="row">
              <div className="col-12 col-md-6">
                <img src={illustration} alt="" />
              </div>
              <div className="col-12 col-md-6">
                <form
                  className="needs-validation"
                  noValidate
                  ref={registerFormRef}
                  onSubmit={handleRegister}
                >
                  <div className="input-box name mb-3">
                    <label htmlFor="nameInput" className="form-label">
                      <i className="fa fa-user" aria-hidden="true"></i> Full
                      Name
                    </label>

                    <input
                      autoComplete=""
                      name="name"
                      type="text"
                      id="nameInput"
                      className="form-control"
                      aria-describedby="nameInput"
                      required
                      onChange={handleInputChange}
                      value={signupUser?.name}
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
                      autoComplete=""
                      name="email"
                      type="email"
                      id="emailInput"
                      className="form-control"
                      aria-describedby="emailInput"
                      required
                      onChange={handleInputChange}
                      value={signupUser.email}
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
                      autoComplete=""
                      name="password"
                      type="password"
                      id="password"
                      className="form-control"
                      aria-describedby="passwordHelpBlock"
                      required
                      onChange={handleInputChange}
                      value={signupUser.password}
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
                      autoComplete=""
                      ref={confirmPasswordRef}
                      name="confirmPassword"
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      aria-describedby="confirmPassword"
                      required
                      onChange={handleInputChange}
                      value={signupUser.confirmPassword}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      Please re-enter password.
                    </div>
                    <div className="form-text">
                      Please re-enter your password
                    </div>
                  </div>
                  <div className="d-flex justify-content-evenly align-items-center">
                    <button
                      className="btn btn-main w-25 align-items-center d-flex justify-content-center"
                      type="submit"
                    >
                      Register{" "}
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
                      onClick={() => dispatch({ type: "UNSET_REGISTER_USER" })}
                    >
                      Clear
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
