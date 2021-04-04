import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { RoundedButton } from "../components/RoundedButton";

export const Timing = ({ onChangeMin }) => {
  return (
    <>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          style={{ backgroundColor: "#715C06" }}
          size={70}
          title="10"
          onPress={() => onChangeMin(10)}
        />
        <RoundedButton
          style={{ backgroundColor: "#09330C" }}
          size={70}
          title="15"
          onPress={() => onChangeMin(15)}
        />
        <RoundedButton
          style={{ backgroundColor: "#5C1111" }}
          size={70}
          title="20"
          onPress={() => onChangeMin(20)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});
