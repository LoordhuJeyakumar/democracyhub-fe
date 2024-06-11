import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import constituenciesService from "../services/constituenciesService";
import Select from "react-select";
import { Link } from "react-router-dom";
import { localIssuesactionCreators } from "../redux/reducers/localIssuesReducer";
import LoadingSpinner from "../components/LoadingSpinner";
import localIssuesService from "../services/localIssuesService";
import { toast } from "react-toastify";

// Define the enum for the category field
const LocalIssueCategories = Object.freeze({
  Infrastructure: "Infrastructure",
  Education: "Education",
  Healthcare: "Healthcare",
  Environment: "Environment",
  Transportation: "Transportation",
  Safety: "Safety",
  PublicServices: "Public Services",
  EconomicDevelopment: "Economic Development",
  SocialWelfare: "Social Welfare",
  UrbanPlanning: "Urban Planning",
  CulturalPreservation: "Cultural Preservation",
  TechnologyInnovation: "Technology and Innovation",
  CommunityDevelopment: "Community Development",
  Other: "Other",
});

const selectOptions = Object.keys(LocalIssueCategories).map((key) => ({
  value: key,
  label: LocalIssueCategories[key],
}));

function CreateIssue() {
  const issueDetails = useSelector((state) => state.localIssues);
  const dispatch = useDispatch();
  const IssueFormRef = useRef(null);
  const [constituencies, setConstituencies] = useState([]);
  const [isLoadingConstituencies, setIsLoadingConstituencies] = useState(false); // Track loading state
  const constituenciesRef = useRef(null);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (constituencies.length === 0) {
      getConstituencies();
    }
  }, [constituencies]);

  const getConstituencies = async () => {
    try {
      setIsLoadingConstituencies(true);
      const res = await constituenciesService.getAllconstituencies();

      if (res.status === 200) {
        const newConstituencies = res.data.allConstituencies.map((state) => ({
          value: state.name,
          label: state.name,
          id: state._id,
        }));

        setConstituencies(() => newConstituencies);
        setIsLoadingConstituencies(false);
      }

      return res;
    } catch (error) {
      console.error(error);
      setIsLoadingConstituencies(false);
      return error;
    }
  };

  const handleIputChange = (event) => {
    if (event.target.name === "photos") {
      dispatch(
        localIssuesactionCreators.setNewIssue({
          [event.target.name]: event.target.files,
        })
      );
    } else {
      dispatch(
        localIssuesactionCreators.setNewIssue({
          [event.target.name]: event.target.value,
        })
      );
    }
  };

  const handleSelectInput = (selectedOption, { name }) => {
    if (selectedOption) {
      if (name === "constituency") {
        dispatch(
          localIssuesactionCreators.setNewIssue({
            [name]: selectedOption.id,
          })
        );
      } else {
        dispatch(
          localIssuesactionCreators.setNewIssue({
            [name]: selectedOption.value,
          })
        );
      }
    }
  };
  const formData = new FormData();
  const handleSubmit = async (event) => {
    event.preventDefault();
    let newIssue = issueDetails.newIssue;

    try {
      console.log(newIssue.photos);
      if (newIssue) {
        console.log(newIssue.photos);
        for (let key in newIssue) {
          if (key !== "photos") {
            formData.append(key, newIssue[key]);
          } else {
            for (let i = 0; i < newIssue.photos.length; i++) {
              // Assuming each photo is a File object
              formData.append("photos", newIssue.photos[i]);
            }
          }
        }
      }
      console.log(formData);
      if (!IssueFormRef.current.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        setIsSubmited(false);
        if (IssueFormRef) {
          IssueFormRef.current.reportValidity();
        }
      }
      IssueFormRef.current.classList.add("was-validated");
      if (IssueFormRef.current.checkValidity()) {
        const res = await localIssuesService.createIssue(
          formData,
          setIsUploading,
          setUploadProgress
        );

        if (res?.response?.status === 500) {
          toast.error(res.response.data.error);
          setIsSubmited(false);
          /* dispatch(localIssuesactionCreators.removeNewIssue()); */
          IssueFormRef.current.classList.remove("was-validated");
          setIsUploading(false);
        }

        if (res?.response?.status === 409) {
          toast.info(res?.response?.data?.message);
          setIsSubmited(false);
          /* dispatch(localIssuesactionCreators.removeNewIssue()); */
          IssueFormRef.current.classList.remove("was-validated");
          setIsUploading(false);
        }

        if (res?.message === "Network Error") {
          toast.error(res.message);
          setIsSubmited(false);
          /* dispatch(localIssuesactionCreators.removeNewIssue()); */
          IssueFormRef.current.classList.remove("was-validated");
          setIsUploading(false);
        }

        if (res?.status === 201) {
          toast.success(res?.data?.message);
          setIsSubmited(false);
          /* dispatch(localIssuesactionCreators.removeNewIssue()); */
          setIsUploading(false);
          IssueFormRef.current.classList.remove("was-validated");
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(localIssuesactionCreators.removeNewIssue());
      setIsUploading(false);
    }
  };
  console.log(issueDetails);
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 10, // Increase this as needed
    }),
  };

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit}
        ref={IssueFormRef}
        encType="multipart/form-data"
      >
        <div className="container-fluid py-4">
          <div className="row">
            <h2 className="text-center">Post New Issue</h2>
          </div>

          <div className="row">
            <div className="col-lg-3">
              <div className="card position-sticky  " style={{ top: 90 }}>
                <ul className="nav flex-column   rounded   p-3 settingsNav userEdit-menu-card">
                  <li className="nav-item">
                    <a
                      className="nav-link d-flex "
                      data-scroll=""
                      href="#issueDetails"
                    >
                      <span className="material-symbols-outlined">ballot</span>

                      <span className="text-sm">Issue Details</span>
                    </a>
                  </li>
                  <li className="nav-item pt-2">
                    <a
                      className="nav-link d-flex "
                      data-scroll=""
                      href="#location"
                    >
                      <i
                        className="fa fa-location-arrow"
                        aria-hidden="true"
                      ></i>

                      <span className="text-sm">location</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row" id="issueDetails">
                <div className="col-12">
                  <div className="card p-3 mt-1">
                    <div className="card-heading">
                      <h4 className="text-center">Issue details</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="title">Issue title</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <input
                              id="title"
                              type="text"
                              className="form-control"
                              name="title"
                              required
                              onChange={handleIputChange}
                              value={issueDetails?.newIssue?.title || ""}
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please enter issue title.
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="category">Category</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <Select
                              id="category"
                              name="category"
                              className="form-control form-select"
                              options={selectOptions}
                              isClearable
                              isSearchable
                              required
                              onChange={handleSelectInput}
                              value={
                                issueDetails?.newIssue?.category
                                  ? {
                                      value: issueDetails?.newIssue?.category,
                                      label: issueDetails?.newIssue?.category,
                                    }
                                  : null
                              }
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please select transaction type.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="year">Description</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <textarea
                              id="description"
                              className="form-control"
                              name="description"
                              onChange={handleIputChange}
                              value={issueDetails?.newIssue?.description || ""}
                            ></textarea>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please enter detailed description.
                            </div>
                            <div
                              className="form-text text-secondary"
                              id="basic-addon4"
                            >
                              Write detailed description for the Issue.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card p-3 mt-1">
                    <div className="card-heading">
                      <h4 className="text-center">Loctaion details</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="constituency">Constituencies</label>{" "}
                            <span
                              style={{ fontSize: 12, color: "red" }}
                              className="material-symbols-rounded"
                            >
                              star_rate
                            </span>
                            <Select
                              styles={customStyles}
                              className="form-control form-select"
                              name="constituency"
                              options={constituencies}
                              isClearable
                              isSearchable
                              id="constituency"
                              isLoading={isLoadingConstituencies}
                              onChange={handleSelectInput}
                              ref={constituenciesRef}
                            />
                            <div
                              className="form-text text-secondary"
                              id="basic-addon4"
                            >
                              If you can't find constituency{" "}
                              <Link>click here</Link> to add.
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please select constituencies
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="location">Location</label>{" "}
                            <input
                              type="text"
                              className="form-control"
                              id="location"
                              placeholder="location"
                              name="location"
                              onChange={handleIputChange}
                              value={issueDetails?.newIssue?.location || ""}
                            />
                            <div
                              className="form-text text-secondary"
                              id="basic-addon4"
                            >
                              Write election description.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-9">
                          <div className="input-group input-group-static mb-4">
                            <label htmlFor="photos">Photos</label>{" "}
                            <input
                              type="file"
                              className="form-control"
                              id="photos"
                              accept="image/png, image/gif, image/jpeg"
                              placeholder="photos"
                              name="photos"
                              onChange={handleIputChange}
                              multiple
                            />
                            <div
                              className="form-text text-secondary"
                              id="basic-addon4"
                            >
                              Add supported files for the issue.
                            </div>
                          </div>
                          {isUploading && (
                            <div className="progress">
                              <div
                                className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
                                role="progressbar"
                                style={{ width: `${uploadProgress}%` }}
                                aria-valuenow={uploadProgress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {uploadProgress}%
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="col-3 ">
                          <button type="submit" className="btn btn-primary">
                            Post New Issue{" "}
                            {isSubmited && <LoadingSpinner size={15} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateIssue;
