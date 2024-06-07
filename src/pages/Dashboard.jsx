import React from "react";

import MainWrapper from "../components/MainWrapper";
import authUtils from "../services/authUtils";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Dashboard() {
  const userDetails = useSelector((state) => state.user);

  return <div>
    <div className="container-fluid py-4 user-dashboard">

      <div className="row mt-3">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body p-3 ">
              <div className="row">
                <div className="col-7 text-start">
                  <p className=" mb-1 text-capitalize fw-semibold">
                    All Issues
                  </p>
                  <h4 className="fw-bolder mb-0">10 </h4>
                  <Link
                    className=" icon-link icon-link-hover stretched-link "
                    to={"/allUsers"}
                  >
                    View
                    <i className="bi bi-arrow-right my-auto"></i>
                  </Link>
                </div>
                <div className="col-5 text-center my-auto">
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/ofcynlwa.json"
                      trigger="loop"
                      delay="2000"
                      colors="primary:#121131,secondary:#f3ffbd,tertiary:#cbe86b,quaternary:#acd0c0"
                      style={{ width: "70px", height: "70px" }}
                    ></lord-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body p-3 ">
              <div className="row">
                <div className="col-7 text-start">
                  <p className=" mb-1 text-capitalize fw-semibold">
                    Pending issues
                  </p>
                  <h4 className="fw-bolder mb-0">10 </h4>
                  <Link
                    className=" icon-link icon-link-hover stretched-link "
                    to={"/allUsers"}
                  >
                    View
                    <i className="bi bi-arrow-right my-auto"></i>
                  </Link>
                </div>
                <div className="col-5 text-center my-auto">
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/pcllgpqm.json"
                      trigger="loop"
                      delay="2000"
                      colors="primary:#121331,secondary:#ebe6ef,tertiary:#acd0c0"
                      style={{ width: "70px", height: "70px" }}
                    ></lord-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body p-3 ">
              <div className="row">
                <div className="col-7 text-start">
                  <p className=" mb-1 text-capitalize fw-semibold">
                    Resolved Issues
                  </p>
                  <h4 className="fw-bolder mb-0">10 </h4>
                  <Link
                    className=" icon-link icon-link-hover stretched-link "
                    to={"/allUsers"}
                  >
                    View
                    <i className="bi bi-arrow-right my-auto"></i>
                  </Link>
                </div>
                <div className="col-5 text-center my-auto">
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/lsrcesku.json"
                      trigger="loop"
                      delay="2000"
                      style={{ width: "70px", height: "70px" }}
                    ></lord-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mt-2">
          <div className="card">
            <div className="card-body p-3 ">
              <div className="row">
                <div className="col-7 text-start">
                  <p className=" mb-1 text-capitalize fw-semibold">
                    Upcomming Election
                  </p>
                  <h4 className="fw-bolder mb-0">10 </h4>
                  <Link
                    className=" icon-link icon-link-hover stretched-link "
                    to={"/allUsers"}
                  >
                    View
                    <i className="bi bi-arrow-right my-auto"></i>
                  </Link>
                </div>
                <div className="col-5 text-center my-auto">
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/etclvyzs.json"
                      trigger="loop"
                      delay="2000"
                      colors="primary:#121331,secondary:#f9c9c0,tertiary:#cbe86b,quaternary:#acd0c0"
                      style={{ width: "70px", height: "70px" }}
                    ></lord-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mt-2">
          <div className="card">
            <div className="card-body p-3 ">
              <div className="row">
                <div className="col-7 text-start">
                  <p className=" mb-1 text-capitalize fw-semibold">
                    Past Elections
                  </p>
                  <h4 className="fw-bolder mb-0">10 </h4>
                  <Link
                    className=" icon-link icon-link-hover stretched-link "
                    to={"/allUsers"}
                  >
                    View
                    <i className="bi bi-arrow-right my-auto"></i>
                  </Link>
                </div>
                <div className="col-5 text-center my-auto">
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/etclvyzs.json"
                      trigger="in"
                      delay="2000"
                      colors="primary:#121331,secondary:#f9c9c0,tertiary:#cbe86b,quaternary:#acd0c0"
                      style={{ width: "70px", height: "70px" }}
                    ></lord-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body p-3 ">
              <div className="row">
                <div className="col-7 text-start">
                  <p className=" mb-1 text-capitalize fw-semibold">
                    my Issues
                  </p>
                  <h4 className="fw-bolder mb-0">10 </h4>
                  <Link
                    className=" icon-link icon-link-hover stretched-link "
                    to={"/allUsers"}
                  >
                    View
                    <i className="bi bi-arrow-right my-auto"></i>
                  </Link>
                </div>
                <div className="col-5 text-center my-auto">
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/ofcynlwa.json"
                      trigger="loop"
                      delay="2000"
                      colors="primary:#121131,secondary:#f3ffbd,tertiary:#cbe86b,quaternary:#acd0c0"
                      style={{ width: "70px", height: "70px" }}
                    ></lord-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body p-3 ">
              <div className="row">
                <div className="col-7 text-start">
                  <p className=" mb-1 text-capitalize fw-semibold">
                    Pending issues
                  </p>
                  <h4 className="fw-bolder mb-0">10 </h4>
                  <Link
                    className=" icon-link icon-link-hover stretched-link "
                    to={"/allUsers"}
                  >
                    View
                    <i className="bi bi-arrow-right my-auto"></i>
                  </Link>
                </div>
                <div className="col-5 text-center my-auto">
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/pcllgpqm.json"
                      trigger="loop"
                      delay="2000"
                      colors="primary:#121331,secondary:#ebe6ef,tertiary:#acd0c0"
                      style={{ width: "70px", height: "70px" }}
                    ></lord-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body p-3 ">
              <div className="row">
                <div className="col-7 text-start">
                  <p className=" mb-1 text-capitalize fw-semibold">
                    Resolved Issues
                  </p>
                  <h4 className="fw-bolder mb-0">10 </h4>
                  <Link
                    className=" icon-link icon-link-hover stretched-link "
                    to={"/allUsers"}
                  >
                    View
                    <i className="bi bi-arrow-right my-auto"></i>
                  </Link>
                </div>
                <div className="col-5 text-center my-auto">
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/lsrcesku.json"
                      trigger="loop"
                      delay="2000"
                      style={{ width: "70px", height: "70px" }}
                    ></lord-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default Dashboard;
