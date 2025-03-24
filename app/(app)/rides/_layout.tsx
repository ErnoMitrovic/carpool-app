import React from 'react'
import { Slot, useRouter, useSegments } from 'expo-router'
import { Appbar, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const RideOperationLayout = () => {
  const theme = useTheme();
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
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>

        <Slot />
      </SafeAreaView>
    </>
  )
}

export default RideOperationLayout