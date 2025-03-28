import React, { FC } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
    // See MaterialIcons here: https://icons.expo.fyi
    // See SF Symbols in the SF Symbols app on Mac.
    'house.fill': 'home',
    'paperplane.fill': 'send',
    'chevron.left.forwardslash.chevron.right': 'code',
    'chevron.right': 'chevron-right',
    'car.fill': 'directions-car',
    'message.fill': 'chat',
    'magnifyingglass': 'search',
    'xmark': 'close',
    'location': 'location-on',
    'person.fill': 'person',
    'list.dash': 'format-list-bulleted',
} as Partial<
    Record<
        import('expo-symbols').SymbolViewProps['name'],
        React.ComponentProps<typeof MaterialIcons>['name']
    >
>;

export type IconSymbolName = keyof typeof MAPPING;

interface IconSymbolProps {
    name: IconSymbolName;
    size?: number;
    color: string | OpaqueColorValue;
    style?: StyleProp<TextStyle>;
    weight?: SymbolWeight;
    onPress?: () => void;
}

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
const IconSymbol: FC<IconSymbolProps> = ({
    name,
    size = 24,
    color,
    style,
    onPress,
}) => {
    return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} onPress={onPress} />;
}

export default IconSymbol