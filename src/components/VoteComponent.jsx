import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { localIssuesactionCreators } from "../redux/reducers/localIssuesReducer";
import localIssuesService from "../services/localIssuesService";

function VoteComponent({ eachIssue, upvotes, downvotes, upvotedBy, downvotedBy }) {
  const [upvoteCount, setUpvoteCount] = useState(upvotes);
  const [downvoteCount, setDownvoteCount] = useState(downvotes);
  const [upVotedUser, setUpVotedUser] = useState(upvotedBy);
  const [downVotedUser, setDownVotedUser] = useState(downvotedBy);
  const upvoteBtn = useRef(null);
  const downvoteBtn = useRef(null);
  const dispatch = useDispatch();
  let { user } = localStorage;
  user = JSON.parse(user);

  const localIssues = useSelector(state => state.localIssues)


  const handleUpvote = async () => {
    try {
      const res = await localIssuesService.upVoteIssue(eachIssue._id);
      console.log(res);
      if (res.status === 200) {

        if (res.data.message === "Issue Upvoted successfully") {
          setDownvoteCount(res.data.updateIssue.downvotes);
          setUpvoteCount(res.data.updateIssue.upvotes)
          setUpVotedUser(res.data.updateIssue.upvotedBy)
          setDownVotedUser(res.data.updateIssue.downvotedBy)
        } else if (res.data.message === "Upvote removed successfully") {
          setDownvoteCount(res.data.updateIssue.downvotes);
          setUpvoteCount(res.data.updateIssue.upvotes)
          setUpVotedUser(res.data.updateIssue.upvotedBy)
          setDownVotedUser(res.data.updateIssue.downvotedBy)
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownvote = async () => {

    console.log(downVotedUser, downvoteCount);

    try {
      const res = await localIssuesService.downVoteIssue(eachIssue._id);
      console.log(res);
      if (res.status === 200) {

        if (res.data.message == "Issue DownVote successfully") {
          setDownvoteCount(res.data.updateIssue.downvotes);
          setUpvoteCount(res.data.updateIssue.upvotes)
          setUpVotedUser(res.data.updateIssue.upvotedBy)
          setDownVotedUser(res.data.updateIssue.downvotedBy)
        } else if (res.data.message == "Downvote removed successfully") {
          setDownvoteCount(res.data.updateIssue.downvotes);
          setUpvoteCount(res.data.updateIssue.upvotes)
          setUpVotedUser(res.data.updateIssue.upvotedBy)
          setDownVotedUser(res.data.updateIssue.downvotedBy)
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="upvote-downvote-box">
      <button
        className={`btn ${
          upVotedUser.includes(user.id) ? "btn-upvote-active" : "btn-upvote"
        }`}
        onClick={handleUpvote}
        ref={upvoteBtn}
      >
        <i className="fas fa-thumbs-up"></i>
        <span className="upvote-count">{upvoteCount}</span>
      </button>
      <button
        className={`btn ${
          downVotedUser.includes(user.id) ? "btn-downvote-active" : "btn-downvote"
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
