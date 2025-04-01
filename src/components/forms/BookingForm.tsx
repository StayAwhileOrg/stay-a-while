import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postBooking } from '../../hooks/api/post/postBooking';
import { BookingCard } from '../UI/BookingCard';
import { useTotalPrice } from '../../hooks/calculation/useTotalPrice.tsx';
import { toast, ToastContainer } from "react-toastify";

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
  const navigate = useNavigate();

  const totalPrice = useTotalPrice(checkIn, checkOut, price);

  const handleSubmit = async () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select both check-in and check-out dates.');
      return;
    }

    try {
      await postBooking(checkIn, checkOut, id, totalPrice);
      toast.success('Booking successful!');
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      toast.error('Booking failed. Please try again.');
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

