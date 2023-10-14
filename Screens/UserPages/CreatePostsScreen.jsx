import { useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import SvgCamera from "../../assets/svg/SvgCamera";
import SvgLocation from "../../assets/svg/SvgLocation";

export const CreatePostsScreen = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const onCreate = () => {
    console.log("Created post:", `${name}, ${location}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.postsContainer}>
        <TouchableOpacity style={styles.photoContainer}>
          <View style={styles.cameraContainer}>
            <SvgCamera fillColor={"#bdbdbd"} />
          </View>
        </TouchableOpacity>
        <Text style={styles.textPhoto}>Завантажте фото</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Назва..."
        />
        <TextInput
          value={location}
          onChangeText={setLocation}
          style={styles.input}
          placeholder="      Місцевість..."
        />

        <View style={styles.locationIcon}>
          <SvgLocation />
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          activeOpacity={0.7}
          onPress={onCreate}
        >
          <Text style={{ color: "#BDBDBD" }}>Опубліковати</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  postsContainer: {
    height: screenSize.height,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  photoContainer: {
    height: 240,
    Width: 342,
    marginBottom: 8,
    border: " 1px solid #E8E8E8",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },
  cameraContainer: {
    width: 60,
    height: 60,
    padding: 18,
    borderRadius: 50,
    alignItems: "center",
    alignContent: "center",
    color: "#bdbdbd",
    backgroundColor: "#ffffff",
  },
  textPhoto: {
    marginBottom: 32,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "regular",
    color: "#BDBDBD",
  },
  input: {
    height: 50,
    paddingVertical: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    fontSize: 16,
    borderColor: "#e8e8e8",
    color: "#212121",
    backgroundColor: "#ffffff",
  },
  locationIcon: {
    position: "absolute",
    top: 410,
    left: 16,
    width: 24,
    height: 24,
  },
  submitBtn: {
    width: 500,
    height: 50,
    paddingHorizontal: 190,
    paddingVertical: 16,
    marginTop: 32,
    borderRadius: 100,

    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "regular",
    // backgroundColor: "#FF6C00",
    backgroundColor: "#F6F6F6",
  },
});
