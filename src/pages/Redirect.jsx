import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirect() {
  const navigate = useNavigate();
  const { accessToken, user } = sessionStorage;
  const userDetails = JSON.parse(user);

  useEffect(() => {
    handleRedirect();
  }, []);

  const handleRedirect = () => {
    if (accessToken) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };
  return (
    <div className="d-flex flex-column pt-5 align-items-center justify-content-center">
      <div className="pb-2 mb-5">
        <div className="">
          <span className="h1">Welcome! {},</span>{" "}
          <span className="h2">Just a moment...</span>
        </div>

        <p className="">
          We're redirecting you to your dashboard... Not working?{" "}
          <button className="btn btn-warning" onClick={handleRedirect}>
            Click here
          </button>
        </p>
      </div>
      <div className=" mb-5">
        <lord-icon
          src="https://cdn.lordicon.com/spjdafms.json"
          trigger="loop"
          state="loop-walking"
          style={{ width: "250px", height: "250px" }}
        ></lord-icon>
      </div>
      <div className="slider top-50 mt-5 pt-5">
        <div className="line"></div>
        <div className="break dot1"></div>
        <div className="break dot2"></div>
        <div className="break dot3"></div>
      </div>
    </div>
  );
}

export default Redirect;
