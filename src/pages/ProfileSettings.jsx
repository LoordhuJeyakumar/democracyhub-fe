import React, { useRef, useState } from "react";
import MainWrapper from "../components/MainWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { toast } from "react-toastify";

function ProfileSettings() {
  const { basicInfo, changePassword } = useSelector((state) => state.editUser);
  const [fetchedUser, setFetchedUser] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const modalCloseBtnRef = useRef(null);
  const basicInfoFormRef = useRef(null);
  const modalCloseDeactiveBtnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = localStorage;
  let userParsed;

  if (user) {
    userParsed = JSON.parse(user);
  }
  const changePasswordFormRef = useRef(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleFetchUser = (event) => {
    event.preventDefault();
    if (!user.id) {
      getUser();
    }
  };

  const getUser = async () => {
    const res = await userService.getUserDetails(userParsed.id);

    if (res?.code === "ERR_NETWORK") {
      toast.error(res.message);
      return;
    }
    if (res?.user) {
      toast.success(res.message);
      setIsFetched(true);
      setFetchedUser(res.user);
      const { name, email, phone, dob, addressDetails } = res.user;
      let newObj = {
        name: name ? name : "",
        email: email ? email : "",
        phone: phone ? phone : "",
        dob: dob ? new Date(dob).toISOString().split("T")[0] : "",
        addressDetails,
      };
      dispatch({
        type: "SET_BASICINFO",
        payload: newObj,
      });
    } else {
      setIsFetched(false);
      toast.error("Error fetching");
    }
  };

  const handleBasicInputChange = async (event) => {
    if (!isFetched) {
      toast.info("Please fetch user details");
      return;
    }

    event.preventDefault();
    let obj = {
      ...basicInfo,
    };
    if (event.target.name == "name") {
      obj.name = event.target.value;
    } else if (event.target.name == "email") {
      obj.email = event.target.value;
    } else if (event.target.name == "phone") {
      obj.phone = event.target.value;
    } else if (event.target.name == "dob") {
      obj.dob = event.target.value;
    } else if (event.target.name == "address") {
      obj.addressDetails.address = event.target.value;
    } else if (event.target.name == "city") {
      obj.addressDetails.city = event.target.value;
    } else if (event.target.name == "state") {
      obj.addressDetails.state = event.target.value;
    } else if (event.target.name == "pincode") {
      obj.addressDetails.pincode = event.target.value;
    }

    dispatch({
      type: "SET_BASICINFO",
      payload: obj,
    });
  };

  const handleChangePasswordInput = (event) => {
    event.preventDefault();

    dispatch({
      type: "SET_CHANGEPASSWORD",
      payload: { name: event.target.name, value: event.target.value },
    });

    let newPasswordInput = changePasswordFormRef.current[1];
    let newPasswordConfirmInput = changePasswordFormRef.current[2];

    if (newPasswordInput.value == newPasswordConfirmInput.value) {
      changePasswordFormRef.current[2].classList.add("is-valid");
      changePasswordFormRef.current[2].classList.remove("is-invalid");

      newPasswordConfirmInput.setCustomValidity("");
    } else {
      changePasswordFormRef.current[2].classList.remove("is-valid");
      changePasswordFormRef.current[2].classList.add("is-invalid");
      changePasswordFormRef.current.classList.remove("was-validated");
      newPasswordConfirmInput.setCustomValidity("password must match");
    }
  };

  const handleUpdateBasicInfo = async (event) => {
    event.preventDefault();
    let id = userParsed.id;
    let updateObj = basicInfo;

    if (!basicInfoFormRef.current.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    basicInfoFormRef.current.classList.add("was-validated");
    if (basicInfoFormRef.current.checkValidity()) {
      const res = await userService.updateUserDetails(id, updateObj);

      if (res.status === 200) {
        toast.success("User details are updated successfuly!");
        dispatch({
          type: "UNSET_BASICINFO",
        });
        setFetchedUser("");
        setIsFetched(false);
        basicInfoFormRef.current.classList.remove("was-validated");
      } else {
        toast.error("Error updating the user");
      }
    }
  };
  const handleChangePassword = async (event) => {
    setIsSubmit(true);
    event.preventDefault();
    // Prevent form submission if there are any invalid fields
    if (!changePasswordFormRef.current.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      setIsSubmit(false);
    }
    changePasswordFormRef.current.classList.add("was-validated");
    if (changePasswordFormRef.current.checkValidity()) {
      const res = await userService.changePassword(
        userParsed.id,
        changePassword
      );
      console.log(res);
      if (res.code === "ECONNABORTED") {
        toast.error("timeout of 5000ms exceeded, /n Please try again");
        dispatch({ type: "UNSET_CHANGEPASSWORD" });
        changePasswordFormRef.current.classList.remove("was-validated");
        setIsSubmit(false);
        return null;
      }

      if (res?.response?.status === 401) {
        toast.info(res.response.data.message);
        dispatch({ type: "UNSET_CHANGEPASSWORD" });
        changePasswordFormRef.current.classList.remove("was-validated");
        setIsSubmit(false);
        return null;
      }

      if (res?.status === 200) {
        toast.success(res.data.message);
        dispatch({ type: "UNSET_CHANGEPASSWORD" });
        changePasswordFormRef.current.classList.remove("was-validated");
        setIsSubmit(false);
        sessionStorage.clear();

        navigate("/login");
      }
    }
  };
  const handleDeleteUser = async (event) => {
    try {
      event.preventDefault();
      if (basicInfo?.name && basicInfo?.email) {
        if (userParsed.id) {
          const res = await userService.deleteUserByUser(userParsed.id);
          if (res.status === 200) {
            if (modalCloseBtnRef) {
              modalCloseBtnRef.current.click();
              document.body.classList.remove("modal-open");
              document.querySelector(".modal-backdrop");
            }
            toast.info(res.data.message);
            setIsSubmit(false);
            sessionStorage.clear();

            navigate("/login");
          }
        } else {
          console.error("error userId");
        }
      } else {
        if (modalCloseBtnRef) {
          modalCloseBtnRef.current.click();
          toast.error("Please fetch user details");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeactivateUser = async () => {
    try {
      event.preventDefault();
      if (basicInfo?.name && basicInfo?.email) {
        if (userParsed.id) {
          const res = await userService.deActivateUserByUser(userParsed.id);
          if (res.status === 200) {
            if (modalCloseBtnRef) {
              document.body.classList.remove("modal-open");
              document.querySelector(".modal-backdrop").remove();
              modalCloseBtnRef.current.click();
              toast.info(res.data.message);
              setIsSubmit(false);
              localStorage.clear();
              sessionStorage.clear();

              navigate("/login");
            }
          }
        } else {
          console.error("error userId");
        }
      } else {
        if (modalCloseDeactiveBtnRef) {
          modalCloseDeactiveBtnRef.current.click();
          toast.error("Please fetch user details");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="container-fluid my-3 py-3">
        <div
          className="modal fade deactivate text-light"
          id="handleDeactivateModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog ">
            <div className="modal-content bg-dark">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Deactivate
                </h1>
                <button
                  type="button"
                  className="btn-close bg-light"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body ">
                <h2 className="p-2">Are you sure ?</h2>
                <h5>Do you want to deactivate your account</h5>
                <p className="text-sm mb-0 p-2">
                  Once you deactivate your account, you have to verify your
                  email again. Please be certain.
                </p>
              </div>
              <div className="modal-footer p-3 d-flex justify-content-evenly">
                <button
                  type="button"
                  className="btn btn-secondary bg-gradient-secondary"
                  data-bs-dismiss="modal"
                  ref={modalCloseDeactiveBtnRef}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-warning bg-gradient-warning"
                  onClick={handleDeactivateUser}
                >
                  Yes{" "}
                  <div
                    className={
                      isSubmit ? "spinner-border spinner-border-sm " : ""
                    }
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade delete"
          id="handleDeleteModal"
          data-bs-backdrop="static"
          data-bs-keyboard="true"
          tabIndex="-1"
          aria-labelledby="handleDeleteModal"
          aria-hidden="true"
        >
          <div className="modal-dialog text-light">
            <div className="modal-content bg-dark">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="handleDeleteModal">
                  Delete Account
                </h1>
                <button
                  type="button"
                  className="btn-close bg-light"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={modalCloseBtnRef}
                ></button>
              </div>
              <div className="modal-body ">
                <h2 className="p-2">Are you sure ?</h2>
                <h5>Do you want to delete your account</h5>
                <p className="text-sm mb-0 p-2">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
              </div>
              <div className="modal-footer p-3 d-flex justify-content-evenly">
                <button
                  type="button"
                  className="btn btn-info "
                  data-bs-dismiss="modal"
                  ref={modalCloseBtnRef}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/zhsxmjgz.json"
                    trigger="hover"
                    style={{ width: "50px", height: "50px" }}
                  ></lord-icon>
                </button>
                <button
                  type="button"
                  className="btn btn-danger bg-gradient-danger"
                  onClick={handleDeleteUser}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/hjbrplwk.json"
                    trigger="morph"
                    state="morph-trash-in"
                    style={{ width: "50px", height: "50px" }}
                  ></lord-icon>
                  <div
                    className={
                      isSubmit ? "spinner-border spinner-border-sm " : ""
                    }
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-lg-3">
            <div className="card position-sticky  " style={{ top: 90 }}>
              <ul className="nav flex-column   rounded   p-3 settingsNav userEdit-menu-card">
                <li className="nav-item">
                  <a
                    className="nav-link d-flex "
                    data-scroll=""
                    href="#profile"
                  >
                    <i className="material-icons text-lg me-2">person</i>
                    <span className="text-sm">Profile</span>
                  </a>
                </li>
                <li className="nav-item pt-2">
                  <a
                    className="nav-link d-flex "
                    data-scroll=""
                    href="#basic-info"
                  >
                    <i className="material-icons text-lg me-2">receipt_long</i>
                    <span className="text-sm">Basic Info</span>
                  </a>
                </li>
                <li className="nav-item pt-2">
                  <a
                    className="nav-link d-flex "
                    data-scroll=""
                    href="#password"
                  >
                    <i className="material-icons text-lg me-2">lock</i>
                    <span className="text-sm">Change Password</span>
                  </a>
                </li>

                <li className="nav-item pt-2">
                  <a className="nav-link d-flex " data-scroll="" href="#delete">
                    <i className="material-icons text-lg me-2">delete</i>
                    <span className="text-sm">Delete Account</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9 mt-lg-0 mt-4 profile-settings">
            <div className="card card-body" id="profile">
              <div className="row justify-content-center align-items-center">
                <div className="col-sm-auto col-2">
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
                <div className=" col-6 my-auto">
                  <div className="h-100">
                    <h5 className="text-capitalize mb-1 font-weight-bolder">
                      {basicInfo?.name}
                    </h5>
                  </div>
                </div>
                <div className=" col-4 my-auto ">
                  <button
                    type="button"
                    className=" d-flex align-items-center btn btn-success"
                    onClick={handleFetchUser}
                  >
                    Fetch User{" "}
                    <span className="material-symbols-outlined ps-2">sync</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="card mt-4" id="basic-info">
              <div className="card-header">
                <h5>Basic Info</h5>
              </div>
              <form
                onSubmit={handleUpdateBasicInfo}
                noValidate
                ref={basicInfoFormRef}
              >
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col-6">
                      <div className="input-group-static">
                        <label>Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={basicInfo?.name}
                          onChange={handleBasicInputChange}
                          name="name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group-static">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={basicInfo?.email}
                          onChange={handleBasicInputChange}
                          name="email"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-6">
                      <div className="input-group-static">
                        <label>Phone Number</label>
                        <input
                          type="number"
                          className="form-control"
                          value={basicInfo?.phone}
                          onChange={handleBasicInputChange}
                          name="phone"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group-static">
                        <label>Date of birth</label>
                        <input
                          type="date"
                          className="form-control"
                          value={basicInfo?.dob}
                          onChange={handleBasicInputChange}
                          name="dob"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-6">
                      <div className="input-group-static">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          value={
                            basicInfo?.addressDetails?.address
                              ? basicInfo?.addressDetails?.address
                              : ""
                          }
                          onChange={handleBasicInputChange}
                          name="address"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group-static">
                        <label>City</label>
                        <input
                          type="text"
                          className="form-control"
                          value={
                            basicInfo?.addressDetails?.city
                              ? basicInfo?.addressDetails?.city
                              : ""
                          }
                          onChange={handleBasicInputChange}
                          name="city"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-6">
                      <div className="input-group-static">
                        <label>State</label>
                        <input
                          type="text"
                          className="form-control"
                          value={
                            basicInfo?.addressDetails?.state
                              ? basicInfo?.addressDetails?.state
                              : ""
                          }
                          onChange={handleBasicInputChange}
                          name="state"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group-static">
                        <label>Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          value={
                            basicInfo?.addressDetails?.pincode
                              ? basicInfo?.addressDetails?.pincode
                              : ""
                          }
                          onChange={handleBasicInputChange}
                          name="pincode"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer justify-content-end d-flex">
                  <button
                    disabled={
                      basicInfo?.name && basicInfo?.email && isFetched
                        ? false
                        : true
                    }
                    className="btn  btn-info d-flex"
                    type="submit"
                  >
                    Update Details{" "}
                    <span className="material-symbols-outlined text-center">
                      edit_note
                    </span>
                  </button>
                </div>
              </form>
            </div>

            <div className="card mt-4" id="password">
              <div className="card-header">
                <h5>Change Password</h5>
              </div>
              <form
                onSubmit={handleChangePassword}
                ref={changePasswordFormRef}
                noValidate
              >
                <div className="card-body pt-0">
                  <div className="input-group-static mb-4">
                    <label>Current password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleChangePasswordInput}
                      value={changePassword.currentPassword}
                      name="currentPassword"
                      required
                      autoComplete="off"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      Please enter current password.
                    </div>
                  </div>

                  <div className="input-group-static my-4">
                    <label>New password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleChangePasswordInput}
                      value={changePassword.newPassword}
                      name="newPassword"
                      required
                      minLength={3}
                      autoComplete="off"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      Please enter new password, minimum 3.
                    </div>
                  </div>
                  <div className="input-group-static">
                    <label>Confirm New password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleChangePasswordInput}
                      value={changePassword.confirmNewPassword}
                      name="confirmNewPassword"
                      required
                      minLength={3}
                      autoComplete="off"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      Must match new password.
                    </div>
                  </div>
                  <h5 className="mt-5">Password requirements</h5>
                  <p className="text-muted mb-2">
                    Please follow this guide for a strong password:
                  </p>
                  <ul className="text-muted ps-4 mb-0 float-start">
                    <li>
                      <span className="text-sm">One special characters</span>
                    </li>
                    <li>
                      <span className="text-sm">Min 6 characters</span>
                    </li>
                    <li>
                      <span className="text-sm">
                        One number (2 are recommended)
                      </span>
                    </li>
                    <li>
                      <span className="text-sm">Change it often</span>
                    </li>
                  </ul>
                  <button
                    className="btn btn-info btn-lg float-end mt-2 mb-0"
                    type="submit"
                  >
                    Update password{" "}
                    <div
                      className={
                        isSubmit ? "spinner-border spinner-border-sm " : ""
                      }
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </button>
                </div>
              </form>
            </div>

            <div className="card mt-4" id="delete">
              <div className="card-body">
                <div className="d-flex align-items-center mb-sm-0 mb-4">
                  <div className="w-50">
                    <h5>Delete Account</h5>
                    <p className="text-sm mb-0">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                  </div>
                  <div className="w-50 text-end">
                    <button
                      className="btn btn-secondary mb-3 mb-md-0 ms-auto"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#handleDeactivateModal"
                    >
                      Deactivate
                    </button>
                    <button
                      className="btn btn-danger mb-0 ms-2"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#handleDeleteModal"
                    >
                      Delete Account
                    </button>
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

export default ProfileSettings;
