import React from 'react'
import { useAuth } from '@/store/AuthContext'
import { Role } from '@/services/auth'
import RideScreenUser from '@/screens/RideScreenUser'
import { Text } from 'react-native-paper';

const RideScreen = () => {
  const { role } = useAuth();

  switch (role) {
    case Role.USER:
      return <RideScreenUser />
    default:
      return <Text>Not implemented</Text>
  }
}

export default RideScreen;