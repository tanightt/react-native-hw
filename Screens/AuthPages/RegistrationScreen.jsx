import { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../utils/uploadImage";
import { registerThunk } from "../../redux/auth/authOperations";
import background from "../../assets/images/background.jpg";
import SvgPlusAvatar from "../../assets/svg/SvgPlusAvatar";

export const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLoadAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const onRegistration = async () => {
    const photo = avatar
      ? await uploadImage({ imageUri: avatar, folder: "avatars" })
      : "https://www.svgrepo.com/show/530412/user.svg";

    if (!name.trim() && !email.trim() && !password.trim()) {
      return console.warn("Будь ласка, введіть дані");
    }

    const data = { name, email, password, photo };
    dispatch(registerThunk(data))
      .unwrap()
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      });

    if (data === undefined || !data.uid) {
      alert(`Реєстрацію не виконано!`);
      return;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground style={styles.image} source={background}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.avatarWrapper}>
              <Image
                style={{ width: 120, height: 120, borderRadius: 16 }}
                source={{ uri: avatar }}
              />
              <TouchableOpacity
                style={styles.svgPlusIcon}
                onPress={onLoadAvatar}
              >
                <SvgPlusAvatar />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholder="Логін"
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Адреса електронної пошти"
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Пароль"
              />
            </View>
            <TouchableOpacity
              style={styles.submitBtn}
              activeOpacity={0.7}
              onPress={onRegistration}
            >
              <Text style={{ color: "#FFFFFF" }}>Зареєстуватися</Text>
            </TouchableOpacity>
            <Text
              style={styles.navBtn}
              onPress={() => navigation.navigate("Login")}
            >
              Вже є акаунт? Увійти
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: screenSize.height,
    width: screenSize.width,
    justifyContent: "center",
  },
  container: {
    width: screenSize.width,
    paddingTop: 92,
    paddingBottom: 75,
    paddingHorizontal: 16,
    marginTop: 390,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  avatarWrapper: {
    position: "absolute",
    top: -150,
    width: 120,
    height: 120,
    alignSelf: "center",
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
  },
  svgPlusIcon: {
    position: "absolute",
    top: 80,
    left: 105,
  },
  title: {
    marginBottom: 33,
    textAlign: "center",
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0.3,
    color: "#212121",
  },
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  inputContainer: {
    marginBottom: 43,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  submitBtn: {
    height: 50,
    paddingHorizontal: 130,
    paddingVertical: 16,
    marginBottom: 16,
    borderRadius: 100,
    alignItems: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "regular",
    backgroundColor: "#FF6C00",
  },
  navBtn: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "regular",
    color: "#1B4371",
  },
});
