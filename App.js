import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./components/auth/LandingPage";
import LoginPage from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import { Store } from "./redux/store";

import firebase from "firebase";
import { useState, useEffect } from "react";
import { render } from "react-dom";
import Main from "./components/Main";
import AddScreen from "./components/Main/Add";
import Save from "./components/Main/Save";

const firebaseConfig = {
  apiKey: "AIzaSyDmaIFCJiB1jzAI-8LCp2widK7ZEpe8IJs",
  authDomain: "instagram-clone-3055d.firebaseapp.com",
  projectId: "instagram-clone-3055d",
  storageBucket: "instagram-clone-3055d.appspot.com",
  messagingSenderId: "542143940943",
  appId: "1:542143940943:web:c1159f5667febf9a1edd3a",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

const App = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        // console.log("user", user);
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }
  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={LoginPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddScreen"
            component={AddScreen}
            navigation={props.navigation}
          />
          <Stack.Screen
            name="Save"
            component={Save}
            navigation={props.navigation}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
