import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";

import background from "../assets/images/background.jpg";

export const Background = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground style={styles.imageBg} source={background}>
        {children}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    height: screenSize.height,
    width: screenSize.width,
    justifyContent: "center",
  },
});
