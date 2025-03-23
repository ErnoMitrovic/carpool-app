import { FlatList, Keyboard, StyleSheet, View } from 'react-native'
import React, { FC, useState } from 'react'
import { SearchBarProps } from './types'
import { getSuggestions } from '@/services/autocomplete'
import { LocationItem } from '@/services/autocomplete'
import IconSymbol from '../ui/IconSymbol'
import { Divider, List, Surface, TextInput, useTheme } from 'react-native-paper'

const SearchBar: FC<SearchBarProps> = ({ placeholder, onLocationSelect, currentPosition, query, setQuery }) => {
    const [suggestions, setSuggestions] = useState<LocationItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();

    const currentPositionStr = React.useMemo(
        () => `${currentPosition?.latitude},${currentPosition?.longitude}`,
        [currentPosition]
    );

    const handleChangeText = async (text: string) => {
        setQuery(text);

        if (text.length < 3) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);

        const items = await getSuggestions(text, currentPositionStr);
        setSuggestions(items);
        setIsLoading(false);
    };

    const onPressedClear = () => {
        setQuery('');
        setSuggestions([]);
    };

    return (
        <Surface style={styles.container}>
            <TextInput
                left={<TextInput.Icon icon={({ size, color }) => (
                    <IconSymbol name="magnifyingglass" size={size} color={color} />
                )} />}
                placeholder={placeholder}
                value={query}
                placeholderTextColor={theme.colors.onSurface}
                onChangeText={handleChangeText}
                right={
                    query
                        ? <TextInput.Icon icon="close" onPress={onPressedClear} />
                        : isLoading
                            ? <TextInput.Icon icon="loading" />
                            : null
                }
            />
            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={item => item.id}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.title}
                            onPress={() => {
                                Keyboard.dismiss();
                                setSuggestions([]);
                                onLocationSelect({
                                    position: {
                                        x: item.position.lng,
                                        y: item.position.lat
                                    },
                                    name: item.title,
                                    address: item.address.label
                                });
                            }}
                            left={props => (
                                <List.Icon {...props} icon={({ color, size }) => (
                                    <IconSymbol name="location" size={size} color={color} />
                                )} />
                            )}
                        />
                    )}
                    ItemSeparatorComponent={() => <Divider />}
                />
            )}
        </Surface>
    );
};


export default SearchBar

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 1,
    }
});