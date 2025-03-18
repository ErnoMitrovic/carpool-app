export interface SearchBarProps<T> {
    placeholder: string;
    onSelect: (item: T) => void;
    onFetchSuggestions: (query: string) => Promise<T[]>;
    renderItem: (item: T, onSelect: (item: T) => void) => React.JSX.Element;
}
