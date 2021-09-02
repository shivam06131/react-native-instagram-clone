import { USER_STATE_CHANGE } from "../constants/index";
const initialState = {
  currentUser: null,
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case "USER_STATE_CHANGE":
      console.log("reducers triggered ", action.payload);
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
