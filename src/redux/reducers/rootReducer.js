import { combineReducers } from "redux";
import userReducer from "./userReducer";
import editUserReducer from "./editUserReducer";

const rootReducer = combineReducers({
  user: userReducer,
  editUser: editUserReducer,
});

export default rootReducer;
