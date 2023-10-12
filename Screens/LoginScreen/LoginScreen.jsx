import { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import background from "../../assets/images/background.jpg";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    console.log("Authorized user:", `${email}, ${password}`);
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
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.inputContainer}>
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
              onPress={onLogin}
            >
              <Text style={{ color: "#FFFFFF" }}>Увійти</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Немає акаунту? Зареєструватися</Text>
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
    paddingTop: 32,
    paddingBottom: 132,
    paddingHorizontal: 16,
    marginTop: 430,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
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
    paddingHorizontal: 220,
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
