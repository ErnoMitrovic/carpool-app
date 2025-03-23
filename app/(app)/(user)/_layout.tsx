import React from 'react'
import { CarpoolTabBar } from '@/components/CarpoolTabBar';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const UserLayout = () => {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CarpoolTabBar {...props} />}
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
        name="Chat"
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="chatbubbles" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default UserLayout