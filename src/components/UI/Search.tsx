import {Calendar} from "./Calendar.tsx";
import {useEffect, useState} from "react";
import {getCabins} from "../../hooks/api/ui/fetchCabins.tsx";
import {useLocation, Link} from "react-router-dom";
import { IoFilterOutline } from "react-icons/io5";

export function Search() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const initialQuery = searchParams.get("location") || "";
    const initialGuests = searchParams.get("guests") || "";

    const [cabins, setCabins] = useState([]);
    const [query, setQuery] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        getCabins()
            .then((data) => {
                setCabins(data);
            })
            .catch((error) => {
                console.error("Error getting cabins in Search:", error);
            });
    }, []);


    useEffect(() => {
        if (!query.trim()) {
            setShowDropdown(false);
            return;
        }

        const filtered = Array.isArray(cabins)
            ? cabins
                .filter(cabin => cabin.location?.city && cabin.location?.country)
                .map(cabin => `${cabin.location.city}, ${cabin.location.country}`)
                .filter(location => location.toLowerCase().includes(query.toLowerCase()))
            : [];

        setFilteredLocations(filtered);
        setShowDropdown(filtered.length > 0);
    }, [query, cabins]);


    const handleSelectedLocation = (location) => {
        setQuery(location);
        setShowDropdown(false);
    };

    return (
        <form className={"flex gap-2 items-center"}>
            <div className={"flex border-2 border-[#2D4B4880] rounded-full bg-white"}>
                <div className={" relative flex flex-col py-1 px-4 w-[220px]"}>
                    <label className={"text-xs text-[#2D4B4898] font-medium"}>Location</label>
                    <input
                        type="search"
                        id="search"
                        value={query}
                        autoComplete="off"
                        className="cursor-pointer outline-none text-sm text-[#2D4B48]"
                        placeholder="Select Location"
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                    />
                    {showDropdown && (
                        <ul className="absolute top-full right-0 w-full bg-white border border-[#2D4B4880] rounded-md shadow-md max-h-40 overflow-y-auto z-50">
                            {filteredLocations.map((location, index) => (
                                <li
                                key={index}
                                onClick={() => handleSelectedLocation(location)}
                                className={"p-2 cursor-pointer"}
                                >
                                    {location}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={"h-full w-[2px] bg-[#2D4B4880]"}></div>
                <div className={"flex flex-col py-1 px-4 w-[250px] justify-between relative"}>
                    <div className={"Search flex flex-row"}>
                        <div className={"flex flex-col"}>
                        <span className={"text-xs text-[#2D4B4898] font-medium"}>
                            Check In
                        </span>
                            <Calendar/>
                        </div>
                        <div className={"flex flex-col"}>
                            <span className={"text-xs text-[#2D4B4898] font-medium"}>Check Out</span>
                            <Calendar/>
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
                        <option value="9">9 guests</option>
                        <option value="10">10 guests</option>
                    </select>
                </div>
            </div>
            <Link to={`/filterResults/?location=${encodeURIComponent(query)}`}>
                <button
                    className={"bg-white border-2 border-[#2D4B4880] rounded-full p-2 cursor-pointer"}>
                    <IoFilterOutline />
                </button>
            </Link>
        </form>
    )
}