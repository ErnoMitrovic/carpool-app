import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { BookingResponse, BookingStatus, getUserBookings } from '@/services/booking';
import { useAuth } from '@/store/AuthContext';
import { ActivityIndicator, Button, Card, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyBookingsScreen = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const [bookings, setBookings] = React.useState<BookingResponse[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [statusFilter, setStatusFilter] = React.useState<'PENDING' | 'ACCEPTED' | 'HISTORY'>('PENDING');

    React.useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);

            const statuses =
                statusFilter === 'HISTORY'
                    ? ['REJECTED', 'CANCELLED', 'COMPLETED']
                    : [statusFilter];

            const results: BookingResponse[] = [];

            await Promise.all(
                statuses.map(async (status) => {
                    const response = await getUserBookings({
                        userId: user?.uid || '',
                        statusValue: BookingStatus[status as keyof typeof BookingStatus],
                    });
                    results.push(...response.content);
                })
            )

            setBookings(results);
            setLoading(false);
        };

        fetchBookings();
    }, [statusFilter]);

    const titleMap = {
        PENDING: 'Pending Requests',
        ACCEPTED: 'Confirmed Rides',
        HISTORY: 'Past Bookings',
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: theme.colors.background }}>
            <SegmentedButtons
                value={statusFilter}
                onValueChange={(val) => setStatusFilter(val as typeof statusFilter)}
                buttons={[
                    { value: 'PENDING', label: 'Pending' },
                    { value: 'ACCEPTED', label: 'Accepted' },
                    { value: 'HISTORY', label: 'History' },
                ]}
                style={{ marginBottom: 16 }}
            />

            <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                {titleMap[statusFilter]}
            </Text>

            {loading ? (
                <ActivityIndicator animating />
            ) : bookings.length === 0 ? (
                <Text>No bookings in this category.</Text>
            ) : (
                <FlatList
                    data={bookings}
                    keyExtractor={(item) => item.bookingId.toString()}
                    renderItem={({ item }) => (
                        <Card style={{ marginBottom: 10 }}>
                            <Card.Title
                                title={`Ride #${item.rideId}`}
                                subtitle={`Status: ${item.bookingStatus}`}
                            />
                            <Card.Content>
                                <Text>User Role: {item.userRole}</Text>
                                <Text>Ride Status: {item.rideStatus}</Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button>View</Button>
                                <Button>Cancel</Button>
                            </Card.Actions>
                        </Card>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

export default MyBookingsScreen

const styles = StyleSheet.create({})