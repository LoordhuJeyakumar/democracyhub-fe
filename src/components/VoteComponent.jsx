import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { localIssuesactionCreators } from "../redux/reducers/localIssuesReducer";
import localIssuesService from "../services/localIssuesService";

function VoteComponent({ selectedIssue, setSelectedIssue }) {
  const [upvoteCount, setUpvoteCount] = useState(upvotes);
  const [downvoteCount, setDownvoteCount] = useState(downvotes);
  const [upVotedUser, setUpVotedUser] = useState(upvotedBy);
  const [downVotedUser, setDownVotedUser] = useState(downvotedBy);
  const upvoteBtn = useRef(null);
  const downvoteBtn = useRef(null);
  const dispatch = useDispatch();
  let { user } = localStorage;
  user = JSON.parse(user);

  const handleUpvote = async () => {
    try {
      const res = await localIssuesService.upVoteIssue(selectedIssue._id);
      if (res.status === 200) {
        // If the server response is successful, update the local state
        setSelectedIssue((prevState) => {
          return { ...prevState, ...res.data.updateIssue };
        });
        if (res.data.message === "Issue Upvoted successfully ") {
          setUpvoteCount(res.data.updateIssue.upvotes);
        } else if (res.data.message === "Upvote removed successfully") {
          setUpvoteCount(res.data.updateIssue.upvotes);
          setUpVotedUser("");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(downvotedBy, upvotedBy);
  console.log(user.id);
  const handleDownvote = async () => {
    try {
      const res = await localIssuesService.downVoteIssue(selectedIssue._id);

      if (res.status === 200) {
        setSelectedIssue((prevState) => {
          return { ...prevState, ...res.data.updateIssue };
        });
        // If the server response is successful, update the local state
        if (res.data.message === "Issue DownVote successfully ") {
          setDownvoteCount(res.data.updateIssue.downvotes);
        } else if (res.data.message === "Downvote removed successfully") {
          setDownvoteCount(res.data.updateIssue.downvotes);
          setDownVotedUser("");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(upvotes, downvotes);
  return (
    <div className="upvote-downvote-box">
      <button
        className={`btn ${
          upVotedUser == user.id ? "btn-upvote-active" : "btn-upvote"
        }`}
        onClick={handleUpvote}
        ref={upvoteBtn}
      >
        <i className="fas fa-thumbs-up"></i>
        <span className="upvote-count">{upvoteCount}</span>
      </button>
      <button
        className={`btn ${
          downVotedUser == user.id ? "btn-downvote-active" : "btn-downvote"
        }`}
        onClick={handleDownvote}
        ref={downvoteBtn}
      >
        <i className="fas fa-thumbs-down"></i>
        <span className="downvote-count">{downvoteCount}</span>
      </button>
    </div>
  );
}

export default VoteComponent;
