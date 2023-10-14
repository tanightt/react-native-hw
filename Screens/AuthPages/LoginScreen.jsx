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
import { useNavigation } from "@react-navigation/native";

import background from "../../assets/images/background.jpg";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const onLogin = () => {
    console.log("Authorized user:", `${email}, ${password}`);
    navigation.navigate("Home");
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
              onPress={onLogin}
            >
              <Text style={{ color: "#FFFFFF" }}>Увійти</Text>
            </TouchableOpacity>
            <Text
              style={styles.navBtn}
              onPress={() => navigation.navigate("Registration")}
            >
              Немає акаунту? Зареєструватися
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
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0.3,
    color: "#212121",
  },
  input: {
    width: 500,
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
    width: 500,
    height: 50,
    paddingHorizontal: 220,
    paddingVertical: 16,
    marginBottom: 16,
    borderRadius: 100,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "regular",
    backgroundColor: "#FF6C00",
  },
  navBtn: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "regular",
    color: "#1B4371",
  },
});
