import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { SearchBarProps } from './types'
import { getSuggestions } from '@/services'
import { LocationItem } from '@/services/autocomplete/getSuggestions'

const SearchBar: FC<SearchBarProps> = ({ placeholder, onLocationSelect, currentPosition }) => {
    const [suggestions, setSuggestions] = useState<LocationItem[]>([]);
    const [query, setQuery] = useState("");

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
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={query}
                onChangeText={(text) => {
                    setQuery(text);
                    const currentPositionStr = `${currentPosition?.latitude},${currentPosition?.longitude}`;
                    fetchSuggestions(text, currentPositionStr);
                }}
            />
            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item.id}
                    renderItem={
                        ({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={styles.suggestion}
                                    onPress={() => {
                                        setQuery(item.title);
                                        setSuggestions([]);
                                        onLocationSelect(
                                            item.position.lat,
                                            item.position.lng
                                        );
                                    }}>
                                    <Text>{item.title}</Text>
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
        position: "absolute",
        top: 40,
        left: 10,
        right: 10,
        backgroundColor: "white",
        borderRadius: 10,
        zIndex: 1,
        elevation: 3
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16
    },
    suggestion: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"
    }
});