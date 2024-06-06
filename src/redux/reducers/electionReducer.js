// Action Types
const ElectionActionTypes = {
  CREATE_ELECTION_REQUEST: "CREATE_ELECTION_REQUEST",
  CREATE_ELECTION_SUCCESS: "CREATE_ELECTION_SUCCESS",
  CREATE_ELECTION_FAILURE: "CREATE_ELECTION_FAILURE",
  GET_ELECTIONS_REQUEST: "GET_ELECTIONS_REQUEST",
  GET_ELECTIONS_SUCCESS: "GET_ELECTIONS_SUCCESS",
  GET_ELECTIONS_FAILURE: "GET_ELECTIONS_FAILURE",
  UPDATE_ELECTION_REQUEST: "UPDATE_ELECTION_REQUEST",
  UPDATE_ELECTION_SUCCESS: "UPDATE_ELECTION_SUCCESS",
  UPDATE_ELECTION_FAILURE: "UPDATE_ELECTION_FAILURE",
  DELETE_ELECTION_REQUEST: "DELETE_ELECTION_REQUEST",
  DELETE_ELECTION_SUCCESS: "DELETE_ELECTION_SUCCESS",
  DELETE_ELECTION_FAILURE: "DELETE_ELECTION_FAILURE",
  ADD_NEW_ELECTION: "ADD_NEW_ELECTION",
  CREATE_PHASE: "CREATE_PHASE",
  REMOVE_PHASE: "REMOVE_PHASE",
  CREATE_RESULT: "CREATE_RESULT",
  REMOVE_RESULT: "REMOVE_RESULT",
  SET_CONSTI: "SET_CONSTI",
  RESET_NEWELECTION: "RESET_NEWELECTION",
};

// Initial State
const initialElectionState = {
  elections: [],
  currentElection: {},
  newElection: {
    name: "",
    description: "",
    year: "",
    electionType: "",
    phases: [],
    notificationDetails: {
      issueDate: "",
      lastDateForNominations: "",
    },
    results: [], // Empty array for results
  },
  phases: {
    phaseNumber: "",
    date: "",
    states: [],
    constituencies: [],
  },
  results: {
    candidate: "",
    votesReceived: 0,
    won: false,
  },
  constituenciesOptions: [],
  loading: false,
  error: null,
};

// Reducer
const electionReducer = (state = initialElectionState, action) => {
  switch (action.type) {
    case ElectionActionTypes.RESET_NEWELECTION:
      return {
        ...state,
        newElection: { ...initialElectionState.newElection },
      };

    case ElectionActionTypes.CREATE_PHASE:
      return {
        ...state,
        phases: { ...state.phases, ...action.payload },
      };

    case ElectionActionTypes.SET_CONSTI:
      return {
        ...state,
        constituenciesOptions: action.payload,
      };

    case ElectionActionTypes.REMOVE_PHASE:
      return {
        ...state,
        phases: { ...initialElectionState.phases },
      };

    case ElectionActionTypes.CREATE_RESULT:
      return {
        ...state,
        results: { ...state.results, ...action.payload },
      };

    case ElectionActionTypes.REMOVE_RESULT:
      return {
        ...state,
        results: { ...initialElectionState.results },
      };

    case ElectionActionTypes.ADD_NEW_ELECTION:
      return {
        ...state,
        newElection: {
          ...state.newElection,
          ...action.payload,
          notificationDetails: {
            ...state.newElection.notificationDetails,
            ...action.payload.notificationDetails,
          },
        },
      };
    case ElectionActionTypes.CREATE_ELECTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ElectionActionTypes.CREATE_ELECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        newElection: [...state.newElection, action.payload],
      };
    case ElectionActionTypes.CREATE_ELECTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ElectionActionTypes.GET_ELECTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ElectionActionTypes.GET_ELECTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        elections: action.payload,
      };
    case ElectionActionTypes.GET_ELECTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ElectionActionTypes.UPDATE_ELECTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ElectionActionTypes.UPDATE_ELECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        elections: state.elections.map((election) =>
          election._id === action.payload._id ? action.payload : election
        ),
      };
    case ElectionActionTypes.UPDATE_ELECTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ElectionActionTypes.DELETE_ELECTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ElectionActionTypes.DELETE_ELECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        elections: state.elections.filter(
          (election) => election._id !== action.payload
        ),
      };
    case ElectionActionTypes.DELETE_ELECTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { electionReducer as default, ElectionActionTypes };
