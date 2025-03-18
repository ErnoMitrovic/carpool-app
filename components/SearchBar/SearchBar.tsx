import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { SearchBarProps } from './types'
import IconSymbol from '../ui/IconSymbol'
import { Divider, Surface, TextInput, useTheme } from 'react-native-paper'

const SearchBar = <T extends { id: string; title: string }>({
    placeholder,
    onSelect,
    onFetchSuggestions,
    renderItem
}: SearchBarProps<T>) => {
    const [suggestions, setSuggestions] = React.useState<T[]>([]);
    const [query, setQuery] = React.useState("");
    const theme = useTheme();

    const onPressedClear = () => {
        setQuery("");
        setSuggestions([]);
    }

    const fetchSuggestions = async (text: string) => {
        if (text.length < 3) {
            setSuggestions([]);
        }
        else {
            const items = await onFetchSuggestions(text);
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
                    fetchSuggestions(text);
                }}
                right={<TextInput.Icon icon={({ size, color }) => query && (
                    <IconSymbol name="xmark" size={size} color={color} onPress={onPressedClear} />
                )} />}
            />
            {suggestions.length > 0 &&
                (<FlatList
                    data={suggestions}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderItem(item, (selectedItem) => {
                        setQuery(selectedItem.title);
                        setSuggestions([]);
                        onSelect(selectedItem);
                    })}
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