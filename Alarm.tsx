import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { ToastAndroid } from 'react-native';

export function Alarm() {
  const [alarms, setAlarms] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.requestPermissions();
    }
  }, []);

  const addAlarm = (date) => {
    const newAlarm = { id: Date.now(), time: date };
    setAlarms([...alarms, newAlarm]);

    if (Platform.OS === 'ios') {
      PushNotificationIOS.scheduleLocalNotification({
        fireDate: date.toISOString(),
        alertTitle: 'Alarm',
        alertBody: 'Your alarm is ringing!',
        soundName: 'default',
      });
    } else {
      // For Android, we're using a simple toast notification
      const timeUntilAlarm = date.getTime() - Date.now();
      setTimeout(() => {
        ToastAndroid.show('Alarm!', ToastAndroid.LONG);
      }, timeUntilAlarm);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      addAlarm(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Add Alarm" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.alarmItem}>
            {item.time.toLocaleTimeString()}
          </Text>
        )}
      />
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
  alarmItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});

