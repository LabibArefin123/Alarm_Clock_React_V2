import React, { useState, useEffect } from "react";

import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("");

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds((previous) => {
        if (previous <= 1) {
          clearInterval(interval);
          setIsActive(false);

          Alert.alert("Timer Finished", "Your countdown has completed!");

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const startTimer = () => {
    const minutes = Number(inputMinutes);

    if (!Number.isFinite(minutes) || minutes <= 0) {
      Alert.alert("Invalid Time", "Please enter valid minutes.");
      return;
    }

    setSeconds(Math.floor(minutes * 60));
    setInputMinutes("");
    setIsActive(true);
  };

  const toggleTimer = () => {
    if (seconds <= 0) {
      Alert.alert("Timer", "Please set a timer first.");
      return;
    }

    setIsActive((previous) => !previous);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setInputMinutes("");
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = time % 60;

    return [hours, minutes, remainingSeconds]
      .map((value) => value.toString().padStart(2, "0"))
      .join(":");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Countdown Timer</Text>

      <Text style={styles.timerText}>{formatTime(seconds)}</Text>

      <TextInput
        style={styles.input}
        value={inputMinutes}
        onChangeText={setInputMinutes}
        placeholder="Enter minutes"
        keyboardType="decimal-pad"
        editable={!isActive}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={isActive ? "Pause" : "Resume"}
          onPress={toggleTimer}
          disabled={seconds === 0}
        />

        <Button title="Reset" onPress={resetTimer} />

        <Button title="Set Timer" onPress={startTimer} disabled={isActive} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F7FB",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 35,
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#CBD5E1",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 25,
    paddingHorizontal: 15,
    width: "80%",
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
});
