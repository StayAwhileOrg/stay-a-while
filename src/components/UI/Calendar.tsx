import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
    value: Date | null;
    onChange: (date: Date | null) => void;
    className?: string;
    minDate?: Date;
    placeholderText?: string;
}


export function Calendar({ value, onChange, className, minDate, placeholderText}: CalendarProps) {
    return (
        <DatePicker
            selected={value as Date | null | undefined}
            onChange={onChange}
            dateFormat={"dd-MM-yyyy"}
            className={className}
            placeholderText={placeholderText}
            minDate={minDate}
        />
    );
}