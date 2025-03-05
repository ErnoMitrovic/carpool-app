import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { SearchBarProps } from './types'
import { getSuggestions } from '@/services'
import { LocationItem } from '@/services/autocomplete/getSuggestions'
import IconSymbol from '../ui/IconSymbol'
import { useTheme } from 'react-native-paper'

const SearchBar: FC<SearchBarProps> = ({ placeholder, onLocationSelect, currentPosition }) => {
    const [suggestions, setSuggestions] = useState<LocationItem[]>([]);
    const [query, setQuery] = useState("");
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
        <View style={[styles.container, { borderColor: theme.colors.onBackground, backgroundColor: theme.colors.surface }]} >
            <View style={styles.containerSearch}>
                <IconSymbol name="magnifyingglass" size={20} color={theme.colors.onSurface} style={styles.icon} />
                <TextInput
                    style={[styles.input, { color: theme.colors.onSurface }]}
                    placeholder={placeholder}
                    value={query}
                    placeholderTextColor={theme.colors.onSurface}
                    onChangeText={(text) => {
                        setQuery(text);
                        const currentPositionStr = `${currentPosition?.latitude},${currentPosition?.longitude}`;
                        fetchSuggestions(text, currentPositionStr);
                    }}
                />
                {query && <IconSymbol name="xmark" size={20} color={theme.colors.onSurface} style={styles.icon} onPress={onPressedClear} />}
            </View>
            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item.id}
                    renderItem={
                        ({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.suggestion, { borderColor: theme.colors.onSurface }]}
                                    onPress={() => {
                                        setQuery(item.title);
                                        setSuggestions([]);
                                        onLocationSelect(item.position);
                                    }}>
                                    <Text style={{ color: theme.colors.onSurface }}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        }}
                />
            )}
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderRadius: 10,
    },
    containerSearch: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    suggestion: {
        padding: 10,
        borderBottomWidth: 1,
    },
    icon: {
        marginHorizontal: 5
    }
});