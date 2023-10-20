import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";

import { PostsScreen } from "./UserPages/PostsScreen";
import { CreatePostsScreen } from "./UserPages/CreatePostsScreen";
import { ProfileScreen } from "./UserPages/ProfileScreen";

import SvgGrid from "../assets/svg/SvgGrid";
import SvgArrow from "../assets/svg/SvgArrow";
import SvgPlusCreate from "../assets/svg/SvgPlusCreate";
import SvgUser from "../assets/svg/SvgUser";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tabs.Navigator
      id="home"
      initialRouteName="Posts"
      screenOptions={{
        tabBarStyle: { height: 83 },
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={() => ({
          headerShown: false,
          tabBarIcon: () => {
            return <SvgGrid stroke={"#212121CC"} width={40} height={40} />;
          },
          tabBarLabel: () => {
            return null;
          },
        })}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          ...createPostsOptions,
          headerLeft: () => (
            <SvgArrow
              onPress={() => navigation.goBack()}
              style={styles.iconArrow}
            />
          ),
          tabBarIcon: () => {
            return (
              <View style={styles.createPostsBtn}>
                <SvgPlusCreate fill={"#FFFFFF"} />
              </View>
            );
          },
          tabBarLabel: () => {
            return null;
          },
        })}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          headerShown: false,
          tabBarIcon: () => {
            return (
              <SvgUser
                stroke={"#212121CC"}
                fill={"#FFFFFF"}
                width={40}
                height={40}
              />
            );
          },
          tabBarLabel: () => {
            return null;
          },
        })}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  createPostsBtn: {
    backgroundColor: "#FF6C00",
    width: 80,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconArrow: { marginLeft: 16, width: 24, height: 24 },
});

const createPostsOptions = {
  title: "Створити публікацію",
  tabBarStyle: { display: "none" },
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
  },
};
