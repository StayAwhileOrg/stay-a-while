import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Calendar({ value, onChange }) {
    return (
        <DatePicker
            selected={value}
            onChange={onChange}
            dateFormat={"dd-MM-yyyy"}
            className={"text-[#2D4B48] w-[100px]"}
        />
    );
}