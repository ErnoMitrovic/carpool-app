import React from 'react'
import DriverRideScreen from '@/screens/DriverRideScreen'
import { createRide } from '@/services/ride'
import { useRouter } from 'expo-router'


const CreateRideScreen = () => {
    const router = useRouter()

    return (
        <DriverRideScreen onSubmit={createRide} submitText='Create ride' onDismiss={() => router.back()} />
    )
}

export default CreateRideScreen

