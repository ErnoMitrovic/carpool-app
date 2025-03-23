import React from 'react'
import { Tabs } from 'expo-router'
import { useTheme } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

const DriverLayout = () => {
    const theme = useTheme();

    return <Tabs screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: { backgroundColor: theme.colors.surface },
        headerShown: false,
    }} initialRouteName='my-rides'
    >
        <Tabs.Screen name='my-rides' options={{
            title: 'Rides', tabBarIcon: ({ color, size }) => (
                <Ionicons name='car' size={size} color={color} />
            )
        }} />
        <Tabs.Screen name='profile' options={{
            title: 'Profile', tabBarIcon: ({ color, size }) => (
                <Ionicons name='person' size={size} color={color} />
            )
        }} />
    </Tabs>
}

export default DriverLayout