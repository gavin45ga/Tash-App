import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../theme";

export const IconButton = (props) => {
  const { style, icon, ...otherProps } = props;
  return (
    <TouchableOpacity style={[styles.button, style]} {...otherProps}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10.7,
    height: 50,
    backgroundColor: Colors.ultramarineLowOpacity,
    alignItems: "center",
    justifyContent: "center",
  },
});
