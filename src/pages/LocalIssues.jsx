import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import localIssuesService from "../services/localIssuesService";
import { localIssuesactionCreators } from "../redux/reducers/localIssuesReducer";
import moment from "moment";
import LoadingBox from "../components/LoadingBox";
import { toast } from "react-toastify";

function LocalIssues() {
  const localIssuesState = useSelector((state) => state.localIssues);

  const dispatch = useDispatch();

  const getTimeElapsed = (createdAt) => {
    // Calculate the time elapsed since the document was created
    const now = moment();
    const created = moment(createdAt);
    const timeElapsed = moment.duration(now.diff(created));

    // Format the time elapsed as a string
    let timeElapsedString;
    if (timeElapsed.asMinutes() < 60) {
      timeElapsedString = `${Math.round(timeElapsed.asMinutes())} minutes ago`;
    } else if (timeElapsed.asHours() < 24) {
      timeElapsedString = `${Math.round(timeElapsed.asHours())} hours ago`;
    } else if (timeElapsed.asDays() < 30) {
      timeElapsedString = `${Math.round(timeElapsed.asDays())} days ago`;
    } else {
      timeElapsedString = `${Math.round(timeElapsed.asMonths())} months ago`;
    }

    return timeElapsedString;
  };

  useEffect(() => {
    fetchLocalIssues();
  }, []);

  const fetchLocalIssues = async () => {
    try {
      let res = await localIssuesService.getAllIssuesDetails();

      if (res.status === 200) {
        dispatch(localIssuesactionCreators.addIssue(res.data.allIssues));
      }
    } catch (error) {
      console.error(error);
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message);
      }
    }
  };
  return (
    <div>
      <div className="container mt-3 pt-3 local-issue-container">
        <h2 className="text-center">Recent Local Issues</h2>
        {localIssuesState.issues.length != 0 ? (
          <div className="row">
            {localIssuesState?.issues?.map((eachIssue) => {
              return (
                <div key={eachIssue._id} className="col-md-5 mx-auto">
                  <div className=" content-card ">
                    <div className="card-big-shadow ">
                      <div
                        className="card card-just-text rounded"
                        data-background="color"
                        data-color="blue"
                        data-radius="none"
                      >
                        <div className="row g-0">
                          <div className="col-md-4 ">
                            {eachIssue?.photos?.length === 0 ? (
                              <div
                                className="img-fluid  rounded-start"
                                style={{ width: 50 }}
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/bzqvamqv.json"
                                  trigger="hover"
                                  style={{ width: "200px", height: "200px" }}
                                ></lord-icon>
                              </div>
                            ) : (
                              <img
                                src={eachIssue.photos[0]}
                                className="img-fluid rounded-start"
                                alt="..."
                              />
                            )}
                          </div>
                          <div className="content col-md-8 ">
                            <div className=" d-flex justify-content-end align-items-end ">
                              <h4 className="title p-0 m-0 ">
                                <a href="#" className="stretched-link">
                                  {eachIssue.title}
                                </a>
                              </h4>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex  flex-column align-items-start justify-content-center">
                                <small className="text-dark opacity-50">
                                  Category : &nbsp;
                                </small>
                                <h6 className="category badge text-bg-secondary p-1 m-0">
                                  {eachIssue.category}
                                </h6>
                              </div>
                              <div className="d-flex align-items-center justify-content-center">
                                <small className="text-dark opacity-50 ">
                                  Posted by : &nbsp;
                                </small>
                                <p
                                  className="badge text-bg-secondary p-1 m-0"
                                  /* style="width: 6rem;" */
                                >
                                  {eachIssue.createdUserName}
                                </p>
                              </div>
                            </div>
                            <div className="card-body p-0 m-0">
                              <div className="pt-0 mt-0 mb-2 d-flex align-items-center justify-content-center"></div>
                              <p className="description">
                                {eachIssue.description}
                              </p>
                            </div>

                            <div className="card-footr d-flex flex-column">
                              <small className="text-body-secondary ">
                                Issue created{" "}
                                {getTimeElapsed(eachIssue.createdAt)}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <LoadingBox width={40} />
        )}
      </div>
    </div>
  );
}

export default LocalIssues;
