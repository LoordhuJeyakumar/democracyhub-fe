const ACTION_TYPES = {
  ADD_ISSUE: "ADD_ISSUE",
  UPDATE_ISSUE: "UPDATE_ISSUE",
  DELETE_ISSUE: "DELETE_ISSUE",
  UPVOTE_ISSUE: "UPVOTE_ISSUE",
  DOWNVOTE_ISSUE: "DOWNVOTE_ISSUE",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

const localIssuesactionCreators = {
  addIssue: (issue) => ({
    type: ACTION_TYPES.ADD_ISSUE,
    payload: issue,
  }),

  updateIssue: (id, updatedIssue) => ({
    type: ACTION_TYPES.UPDATE_ISSUE,
    payload: { id, updatedIssue },
  }),

  deleteIssue: (issueId) => ({
    type: ACTION_TYPES.DELETE_ISSUE,
    payload: issueId,
  }),

  upvoteIssue: (issueId, userId) => ({
    type: ACTION_TYPES.UPVOTE_ISSUE,
    payload: { issueId, userId },
  }),

  downvoteIssue: (issueId, userId) => ({
    type: ACTION_TYPES.DOWNVOTE_ISSUE,
    payload: { issueId, userId },
  }),

  setLoading: (isLoading) => ({
    type: ACTION_TYPES.SET_LOADING,
    payload: isLoading,
  }),

  setError: (error) => ({
    type: ACTION_TYPES.SET_ERROR,
    payload: error,
  }),
};

export { ACTION_TYPES, localIssuesactionCreators };

// Reducer remains the same
const initialState = {
  issues: [],

  loading: false,
  error: null,
};

const localIssuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_ISSUE:
      return {
        ...state,
        issues: action.payload,
      };
    case ACTION_TYPES.UPDATE_ISSUE:
      const updatedIssues = state.issues.map((issue) =>
        issue.id === action.payload.id ? action.payload.updatedIssue : issue
      );
      return {
        ...state,
        issues: updatedIssues,
      };
    case ACTION_TYPES.DELETE_ISSUE:
      const filteredIssues = state.issues.filter(
        (issue) => issue.id !== action.payload
      );
      return {
        ...state,
        issues: filteredIssues,
      };
    case ACTION_TYPES.UPVOTE_ISSUE:
      const upvotedIssues = state.issues.map((issue) =>
        issue.id === action.payload.issueId
          ? {
              ...issue,
              upvotes: issue.upvotes + 1,
              upvotedBy: [...issue.upvotedBy, action.payload.userId],
            }
          : issue
      );
      return {
        ...state,
        issues: upvotedIssues,
      };

    case ACTION_TYPES.DOWNVOTE_ISSUE:
      const downvotedIssues = state.issues.map((issue) =>
        issue.id === action.payload.issueId
          ? {
              ...issue,
              downvotes: issue.downvotes + 1,
              downvotedBy: [...issue.downvotedBy, action.payload.userId],
            }
          : issue
      );
      return {
        ...state,
        issues: downvotedIssues,
      };
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default localIssuesReducer;
