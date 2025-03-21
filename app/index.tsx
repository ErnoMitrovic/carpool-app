import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/store/AuthContext';
import { Redirect, Slot } from 'expo-router';

const App = () => {
  const { isLoaded, isSignedIn } = useAuth();
      if (!isLoaded) {
          return <Text>Loading...</Text>
      }
      if (!isSignedIn) {
          return <Redirect href='/(auth)/login' />
      }

      else {
        return <Redirect href='/(app)' />
      }

}

export default App