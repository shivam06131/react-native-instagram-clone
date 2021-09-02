import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const LandingPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({});
