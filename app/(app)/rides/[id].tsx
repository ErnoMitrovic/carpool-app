import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getRide, RideRequest, RideResponse, updateRide } from '@/services/ride';
import DriverRideScreen from '@/screens/DriverRideScreen';

const UpdateRideView = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [ride, setRide] = React.useState<RideRequest | null>(null)

    React.useEffect(() => {
        const fetchRide = async () => {
            const response = await getRide(id);
            setRide({
                departureDatetime: new Date(response.departureDatetime),
                availableSeats: response.seats,
                costPerSeat: response.price,
                startLocation: response.startLocation,
                endLocation: response.endLocation,
                rideDescription: response.description
            });
        }

        if (id) {
            fetchRide();
        }
    }, [id])

    const submitUpdate = async (ride: RideRequest) => {
        await updateRide(id, ride);
    }

    const onDismiss = () => {
        router.back();
    }

    if(!ride) {
        return <View><Text>Loading...</Text></View>
    }

    return <DriverRideScreen defaultValues={ride} onSubmit={submitUpdate} submitText='Update' onDismiss={onDismiss} />
}

export default UpdateRideView