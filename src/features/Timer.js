import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Vibration, Alert } from "react-native";
import { Countdown } from "../components/Countdown";
import { fontSize, spacing } from "../utils/size";
import { RoundedButton } from "../components/RoundedButton";
import { useKeepAwake } from "expo-keep-awake";
import { ProgressBar } from "react-native-paper";
import { Timing } from "./Timing";

const DEFUALT_TIME = 0.05;
export const Timer = ({ focusSubject, removeSubject, onEndSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFUALT_TIME);
  const [vib, setVib] = useState(false);
  const ONE_SECOND_IN_MS = 1000;
  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];

  const changeMins = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };
  const alert = () =>
    Alert.alert("Well done", "it's time to take a break", [
      {
        text: "Cancel",
        onPress: () => setVib(false),
        style: "cancel",
      },
      { text: "OK", onPress: () => setVib(false) },
    ]);
  useEffect(() => {
    if (vib) {
      Vibration.vibrate(PATTERN);
    } else {
      Vibration.cancel();
    }
  }, [vib]);
  const onEnd = () => {
    setVib(true);
    alert();
    setMinutes(DEFUALT_TIME);
    setProgress(1);
    setIsStarted(false);
    onEndSubject(null);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPuse={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxxxl }}>
        <Text style={styles.title}>Focused on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <ProgressBar
        progress={progress}
        color="#1A3B41"
        style={{ margin: 10, height: 5 }}
      />

      <Timing onChangeMin={changeMins} />
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            size={100}
            title="Pause"
            onPress={() => {
              setIsStarted(false);
            }}
          />
        ) : (
          <RoundedButton
            style={{ backgroundColor: "green" }}
            size={100}
            title="Start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        )}
        <RoundedButton
          style={{ backgroundColor: "red" }}
          size={90}
          title="Clear"
          onPress={() => {
            removeSubject(null);
            setVib(false);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: fontSize.md,
  },
  task: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: fontSize.lg,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});
