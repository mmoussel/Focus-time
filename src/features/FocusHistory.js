import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { RoundedButton } from "../components/RoundedButton";

export const FocusHistory = ({ focusHistory, clearHistory }) => {
  const HistoryItem = ({ item, index }) => {
    return (
      <Text style={item.status > 1 ? styles.red : styles.green}>
        {item.subject}
      </Text>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      {focusHistory.length ? (
        <>
          <Text style={{ color: "white", fontSize: 25 }}>
            You'r Focus History is
          </Text>
          <FlatList
            style={{ flex: 0.5, color: "white" }}
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              paddingTop: 20,
            }}
            data={focusHistory}
            renderItem={HistoryItem}
          />
          <View style={styles.Button}>
            <RoundedButton
              size={90}
              title="Clear"
              onPress={() => {
                clearHistory();
              }}
            />
          </View>
        </>
      ) : null}
    </SafeAreaView>
  );
};

const listStyle = {
  fontWeight: "bold",
  fontSize: 20,
};

const styles = StyleSheet.create({
  red: {
    ...listStyle,
    color: "red",
  },
  green: {
    ...listStyle,
    color: "green",
  },
  Button: { flex: 1, justifyContent: "flex-start" },
});
