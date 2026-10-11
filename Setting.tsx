import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export function Settings() {
  const [is24Hour, setIs24Hour] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.setting}>
        <Text>24-Hour Format</Text>
        <Switch
          value={is24Hour}
          onValueChange={setIs24Hour}
        />
      </View>
      <View style={styles.setting}>
        <Text>Sound Enabled</Text>
        <Switch
          value={soundEnabled}
          onValueChange={setSoundEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

