import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../components/RoundedButton";
import { fontSize, spacing } from "../utils/size";

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What you want to focus on ?</Text>
        <View style={styles.inputContanier}>
          <TextInput
            style={{ flex: 1, marginRight: spacing.md }}
            onSubmitEditing={({ nativeEvent }) => {
              addSubject(nativeEvent.text);
            }}
            onChangeText={setSubject}
          />
          <RoundedButton
            style={{}}
            size={50}
            title="+"
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  titleContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "center",
  },
  title: {
    color: "#E6F5FF",
    fontWeight: "bold",
    fontSize: fontSize.xl,
    textShadowColor: "gray",
    textShadowRadius: 9,
  },
  inputContanier: {
    paddingTop: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
});
