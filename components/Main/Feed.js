import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";
import { useSelector } from "react-redux";
import firebase from "firebase";
require("firebase/firestore");

const Feed = (props) => {
  const [posts, setPosts] = useState([]);

  const { users, usersLoaded } = useSelector((state) => state.usersState);
  console.log("users , usersLoaded", users, usersLoaded);

  const { following } = useSelector((state) => state.userState);
  useEffect(() => {
    let posts = [];
    if (usersLoaded <= following.length) {
      console.log("inside if block");
      for (let i = 0; i < following.length; i++) {
        const user = users.find((el) => el?.user?.uid === following[i]);
        if (user != undefined) {
          posts = [...posts, ...user.posts];
        }
      }
      posts.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(posts);
    }
  }, [usersLoaded, following]);
  console.log("posts , userLoaded", posts, usersLoaded);

  return (
    <View style={styles.container}>
      <View style={styles.GalleryContainer}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={{ flex: 1 / 3 }}>
              <Text style={styles.container}>{item.user.name}</Text>
              <Image source={{ uri: item.DownloadURL }} style={styles.image} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Feed;

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
    flex: 1,
    aspectRatio: 1 / 1,
  },
});
