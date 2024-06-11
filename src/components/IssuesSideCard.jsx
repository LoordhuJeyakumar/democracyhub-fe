import React from 'react'
import moment from "moment";
function IssuesSideCard({ eachIssue, setIsActive, selectedIssue }) {
    return (
        <div className="col-lg-3 overflow-scroll vh-100 card-list">

            <div

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


        </div>
    )
}

export default IssuesSideCard