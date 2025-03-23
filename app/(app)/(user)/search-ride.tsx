import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { CarpoolMap } from '@/components/CarpoolMap'
import { StatusBar } from 'expo-status-bar'
import { MapMarkerProps } from 'react-native-maps'
import { SearchBar } from '@/components/SearchBar'
import { TimePicker } from '@/components/TimePicker'
import { Button, HelperText, Surface } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LocationPojo, SearchRideRequest } from '@/services/ride'
import { useLocation } from '@/store/LocationContext'
import { Controller, useForm } from 'react-hook-form'
import AppActivityIndicator from '@/components/AppActivityIndicator/AppActivityIndicator'
import { useRouter } from 'expo-router'

type SearchRideForm = {
  startLocation: LocationPojo;
  endLocation: LocationPojo;
  dateTime: Date;
}

const RideScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { location } = useLocation()
  const [startMarker, setStartMarker] = useState<MapMarkerProps>();
  const [endMarker, setEndMarker] = useState<MapMarkerProps>();

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<SearchRideForm>({
    defaultValues: {
      dateTime: new Date()
    }
  });

  const handleSearchRide = async (data: SearchRideForm) => {
    const request = {
      userLat: data.startLocation.position.y,
      userLng: data.startLocation.position.x,
      destLat: data.endLocation.position.y,
      destLng: data.endLocation.position.x,
      departureDatetime: data.dateTime.toISOString()
    }
    router.push({
      pathname: '/select-ride',
      params: request
    })
  }

  if (!location) {
    return <AppActivityIndicator />
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