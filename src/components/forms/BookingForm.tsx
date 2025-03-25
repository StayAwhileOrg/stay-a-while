import { useState } from 'react';
import { postBooking } from '../../hooks/api/post/postBooking';
import { BookingCard } from '../UI/BookingCard';
import { useTotalPrice } from '../../hooks/calculation/useTotalPrice.tsx';

type BookingFormProps = {
  id: string;
  price: number;
  ownerFirst: string;
  ownerLast: string;
};

export function BookingForm({
  id,
  price,
  ownerFirst,
  ownerLast,
}: BookingFormProps) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const totalPrice = useTotalPrice(checkIn, checkOut, price);

  const handleSubmit = async () => {
    if (!checkIn || !checkOut) {
      alert('Please select both check-in and check-out dates.');
      return;
    }

    try {
      await postBooking(checkIn, checkOut, id, totalPrice);
    } catch (error) {
      alert('Booking failed. Please try again.');
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
      totalPrice={totalPrice}
      id={id}
      ownerFirst={ownerFirst}
      ownerLast={ownerLast}
    />
  );
}
