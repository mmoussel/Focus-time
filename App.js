import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Focus } from "./src/features/Focus";
import { FocusHistory } from "./src/features/FocusHistory";
import { Timer } from "./src/features/Timer";
import { spacing } from "./src/utils/size";

const status = {
  completed: 1,
  canceld: 2,
};
const image = { uri: "https://cdn.wallpapersafari.com/83/45/6e9yIl.jpg" };
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error);
    }
  };
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const AFSWS = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };

  const clearHistory = () => {
    setFocusHistory([]);
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        {focusSubject ? (
          <Timer
            focusSubject={focusSubject}
            onEndSubject={() => {
              AFSWS(focusSubject, status.completed);
              setFocusSubject(null);
            }}
            removeSubject={() => {
              AFSWS(focusSubject, status.canceld);
              setFocusSubject(null);
            }}
          />
        ) : (
          <>
            <Focus addSubject={setFocusSubject} />
            <FocusHistory
              focusHistory={focusHistory}
              clearHistory={clearHistory}
            />
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#245E68",
  },
  image: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? spacing.lg : spacing.xl,
  },
});
