import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";
import { db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { uploadImage } from "../../utils/uploadImage";

import SvgCamera from "../../assets/svg/SvgCamera";
import SvgLocation from "../../assets/svg/SvgLocation";
import SvgTrash from "../../assets/svg/SvgTrash";

export const CreatePostsScreen = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [cameraRef, setCameraRef] = useState(null);

  const user = useSelector(selectUser);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
    })();

    (async () => {
      await Location.requestForegroundPermissionsAsync();

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      const [address] = await Location.reverseGeocodeAsync(coords);
      setLocation(coords);
      const fullAddress = ` ${address.region}, ${address.country}`;
      setAddress(fullAddress);
    })();
  }, []);

  const onCreatePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
  };

  const onClearForm = () => {
    setPhoto("");
    setName("");
    setAddress("");
    setLocation(null);
  };

  const onSubmitPost = async () => {
    const photoUrl = await uploadImage({
      imageUri: photo,
      folder: "postPhoto",
    });

    const data = {
      photoUrl,
      name,
      location,
      address,
      userId: user.id,
      date: Date.now(),
    };

    await addDoc(collection(db, "posts"), data);
    navigation.navigate("Default");
    onClearForm();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.postsContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={{ height: 240 }} />
        ) : (
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={setCameraRef}
          ></Camera>
        )}
        <View style={styles.photoView}>
          <TouchableOpacity onPress={onCreatePhoto}>
            <View
              style={StyleSheet.compose(
                styles.cameraContainer,
                !photo
                  ? { backgroundColor: "#ffffff" }
                  : { backgroundColor: "rgba(255, 255, 255, 0.30)" }
              )}
            >
              <SvgCamera fillColor={"#bdbdbd"} />
            </View>
          </TouchableOpacity>
        </View>
        {photo ? (
          <Text style={styles.textPhoto}>Редагувати фото</Text>
        ) : (
          <Text style={styles.textPhoto}>Завантажте фото</Text>
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            value={name}
            onChangeText={setName}
            style={StyleSheet.compose(styles.input, styles.inputName)}
            placeholder="Назва..."
          />
        </KeyboardAvoidingView>
        <View style={StyleSheet.compose(styles.input, styles.inputLocation)}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Місцевість..."
            />
          </KeyboardAvoidingView>
          <SvgLocation />
        </View>

        <TouchableOpacity
          style={StyleSheet.compose(
            styles.submitBtn,
            photo
              ? { backgroundColor: "#FF6C00" }
              : { backgroundColor: "#F6F6F6" }
          )}
          activeOpacity={0.7}
          onPress={onSubmitPost}
        >
          <Text style={!photo ? { color: "#BDBDBD" } : { color: "#ffffff" }}>
            Опубліковати
          </Text>
        </TouchableOpacity>
        <View style={styles.trashIcon}>
          <SvgTrash
            onPress={() => {
              navigation.navigate("Posts"), onClearForm();
            }}
            title="Posts"
          />
        </View>
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
  camera: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  photoView: {
    position: "absolute",
    top: 120,
    left: 240,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  cameraContainer: {
    flex: 1,
    maxWidth: 60,
    maxHeight: 60,
    padding: 18,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    color: "#bdbdbd",
  },
  textPhoto: {
    marginBottom: 32,
    fontFamily: "Roboto-Regular",
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
  inputName: {
    fontFamily: "Roboto-Medium",
    fontWeight: "medium",
  },
  inputLocation: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
    fontFamily: "Roboto-Regular",
    fontWeight: "regular",
  },
  submitBtn: {
    height: 50,
    paddingHorizontal: 140,
    paddingVertical: 16,
    marginTop: 32,
    marginBottom: 160,
    borderRadius: 100,
    alignItems: "center",

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "regular",
  },
  trashIcon: {
    height: 50,
    width: 70,
    paddingHorizontal: 23,
    paddingVertical: 16,
    marginTop: 32,
    marginLeft: 220,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },
});
