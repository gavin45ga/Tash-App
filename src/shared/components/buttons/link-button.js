import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { getHeight } from "utils";
import { Colors, Fonts, FontSize } from "../../theme";

export const LinkButton = (props) => {
  const { style, textStyle, text, ...otherProps } = props;
  return (
    <TouchableOpacity style={[styles.button, style]} {...otherProps}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    borderRadius: 5,
    height: getHeight(50),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: FontSize.mediumlarge,
    fontFamily: Fonts.LatoRegular,
  },
};
