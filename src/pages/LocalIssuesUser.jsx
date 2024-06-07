import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import localIssuesService from "../services/localIssuesService";
import { localIssuesactionCreators } from "../redux/reducers/localIssuesReducer";
import moment from "moment";
import IssueCard from "./IssueCard";
import LoadingBox from "../components/LoadingBox";

function LocalIssuesUser() {
  const issues = useSelector((state) => state.localIssues);
  const dispatch = useDispatch();
  const [selectedIssue, setSelectedIssue] = useState(null); // State for selected issue
  const [isActive, setIsActive] = useState(false);
  

  useEffect(() => {
    fetchLocalIssues();
  }, []);

  const fetchLocalIssues = async () => {
    try {
      let res = await localIssuesService.getAllIssuesDetails();

      if (res.status === 200) {
        dispatch(localIssuesactionCreators.addIssue(res.data.allIssues));
        dispatch(localIssuesactionCreators.setLoading(true));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h4 className="text-center mt-4 pb-0 mb-0">Loacal Issues</h4>
      </div>
      <div
        className="container-fluid my-1 py-3"
      style={{ backgroundColor: "#f2e9e1" }}
    >
      <div className="row mt-3 pt-3">
         
          <div className="col-lg-3 overflow-scroll vh-100 card-list position-sticky  " style={{ top: 90 }}>

          {issues.loading ? (
            issues.issues?.map((eachIssue, index) => (
              <div
                key={index}
                className="ag-courses_item"
                onClick={() => {
                  setSelectedIssue(eachIssue);
                  setIsActive(true);
                }}
              >
                <a
                  href={`#${eachIssue._id}`}
                  className={
                    selectedIssue?._id == eachIssue?._id
                      ? "ag-courses-item_link active"
                      : "ag-courses-item_link"
                  }
                >
                  <div className="ag-courses-item_bg"></div>
                  <div className="ag-courses-item_title">{eachIssue.title}</div>

                  <small className=" ag-courses-item_date-box">
                    Issue posted on: &nbsp;
                    <span className="ag-courses-item_date">
                      {moment(eachIssue.createdAt).format("DD-MM-YYYY")}
                    </span>
                  </small>

                  <div className="d-flex flex-column">
                    <small className=" ag-courses-item_date-box">
                      Category : &nbsp;
                      <span className="ag-courses-item_date">
                        {eachIssue.category}
                      </span>
                    </small>
                    <small className=" ag-courses-item_date-box">
                      Posted by: &nbsp;
                      <span className="ag-courses-item_date">
                        {eachIssue.createdUserName}
                      </span>
                    </small>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <LoadingBox />
          )}
        </div>
        <div className="col-lg-9">
          {issues.loading ? (
            issues.issues?.map((eachIssue, index) => (
              <IssueCard eachIssue={eachIssue} key={index} />
            ))
          ) : (
              <LoadingBox />
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default LocalIssuesUser;
