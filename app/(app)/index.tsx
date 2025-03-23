import React from 'react'
import { useAuth } from '@/store/AuthContext'
import { Redirect } from 'expo-router'
import { Role } from '@/services/auth'
import { useTheme } from 'react-native-paper'
import AppActivityIndicator from '@/components/AppActivityIndicator/AppActivityIndicator'

const App = () => {
  const theme = useTheme();
  const { isLoaded, isSignedIn, role } = useAuth()

  if (!isLoaded) {
    return <AppActivityIndicator />
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/login" />
  }

  if (role === Role.DRIVER) {
    return <Redirect href="/my-rides" />
  }

  if (role === Role.USER) {
    return <Redirect href="/search-ride" />
  }
}

export default App