import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CarpoolMap } from '@/components/CarpoolMap'
import { StatusBar } from 'expo-status-bar'
import { MapMarkerProps, Region } from 'react-native-maps'
import { getCurrentPositionAsync, LocationObject, useForegroundPermissions } from 'expo-location'
import { SearchBar } from '@/components/SearchBar'
import { LocationItem, Position } from '@/services/autocomplete'
import { TimePicker } from '@/components/TimePicker'
import { Button, Surface } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getRides } from '@/services/ride'
import { useForm } from 'react-hook-form'

type RideSearch = {
  startPosition: Position;
  endPosition: Position;
  departureDateTime: Date;
}

const RideScreen = () => {
  const insets = useSafeAreaInsets();

  const { control, handleSubmit, formState: { isValid, errors } } = useForm<RideSearch>({
    defaultValues: {
      startPosition: { lat: 0, lng: 0 },
      endPosition: { lat: 0, lng: 0 },
      departureDateTime: new Date(),
    }
  })

  const [markers, setMarkers] = useState<MapMarkerProps[]>([]);
  const [initialRegion, setInitialRegion] = useState<Region>();
  const [currentRegion, setCurrentRegion] = useState<Region>();
  const [status, setStatus] = useForegroundPermissions();
  const [currentLocation, setCurrentLocation] = useState<LocationObject>();

  const [startLocation, setStartLocation] = useState<LocationItem>();
  const [endLocation, setEndLocation] = useState<LocationItem>();

  const [dateTime, setDateTime] = useState<Date>(new Date());

  const onStartLocationSelect = (loc: LocationItem) => {
    const pos = loc.position;
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        coordinate: {
          latitude: pos.lat,
          longitude: pos.lng,
        },
      },
    ]);
    setCurrentRegion({ latitude: pos.lat, longitude: pos.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
    setStartLocation(loc);
  }

  const onEndLocationSelect = (loc: LocationItem) => {
    const pos = loc.position;
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        coordinate: {
          latitude: pos.lat,
          longitude: pos.lng,
        },
      },
    ]);
    setCurrentRegion({ latitude: pos.lat, longitude: pos.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
    setEndLocation(loc);
  }

  const handleSearch = async () => {
    if (startLocation && endLocation) {
      const data = await getRides({
        userLat: startLocation.position.lat,
        userLng: startLocation.position.lng,
        destLat: endLocation.position.lat,
        destLng: endLocation.position.lng,
        departureDateTime: dateTime.toISOString(),
      })
      console.log(data);
    }
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

  return initialRegion ? (
    <>
      <Surface style={[styles.searchContainer, { paddingTop: insets.top + 4 }]}>
        <TimePicker value={dateTime} onChange={(event, selectedDate) => {
          if (event.type === 'set')
            setDateTime(selectedDate ?? dateTime);
        }} />
        <Button mode='contained' onPress={handleSearch}>Request ride</Button>
      </Surface>
      <CarpoolMap initialRegion={initialRegion} markers={markers} currentRegion={currentRegion} />
      <StatusBar hidden={true} />
    </>
  ) : <ActivityIndicator size="large" style={styles.container} />
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