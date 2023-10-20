import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";

export const UserInf = () => {
  const user = useSelector(selectUser);

  return (
    <View style={styles.userContainer}>
      <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    marginBottom: 32,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  userAvatar: { width: 70, height: 70, borderRadius: 16 },
  userName: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 15,
    fontWeight: "bold",
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.8)",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: "regular",
  },
});
