import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>
        {currentTime.toLocaleTimeString()}
      </Text>
      <Text style={styles.dateText}>
        {currentTime.toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 24,
    marginTop: 10,
  },
});

