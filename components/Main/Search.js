import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
require("firebase/firestore");
require("firebase/firebase-storage");

const Search = (props) => {
  const [users, setUsers] = useState([]);

  const fetchUser = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
  };
  return (
    <View>
      <Text>Search</Text>
      <TextInput
        placeholder="Search User"
        onChangeText={(search) => fetchUser(search)}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        // style={styles.list}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Profile", { uid: item.id })
            }
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "yellow",
  },
});
