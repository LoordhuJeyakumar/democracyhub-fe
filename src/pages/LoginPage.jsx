import React, { useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import loginSvg from "../assets/login.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userService from "../services/userService";
import { toast } from "react-toastify";

function LoginPage() {
  const loginUser = useSelector((state) => state.user.login);
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const loginFormRef = useRef(null);
  const navigate = useNavigate();

  const handleLoginInputChange = (event) => {
    dispatch({
      type: "SET_LOGIN_USER",

      payload: { name: event.target.name, value: event.target.value },
    });
  };

  const handleLogin = async (event) => {
    setIsSubmit(true);
    event.preventDefault();

    if (!loginFormRef.current.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      setIsSubmit(false);
    }

    loginFormRef.current.classList.add("was-validated");
    if (loginFormRef.current.checkValidity()) {
      const res = await userService.login(loginUser);
      console.log(res);
      if (res?.response?.status === 401) {
        toast.info(res?.response?.data?.message);
        setIsSubmit(false);
        dispatch({ type: "UNSET_LOGIN_USER" });
        loginFormRef.current.classList.remove("was-validated");
      }
      if (res?.response?.status === 403) {
        toast.info(res?.response?.data?.message);
        setIsSubmit(false);
        dispatch({ type: "UNSET_LOGIN_USER" });
        loginFormRef.current.classList.remove("was-validated");
      }
      if (res?.message === "Network Error") {
        toast.error(res.message);
        setIsSubmit(false);
        dispatch({ type: "UNSET_LOGIN_USER" });
        loginFormRef.current.classList.remove("was-validated");
      }

      if (res?.status === 200) {
        sessionStorage.setItem("accessToken", res.data.accessToken);

        toast.success(res?.data?.message);
        setIsSubmit(false);
        dispatch({ type: "UNSET_LOGIN_USER" });
        loginFormRef.current.classList.remove("was-validated");
        navigate("/redirect");
      }
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <h1 className="text-center mt-3 p-2 fw-bold">Login</h1>
        <div className="row">
          <div className="col-6">
            <img src={loginSvg} alt="login" />
          </div>
          <div className="col-6 mt-5 pt-3">
            <form
              className="needs-validation"
              noValidate
              onSubmit={handleLogin}
              ref={loginFormRef}
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
                  value={loginUser?.email}
                  onChange={handleLoginInputChange}
                  autoComplete=""
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
                  value={loginUser.password}
                  onChange={handleLoginInputChange}
                  autoComplete=""
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Please enter password.</div>
                <div id="passwordHelpBlock" className="form-text">
                  Please enter your password
                </div>
              </div>

              <div className="d-flex justify-content-evenly">
                <button
                  className="btn btn-main w-25 align-items-center d-flex justify-content-center"
                  type="submit"
                >
                  Login
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
                  onClick={() => dispatch({ type: "UNSET_LOGIN_USER" })}
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
                  <small>If you forgot your password? </small>
                  <Link to={"/forget-password"}>Click here</Link>
                  <br />
                  <small>Resend verification email </small>
                  <Link to={"/sendEmail"}>Click here</Link>
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
