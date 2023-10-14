import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import avatar from "../../assets/images/avatar.png";

export const PostsScreen = () => {
  return (
    <View style={styles.postsContainer}>
      <View style={styles.userContainer}>
        <Image source={avatar} style={styles.userAvatar} />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  postsContainer: {
    height: screenSize.height,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  userContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  userAvatar: { width: 70, height: 70 },
  userName: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "bold",
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.8)",
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: "regular",
  },
});
