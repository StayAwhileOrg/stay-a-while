import { useState } from "react";
import { postBooking } from "../../hooks/api/post/postBooking";
import { BookingCard } from "../UI/BookingCard";

export function BookingForm({ id, price }) {
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);

    const handleSubmit = async () => {
        if (!checkIn || !checkOut) {
            alert("Please select both check-in and check-out dates.");
            return;
        }

        try {
            await postBooking(checkIn, checkOut, id, totalPrice);
            alert("Booking successful!");
        } catch (error) {
            alert("Booking failed. Please try again.");
        }
    };

    return (
        <BookingCard
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            onSubmit={handleSubmit}
            price={price}
            id={id}
        />
    );
}
