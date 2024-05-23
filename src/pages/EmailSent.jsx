import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function EmailSent() {
  const signupUser = useSelector((state) => state.user.signup);

  return (
    <div className="row justify-content-evenly pt-5 emailSentBox vh-100">
      <div className="col-12 col-md-4 mx-5 px-5">
        <h2>Registered successfully</h2>
        <h1></h1>

        <h1 className="brand">DemocracyHUB</h1>
        <div>
          <p>Credentials to access your account has been updated.</p>
          <h5>Hi {signupUser?.name},</h5>
          <p>
            Thank you very much for registering at <strong>DemocracyHUB</strong>
          </p>
          <p>
            We have sent an email to your mailbox. Please follow the
            instructions in the mail to confirm your account. Once your account
            is confirmed, you may login to access your dashboard.
          </p>
        </div>
        <div className="text-center">
          <Link to={"/"} className="btn btn-info">
            Back to Home
          </Link>
        </div>
      </div>
      <div className="col-6 col-md-4">
        <lord-icon
          src="https://cdn.lordicon.com/tmqaflqo.json"
          trigger="in"
          delay="1500"
          state="in-assembly"
          style={{ width: "250px", height: "250px" }}
        ></lord-icon>
      </div>
    </div>
  );
}

export default EmailSent;
