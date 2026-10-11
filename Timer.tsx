import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('');

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => {
          if (seconds > 0) {
            return seconds - 1;
          } else {
            setIsActive(false);
            return 0;
          }
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = () => {
    if (inputMinutes) {
      setSeconds(parseInt(inputMinutes) * 60);
      setInputMinutes('');
    }
    setIsActive(true);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInputMinutes}
        value={inputMinutes}
        placeholder="Enter minutes"
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title={isActive ? 'Pause' : 'Start'} onPress={() => setIsActive(!isActive)} />
        <Button title="Reset" onPress={resetTimer} />
        <Button title="Set" onPress={startTimer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timerText: {
    fontSize: 48,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '50%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

