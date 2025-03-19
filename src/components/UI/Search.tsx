import {Calendar} from "./Calendar.tsx";

export function Search() {
    return (
        <form className={"flex gap-2 bg-white"}>
            <div className={"flex border-2 border-[#2D4B4880] rounded-full"}>
                <div className={"flex flex-col py-1 px-4 w-[220px]"}>
                    <label className={"text-xs text-[#2D4B4898] font-medium"}>Location</label>
                    <input className={"cursor-pointer outline-none text-sm text-[#2D4B48]"}
                           placeholder={"Select Location"} type="text"/>
                </div>
                <div className={"h-full w-[2px] bg-[#2D4B4880]"}></div>
                <div className={"flex flex-col py-1 px-4 w-[250px] justify-between relative"}>
                    <div className={"Search flex flex-row"}>
                        <div className={"flex flex-col"}>
                        <span className={"text-xs text-[#2D4B4898] font-medium"}>
                            Check In
                        </span>
                            <Calendar></Calendar>
                        </div>
                        <div className={"flex flex-col"}>
                            <span className={"text-xs text-[#2D4B4898] font-medium"}>Check Out</span>
                            <Calendar></Calendar>
                        </div>

                    </div>
                </div>
                <div className={"h-full w-[2px] bg-[#2D4B4880]"}></div>
                <div className={"flex flex-col py-1 px-4 w-[220px]"}>
                    <label className={"text-xs text-[#2D4B4898] font-medium"}>Guests</label>
                    <select className={"cursor-pointer outline-none text-sm text-[#2D4B48]"}
                            placeholder={"Select Amount of Guests"}>
                        <option disabled>Select amount of guests</option>
                        <option value="1">1 guest</option>
                        <option value="2">2 guests</option>
                        <option value="3">3 guests</option>
                        <option value="4">4 guests</option>
                        <option value="5">5 guests</option>
                        <option value="6">6 guests</option>
                        <option value="7">7 guests</option>
                        <option value="8">8 guests</option>
                    </select>
                </div>
            </div>
            <button className={"border-2 border-[#2D4B4880] rounded-full p-2 cursor-pointer text-[#2D4B48]"}>OK</button>
        </form>
    )
}