import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CarpoolMap } from '@/components/CarpoolMap'
import { StatusBar } from 'expo-status-bar'
import { MapMarker, MapMarkerProps, Marker, Region } from 'react-native-maps'
import { getCurrentPositionAsync, getLastKnownPositionAsync, LocationObject, useForegroundPermissions } from 'expo-location'
import { SearchBar } from '@/components/SearchBar'

const RideScreen = () => {
  const [markers, setMarkers] = useState<MapMarkerProps[]>([]);
  const [initialRegion, setInitialRegion] = useState<Region>();
  const [status, setStatus] = useForegroundPermissions();
  const [currentLocation, setCurrentLocation] = useState<LocationObject>();

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
      });
    } else {
      setStatus();
    }
  }, [status]);

  return (
    <>
      <CarpoolMap initialRegion={initialRegion} markers={markers} />
      <SearchBar placeholder="Search for a location" onLocationSelect={(lat: number, lon: number) => {
        setMarkers([...markers, { coordinate: { latitude: lat, longitude: lon } }]);
      }}
        currentPosition={currentLocation?.coords}
      />
      <StatusBar hidden={true} />
    </>
  )
}

export default RideScreen

const styles = StyleSheet.create({})