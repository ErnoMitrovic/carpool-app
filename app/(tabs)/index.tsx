import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CarpoolMap } from '@/components/CarpoolMap'
import { StatusBar } from 'expo-status-bar'
import { MapMarkerProps, Region } from 'react-native-maps'
import { getCurrentPositionAsync, LocationObject, useForegroundPermissions } from 'expo-location'
import { SearchBar } from '@/components/SearchBar'
import { Position } from '@/services/autocomplete/getSuggestions'

const RideScreen = () => {
  const [markers, setMarkers] = useState<MapMarkerProps[]>([]);
  const [initialRegion, setInitialRegion] = useState<Region>();
  const [currentRegion, setCurrentRegion] = useState<Region>();
  const [status, setStatus] = useForegroundPermissions();
  const [currentLocation, setCurrentLocation] = useState<LocationObject>();

  const [startLocation, setStartLocation] = useState<Position>();
  const [endLocation, setEndLocation] = useState<Position>();

  const onStartLocationSelect = (pos: Position) => {
    setMarkers([...markers, {
      coordinate: {
        latitude: pos.lat,
        longitude: pos.lng
      }
    }]);
    setCurrentRegion({ latitude: pos.lat, longitude: pos.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
    setStartLocation(pos);
    console.log(startLocation);
  }

  const onEndLocationSelect = (pos: Position) => {
    setMarkers([...markers, {
      coordinate: {
        latitude: pos.lat,
        longitude: pos.lng
      }
    }]);
    setCurrentRegion({ latitude: pos.lat, longitude: pos.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
    setEndLocation(pos);
    console.log(endLocation);
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
      <CarpoolMap initialRegion={initialRegion} markers={markers} currentRegion={currentRegion} />
      <View style={styles.searchContainer}>
        <SearchBar placeholder="Start location" onLocationSelect={onStartLocationSelect}
          currentPosition={currentLocation?.coords}
        />
        <SearchBar placeholder="End location" onLocationSelect={onEndLocationSelect}
          currentPosition={currentLocation?.coords}
        />
      </View>
      <StatusBar hidden={true} />
    </>
  ) : <ActivityIndicator size="large" style={styles.container} />
}

export default RideScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    borderRadius: 10
  }
})