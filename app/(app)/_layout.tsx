import React from 'react'
import { Slot } from 'expo-router';
import { LocationProvider } from '@/store/LocationContext';

const AppLayout = () => {
    return (
        <LocationProvider>
            <Slot />
        </LocationProvider>)
}

export default AppLayout