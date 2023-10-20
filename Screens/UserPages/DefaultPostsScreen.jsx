import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { PostItem } from "../../components/PostItem";
import { UserInf } from "../../components/UserInf";
import { useGetPosts } from "../../hooks/useGetPosts";
import { selectUser } from "../../redux/selectors";

export const DefaultPostsScreen = () => {
  const user = useSelector(selectUser);
  const [posts] = useGetPosts(user.id);

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
