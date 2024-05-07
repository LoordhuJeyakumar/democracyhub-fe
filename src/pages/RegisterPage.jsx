import React from "react";
import Wrapper from "../components/Wrapper";

function RegisterPage() {
  return (
    <div>
      <Wrapper>
        <div className="container vh-100">
          <div>
            <h1>Register</h1>
            <form action="">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default RegisterPage;
