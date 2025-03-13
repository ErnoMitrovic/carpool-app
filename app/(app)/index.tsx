import { Platform, StyleSheet } from 'react-native'
import React from 'react'
import IconSymbol from '@/components/ui/IconSymbol';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RideScreen from './route';
import { CarpoolTabBar } from '@/components/CarpoolTabBar';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

const NavBar = () => {
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
                name='Profile' component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => <IconSymbol size={size} name="person.fill" color={color} />
                }} />

        </Tab.Navigator>
    )
}

export default NavBar