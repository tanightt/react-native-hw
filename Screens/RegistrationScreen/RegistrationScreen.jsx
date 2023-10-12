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
import background from "../../assets/images/background.jpg";
import SvgPlus from "../../assets/svg/SvgPlus";

export const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegistration = () => {
    console.log("Registered user:", `${name}, ${email}, ${password}`);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground style={styles.image} source={background}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.avatarWrapper}>
              <Image style={{ width: 120, height: 120 }} />
              <TouchableOpacity style={styles.svgPlusIcon}>
                <SvgPlus />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholder="Логін"
              ></TextInput>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Адреса електронної пошти"
              ></TextInput>
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Пароль"
              ></TextInput>
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={onRegistration}
            >
              <Text style={{ color: "#FFFFFF" }}>Зареєстуватися</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Вже є акаунт? Увійти</Text>
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
    paddingBottom: 45,
    paddingHorizontal: 16,
    marginTop: 390,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  avatarWrapper: {
    position: "absolute",
    top: -150,
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  svgPlusIcon: {
    position: "absolute",
    top: 80,
    left: 105,
  },
  title: {
    marginBottom: 33,
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  input: {
    width: 500,
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
  inputContainer: {
    marginBottom: 43,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  btn: {
    width: 500,
    height: 50,
    paddingHorizontal: 190,
    paddingVertical: 16,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  text: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
  },
});
