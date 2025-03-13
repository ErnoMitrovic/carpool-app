import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export interface TimePickerProps {
    value: Date,
    onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void,
}