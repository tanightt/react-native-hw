import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { formatDate } from "../utils/formatDate";

export const CommentItem = ({ comment, date, userAvatar }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.comment}>{comment}</Text>
        <Text style={styles.date}>{formatDate(date)}</Text>
      </View>
      <Image source={{ uri: userAvatar }} style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: "80%",
    height: 103,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  comment: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: "regular",
    lineHeight: 18,
    color: "#212121",
  },
  date: {
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    fontWeight: "regular",
    color: "#BDBDBD",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
});
