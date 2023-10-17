import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SvgComment from "../../assets/svg/SvgComment";
import SvgLocation from "../../assets/svg/SvgLocation";

export const PostItem = ({ photo, name, address, location }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemPostContainer}>
      <Image source={{ uri: photo }} style={styles.image} />
      <Text style={styles.itemPostTitle}>{name}</Text>
      <View style={styles.itemNavContainer}>
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 8 }}
          onPress={() => navigation.navigate("Comments", { photo })}
        >
          <SvgComment />
          <Text>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.navigate("Map", { location })}
        >
          <SvgLocation />
          <Text style={styles.addressText}>{address}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemPostContainer: { marginBottom: 34 },
  image: {
    height: 240,
    alignItems: "center",
    borderRadius: 8,
  },
  itemPostTitle: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    fontWeight: "medium",
    color: "#212121",
  },
  itemNavContainer: {
    flexDirection: "row",
    gap: 49,
    justifyContent: "space-between",
  },
  addressText: {
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "regular",
    textDecorationLine: "underline",
    color: "#212121",
  },
});
