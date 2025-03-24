import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Card, Divider, Text, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { BookingRequest, BookingResponse, BookingStatus, getBookings, setBookingStatus } from '@/services/booking';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppActivityIndicator } from '@/components/AppActivityIndicator';
import { Ionicons } from '@expo/vector-icons';

const BookingsView = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const theme = useTheme();
    const [loading, setLoading] = React.useState(true);
    const [pending, setPending] = React.useState<BookingResponse[]>([]);
    const [accepted, setAccepted] = React.useState<BookingResponse[]>([]);

    const fetchBookings = async () => {
        const pendingRequest: BookingRequest = {
            statusValue: BookingStatus.PENDING,
            rideId: Number(id)
        }
        const acceptedRequest: BookingRequest = {
            statusValue: BookingStatus.ACCEPTED,
            rideId: Number(id)
        }

        const [pending, accepted] = await Promise.all([
            getBookings(pendingRequest),
            getBookings(acceptedRequest)
        ])

        setPending(pending.content);
        setAccepted(accepted.content);
        setLoading(false);
    }

    const acceptBooking = async (bookingId: number) => {
        await setBookingStatus(Number(id), bookingId, BookingStatus.ACCEPTED);
    }

    const rejectBooking = async (bookingId: number) => {
        await setBookingStatus(Number(id), bookingId, BookingStatus.REJECTED);
    }

    React.useEffect(() => {
        fetchBookings();
    }, [id])

    if (loading) {
        return <AppActivityIndicator />
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar style='auto' />
            <Text variant='titleMedium'>Passenger Requests</Text>
            {pending.length === 0 ? (<Text>No pending requests</Text>) : (
                <FlatList
                    data={pending}
                    keyExtractor={item => item.bookingId.toString()}
                    renderItem={({ item }) => (
                        <Card>
                            <Card.Title title={item.username} subtitle={item.userRole} />
                            <Card.Actions>
                                <Button onPress={() => {
                                    rejectBooking(item.bookingId)
                                    router.replace({
                                        pathname: '/rides/booking/[id]',
                                        params: { id: id.toString() }
                                    })
                                }}>Reject</Button>
                                <Button onPress={() => {
                                    acceptBooking(item.bookingId)
                                    router.replace({
                                        pathname: '/rides/booking/[id]',
                                        params: { id: id.toString() }
                                    })
                                }}>Accept</Button>
                            </Card.Actions>
                        </Card>
                    )}
                />
            )}
            <Divider style={styles.divider} />
            <Text variant='titleMedium'>Confirmed Passengers</Text>
            {
                accepted.length === 0 ? (<Text>No confirmed passengers</Text>) : (
                    <FlatList
                        data={accepted}
                        keyExtractor={item => item.bookingId.toString()}
                        renderItem={({ item }) => (
                            <Card>
                                <Card.Title title={item.username} subtitle={item.userRole}
                                    right={({ size }) => <Ionicons size={size} color={theme.colors.onSurface} name='checkmark-circle' />} />
                            </Card>
                        )}
                    />
                )
            }
        </View>
    )
}

export default BookingsView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    divider: {
        marginVertical: 16
    }
})