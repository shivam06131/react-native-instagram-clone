import {
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA,
} from "../constants/index";

const initialState = {
  users: [],
  usersLoaded: 0,
};

export const AllUsers = (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      console.log("USERS_DATA_STATE_CHANGE triggered in reducers");
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case USERS_POSTS_STATE_CHANGE:
      console.log("USERS_POSTS_STATE_CHANGE triggered in reducers");
      return {
        ...state,
        usersLoaded: state.usersLoaded + 1,
        users: state.users.map((user) =>
          user.uid === action.payload.uid
            ? { user, posts: action.payload.posts }
            : user
        ),
      };
    case CLEAR_DATA:
      return {
        users: [],
        usersLoaded: 0,
      };

    default:
      return state;
  }
};
