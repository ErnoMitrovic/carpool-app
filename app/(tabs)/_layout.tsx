import { Platform, StyleSheet } from 'react-native'
import React from 'react'
import IconSymbol from '@/components/ui/IconSymbol';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RideScreen from '.';
import { CarpoolTabBar } from '@/components/CarpoolTabBar';
import { useAuth } from '@/store/AuthContext';
import { SignUp } from '@/screens/SignUp';

const Tab = createBottomTabNavigator();

const NavBar = () => {
    const { isSignedIn } = useAuth();

    if(!isSignedIn) {
        return <SignUp />
    }

    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: Platform.select({
                ios: {
                    // Use a transparent background on iOS to show the blur effect
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
        </Tab.Navigator>
    )
}

export default NavBar

const styles = StyleSheet.create({})