import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PostsScreen } from "./UserPages/PostsScreen";
import { CreatePostsScreen } from "./UserPages/CreatePostsScreen";
import { ProfileScreen } from "./UserPages/ProfileScreen";

import SvgLogOut from "../assets/svg/SvgLogout";
import SvgGrid from "../assets/svg/SvgGrid";
import SvgArrow from "../assets/svg/SvgArrow";
import SvgPlusCreate from "../assets/svg/SvgPlusCreate";
import SvgUser from "../assets/svg/SvgUser";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "Публікації",
          headerRight: () => (
            <SvgLogOut
              onPress={() => navigation.navigate("Login")}
              title="Logout"
            />
          ),
          tabBarIcon: () => {
            return <SvgGrid stroke={"#212121CC"} />;
          },
        })}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          headerLeft: () => (
            <SvgArrow
              onPress={() => navigation.navigate("Posts")}
              title="Posts"
            />
          ),
          tabBarIcon: () => {
            return <SvgPlusCreate fill={"#212121CC"} />;
          },
        })}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          headerLeft: () => (
            <SvgArrow
              onPress={() => navigation.navigate("Posts")}
              title="Posts"
            />
          ),
          tabBarIcon: () => {
            return <SvgUser fill={"#212121CC"} />;
          },
        })}
      />
    </Tabs.Navigator>
  );
};
