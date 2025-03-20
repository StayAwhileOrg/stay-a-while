import {useEffect, useState} from "react";
import {getCabins} from "../../hooks/api/ui/fetchCabins.tsx";
import {useLocation} from "react-router-dom";
import {Search} from "./Search.tsx";

export function FilterResults () {

    const [cabins, setCabins] = useState([]);
    const [filteredCabins, setFilteredCabins] = useState([]);

    const location = useLocation();
    const searchParams= new URLSearchParams(location.search);
    const queryLocation = searchParams.get("location") || "";
    const queryGuests = searchParams.get("guests") || "";

    useEffect(() => {
        getCabins()
            .then((data) => setCabins(data))
            .catch((error) => console.error("Error getting cabins:", error));
    }, []);

    useEffect(() => {
        let filtered = cabins;

        if (queryLocation.trim()) {
            filtered = filtered.filter((cabin) =>
                `${cabin.location?.city}, ${cabin.location?.country}`
                    .toLowerCase()
                    .includes(queryLocation.toLowerCase())
            );
        }

        if (queryGuests) {
            filtered = filtered.filter((cabin) => cabin.maxGuests >= parseInt(queryGuests));
        }

        setFilteredCabins(filtered);
    }, [queryLocation, queryGuests, cabins]);

    return (
        <>
            <div>
                <h1>Search Results</h1>
                {filteredCabins.length > 0 ? (
                    filteredCabins.map((cabin) => (
                        <div key={cabin.id} className="border p-4 mb-2">
                            <h2>{cabin.name}</h2>
                            <p>{cabin.location.city}, {cabin.location.country}</p>
                            <p>Max Guests: {cabin.maxGuests}</p>
                        </div>
                    ))
                ) : (
                    <p>No cabins found matching your search.</p>
                )}
            </div>
        </>
    )
}