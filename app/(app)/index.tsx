import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/store/AuthContext'
import { Redirect } from 'expo-router'
import { Role } from '@/services/auth'

const App = () => {
  const { isLoaded, isSignedIn, role } = useAuth()
  
  if (!isLoaded) {
    return <Text>Loading...</Text>
  }

    if (!isSignedIn) {
        return <Redirect href="/(auth)/login" />
    }

    if (role === Role.DRIVER) {
        return <Redirect href="/create" />
    }

    if (role === Role.USER) {
        return <Redirect href="/(app)/(user)/index" />
    }
}

export default App