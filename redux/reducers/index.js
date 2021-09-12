import { combineReducers } from "redux";
import { users } from "./users";
import { AllUsers } from "./AllUsers";

const reducers = combineReducers({
  userState: users,
  usersState: AllUsers,
});
export default reducers;
