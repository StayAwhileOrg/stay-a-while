import { useState } from 'react';
import { postBooking } from '../../hooks/api/post/postBooking';
import { BookingCard } from '../UI/BookingCard';
import { useTotalPrice } from '../../hooks/calculation/useTotalPrice.tsx';

import { ToastContainer } from "react-toastify";

type BookingFormProps = {
  id: string;
  price: number;
  ownerFirst: string;
  ownerLast: string;
  ownerImg: string;
};

export function BookingForm({ id, price, ownerFirst, ownerLast, ownerImg, }: BookingFormProps) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [checkInError, setCheckInError] = useState(false);
  const [checkOutError, setCheckOutError] = useState(false);

  const totalPrice = useTotalPrice(checkIn, checkOut, price);

  const handleSubmit = async () => {
    let hasError = false;

    if (!checkIn) {
      setCheckInError(true);
      hasError = true;
    } else {
      setCheckInError(false);
    }

    if (!checkOut) {
      setCheckOutError(true);
      hasError = true;
    } else {
      setCheckOutError(false);
    }

    if (hasError) return;

    try {
      if (totalPrice === null) {
        return;
      }
      if (checkIn && checkOut) {
        await postBooking(checkIn, checkOut, String(id), totalPrice);
      }
      document.location.href = "/bookingsuccess";
    } catch (error) {
      let errorMessage = 'Booking failed. Please try again.';

      if (error instanceof Error) {
        errorMessage = `Booking failed: ${error.message}`;
      }

      if (error instanceof Response) {
        const errorData = await error.json().catch(() => ({}));
        errorMessage = `Booking failed (Status ${error.status}): ${
            errorData.message || 'Unknown server error'
        }`;
      }

      alert(errorMessage);
    }
  };

  return (
      <>
        <BookingCard
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            onSubmit={handleSubmit}
            price={price}
            totalPrice={totalPrice}
            id={id}
            ownerFirst={ownerFirst}
            ownerLast={ownerLast}
            ownerImg={ownerImg}
            checkInError={checkInError}
            checkOutError={checkOutError}
        />
        <ToastContainer />
      </>
  );
}

