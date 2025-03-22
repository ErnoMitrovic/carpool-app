import React from 'react'
import { Tabs } from 'expo-router'
import { useTheme } from 'react-native-paper'
import IconSymbol from '@/components/ui/IconSymbol';

const DriverLayout = () => {
    const theme = useTheme();

    return <Tabs screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: { backgroundColor: theme.colors.surface },
        headerShown: false
    }} initialRouteName='rides'>
        <Tabs.Screen name='create' options={{
            title: 'Ride', tabBarIcon: ({ color, size }) => (
                <IconSymbol name='car.fill' size={size} color={color} />
            )
        }} />
        <Tabs.Screen name='rides' options={{
            title: 'Rides', tabBarIcon: ({ color, size }) => (
                <IconSymbol name='list.dash' size={size} color={color} />
            )
        }} />
        <Tabs.Screen name='profile' options={{ 
            title: 'Profile', tabBarIcon: ({ color, size }) => (
                <IconSymbol name='person.fill' size={size} color={color} />
            )
        }} />
    </Tabs>
}

export default DriverLayout