import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 120,

  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} {...props}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size,
      height: size,
      width: size,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "#fff",
      borderWidth: 2,
      backgroundColor: "#0D2529",
      margin: 10,
    },
    text: {
      color: "#fff",
      fontSize: size / 3,
    },
  });
