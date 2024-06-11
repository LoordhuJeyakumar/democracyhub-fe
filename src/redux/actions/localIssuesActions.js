// actions/localIssuesActions.js
import { ACTION_TYPES } from "./localIssuesActionTypes";

export const addIssue = (issues) => ({
  type: ACTION_TYPES.ADD_ISSUE,
  payload: issues,
});

export const updateIssue = (id, updatedIssue) => ({
  type: ACTION_TYPES.UPDATE_ISSUE,
  payload: { id, updatedIssue },
});

export const upvoteIssue = (issueId, userId) => ({
  type: ACTION_TYPES.UPVOTE_ISSUE,
  payload: { issueId, userId },
});

export const downvoteIssue = (issueId, userId) => ({
  type: ACTION_TYPES.DOWNVOTE_ISSUE,
  payload: { issueId, userId },
});
