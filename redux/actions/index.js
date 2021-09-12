import firebase from "firebase/app";
import "firebase/firestore";
import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA,
} from "../constants/index";

export const clearData = () => (dispatch) => {
  return dispatch({ type: CLEAR_DATA });
};

// A DocumentSnapshot contains data read from a document in your Firestore database. The data can be extracted with .data() or .get(<field>) to get a specific field.

export const fetchUser = () => (dispatch) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        dispatch({ type: USER_STATE_CHANGE, payload: snapshot.data() });
      } else {
        console.log("user doesNot Exists");
      }
    })
    .catch((e) => console.log("error", e));
};
export const fetchUserPosts = () => (dispatch) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection("userPosts")
    .orderBy("creation", "asc")
    .get()
    .then((snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      dispatch({ type: USER_POSTS_STATE_CHANGE, payload: posts });
    })
    .catch((e) => console.log("error", e));
};

export const fetchUserFollowing = () => (dispatch) => {
  firebase
    .firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("FollowingTo")
    .onSnapshot((snapshot) => {
      let following = snapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      // as snapshot.docs is array as map function is applied on it,so it will also return an array , therefore following will be an array of the id's.
      dispatch({ type: USER_FOLLOWING_STATE_CHANGE, payload: following });
      let count = 0;
      for (let i = 0; i < following.length; i++) {
        count++;
        console.log("count", count);
        dispatch(fetchUsersData(following[i]));
      }
    });
};
// ----------------------------------------------------------

export const fetchUsersData = (uid) => (dispatch, getState) => {
  console.log("fetchUsersData triggered");
  const found = getState().usersState.users.some((el) => el.uid === uid);
  console.log("found", found);
  if (!found) {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let user = snapshot.data();
          user.uid = snapshot.id;
          dispatch({ type: USERS_DATA_STATE_CHANGE, payload: user });
          dispatch(fetchUserFollowingPosts(user.uid));
        }
      });
    console.log("dispatched fetchUserFollowingPosts from fetchUsersData");
  }
};

export const fetchUserFollowingPosts = (uid) => (dispatch, getState) => {
  console.log("fetchUserFollowingPosts triggered", uid);
  firebase
    .firestore()
    .collection("posts")
    .doc(uid)
    .collection("userPosts")
    .orderBy("creation", "asc")
    .get()
    .then((snapshot) => {
      try {
        console.log("uid", snapshot.docs[0].ref.path.split("/")[1]);
        console.log("snapshot.docs[0].ref.path", snapshot.docs[0].ref.path);
        const uid = snapshot.docs[0].ref.path.split("/")[1];
        const user = getState().usersState.users.find((el) => el.uid === uid);

        const posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data, user };
        });
        console.log("posts", posts);
        console.log("dispatched USERS_POSTS_STATE_CHANGE");
        dispatch({ type: USERS_POSTS_STATE_CHANGE, payload: { posts, uid } });
        // console.log("getState", getState());
      } catch (error) {
        console.log("error in try catch", error);
      }
    })
    .catch((e) => console.log("error", e));
};
