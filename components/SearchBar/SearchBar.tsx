import { FlatList, StyleSheet, View } from 'react-native'
import React, { FC, useState } from 'react'
import { SearchBarProps } from './types'
import { getSuggestions } from '@/services/autocomplete'
import { LocationItem } from '@/services/autocomplete'
import IconSymbol from '../ui/IconSymbol'
import { Divider, List, Surface, TextInput, useTheme } from 'react-native-paper'

const SearchBar: FC<SearchBarProps> = ({ placeholder, onLocationSelect, currentPosition, query, setQuery }) => {
    const [suggestions, setSuggestions] = useState<LocationItem[]>([]);
    const theme = useTheme();

    const onPressedClear = () => {
        setQuery("");
        setSuggestions([]);
    }

    const fetchSuggestions = async (text: string, currentPosition: string) => {
        if (text.length < 3) {
            setSuggestions([]);
        }
        else {
            const items = await getSuggestions(text, currentPosition);
            setSuggestions(items);
        }
    }

    return (
        <Surface style={styles.container}>
            <TextInput
                left={<TextInput.Icon icon={({ size, color }) => (
                    <IconSymbol name="magnifyingglass" size={size} color={color} />
                )} />}
                placeholder={placeholder}
                value={query}
                placeholderTextColor={theme.colors.onSurface}
                onChangeText={(text) => {
                    setQuery(text);
                    const currentPositionStr = `${currentPosition?.latitude},${currentPosition?.longitude}`;
                    fetchSuggestions(text, currentPositionStr);
                }}
                right={<TextInput.Icon icon={({ size, color }) => query && (
                    <IconSymbol name="xmark" size={size} color={color} onPress={onPressedClear} />
                )} />}
            />
            {suggestions.length > 0 &&
                (<FlatList
                    data={suggestions}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <List.Item title={item.title}
                            id={item.id}
                            left={props => <List.Icon {...props} icon={({ color, size }) => (
                                <IconSymbol name="location" size={size} color={color} />
                            )} />}
                            onPress={() => {
                                console.log(item.title, item.position, item.address.label);
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
                        />
                    )}
                    ItemSeparatorComponent={() => <Divider />}
                />)}
        </Surface>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 1,
    }
});