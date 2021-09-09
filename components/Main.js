import React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  fetchUserFollowing,
  fetchUserPosts,
} from "./../redux/actions/index";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FeedScreen from "./Main/Feed";
import ProfileScreen from "./Main/Profile";
import AddScreen from "./Main/Add";
import SearchScreen from "./Main/Search";
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

const Main = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userState);
  // console.log("users", currentUser);
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchUserPosts());
    dispatch(fetchUserFollowing());
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
        navigation={props.navigation}
      />

      <Tab.Screen
        name="Add"
        component={EmptyScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("AddScreen");
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Profile", {
              uid: firebase.auth().currentUser.uid,
            });
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
