import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CarpoolMap } from '@/components/CarpoolMap'
import { StatusBar } from 'expo-status-bar'
import { MapMarkerProps, Region } from 'react-native-maps'
import { getCurrentPositionAsync, LocationObject, useForegroundPermissions } from 'expo-location'
import { SearchBar } from '@/components/SearchBar'
import { Position } from '@/services/autocomplete'
import { TimePicker } from '@/components/TimePicker'
import { Button, HelperText, Surface } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getRides, LocationPojo, SearchRideRequest } from '@/services/ride'
import { useLocation } from '@/store/LocationContext'
import { Controller, useForm } from 'react-hook-form'

type SearchRideForm = {
  startLocation: LocationPojo;
  endLocation: LocationPojo;
  dateTime: Date;
}

const RideScreen = () => {
  const insets = useSafeAreaInsets();
  const { location } = useLocation()
  const [startMarker, setStartMarker] = useState<MapMarkerProps>();
  const [endMarker, setEndMarker] = useState<MapMarkerProps>();

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<SearchRideForm>({
    defaultValues: {
      startLocation: {
        address: '',
        name: '',
        position: {
          x: 0,
          y: 0
        }
      },
      endLocation: {
        address: '',
        name: '',
        position: {
          x: 0,
          y: 0
        }
      },
      dateTime: new Date()
    }
  });

  const handleSearchRide = async (data: SearchRideForm) => {
    const request: SearchRideRequest = {
      userLat: data.startLocation.position.y,
      userLng: data.endLocation.position.x,
      destLat: data.endLocation.position.y,
      destLng: data.endLocation.position.x,
      departureDatetime: data.dateTime
    }

    const response = await getRides(request);
    console.log(response);
  }

  if (!location) {
    return <ActivityIndicator size="large" style={styles.container} />
  }

  return (
    <>
      <Surface style={[styles.searchContainer, { paddingTop: insets.top + 4 }]}>
        <Controller
          name='startLocation'
          control={control}
          rules={{ required: 'Start location is required' }}
          render={({ field: { onChange, value } }) => (
            <SearchBar placeholder="Start location"
              currentPosition={{
                latitude: location.y,
                longitude: location.x
              }}
              query={value?.name}
              setQuery={(query) => onChange({ name: query })}
              onLocationSelect={(location) => {
                setStartMarker({
                  coordinate: {
                    latitude: location.position.y,
                    longitude: location.position.x
                  }
                })
                onChange(location)
              }} />
          )}
        />
        {errors.startLocation && (
          <HelperText type='error'>
            {errors.startLocation.message}
          </HelperText>
        )}
        <Controller
          name='endLocation'
          control={control}
          rules={{ required: 'End location is required' }}
          render={({ field: { onChange, value } }) => (
            <SearchBar placeholder="End location"
              currentPosition={{
                latitude: location.y,
                longitude: location.x
              }}
              query={value?.name}
              setQuery={(query) => onChange({ name: query })}
              onLocationSelect={(location) => {
                setEndMarker({
                  coordinate: {
                    latitude: location.position.y,
                    longitude: location.position.x
                  }
                })
                onChange(location)
              }} />

          )}
        />
        {errors.endLocation && <HelperText type='error'>{errors.endLocation?.message}</HelperText>}
        <Controller
          name='dateTime'
          control={control}
          rules={{ required: 'Date and time is required' }}
          render={({ field: { onChange, value } }) => (
            <TimePicker value={value} onChange={onChange} />
          )}
        />
        {errors.dateTime && <HelperText type='error'>{errors.dateTime?.message}</HelperText>}
        <Button mode='contained' disabled={!isValid} onPress={handleSubmit(handleSearchRide)}>Request ride</Button>
      </Surface>
      <CarpoolMap initialRegion={{
        latitude: location.y,
        longitude: location.x,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }} markers={[startMarker, endMarker].filter(marker => marker) as MapMarkerProps[]} />
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