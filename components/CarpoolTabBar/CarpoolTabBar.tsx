import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

const CarpoolTabBar = (props: BottomTabBarButtonProps) => {
  return (
      <PlatformPressable
        {...props}
        onPressIn={(ev) => {
          if (process.env.EXPO_OS === 'ios') {
            impactAsync(ImpactFeedbackStyle.Light);
          }
          props.onPressIn?.(ev);
        }}
      />
    );
}

export default CarpoolTabBar

const styles = StyleSheet.create({})