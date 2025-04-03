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

  const totalPrice = useTotalPrice(checkIn, checkOut, price);

    const handleSubmit = async () => {
      if (!checkIn || !checkOut) {
        alert('Please select both check-in and check-out dates.');
        return;
      }

      try {
        if (totalPrice === null) {
          alert('Total price calculation failed. Please try again.');
          return;
        }
        await postBooking(checkIn, checkOut, Number(id), totalPrice);
        alert('Booking successful!');
        document.location.href = "/bookingsuccess"
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
        />
        <ToastContainer />
      </>
  );
}

