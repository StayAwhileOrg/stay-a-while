import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";

export function Calendar() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date)
    };

    return (
        <>
            <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat={"dd/MM/YYYY"}
            className={"text-[#2D4B48] w-[100px]"}
            />
        </>
    )
}