import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CarpoolMap } from '@/components/CarpoolMap'
import { useLocation } from '@/store/LocationContext'
import { AppActivityIndicator } from '@/components/AppActivityIndicator'
import { useLocalSearchParams } from 'expo-router'
import { getRide } from '@/services/ride'
import { MapMarkerProps } from 'react-native-maps'
import { StatusBar } from 'expo-status-bar'
import { IconButton, Modal, Portal, Switch } from 'react-native-paper'
import ChatScreen from '@/screens/ChatScreen'

const ViewRideScreen = () => {
  const { location } = useLocation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = React.useState(true);
  const [markers, setMarkers] = React.useState<MapMarkerProps[]>([]);
  const [shareLocation, setShareLocation] = React.useState(false);
  const [chatVisible, setChatVisible] = React.useState(false);

  React.useEffect(() => {
    const fetchRide = async () => {
      const response = await getRide(id);
      setMarkers([
        {
          coordinate: {
            latitude: response.startLocation.position.y,
            longitude: response.startLocation.position.x
          },
          title: 'Start Location'
        },
        {
          coordinate: {
            latitude: response.endLocation.position.y,
            longitude: response.endLocation.position.x
          },
          title: 'End Location'
        }
      ]);
    }
    setLoading(true);
    fetchRide();
    setLoading(false);
  }, [id]);

  if (!location) {
    return <AppActivityIndicator />
  }

  if (loading) {
    return <AppActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <CarpoolMap initialRegion={{
        latitude: location?.x,
        longitude: location?.y,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
        markers={markers}
        routePoints={markers}
      />
      <View style={styles.toggleContainer}>
        <Text style={{ marginRight: 8 }}>Share Location</Text>
        <Switch
          value={shareLocation}
          onValueChange={setShareLocation}
        />
      </View>
      <IconButton
        icon='message-text'
        style={styles.chatButton}
        mode='contained'
        onPress={() => setChatVisible(!chatVisible)}
      />
      <Portal>
        <ChatScreen />
      </Portal>
    </View>
  )
}

export default ViewRideScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  toggleContainer: {
    position: 'absolute',
    top: 32, // adjust if needed
    left: 100,
    right: 100,
    alignItems: 'center', // 🔥 centers content horizontally
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center', // optional
    marginHorizontal: 'auto',
    elevation: 6,
    zIndex: 10,

    // Optional shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chatButton: {
    position: 'absolute',
    bottom: 64,
    right: 32
  }
})