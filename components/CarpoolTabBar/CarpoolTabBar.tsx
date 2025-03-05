import { StyleSheet, Text, View } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import { FC } from 'react';
import { CommonActions } from '@react-navigation/native';

const CarpoolTabBar: FC<BottomTabBarProps> = ({ state, navigation, descriptors, insets }) => {
  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];
        if (options.tabBarIcon) {
          return options.tabBarIcon({ focused, color, size: 24 });
        }

        return null;
      }}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel.toString()
            : options.title !== undefined
              ? options.title
              : route.name;

        return label;
      }}
    />);
}

export default CarpoolTabBar

const styles = StyleSheet.create({})