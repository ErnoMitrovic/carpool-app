import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export interface TimePickerProps {
    value: Date,
    onChange: (selectedDate: Date) => void,
}