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

  upvoteIssue: (issueId) => ({
    type: ACTION_TYPES.UPVOTE_ISSUE,
    payload: issueId,
  }),

  downvoteIssue: (issueId) => ({
    type: ACTION_TYPES.DOWNVOTE_ISSUE,
    payload: issueId,
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
        issues: [...state.issues, action.payload],
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
        issue.id === action.payload
          ? { ...issue, upvotes: issue.upvotes + 1 }
          : issue
      );
      return {
        ...state,
        issues: upvotedIssues,
      };
    case ACTION_TYPES.DOWNVOTE_ISSUE:
      const downvotedIssues = state.issues.map((issue) =>
        issue.id === action.payload
          ? { ...issue, downvotes: issue.downvotes + 1 }
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
