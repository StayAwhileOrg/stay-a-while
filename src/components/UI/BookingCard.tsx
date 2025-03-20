import { Calendar } from "./Calendar.tsx";
import DatePicker from "react-datepicker";

export function BookingCard({ checkIn, setCheckIn, checkOut, setCheckOut, onSubmit, totalPrice, price, id }) {
    return (
        <div className={"flex flex-col gap-[44px]"}>
            <div className={"w-[338px] h-[389px] border rounded-[12px] flex flex-col justify-center items-center gap-[26px]"}>
                <h2>{price} NOK / Night</h2>
                <div className={"flex flex-col items-center"}>
                    <div className={"flex gap-2"}>
                        <div>
                            <div>Check in</div>
                            <DatePicker
                                selected={checkIn}
                                onChange={(date) => setCheckIn(date)}
                                dateFormat="dd/MM/yyyy"
                                className="border p-2 w-full rounded"
                            />
                        </div>
                        <div>
                            <div>Check out</div>
                            <DatePicker
                                selected={checkOut}
                                onChange={(date) => setCheckOut(date)}
                                dateFormat="dd/MM/yyyy"
                                className="border p-2 w-full rounded"
                            />
                        </div>
                    </div>
                    <div>guests</div>
                </div>
                <div className={"flex justify-between w-[119px]"}>
                    <p>Total</p>
                    <p>{totalPrice !== null ? `${totalPrice} NOK` : "N/A"}</p>
                </div>
                <button
                    onClick={onSubmit}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Book Now
                </button>
            </div>
            <div className={"w-[338px] h-[126px] border rounded-[12px]"}></div>
        </div>
    );
}
