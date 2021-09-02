import * as firebase from "firebase";
import "firebase/firestore";
import { USER_STATE_CHANGE } from "../constants/index";

const fetchUser = () => (dispatch) => {
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
export default fetchUser;
