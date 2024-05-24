import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const renderSpinner = () => {
    return (
      <div
        className="spinner-border spinner-border-sm"
        role="status"
        style={{ fontSize: "5px" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  };
  return (
    <div>
      <div className="container-fluid py-4 admin-dashboard">
        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body p-3 ">
                <div className="row">
                  <div className="col-7 text-start">
                    <p className=" mb-1 text-capitalize fw-semibold">
                      No of users
                    </p>
                    <h4 className="fw-bolder mb-0">10 </h4>
                    <Link
                      className="text-start text-decoration-none"
                      to={"/allUsers"}
                    >
                      View all users
                    </Link>
                  </div>
                  <div className="col-5 text-center my-auto">
                    <div>
                      <i className="fa fs-3 fa-users" aria-hidden="true"></i>
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
                      Current Ellection
                    </p>
                    <h4 className="fw-bolder mb-0">10 </h4>
                    <Link
                      className="text-start text-decoration-none"
                      to={"/allUsers"}
                    >
                      View all users
                    </Link>
                  </div>
                  <div className="col-5 text-center my-auto">
                    <div>
                      <i className="fa fs-3 fa-users" aria-hidden="true"></i>
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
                      No of users
                    </p>
                    <h4 className="fw-bolder mb-0">10 </h4>
                    <Link
                      className="text-start text-decoration-none"
                      to={"/allUsers"}
                    >
                      View all users
                    </Link>
                  </div>
                  <div className="col-5 text-center my-auto">
                    <div>
                      <i className="fa fs-3 fa-users" aria-hidden="true"></i>
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
                      No of users
                    </p>
                    <h4 className="fw-bolder mb-0">10 </h4>
                    <Link
                      className="text-start text-decoration-none"
                      to={"/allUsers"}
                    >
                      View all users
                    </Link>
                  </div>
                  <div className="col-5 text-center my-auto">
                    <div>
                      <i className="fa fs-3 fa-users" aria-hidden="true"></i>
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
                      No of users
                    </p>
                    <h4 className="fw-bolder mb-0">10 </h4>
                    <Link
                      className="text-start text-decoration-none"
                      to={"/allUsers"}
                    >
                      View all users
                    </Link>
                  </div>
                  <div className="col-5 text-center my-auto">
                    <div>
                      <i className="fa fs-3 fa-users" aria-hidden="true"></i>
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
                      No of users
                    </p>
                    <h4 className="fw-bolder mb-0">10 </h4>
                    <Link
                      className="text-start text-decoration-none"
                      to={"/allUsers"}
                    >
                      View all users
                    </Link>
                  </div>
                  <div className="col-5 text-center my-auto">
                    <div>
                      <i className="fa fs-3 fa-users" aria-hidden="true"></i>
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
