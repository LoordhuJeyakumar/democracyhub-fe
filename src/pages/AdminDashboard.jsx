import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <div className="container-fluid py-4 admin-dashboard">
        <div className="row d-flex align-items-center">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body p-3 ">
                <div className="row">
                  <div className="col-7 text-start">
                    <p className=" mb-1 text-capitalize fw-semibold">
                      Total users
                    </p>
                    <h4 className="fw-bolder mb-0">10 </h4>
                    <Link
                      className=" icon-link icon-link-hover stretched-link"
                      to={"/allUsers"}
                    >
                      View
                      <i className="bi bi-arrow-right my-auto"></i>
                    </Link>
                  </div>
                  <div className="col-5 text-center my-auto">
                    <div>
                      <lord-icon
                        src="https://cdn.lordicon.com/fmasbomy.json"
                        trigger="in"
                        delay="1000"
                        stroke="bold"
                        state="morph-group"
                        colors="primary:#1c140d,secondary:#acd0c0,tertiary:#cbe86b"
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
                    <p className=" mb-0 pb-0 text-capitalize fw-semibold d-flex flex-column gap-0">
                      New users &nbsp;
                      <small
                        className="pt-0 mt-0"
                        style={{ fontSize: 10, opacity: 0.5 }}
                      >
                        Last 30 days
                      </small>
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
                        src="https://cdn.lordicon.com/fmasbomy.json"
                        trigger="loop"
                        delay="2000"
                        state="morph-group"
                        colors="primary:#121331,secondary:#acd0c0,tertiary:#cbe86b"
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
                      Government Users
                    </p>
                    <h4 className="fw-bolder mb-0">10 </h4>
                    <Link
                      className=" icon-link icon-link-hover stretched-link "
                      to={"/allUsers"}
                    >
                      View <i className="bi bi-arrow-right my-auto"></i>
                    </Link>
                  </div>
                  <div className="col-5 text-center my-auto">
                    <div>
                      <lord-icon
                        src="https://cdn.lordicon.com/knfwjlul.json"
                        trigger="loop"
                        delay="2000"
                        colors="primary:#1c140d,secondary:#ebe6ef,tertiary:#acd0c0,quaternary:#cbe86b,quinary:#acd0c0,senary:#646e78"
                        style={{ width: "70px", height: "70px" }}
                      ></lord-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body p-3 ">
                <div className="row">
                  <div className="col-7 text-start">
                    <p className=" mb-1 text-capitalize fw-semibold">
                      Total Issues
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
      </div>
    </div>
  );
}

export default AdminDashboard;
