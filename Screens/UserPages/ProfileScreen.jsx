import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectUser } from "../../redux/selectors";
import { uploadImage } from "../../utils/uploadImage";
import { auth } from "../../firebase/config";
import { updateProfile } from "firebase/auth";
import { updateAvatar } from "../../redux/auth/authSlice";
import { PostItem } from "../../components/PostItem";

import background from "../../assets/images/background.jpg";
import SvgPlusAvatar from "../../assets/svg/SvgPlusAvatar";
import SvgLogOut from "../../assets/svg/SvgLogout";

export const ProfileScreen = () => {
  const [avatar, setAvatar] = useState(null);
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      onSnapshot(collection(db, "posts"), (doc) => {
        const postsList = doc.docs
          .map((post) => ({ ...post.data(), id: post.id }))
          .sort((a, b) => b.date - a.date);
        setPosts(postsList);
      });
    })();
  }, []);

  const onLoadAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAvatar = result.assets[0].uri;
      setAvatar(selectedAvatar);

      const photo = await uploadImage({
        imageUri: avatar,
        folder: "avatars",
      });

      dispatch(updateAvatar({ photo }));

      const currentUser = auth.currentUser;

      await updateProfile(currentUser, {
        photoURL: photo,
      });
    }
  };

  const onLogout = () => {
    dispatch(logoutThunk()).unwrap();
  };

  return (
    <>
      <ImageBackground style={styles.imageBg} source={background}>
        <View style={styles.container}>
          <View style={styles.avatarWrapper}>
            <Image style={styles.userAvatar} source={{ uri: user.avatar }} />
            <TouchableOpacity style={styles.svgPlusIcon} onPress={onLoadAvatar}>
              <SvgPlusAvatar />
            </TouchableOpacity>
          </View>
          <SvgLogOut
            onPress={onLogout}
            title="Logout"
            style={styles.iconLogout}
          />
          <Text style={styles.userName}>{user.name}</Text>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PostItem
                name={item.name}
                photo={item.photoUrl}
                address={item.address}
                location={item.location}
              />
            )}
          />
        </View>
      </ImageBackground>
    </>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    height: screenSize.height,
    width: screenSize.width,
    justifyContent: "center",
  },
  container: {
    width: screenSize.width,
    height: 700,
    paddingTop: 32,
    paddingHorizontal: 16,
    marginTop: 150,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  avatarWrapper: { position: "absolute", top: -50, left: 200 },
  userAvatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  svgPlusIcon: {
    position: "absolute",
    top: 80,
    left: 105,
  },
  userName: {
    marginTop: 60,
    marginHorizontal: 200,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: "medium",
    letterSpacing: 0.3,
    color: "#212121",
  },
  iconLogout: {
    position: "absolute",
    top: 22,
    right: 16,
    width: 24,
    height: 24,
  },
});
