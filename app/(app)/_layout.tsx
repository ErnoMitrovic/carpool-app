import { Platform, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/store/AuthContext'
import { Redirect } from 'expo-router';
import { CarpoolTabBar } from '@/components/CarpoolTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RideScreen from '.';
import ProfileScreen from './profile';
import IconSymbol from '@/components/ui/IconSymbol';
import { ActivityIndicator } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const AppLayout = () => {

    const { isLoaded, isSignedIn } = useAuth();
    if (!isLoaded) {
        return <ActivityIndicator size="large" style={styles.container} />
    }
    if (!isSignedIn) {
        return <Redirect href='/(auth)/login' />
    }

    return (<Tab.Navigator screenOptions={{
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

    </Tab.Navigator>)
}

export default AppLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})