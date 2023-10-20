import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import SvgArrow from "../../assets/svg/SvgArrow";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";
import { CommentItem } from "../../components/CommentItem";
import { useGetComments } from "../../hooks/useGetComments";

export const CommentsScreen = () => {
  const [photo, setPhoto] = useState("");
  const [comment, setComment] = useState("");

  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { position: "absolute", height: 83 },
      });
    }

    if (route.params) {
      setPhoto(route.params.photo);
    }
  }, [isFocused]);

  const [commentsList] = useGetComments(route.params.id);

  const onAddComment = async () => {
    if (!comment.trim()) {
      return console.warn("Будь ласка, напишіть коментар");
    } else {
      const data = {
        comment,
        userAvatar: user.avatar,
        date: Date.now(),
        userId: user.id,
      };
      const docRef = doc(db, "posts", route.params.id);
      await addDoc(collection(docRef, "comments"), data);
      setComment("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.commentsContainer}>
        {photo && <Image source={{ uri: photo }} style={styles.image} />}
        <FlatList
          data={commentsList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CommentItem
              id={item.id}
              comment={item.comment}
              date={item.date}
              userAvatar={item.userAvatar}
              userId={item.userId}
            />
          )}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            placeholder="Коментувати..."
            placeholderTextColor="#bdbdbd"
            value={comment}
            onChangeText={setComment}
            style={styles.commentInput}
          />
          <TouchableOpacity style={styles.commentBtn} onPress={onAddComment}>
            <SvgArrow style={styles.svgArrow} stroke="#ffffff" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  commentsContainer: {
    flex: 1,
    height: screenSize.height,
    paddingHorizontal: 16,
    marginTop: 32,
    backgroundColor: "#fff",
  },
  image: {
    height: 240,
    marginBottom: 34,
    alignItems: "center",
    borderRadius: 8,
  },
  commentInput: {
    position: "relative",
    height: 50,
    padding: 16,
    marginBottom: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
  },
  commentBtn: {
    position: "absolute",
    right: 8,
    top: 7,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: "#ff600c",
  },
  svgArrow: {
    height: 10,
    width: 10,
    transform: [{ rotate: "90deg" }],
  },
});
