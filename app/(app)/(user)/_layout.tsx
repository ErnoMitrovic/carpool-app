import React from 'react'
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

const UserLayout = () => {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: { backgroundColor: theme.colors.surface },
      }}
    >
      <Tabs.Screen
        name="search-ride"
        options={{
          tabBarLabel: 'Ride',
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="car" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="select-ride"
        options={{
          href: null
        }}
      />
    </Tabs>
  )
}

export default UserLayout