import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import SvgArrow from "../../assets/svg/SvgArrow";

export const CommentsScreen = () => {
  const [photo, setPhoto] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

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

  const onAddComment = () => {
    if (!comment.trim()) {
      return console.warn("Будь ласка, напишіть коментар");
    }
    setComments((prev) => [...prev, comment]);
    setComment("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.commentsContainer}>
        {photo && <Image source={{ uri: photo }} style={styles.image} />}

        {comments.map((i, index) => (
          <Text key={index}>{i}</Text>
        ))}
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
    justifyContent: "space-between",
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
