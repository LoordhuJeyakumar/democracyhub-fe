// Action Types
const CREATE_ELECTION = "CREATE_ELECTION";
const UPDATE_ELECTION = "UPDATE_ELECTION";
const GET_ELECTION = "GET_ELECTION";
const GET_ALL_ELECTIONS = "GET_ALL_ELECTIONS";
const GET_ELECTION_BY_TYPE = "GET_ELECTION_BY_TYPE";
const DELETE_ELECTION = "DELETE_ELECTION";

// Initial State
const initialState = {
  elections: [],
  election: null,
};

// Reducer
const electionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ELECTION:
      return {
        ...state,
        elections: [...state.elections, action.payload],
      };
    case UPDATE_ELECTION:
      return {
        ...state,
        elections: state.elections.map((election) =>
          election._id === action.payload._id ? action.payload : election
        ),
      };
    case GET_ELECTION:
      return {
        ...state,
        election: action.payload,
      };
    case GET_ALL_ELECTIONS:
      return {
        ...state,
        elections: action.payload,
      };
    case GET_ELECTION_BY_TYPE:
      return {
        ...state,
        elections: action.payload,
      };
    case DELETE_ELECTION:
      return {
        ...state,
        elections: state.elections.filter(
          (election) => election._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default electionReducer;
