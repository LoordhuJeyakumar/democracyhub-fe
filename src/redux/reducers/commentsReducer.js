// Action Types
const ACTION_TYPES = {
  ADD_COMMENT: "ADD_COMMENT",
  UPDATE_COMMENT: "UPDATE_COMMENT",
  DELETE_COMMENT: "DELETE_COMMENT",
  UPVOTE_COMMENT: "UPVOTE_COMMENT",
  DOWNVOTE_COMMENT: "DOWNVOTE_COMMENT",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

// Action Creators
const commentsActionCreators = {
  addComment: (comment) => ({
    type: ACTION_TYPES.ADD_COMMENT,
    payload: comment,
  }),

  updateComment: (id, updatedComment) => ({
    type: ACTION_TYPES.UPDATE_COMMENT,
    payload: { id, updatedComment },
  }),

  deleteComment: (commentId) => ({
    type: ACTION_TYPES.DELETE_COMMENT,
    payload: commentId,
  }),

  upvoteComment: (commentId, userId) => ({
    type: ACTION_TYPES.UPVOTE_COMMENT,
    payload: { commentId, userId },
  }),

  downvoteComment: (commentId, userId) => ({
    type: ACTION_TYPES.DOWNVOTE_COMMENT,
    payload: { commentId, userId },
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

export { ACTION_TYPES, commentsActionCreators };

// Reducer
const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case ACTION_TYPES.UPDATE_COMMENT:
      const updatedComments = state.comments.map((comment) =>
        comment.id === action.payload.id
          ? action.payload.updatedComment
          : comment
      );
      return {
        ...state,
        comments: updatedComments,
      };
    case ACTION_TYPES.DELETE_COMMENT:
      const filteredComments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
      return {
        ...state,
        comments: filteredComments,
      };
    case ACTION_TYPES.UPVOTE_COMMENT:
      const upvotedComments = state.comments.map((comment) =>
        comment.id === action.payload.commentId
          ? {
              ...comment,
              upvotes: comment.upvotes + 1,
              upvotedBy: [...comment.upvotedBy, action.payload.userId],
            }
          : comment
      );
      return {
        ...state,
        comments: upvotedComments,
      };
    case ACTION_TYPES.DOWNVOTE_COMMENT:
      const downvotedComments = state.comments.map((comment) =>
        comment.id === action.payload.commentId
          ? {
              ...comment,
              downvotes: comment.downvotes + 1,
              downvotedBy: [...comment.downvotedBy, action.payload.userId],
            }
          : comment
      );
      return {
        ...state,
        comments: downvotedComments,
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

export default commentsReducer;
