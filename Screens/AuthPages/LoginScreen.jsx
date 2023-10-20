import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth/authOperations";
import { Background } from "../../components/Background";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogin = () => {
    if (!email.trim() || !password.trim()) {
      return console.warn("Будь ласка, введіть дані");
    }

    const data = { email, password };
    dispatch(loginThunk(data))
      .unwrap()
      .then(() => {
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      })
      .catch((error) => alert("Авторизацію не виконано!", error));
  };

  return (
    <Background>
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
    </Background>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
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
    paddingHorizontal: 150,
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
