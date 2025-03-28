import DatePicker from 'react-datepicker';

type BookingCardProps = {
  checkIn: Date | null;
  setCheckIn: (date: Date | null) => void;
  checkOut: Date | null;
  setCheckOut: (date: Date | null) => void;
  onSubmit: () => void;
  totalPrice: number | null;
  price: number;
  id: string;
  ownerFirst: string;
  ownerLast: string;
  ownerImg: string;
};

export function BookingCard({
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  onSubmit,
  totalPrice,
  price,
  ownerFirst,
  ownerLast,
  ownerImg,
}: BookingCardProps) {
  return (
    <div className={'flex flex-col gap-[44px]'}>
      <div
        className={
          'lg:w-[338px] lg:h-[389px] lg:border rounded-[12px] flex flex-col justify-center items-center gap-[26px] w-full'
        }
      >
        <h2 className={'text-[24px]'}>{price} NOK / Night</h2>
        <div
          className={
            'flex flex-col items-center lg:w-[253px] w-[70vw] border border-[#D9D9D9] rounded-[20px]'
          }
        >
          <div className={'flex gap-2 border-b border-[#D9D9D9] w-full'}>
            <div
              className={'pl-[16px] py-[12px] w-full border-r border-[#D9D9D9]'}
            >
              <div className={'text-[14px]'}>Check in</div>
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                dateFormat="dd/MM/yyyy"
                className="w-full h-[20px] rounded text-[10px]"
                placeholderText="Check in date"
              />
            </div>
            <div className={'pr-[16px] py-[12px] w-full'}>
              <div className={'text-[14px]'}>Check out</div>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                dateFormat="dd/MM/yyyy"
                className="w-full h-[20px] rounded text-[10px]"
                placeholderText="Checkout date"
              />
            </div>
          </div>
          <div className={'flex justify-between lg:w-[119px] py-[12px] gap-[8px]'}>
            <p className={'text-[14px]'}>Total:</p>
            <p className={'text-[14px]'}>
              {totalPrice !== null ? `${totalPrice} NOK` : '0 NOK'}
            </p>
          </div>
        </div>
        <button
          onClick={onSubmit}
          className="mt-4 bg-[#2D4B48] text-white px-4 w-[70vw] lg:w-[253px] py-2 rounded-[12px] hover:bg-[#2D4B4870] hover:cursor-pointer"
        >
          Book Now
        </button>
      </div>
      <div
        className={
          'lg:w-[338px] h-[126px] lg:border border-t lg:rounded-[12px] flex items-center justify-center flex-col w-full'
        }
      >
        <div className={'flex items-center gap-[16px]'}>
          <img
            src={ownerImg}
            alt=""
            className={'w-[40px] h-[40px] rounded-[50px] object-cover'}
          />
          <div>
            <h3 className={'font-bold'}>Your Host</h3>
            <p className={'font-light'}>
              {ownerFirst} {ownerLast}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
