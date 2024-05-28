import React from "react";

function IssueCardUser({ eachIssue, index }) {
  return (
    <div key={index} className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
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
            <span className="ag-courses-item_date">{eachIssue.category}</span>
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
  );
}

export default IssueCardUser;
