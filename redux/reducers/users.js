import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
} from "../constants/index";
const initialState = {
  currentUser: null,
  posts: [],
  following: [],
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      console.log("reducers triggered USER_STATE_CHANGE ", action.payload);
      return { ...state, currentUser: action.payload };
    case USER_POSTS_STATE_CHANGE:
      console.log("reducers triggered USER_POSTS_STATE_CHANGE", action.payload);
      return { ...state, posts: action.payload };
    case USER_FOLLOWING_STATE_CHANGE:
      console.log(
        "reducers triggered USER_FOLLOWING_STATE_CHANGE",
        action.payload
      );
      return { ...state, following: action.payload };
    default:
      return state;
  }
};
