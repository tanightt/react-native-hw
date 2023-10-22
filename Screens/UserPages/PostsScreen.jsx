import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/auth/authOperations";

import { DefaultPostsScreen } from "./DefaultPostsScreen";
import { CommentsScreen } from "./CommentsScreen";
import { MapScreen } from "./MapScreen";

import SvgArrow from "../../assets/svg/SvgArrow";
import SvgLogOut from "../../assets/svg/SvgLogout";

export const PostsScreen = () => {
  const PostStack = createStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutThunk()).unwrap();
  };

  return (
    <PostStack.Navigator
      initialRouteName="Default"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <PostStack.Screen
        name="Default"
        component={DefaultPostsScreen}
        options={() => ({
          ...postsOptions,
          headerRight: () => (
            <SvgLogOut
              onPress={onLogout}
              title="Logout"
              style={styles.iconLogout}
            />
          ),
        })}
      />
      <PostStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          ...screenOptions,
          title: "Коментарі",
          headerLeft: () => (
            <SvgArrow
              onPress={() => navigation.navigate("Default")}
              title="Return back"
              color="#fff"
              style={styles.iconArrow}
            />
          ),
        }}
      />
      <PostStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          ...screenOptions,
          title: "Карта",
          headerLeft: () => (
            <SvgArrow
              onPress={() => navigation.navigate("Default")}
              title="Return back"
              color="#fff"
              style={styles.iconArrow}
            />
          ),
        }}
      />
    </PostStack.Navigator>
  );
};

const styles = StyleSheet.create({
  iconArrow: {
    padding: 16,
    marginLeft: 16,
    width: 24,
    height: 24,
  },
  iconLogout: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
});

const screenOptions = {
  headerShown: true,
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
  },
  headerTitleStyle: {
    fontFamily: "Roboto-Bold",
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 22,
    textAlign: "center",
  },
};

const postsOptions = {
  title: "Публікації",
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
  },
  headerTitleStyle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    fontWeight: "medium",
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },
};
