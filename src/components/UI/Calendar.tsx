import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export function Calendar({ value, onChange }: CalendarProps) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      dateFormat="dd-MM-yyyy"
      className="text-[#2D4B48] w-[100px] text-sm outline-none"
    />
  );
}
