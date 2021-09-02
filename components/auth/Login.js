import firebase from "firebase";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => console.log(result))
      .catch((e) => console.log(e));
  };
  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign in" onPress={handleSignIn} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
