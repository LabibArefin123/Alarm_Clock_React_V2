import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Clock } from './Clock';
import { Alarm } from './Alarm';
import { Timer } from './Timer';
import { Settings } from './Setting';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Clock') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Alarm') {
              iconName = focused ? 'alarm' : 'alarm-outline';
            } else if (route.name === 'Timer') {
              iconName = focused ? 'timer' : 'timer-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
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

