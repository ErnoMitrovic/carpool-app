import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CarpoolMap } from '@/components/CarpoolMap'
import { StatusBar } from 'expo-status-bar'
import { MapMarkerProps, Region } from 'react-native-maps'
import { getCurrentPositionAsync, LocationObject, useForegroundPermissions } from 'expo-location'
import { SearchBar } from '@/components/SearchBar'
import { Position } from '@/services/autocomplete'
import { TimePicker } from '@/components/TimePicker'
import { Button, Surface } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LocationPojo } from '@/services/ride'

const RideScreen = () => {
  const insets = useSafeAreaInsets();

  const [markers, setMarkers] = useState<MapMarkerProps[]>([]);
  const [initialRegion, setInitialRegion] = useState<Region>();
  const [currentRegion, setCurrentRegion] = useState<Region>();
  const [status, setStatus] = useForegroundPermissions();
  const [currentLocation, setCurrentLocation] = useState<LocationObject>();

  const [startLocation, setStartLocation] = useState<LocationPojo>();
  const [endLocation, setEndLocation] = useState<LocationPojo>();

  const [dateTime, setDateTime] = useState<Date>(new Date());

  const onStartLocationSelect = (loc: LocationPojo) => {
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        coordinate: {
          latitude: loc.position.y,
          longitude: loc.position.x,
        },
      },
    ]);
    setCurrentRegion({ latitude: loc.position.y, longitude: loc.position.x, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
    setStartLocation(loc);
  }

  const onEndLocationSelect = (loc: LocationPojo) => {
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        coordinate: {
          latitude: loc.position.y,
          longitude: loc.position.x,
        },
      },
    ]);
    setCurrentRegion({ latitude: loc.position.y, longitude: loc.position.x, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
    setEndLocation(loc);
  }

  useEffect(() => {
    if (status?.granted) {
      getCurrentPositionAsync().then((location) => {
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        });
        setCurrentLocation(location);
        setCurrentRegion(initialRegion);
      });
    } else {
      setStatus();
    }
  }, [status]);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={styles.container} />
  }

  return (
    <>
      <Surface style={[styles.searchContainer, { paddingTop: insets.top + 4 }]}>
        <SearchBar placeholder="Start location" onLocationSelect={onStartLocationSelect}
          currentPosition={currentLocation?.coords}
        />
        <SearchBar placeholder="End location" onLocationSelect={onEndLocationSelect}
          currentPosition={currentLocation?.coords}
        />
        <TimePicker value={dateTime} onChange={(selectedDate) => {
          setDateTime(selectedDate);
        }} />
        <Button mode='contained' onPress={() => console.log('Ride request sent')}>Request ride</Button>
      </Surface>
      <CarpoolMap initialRegion={initialRegion} markers={markers} currentRegion={currentRegion} />
      <StatusBar hidden={true} />
    </>
  )
}

export default RideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 10,
    gap: 10,
  },
})