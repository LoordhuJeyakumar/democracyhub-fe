import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import localIssuesService from "../services/localIssuesService";
import { localIssuesactionCreators } from "../redux/reducers/localIssuesReducer";
import moment from "moment";

function LocalIssues() {
  const localIssuesState = useSelector((state) => state.localIssues);
  console.log(localIssuesState.issues);
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
      console.log(res);
      if (res.status === 200) {
        dispatch(localIssuesactionCreators.addIssue(res.data.allIssues));
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="container mt-3 pt-3">
        <h2>Recent Local Issues</h2>
        <div className="row">
          {localIssuesState.issues[0]?.map((eachIssue) => {
            return (
              <div key={eachIssue._id} className="col-md-6">
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      {eachIssue.photos.length === 0 ? (
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
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{eachIssue.title}</h5>
                        <p className="card-text">{eachIssue.description}</p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            Issue created {getTimeElapsed(eachIssue.createdAt)}
                          </small>
                        </p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LocalIssues;
