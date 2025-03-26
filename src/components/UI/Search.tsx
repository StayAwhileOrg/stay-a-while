import {Calendar} from "./Calendar.tsx";
import {useRef, useEffect, useState} from "react";
import {getCabins} from "../../hooks/api/ui/fetchCabins.tsx";
import {useLocation, Link} from "react-router-dom";
import {IoFilterOutline} from "react-icons/io5";
import {CiSearch} from "react-icons/ci";
import {useClickOutside} from "../../hooks/useClickOutside/useClickOutside.tsx";


const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("sv-SE");
};

export function Search() {

    const filterDropdownRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(filterDropdownRef, () => setShowFilterDropdown(false));

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const initialQuery = searchParams.get("location") || "";
    const initialGuests = searchParams.get("guests") || "";

    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    const [cabins, setCabins] = useState([]);
    const [query, setQuery] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [guests, setGuests] = useState("");
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [filters, setFilters] = useState({
        petsAllowed: false,
        smokingAllowed: false,
        electricity: false,
        water: false,
        wifi: false,
        jacuzzi: false,
    });

    const filterOptions = [
        {key: "petsAllowed", label: "Pets Allowed"},
        {key: "smokingAllowed", label: "Smoking Allowed"},
        {key: "electricity", label: "Electricity"},
        {key: "water", label: "Water"},
        {key: "wifi", label: "Wifi"},
        {key: "jacuzzi", label: "Jacuzzi"},
    ];

    const buildSearchParams = () => {
        const params = new URLSearchParams();

        if (query) params.append("location", query);
        if (guests) params.append("guests", guests);
        if (checkInDate) params.append("checkInDate", formatDate(checkInDate));
        if (checkOutDate) params.append("checkOutDate", formatDate(checkOutDate));

        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, "true");
        });

        return `/filterResults/?${params.toString()}`;
    };


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
            setShowLocationDropdown(false);
            return;
        }

        const filtered = Array.isArray(cabins)
            ? cabins
                .filter(cabin => cabin.location?.city && cabin.location?.country)
                .map(cabin => `${cabin.location.city}, ${cabin.location.country}`)
                .filter(location => location.toLowerCase().includes(query.toLowerCase()))
            : [];

        setFilteredLocations(filtered);
        setShowLocationDropdown(filtered.length > 0);
    }, [query, cabins]);


    const handleSelectedLocation = (location) => {
        setQuery(location);
        setShowLocationDropdown(false);
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
                        onFocus={() => setShowLocationDropdown(true)}
                        onBlur={() => setTimeout(() => setShowLocationDropdown(false), 100)}
                    />
                    {showLocationDropdown && (
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
                    className="absolute flex flex-col right-80 top-full border border-[#2D4B4850] h-[200px] w-[300px] z-10 bg-white rounded-lg p-4 gap-4"
                >
                    <p className="text-gray-600">Filter</p>
                    <ul className="flex flex-wrap gap-4 items-center">
                        {filterOptions.map(({key, label}) => (
                            <li key={key} className="flex gap-2 cursor-pointer">
                                <input className={"cursor-pointer"}
                                    type="checkbox"
                                    checked={filters[key as keyof typeof filters]}
                                    onChange={(e) =>
                                        setFilters((prev) => ({...prev, [key]: e.target.checked}))
                                    }
                                />
                                <label>{label}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Link
                to={buildSearchParams()}>
                <button
                    type="button"
                    className={"bg-[#2D4B48] border-2 border-[#2D4B4880] rounded-full p-2 cursor-pointer hover:bg-[#2D4B4870]"}>
                    <CiSearch className={"h-[22px] w-[22px] text-white bg-transparent"}/>
                </button>
            </Link>
        </form>
    )
}