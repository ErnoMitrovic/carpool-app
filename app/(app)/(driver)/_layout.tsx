import React from 'react'
import { Tabs } from 'expo-router'
import { useTheme } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { CarpoolTabBar } from '@/components/CarpoolTabBar'

const DriverLayout = () => {
    const theme = useTheme();

    return <Tabs screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
    }} initialRouteName='my-rides'
        tabBar={(props) => <CarpoolTabBar {...props} />}>
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