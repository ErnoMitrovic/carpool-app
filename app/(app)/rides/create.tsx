import React from 'react'
import DriverRideScreen from '@/screens/DriverRideScreen'
import { createRide, RideRequest } from '@/services/ride'
import { useRouter } from 'expo-router'


const CreateRideScreen = () => {
    const router = useRouter()

    const onSubmit = async (ride: RideRequest) => {
        await createRide(ride);
    }

    return (
        <DriverRideScreen onSubmit={onSubmit} submitText='Create ride' onDismiss={() => router.back()} />
    )
}

export default CreateRideScreen

