import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../services/userService";
import { toast } from "react-toastify";

function SendEmail({ type }) {
  console.log(type);
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const getLinkFormRef = useRef(null);
  const handleGetReset = async (event) => {
    setIsSubmit(true);
    event.preventDefault();

    if (!getLinkFormRef.current.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      setIsSubmit(false);
    }

    getLinkFormRef.current.classList.add("was-validated");
    if (getLinkFormRef.current.checkValidity()) {
      const res = await userService.sendResetLink(email);

      if (res?.response?.status === 401) {
        toast.info(res?.response?.data?.message);
        setIsSubmit(false);
        setEmail("");
        getLinkFormRef.current.classList.remove("was-validated");
      }
      if (res?.response?.status === 403) {
        toast.info(res?.response?.data?.message);
        setIsSubmit(false);
        setEmail("");
        getLinkFormRef.current.classList.remove("was-validated");
      }
      if (res?.message === "Network Error") {
        toast.error(res.message);
        setIsSubmit(false);
        setEmail("");
        getLinkFormRef.current.classList.remove("was-validated");
      }
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        setIsSubmit(false);
        setEmail("");
        getLinkFormRef.current.classList.remove("was-validated");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    }
  };
  const handleGetVerification = async (event) => {
    setIsSubmit(true);
    event.preventDefault();

    if (!getLinkFormRef.current.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      setIsSubmit(false);
    }

    getLinkFormRef.current.classList.add("was-validated");
    if (getLinkFormRef.current.checkValidity()) {
      const res = await userService.sendVerificationLink(email);
      console.log(res);
      if (res?.response?.status === 401) {
        toast.info(res?.response?.data?.message);
        setIsSubmit(false);
        setEmail("");
        getLinkFormRef.current.classList.remove("was-validated");
      }
      if (res?.response?.status === 403) {
        toast.info(res?.response?.data?.message);
        setIsSubmit(false);
        setEmail("");
        getLinkFormRef.current.classList.remove("was-validated");
      }
      if (res?.message === "Network Error") {
        toast.error(res.message);
        setIsSubmit(false);
        setEmail("");
        getLinkFormRef.current.classList.remove("was-validated");
      }
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        setIsSubmit(false);
        setEmail("");
        getLinkFormRef.current.classList.remove("was-validated");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    }
  };
  return (
    <div>
      <h1 className="text-center mt-3 p-2 fw-bold m-0">
        {type === "reset" ? " Get reset link" : "Get verification link"}
      </h1>
      <form
        ref={getLinkFormRef}
        className="needs-validation"
        noValidate
        onSubmit={type === "reset" ? handleGetReset : handleGetVerification}
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Please enter your email!.</div>
          <div className="form-text">
            Please enter your email to get password{" "}
            {!type === "accountVerification" ? " verification" : " reset "}{" "}
            link.
          </div>
        </div>

        <div className="d-flex justify-content-evenly">
          <button
            className="btn btn-main align-items-center d-flex justify-content-center"
            type="submit"
          >
            Send Link{" "}
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
            className="btn btn-second "
            onClick={() => setEmail("")}
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
        <div className="text-center">
          <Link to={"/"} className="btn btn-info">
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SendEmail;
