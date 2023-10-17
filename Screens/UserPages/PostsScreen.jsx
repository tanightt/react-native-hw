import { createStackNavigator } from "@react-navigation/stack";

import { DefaultPostsScreen } from "./DefaultPostsScreen";
import { CommentsScreen } from "./CommentsScreen";
import { MapScreen } from "./MapScreen";

import SvgArrow from "../../assets/svg/SvgArrow";
import { StyleSheet } from "react-native";

export const PostsScreen = ({ navigation }) => {
  const PostStack = createStackNavigator();

  return (
    <PostStack.Navigator
      initialRouteName="Default"
      screenOptions={{ headerShown: false }}
    >
      <PostStack.Screen name="Default" component={DefaultPostsScreen} />
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
  iconArrow: { marginLeft: 16, width: 24, height: 24 },
});

const screenOptions = {
  headerShown: true,
  headerTitleStyle: {
    fontFamily: "Roboto-Bold",
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 22,
    textAlign: "center",
  },
};
