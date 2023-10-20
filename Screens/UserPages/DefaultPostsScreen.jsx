import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { PostItem } from "../../components/PostItem";
import { UserInf } from "../../components/UserInf";

export const DefaultPostsScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      onSnapshot(collection(db, "posts"), (doc) => {
        const postsList = doc.docs
          .map((post) => ({ ...post.data(), id: post.id }))
          .sort((a, b) => b.date - a.date);
        setPosts(postsList);
      });
    })();
  }, []);

  return (
    <View style={styles.postsContainer}>
      <UserInf />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem
            id={item.id}
            name={item.name}
            photo={item.photoUrl}
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
