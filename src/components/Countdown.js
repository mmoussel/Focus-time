import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { fontSize, spacing } from "../utils/size";

const minToMillis = (min) => min * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const Countdown = ({
  minutes = 10,
  isPuse = true,
  onProgress,
  onEnd,
}) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };
  useEffect(() => {
    if (millis === 0) {
      onEnd();
    }
    console.log(millis);
    onProgress(millis / minToMillis(minutes));
  }, [millis]);

  useEffect(() => {
    setMillis(minToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPuse) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPuse]);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A3B41",
  },
  text: {
    fontSize: fontSize.xxxl * 2,
    fontWeight: "bold",
    color: "white",
    padding: spacing.xl,
  },
});
