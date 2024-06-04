import { combineReducers } from "redux";
import userReducer from "./userReducer";
import editUserReducer from "./editUserReducer";
import localIssuesReducer from "./localIssuesReducer";
import electionReducer from "./electionReducer";

const rootReducer = combineReducers({
  user: userReducer,
  editUser: editUserReducer,
  localIssues: localIssuesReducer,
  elections: electionReducer,
});

export default rootReducer;
