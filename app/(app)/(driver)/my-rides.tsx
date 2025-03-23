import React from 'react'
import { useAuth } from '@/store/AuthContext';
import { cancelRide, getMyRides, RideResponse } from '@/services/ride';
import { Button, Card, Dialog, Portal, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { FlatList, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';


const RidesScreen = () => {
  const { user, isLoaded } = useAuth();
  const [rides, setRides] = React.useState<RideResponse[]>([]);
  const [filter, setFilter] = React.useState<'upcoming' | 'past'>('upcoming');
  const [cancelDialogVisible, setCancelDialogVisible] = React.useState(false);
  const [rideCancelId, setRideCancelId] = React.useState('');
  const theme = useTheme();
  const router = useRouter();

  const convertDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }

  React.useEffect(() => {
    if (isLoaded && user) {
      const fetchRides = async () => {
        if (filter === 'upcoming') {
          const response = await getMyRides(user.uid, 0, 10, 'departureDatetime,asc');
          setRides(response);
        }
        else {
          const response = await getMyRides(user.uid, 0, 10);
          setRides(response);
        }
      }
      fetchRides();
    }
  }, [isLoaded, filter])

  return (
    <SafeAreaView style={{ ...styles.container, flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style='auto' />
      <SegmentedButtons
        value={filter}
        onValueChange={value => setFilter(value as 'upcoming' | 'past')}
        buttons={[
          { label: 'Upcoming', value: 'upcoming' },
          { label: 'Past', value: 'past' }
        ]}
      />

      <FlatList
        contentContainerStyle={{ paddingVertical: 8 }}
        data={rides}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Title title={item.endLocation.name} subtitle={convertDate(item.departureDatetime)} />
            <Card.Content>
              <Text>Pickup Location: {item.startLocation.name}</Text>
              <Text>Seats: {item.seats}</Text>
              <Text>Status: {item.status}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => router.push
                ({ pathname: '/rides/update/[id]', params: { id: item.id } })
              }>Edit</Button>
              <Button onPress={() => {
                setCancelDialogVisible(true)
                setRideCancelId(item.id.toString())
              }}>Cancel</Button>
              <Button onPress={() => router.push(
                { pathname: '/rides/booking/[id]', params: { id: item.id } }
              )}>Booking</Button>
            </Card.Actions>
          </Card>
        )}
      />

      <View
        style={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        <Button
          icon='plus'
          onPress={_ => router.navigate('/rides/create')}
        >
          Add Ride
        </Button>
      </View>

      <Portal>
        <Dialog visible={cancelDialogVisible} onDismiss={() => setCancelDialogVisible(false)}>
          <Dialog.Title>Cancel Ride</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to cancel this ride?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setCancelDialogVisible(false)}>No</Button>
            <Button onPress={_ => {
              cancelRide(rideCancelId)
              setCancelDialogVisible(false)
            }}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  )
}

export default RidesScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16
  }
})