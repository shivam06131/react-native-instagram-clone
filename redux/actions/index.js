import firebase from "firebase/app";
import "firebase/firestore";
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from "../constants/index";

export const fetchUser = () => (dispatch) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        console.log("sanptShot", snapshot.data());
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
      console.log("posts in fetchUserPosts", posts);
      dispatch({ type: USER_POSTS_STATE_CHANGE, payload: posts });
    })
    .catch((e) => console.log("error", e));
};
