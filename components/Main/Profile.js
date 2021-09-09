import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import firebase from "firebase";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    const { posts, currentUser } = useSelector((state) => state.userState);
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPost(posts);
    }
  }, []);
  if (user.name == null) {
    return <View></View>;
  }
  return (
    <View>
      {user.name != null && (
        <View style={styles.container}>
          <View style={styles.InfoContainer}>
            <Text>Name : {user.name}</Text>
            <Text>Email : {user.email}</Text>
          </View>
          <View style={styles.GalleryContainer}>
            <FlatList
              numColumns={3}
              horizontal={false}
              data={userPost}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.DownloadURL }}
                  style={styles.image}
                />
              )}
            />
          </View>
        </View>
      )}
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
