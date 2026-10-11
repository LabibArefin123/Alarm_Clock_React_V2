import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Platform,
  Alert,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";

interface AlarmItem {
  id: string;
  time: Date;
  notificationId: string;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function Alarm() {
  const [alarms, setAlarms] = useState<AlarmItem[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    async function setupNotifications() {
      const { status } = await Notifications.requestPermissionsAsync();

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("alarms", {
          name: "Alarms",
          importance: Notifications.AndroidImportance.MAX,
          sound: "default",
          vibrationPattern: [0, 500, 250, 500],
        });
      }

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow notifications to receive alarm alerts.",
        );
      }
    }

    setupNotifications();
  }, []);

  const addAlarm = async (selectedTime: Date) => {
    const alarmDate = new Date();

    alarmDate.setHours(
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      0,
      0,
    );

    // If selected time has already passed, schedule for tomorrow.
    if (alarmDate.getTime() <= Date.now()) {
      alarmDate.setDate(alarmDate.getDate() + 1);
    }

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Alarm Clock",
          body: "Your alarm is ringing!",
          sound: "default",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: alarmDate,
          channelId: "alarms",
        },
      });

      const newAlarm: AlarmItem = {
        id: Date.now().toString(),
        time: alarmDate,
        notificationId,
      };

      setAlarms((previous) => [...previous, newAlarm]);

      Alert.alert("Alarm Set", "Your alarm has been scheduled!");
    } catch (error) {
      console.error("Alarm scheduling error:", error);
      Alert.alert("Error", "Unable to schedule your alarm.");
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);

    if (event.type === "set" && selectedDate) {
      addAlarm(selectedDate);
    }
  };

  const deleteAlarm = async (id: string) => {
    const alarm = alarms.find((item) => item.id === id);

    if (alarm) {
      await Notifications.cancelScheduledNotificationAsync(
        alarm.notificationId,
      );

      setAlarms((previous) => previous.filter((item) => item.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Alarms</Text>

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
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No alarms scheduled yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.alarmItem}>
            <Text style={styles.alarmTime}>
              {item.time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            <Button
              title="Delete"
              color="#dc3545"
              onPress={() => deleteAlarm(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FB",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
  },
  alarmItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  alarmTime: {
    fontSize: 24,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
  },
});
