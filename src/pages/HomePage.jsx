import React from "react";
import fist from "../assets/8070128-ai.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <div className="container-fluid p-0 vh-100  w-100">
      <Navbar />
      <main>
        <section className="hero">
          <div className="image-container">
            <img src={fist} alt="" style={{ width: "100%" }} />
            <div className="overlay">
              <div className="d-flex justify-content-evenly text-box ">
                <div className="col-5 text-block-1">
                  <h1 className="display-3  fw-bold">DemocracyHUB</h1>
                  <h2>Empowering citizens to make informed decisions</h2>
                </div>
                <div className="col-5 text-block-2">
                  <p>
                    Welcome to <strong>DemocracyHub</strong>, your one-stop
                    platform for comprehensive, reliable, and user-friendly
                    information about Indian elections. Explore real-time
                    updates on ongoing elections, detailed information about
                    political parties, their coalitions, and manifestos. Join us
                    today to foster active citizenship and promote rural
                    development.
                  </p>
                  <p>
                    Become a part of our growing community. Register today to
                    report and discuss local issues, compare party manifestos,
                    and stay updated with voting reminders.
                  </p>
                  <div>
                    <Link to={"register"} className="btn btn-second">
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default HomePage;
