import { combineReducers } from "redux";
import userReducer from "./userReducer";
import editUserReducer from "./editUserReducer";
import localIssuesReducer from "./localIssuesReducer";

const rootReducer = combineReducers({
  user: userReducer,
  editUser: editUserReducer,
  localIssues: localIssuesReducer,
});

export default rootReducer;
