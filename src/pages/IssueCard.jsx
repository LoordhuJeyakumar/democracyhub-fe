// src/components/IssueCard.js

import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { localIssuesactionCreators } from "../redux/reducers/localIssuesReducer";
import localIssuesService from "../services/localIssuesService";

const IssueCard = ({ selectedIssue }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  // State variable to track the user's vote
  const [userVote, setUserVote] = useState(null);

  // Function to handle upvotes
  const handleUpvote = async () => {
    if (userVote !== "upvote") {
      try {
        const res = await localIssuesService.upVoteIssue(selectedIssue._id);
        console.log(res.data);
        setUserVote("upvote");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Function to handle downvotes
  const handleDownvote = async () => {
    if (userVote !== "downvote") {
      try {
        const res = await localIssuesService.downVoteIssue(selectedIssue._id);
        console.log(res.data);
        setUserVote("upvote");
      } catch (error) {
        console.error(error);
      }
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
      id={selectedIssue._id}
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
            <small>{selectedIssue.createdUserName}</small>
          </div>

          <div className="d-flex flex-column w-100">
            <div className="d-flex flex-row post-title">
              <h5>{selectedIssue.title}</h5>
            </div>
            <div className="d-flex justify-content-start gap-2 align-content-center post-title">
              <span className="bdge mr-1">{selectedIssue.category}</span>
              <span className="mr-2 comments">
                {selectedIssue.comments.length} comments&nbsp;
              </span>
              <span className="mr-2 dot"></span>
              <span>Posted {moment(selectedIssue.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p>{selectedIssue.description}</p>
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/bzqvamqv.json"
              trigger="hover"
              style={{ width: "200px", height: "200px" }}
            ></lord-icon>
          </div>

          {/* <div className="upvote-downvote-box">
            <div className="radio_group">
              <input type="radio" name="like" />
              <label for="like">
                <i className="fas fa-thumbs-up"></i>
                <span className="upvote-count">0</span>
              </label>
            </div>
            <div className="radio_group">
              <input type="radio" name="like" />
              <label for="like">
                <i className="fas fa-thumbs-down"></i>{" "}
                <span className="downvote-count">0</span>
              </label>
            </div>
          </div> */}
          <div className="upvote-downvote-box">
            <button
              className="btn btn-upvote"
              onClick={handleUpvote}
              disabled={userVote === "upvote"}
            >
              <i className="fas fa-thumbs-up"></i>
              <span className="upvote-count">{selectedIssue.upvotes}</span>
            </button>
            <button className="btn btn-downvote" onClick={handleDownvote} disabled={userVote === "downvote"}>
              <i className="fas fa-thumbs-down"></i>
              <span className="downvote-count">{selectedIssue.downvotes}</span>
            </button>
          </div>
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
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </span>
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
