import { Calendar } from "./Calendar.tsx";
import DatePicker from "react-datepicker";

export function BookingCard({ checkIn, setCheckIn, checkOut, setCheckOut, onSubmit, totalPrice, price, id, ownerFirst, ownerLast }) {
    return (
        <div className={"flex flex-col gap-[44px]"}>
            <div className={"w-[338px] h-[389px] border rounded-[12px] flex flex-col justify-center items-center gap-[26px]"}>
                <h2 className={"text-[24px]"}>{price} NOK / Night</h2>
                <div className={"flex flex-col items-center w-[253px] border border-[#D9D9D9] rounded-[20px]"}>
                    <div className={"flex gap-2 border-b border-[#D9D9D9]"}>
                        <div className={"pl-[16px] py-[12px] w-full border-r border-[#D9D9D9]"}>
                            <div className={"text-[14px]"}>Check in</div>
                            <DatePicker
                                selected={checkIn}
                                onChange={(date) => setCheckIn(date)}
                                dateFormat="dd/MM/yyyy"
                                className="w-full h-[20px] rounded text-[10px]"
                                placeholderText="Check in date"
                            />
                        </div>
                        <div className={"pr-[16px] py-[12px] w-full"}>
                            <div className={"text-[14px]"}>Check out</div>
                            <DatePicker
                                selected={checkOut}
                                onChange={(date) => setCheckOut(date)}
                                dateFormat="dd/MM/yyyy"
                                className="w-full h-[20px] rounded text-[10px]"
                                placeholderText="Checkout date"
                            />
                        </div>
                    </div>
                    <div className={"flex justify-between w-[119px] py-[12px]"}>
                        <p className={"text-[14px]"}>Total:</p>
                        <p className={"text-[14px]"}>{totalPrice !== null ? `${totalPrice} NOK` : "0 NOK"}</p>
                    </div>
                </div>
                <button
                    onClick={onSubmit}
                    className="mt-4 bg-yellow-300 text-black px-4  w-[253px] py-2 rounded-[12px] hover:bg-yellow-400"
                >
                    Book Now
                </button>
            </div>
            <div className={"w-[338px] h-[126px] border rounded-[12px] flex items-center justify-center flex-col"}>
                <h3 className={"font-bold"}>Your Host</h3>
                <p className={"font-light"}>{ownerFirst} {ownerLast}</p>
            </div>
        </div>
    );
}
