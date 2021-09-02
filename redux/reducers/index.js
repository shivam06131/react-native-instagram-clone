import { combineReducers } from "redux";
import { users } from "./users";

const reducers = combineReducers({
  userState: users,
});
export default reducers;
