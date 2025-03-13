import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton, useTheme } from 'react-native-paper'
import { signOut } from '@/services/auth';

const ProfileScreen = () => {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background}}>
      <Text>ProfileScreen</Text>
      <IconButton icon='logout' onPress={signOut} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})