import React from "react";
import MainWrapper from "../components/MainWrapper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserProfile() {
  const user = useSelector((state) => state.user);
  let userDetails = user.details;
  console.log(userDetails);
  return (
    <div className="vh-100">
      <div className="card card-body mx-3 mx-md-4 mt-5 user-details-card">
        <div className="row gx-4 mb-2">
          <div className="col-auto">
            <div className="avatar avatar-xl position-relative">
              <lord-icon
                className="w-100 border-radius-lg shadow-sm"
                src="https://cdn.lordicon.com/fmasbomy.json"
                trigger="in"
                delay="2000"
                colors="primary:#1c140d,secondary:#f3ffbd,tertiary:#cbe86b"
                style={{ width: "100px", height: "100px" }}
              ></lord-icon>
            </div>
          </div>
          <div className="col-auto my-auto">
            <div className="h-100">
              <h5 className="mb-1">Welcome {userDetails.name}</h5>
            </div>
          </div>
          <div className="col-lg-1 col-1 col-md-1 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
            <div className="nav-wrapper position-relative end-0">
              <Link className="btn" to={"/profileSettings"}>
                <i className="material-icons text-lg position-relative">
                  settings
                </i>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="row mt-3">
            <div className="col-12 col-md-6 col-xl-6 mt-md-0 mt-4 position-relative">
              <div className="card  h-100 userInfo-card">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-md-8 d-flex align-items-center">
                      <h6 className="mb-0">Profile Information</h6>
                    </div>
                    <div className="col-md-4 text-end">
                      <Link to={"/profileSettings"}>
                        <i
                          className="fas fa-user-edit text-secondary text-sm"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          aria-hidden="true"
                          aria-label="Edit Profile"
                          data-bs-original-title="Edit Profile"
                        ></i>
                        <span className="sr-only">Edit Profile</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3 d-flex justify-content-between">
                  <ul className="list-group pt-4">
                    <li className="list-group-item  border-0 ps-0 pt-0 text-sm">
                      <strong className="">Full Name:</strong> &nbsp;{" "}
                      {userDetails.name ? userDetails.name : "none"}
                    </li>
                    <li className="list-group-item  border-0 ps-0 text-sm">
                      <strong className="">Mobile:</strong> &nbsp;
                      {userDetails.phone ? userDetails.phone : "none"}
                    </li>
                    <li className="list-group-item  border-0 ps-0 text-sm">
                      <strong className="">Email:</strong> &nbsp;
                      {userDetails.email ? userDetails.email : "none"}
                    </li>
                    <li className="list-group-item  border-0 ps-0 text-sm">
                      <strong className="">DOB:</strong> &nbsp;
                      {userDetails.dob ? userDetails.dob : "none"}
                    </li>
                  </ul>

                  <div className="pt-4">
                    <lord-icon
                      src="https://cdn.lordicon.com/yqiuuheo.json"
                      trigger="in"
                      delay="1500"
                      state="in-unfold"
                      style={{ width: "150px", height: "150px" }}
                    ></lord-icon>
                  </div>
                </div>
              </div>
              <hr className="vertical light" />
            </div>
            <div className="col-12 col-md-6 col-xl-6 mt-md-0 mt-4 position-relative">
              <div className="card userInfo-card h-100">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-md-8 d-flex align-items-center ">
                      <h6 className="mb-0">Contact details</h6>
                    </div>
                    <div className="col-md-4 text-end">
                      <Link to={"/profileSettings"}>
                        <i
                          className="fas fa-user-edit text-secondary text-sm"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          aria-hidden="true"
                          aria-label="Edit Profile"
                          data-bs-original-title="Edit Profile"
                        ></i>
                        <span className="sr-only">Edit Profile</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3 d-flex justify-content-between">
                  <hr className="horizontal gray-light m-0 p-0" />
                  <ul className="list-group pt-3">
                    <li className="list-group-item  border-0 ps-0 pt-0 text-sm">
                      <strong className="">Address:</strong> &nbsp;{" "}
                      {userDetails?.addressDetails.address
                        ? userDetails?.addressDetails.address
                        : "none"}
                    </li>
                    <li className="list-group-item  border-0 ps-0 text-sm">
                      <strong className="">City:</strong> &nbsp;
                      {userDetails?.addressDetails.city
                        ? userDetails?.addressDetails.city
                        : "none"}
                    </li>
                    <li className="list-group-item  border-0 ps-0 text-sm">
                      <strong className="">State:</strong> &nbsp;
                      {userDetails?.addressDetails.state
                        ? userDetails?.addressDetails.state
                        : "none"}
                    </li>
                    <li className="list-group-item  border-0 ps-0 text-sm">
                      <strong className="">Pincode:</strong> &nbsp;{" "}
                      {userDetails?.addressDetails.pincode
                        ? userDetails?.addressDetails.pincode
                        : "none"}
                    </li>
                  </ul>
                  <div className="pt-3">
                    <lord-icon
                      src="https://cdn.lordicon.com/egmlnyku.json"
                      trigger="in"
                      delay="1500"
                      state="in-reveal"
                      style={{ width: "150px", height: "150px" }}
                    ></lord-icon>
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

export default UserProfile;
