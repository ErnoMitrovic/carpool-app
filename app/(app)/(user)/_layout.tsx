import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CarpoolTabBar } from '@/components/CarpoolTabBar';
import { IconSymbol } from '@/app-example/components/ui/IconSymbol.ios';
import ChatScreen from '../chat';
import RideScreen from '.';
import ProfileScreen from '../../../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const UserLayout = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: Platform.select({
        ios: {
          position: 'absolute',
        },
        default: {},
      }),
      headerShown: false,
    }}
      tabBar={CarpoolTabBar}>
      <Tab.Screen
        name="Ride" component={RideScreen}
        options={{
          tabBarLabel: 'Ride',
          tabBarIcon: ({ color, size }) => <IconSymbol size={size} name="car.fill" color={color} />
        }} />
      <Tab.Screen
        name="Chat" component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => <IconSymbol size={size} name="message.fill" color={color} />
        }} />
      <Tab.Screen
        name='Profile' component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <IconSymbol size={size} name="person.fill" color={color} />
        }} />

    </Tab.Navigator>
  )
}

export default UserLayout