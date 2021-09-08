import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";

import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

const Save = (props) => {
  const [caption, setCaption] = useState("");
  const uploadImage = async () => {
    const uri = props.route.params.image;
    const response = await fetch(uri);
    const blob = await response.blob();
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    // console.log("childPath", childPath);

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log("taskCompleted", snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (DownloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        DownloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        // console.log("inside then");
        props.navigation.popToTop();
      });
  };
  //   console.log("props", props.route.params.image);
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a caption"
        onChangeText={(value) => setCaption(value)}
      />
      <Button title="Save" onPress={uploadImage} />
    </View>
  );
};

export default Save;

const styles = StyleSheet.create({});
