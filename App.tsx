import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { Clock } from "./Clock";
import { Alarm } from "./Alarm";
import { Timer } from "./Timer";
import { Settings } from "./Setting";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: "center",

          tabBarActiveTintColor: "#2563EB",
          tabBarInactiveTintColor: "#94A3B8",

          tabBarIcon: ({ focused, color, size }) => {
            const icons = {
              Clock: focused ? "time" : "time-outline",
              Alarm: focused ? "alarm" : "alarm-outline",
              Timer: focused ? "timer" : "timer-outline",
              Settings: focused ? "settings" : "settings-outline",
            } as const;

            return (
              <Ionicons
                name={icons[route.name as keyof typeof icons]}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Clock" component={Clock} />
        <Tab.Screen name="Alarm" component={Alarm} />
        <Tab.Screen name="Timer" component={Timer} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
