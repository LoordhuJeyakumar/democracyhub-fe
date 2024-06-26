// src/components/IssueCard.js

import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { localIssuesactionCreators } from "../redux/reducers/localIssuesReducer";
import localIssuesService from "../services/localIssuesService";
import ImageCarousel from "../components/ImageCarousel";
import VoteComponent from "../components/VoteComponent";

const IssueCard = ({ eachIssue }) => {
  const upvoteBtn = useRef(null);
  const downvoteBtn = useRef(null);

  let { user } = localStorage;
  user = JSON.parse(user);

  useEffect(() => {
    fetchIssue();

    if (downvoteBtn) {
      if (eachIssue.downvotedBy.includes(user.id)) {
        downvoteBtn?.current?.focus();
      }
    }

    if (upvoteBtn) {
      if (eachIssue.upvotedBy.includes(user.id)) {
        upvoteBtn?.current?.focus();
      }
    }
  }, [eachIssue]);

  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const fetchIssue = async () => {
    try {
      let res = await localIssuesService.getIssueById(eachIssue._id);
      if (res.status == 200) {
        dispatch(
          localIssuesactionCreators.updateIssue(
            res.data.existIssue._id,
            res.data.existIssue
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      dispatch(localIssuesactionCreators.addComment(issue.id, commentText));
      setCommentText("");
    }
  };

  return (
    <div
      className="d-flex justify-content-center row selected-issue-card card m-2 p-2"
      id={eachIssue._id}
    >
      <div className="d-flex flex-column  ">
        <div className="d-flex flex-row card-header align-items-center text-left comment-top p-2  border-bottom px-4">
          <div className="profile-image d-flex flex-column align-items-center">
            <lord-icon
              className="w-100 border-radius-lg shadow-sm"
              src="https://cdn.lordicon.com/fmasbomy.json"
              trigger="in"
              delay="2000"
              colors="primary:#1c140d,secondary:#f3ffbd,tertiary:#cbe86b"
              style={{ width: "70px", height: "70px" }}
            ></lord-icon>
            <small>{eachIssue.createdUserName}</small>
          </div>

          <div className="d-flex flex-column w-100">
            <div className="d-flex flex-row post-title">
              <h5>{eachIssue.title}</h5>
            </div>
            <div className="d-flex justify-content-start gap-2 align-content-center post-title">
              <span className="bdge mr-1">{eachIssue.category}</span>
              <span className="mr-2 comments">
                {eachIssue.comments.length} comments&nbsp;
              </span>
              <span className="mr-2 dot"></span>
              <span>Posted {moment(eachIssue.createdAt).fromNow()}</span>
            </div>
          </div>

          <VoteComponent
            key={eachIssue._id}
            issueId={eachIssue._id}
            upvotes={eachIssue.upvotes}
            downvotes={eachIssue.downvotes}
            upvotedBy={eachIssue.upvotedBy}
            downvotedBy={eachIssue.downvotedBy}

            eachIssue={eachIssue}
          />
        </div>
        <div className="card-body">
          <p>{eachIssue.description}</p>
          {eachIssue.photos.length != 0 ? (
            <ImageCarousel images={eachIssue.photos} />
          ) : (
            <div className="d-flex justify-content-center">
              <lord-icon
                src="https://cdn.lordicon.com/bzqvamqv.json"
                trigger="hover"
                className="p-0 m-0"
                style={{ width: 200, height: 200 }}
              ></lord-icon>
            </div>
          )}


        </div>
        <div className="comment-bottom  p-2 px-4">
          <div className="d-flex flex-row add-comment-section mt-4 mb-4">
            <lord-icon
              className="w-100 border-radius-lg shadow-sm"
              src="https://cdn.lordicon.com/fmasbomy.json"
              trigger="in"
              delay="2000"
              colors="primary:#1c140d,secondary:#f3ffbd,tertiary:#cbe86b"
              style={{ width: "70px", height: "70px" }}
            ></lord-icon>
            <input
              type="text"
              className="form-control mr-3"
              placeholder="Add comment"

            />

            <button className="btn btn-primary" type="button">
              Comment
            </button>
          </div>
          <div className="commented-section mt-2">
            <div className="d-flex flex-row align-items-center commented-user">
              <h5 className="mr-2">Corey oates</h5>
              <span className="dot mb-1"></span>
              <span className="mb-1 ml-2">4 hours ago</span>
            </div>
            <div className="comment-text-sm">
              <span>Lorem ipsum dolor sit amet, consectetur</span>
            </div>
            <div className="reply-section">
              <div className="d-flex flex-row align-items-center voting-icons">
                <i className="fa fa-sort-up fa-2x mt-3 hit-voting"></i>
                <i className="fa fa-sort-down fa-2x mb-3 hit-voting"></i>
                <span className="ml-2">10</span>
                <span className="dot ml-2"></span>
                <h6 className="ml-2 mt-1">Reply</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
