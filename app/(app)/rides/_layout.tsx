import React from 'react'
import { Slot, useRouter, useSegments } from 'expo-router'
import { Appbar } from 'react-native-paper'

const RideOperationLayout = () => {
  const segments = useSegments()
  const router = useRouter()
  
  const processSegment = () => {
    if (segments[2]) {
      return 'Ride ' + segments[2].charAt(0).toUpperCase() + segments[2].slice(1).toLowerCase()
    }

    return ''
  }


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={router.back} />
        <Appbar.Content title={processSegment()} />
      </Appbar.Header>
      <Slot />
    </>
  )
}

export default RideOperationLayout