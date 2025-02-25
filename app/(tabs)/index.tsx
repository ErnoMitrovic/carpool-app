import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CarpoolMap } from '@/components/CarpoolMap'
import { StatusBar } from 'expo-status-bar'
import { MapMarker, Region } from 'react-native-maps'
import { getCurrentPositionAsync, useForegroundPermissions } from 'expo-location'
import { API_URL } from '@/services'

const RideScreen = () => {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [initialRegion, setInitialRegion] = useState<Region>();
  const [status, setStatus] = useForegroundPermissions();

  useEffect(() => {
    if (status?.granted) {
      getCurrentPositionAsync().then((location) => {
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        });
      });
    } else {
      setStatus();
    }
  }, [status]);

  return (
    <>
      <CarpoolMap initialRegion={initialRegion} markers={markers} />
      <StatusBar hidden={true} />
    </>
  )
}

export default RideScreen

const styles = StyleSheet.create({})