import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export default function App({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const handleTakePicture = async () => {
    // console.log("camera", camera);
    if (camera) {
      const data = await camera.takePictureAsync(null);
      // console.log("image clicked");
      setImage(data.uri);
    }
  };

  useEffect(() => {
    (async () => {
      const CameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(CameraStatus.status === "granted");
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // console.log("result: ", result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.CameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.FixRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <Button
        title="Flip Camera"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      <Button title="Take Picture" onPress={handleTakePicture} />
      <Button title="Choose Picture" onPress={pickImage} />
      <Button
        title="Save Picture"
        onPress={() => navigation.navigate("Save", { image })}
      />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  CameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  FixRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
