import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { PostItem } from "../../components/PostItem";

import { UserInf } from "../../components/UserInf";

export const DefaultPostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.postsContainer}>
      <UserInf />
      <FlatList
        data={posts}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <PostItem
            name={item.name}
            photo={item.photo}
            address={item.address}
            location={item.location}
          />
        )}
      />
    </View>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    height: screenSize.height,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
});
