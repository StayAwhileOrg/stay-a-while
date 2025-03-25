import {Calendar} from "./Calendar.tsx";
import { useRef, useEffect, useState } from "react";
import {getCabins} from "../../hooks/api/ui/fetchCabins.tsx";
import {useLocation, Link} from "react-router-dom";
import {IoFilterOutline} from "react-icons/io5";
import {CiSearch} from "react-icons/ci";

const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("sv-SE");
};

export function Search() {

    const filterDropdownRef = useRef(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const initialQuery = searchParams.get("location") || "";
    const initialGuests = searchParams.get("guests") || "";

    const [showMenuDropdown, setShowMenuDropdown] = useState(false);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    const [cabins, setCabins] = useState([]);
    const [query, setQuery] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [guests, setGuests] = useState("");
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [petsAllowed, setPetsAllowed] = useState(false);
    const [smokingAllowed, setSmokingAllowed] = useState(false);
    const [electricity, setElectricity] = useState(false);
    const [water, setWater] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [jacuzzi, setJacuzzi] = useState(false);

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
            setShowMenuDropdown(false);
            return;
        }

        const filtered = Array.isArray(cabins)
            ? cabins
                .filter(cabin => cabin.location?.city && cabin.location?.country)
                .map(cabin => `${cabin.location.city}, ${cabin.location.country}`)
                .filter(location => location.toLowerCase().includes(query.toLowerCase()))
            : [];

        setFilteredLocations(filtered);
        setShowMenuDropdown(filtered.length > 0);
    }, [query, cabins]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setShowFilterDropdown(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleSelectedLocation = (location) => {
        setQuery(location);
        setShowMenuDropdown(false);
    };

    return (
        <form className={"flex gap-2 items-center"}>
            <div className={"flex border-2 border-[#2D4B4880] rounded-full bg-white px-2"}>
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
                        onFocus={() => setShowMenuDropdown(true)}
                        onBlur={() => setTimeout(() => setShowMenuDropdown(false), 100)}
                    />
                    {showMenuDropdown && (
                        <ul className="absolute top-full -right-3 w-full bg-white border border-[#2D4B4880] rounded-md shadow-md max-h-40 overflow-y-auto z-50">
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
                    <div className={"Search flex flex-row gap-2 justify-between"}>
                        <div className={"flex flex-col"}>
                        <span className={"text-xs text-[#2D4B4898] font-medium"}>
                            Check In
                        </span>
                            <Calendar value={checkInDate} onChange={setCheckInDate}/>
                        </div>
                        <div className={"flex flex-col"}>
                            <span className={"text-xs text-[#2D4B4898] font-medium"}>Check Out</span>
                            <Calendar value={checkOutDate} onChange={setCheckOutDate}/>
                        </div>
                    </div>
                </div>
                <div className={"h-full w-[2px] bg-[#2D4B4880]"}></div>
                <div className={"flex flex-col py-1 px-4 w-[220px]"}>
                    <label className={"text-xs text-[#2D4B4898] font-medium"}>Guests</label>
                    <select className={"cursor-pointer outline-none text-sm text-[#2D4B48]"}
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
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
                        <option value="10">10+ guests</option>
                    </select>
                </div>
            </div>
            <button
                type={"button"}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={"bg-white border-2 border-[#2D4B4880] rounded-full p-2 cursor-pointer relative"}>
                <IoFilterOutline className={"h-[22px] w-[22px]"}/>
            </button>
            {showFilterDropdown && (
                <div
                    ref={filterDropdownRef}
                    className={"absolute flex flex-col top-full right-80 border border-[#2D4B4850] h-[200px] w-[300px] z-10 bg-white rounded-lg p-6 gap-4"}>
                    <p className={"text-gray-600"}>Filter</p>
                    <ul className={"flex flex-wrap gap-4 items-center "}>
                        <li className={"flex gap-2 cursor-pointer"}>
                            <input type="checkbox" checked={petsAllowed} onChange={(e) => setPetsAllowed(e.target.checked)} />
                            <label>Pets Allowed</label>
                        </li>
                        <li className={"flex gap-2"}>
                            <input type="checkbox" checked={smokingAllowed} onChange={(e) => setSmokingAllowed(e.target.checked)} />
                            <label>Smoking Allowed</label>
                        </li>
                        <li className={"flex gap-2"}>
                            <input type="checkbox" checked={water} onChange={(e) => setWater(e.target.checked)} />
                            <label>Water</label>
                        </li>
                        <li className={"flex gap-2"}>
                            <input type="checkbox" checked={electricity} onChange={(e) => setElectricity(e.target.checked)} />
                            <label>Electricity</label>
                        </li>
                        <li className={"flex gap-2"}>
                            <input type="checkbox" checked={wifi} onChange={(e) => setWifi(e.target.checked)} />
                            <label>Wifi</label>
                        </li>
                        <li className={"flex gap-2"}>
                            <input type="checkbox" checked={jacuzzi} onChange={(e) => setJacuzzi(e.target.checked)} />
                            <label>Jacuzzi</label>
                        </li>
                    </ul>
                </div>
            )}
            <Link
                to={`/filterResults/?location=${encodeURIComponent(query)}&guests=${guests}&checkInDate=${formatDate(checkInDate)}&checkOutDate=${formatDate(checkOutDate)}&petsAllowed=${petsAllowed}&smokingAllowed=${smokingAllowed}&electricity=${electricity}&water=${water}&wifi=${wifi}&jacuzzi=${jacuzzi}`}>
                <button
                    type="button"
                    className={"bg-[#2D4B48] border-2 border-[#2D4B4880] rounded-full p-2 cursor-pointer hover:bg-[#2D4B4870]"}>
                    <CiSearch className={"h-[22px] w-[22px] text-white bg-transparent"}/>
                </button>
            </Link>
        </form>
    )
}