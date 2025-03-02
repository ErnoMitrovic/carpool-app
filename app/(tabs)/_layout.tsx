import { Platform, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { CarpoolTabBar } from '../../components/CarpoolTabBar';
import IconSymbol from '@/components/ui/IconSymbol';

const NavBar = () => {
    const colorScheme = useColorScheme();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            tabBarStyle: Platform.select({
                ios: {
                    // Use a transparent background on iOS to show the blur effect
                    position: 'absolute',
                },
                default: {},
            }),
            tabBarButton: CarpoolTabBar,
            headerShown: false,
        }}>
            <Tabs.Screen name="index" options={{
                title: 'Ride',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="car.fill" color={color} />
            }} />
        </Tabs>
    )
}

export default NavBar

const styles = StyleSheet.create({})