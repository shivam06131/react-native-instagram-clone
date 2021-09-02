import * as firebase from "firebase";
import "firebase/firestore";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({ name, email });
        console.log(result);
      })
      .catch((e) => console.log(e));
  };
  return (
    <View>
      <TextInput placeholder="Name" onChangeText={(name) => setName(name)} />
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="SignUp" onPress={handleSignUp} />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
