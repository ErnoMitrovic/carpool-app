import React from 'react'
import { Slot } from 'expo-router';
import { LocationProvider } from '@/store/LocationContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppLayout = () => {
    return (
        <LocationProvider>
            <StatusBar hidden={true} />
            <Slot />
        </LocationProvider>)
}

export default AppLayout