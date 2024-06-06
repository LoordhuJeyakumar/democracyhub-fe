import { ElectionActionTypes as ET } from "../reducers/electionReducer";

export const resetNewElection = () => ({
  type: ET.RESET_NEWELECTION,
});
export const createPhase = (newPhase) => ({
  type: ET.CREATE_PHASE,
  payload: newPhase,
});
export const removePhase = () => ({
  type: ET.REMOVE_PHASE,
});

export const createResult = (newResult) => ({
  type: ET.CREATE_RESULT,
  payload: newResult,
});
export const removeResult = () => ({
  type: ET.REMOVE_RESULT,
});

export const addNewElection = (newElection) => ({
  type: ET.ADD_NEW_ELECTION,
  payload: newElection,
});

// Action to create an election
export const createElectionRequest = (election) => ({
  type: ET.CREATE_ELECTION_REQUEST,
  payload: election,
});

export const createElectionSuccess = (election) => ({
  type: ET.CREATE_ELECTION_SUCCESS,
  payload: election,
});

export const createElectionFailure = (error) => ({
  type: ET.CREATE_ELECTION_FAILURE,
  payload: error,
});

export const setConstituenciesOPtions = (constituencies) => ({
  type: ET.SET_CONSTI,
  payload: constituencies,
});
// Action to get all elections
export const getElectionsRequest = () => ({
  type: ET.GET_ELECTIONS_REQUEST,
});

export const getElectionsSuccess = (elections) => ({
  type: ET.GET_ELECTIONS_SUCCESS,
  payload: elections,
});

export const getElectionsFailure = (error) => ({
  type: ET.GET_ELECTIONS_FAILURE,
  payload: error,
});

// Action to update an election
export const updateElectionRequest = (electionId, updates) => ({
  type: ET.UPDATE_ELECTION_REQUEST,
  payload: { electionId, updates },
});

export const updateElectionSuccess = (election) => ({
  type: ET.UPDATE_ELECTION_SUCCESS,
  payload: election,
});

export const updateElectionFailure = (error) => ({
  type: ET.UPDATE_ELECTION_FAILURE,
  payload: error,
});

// Action to delete an election
export const deleteElectionRequest = (electionId) => ({
  type: ET.DELETE_ELECTION_REQUEST,
  payload: electionId,
});

export const deleteElectionSuccess = (electionId) => ({
  type: ET.DELETE_ELECTION_SUCCESS,
  payload: electionId,
});

export const deleteElectionFailure = (error) => ({
  type: ET.DELETE_ELECTION_FAILURE,
  payload: error,
});
