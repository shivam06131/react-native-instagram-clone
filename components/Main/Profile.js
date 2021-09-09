import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";
import { useSelector } from "react-redux";
import firebase from "firebase";
require("firebase/firestore");

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const [userFollowing, setUserFollowing] = useState(false);

  const { posts, currentUser, following } = useSelector(
    (state) => state.userState
  );
  console.log("props.route.params.uid", props.route.params.uid);
  useEffect(() => {
    // console.log(" posts, currentUser ", posts, currentUser);
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPost(posts);
    } else {
      console.log("inside else ");
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("user doesnot exists");
          }
        });
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPost(posts);
        });
    }

    if (following.indexOf(props.route.params.uid) > -1) {
      setUserFollowing(true);
    } else {
      setUserFollowing(false);
    }
  }, [props.route.params.uid, following]);

  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("FollowingTo")
      .doc(props.route.params.uid)
      .set({});
  };

  const onUnFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("FollowingTo")
      .doc(props.route.params.uid)
      .delete();
  };

  // console.log("userPost", userPost);
  if (!user) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.InfoContainer}>
        <Text>Name : {user.name}</Text>
        <Text>Email : {user.email}</Text>
        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {userFollowing ? (
              <Button title="Following" onPress={onUnFollow} />
            ) : (
              <Button title="Follow" onPress={onFollow} />
            )}
          </View>
        ) : null}
      </View>
      <View style={styles.GalleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPost}
          renderItem={({ item }) => (
            <Image source={{ uri: item.DownloadURL }} style={styles.image} />
          )}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  InfoContainer: { margin: 10 },
  GalleryContainer: {
    flex: 1,
  },
  image: {
    flex: 1 / 3,
    aspectRatio: 1 / 1,
  },
});
