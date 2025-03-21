import {useEffect, useState} from "react";
import {getCabins} from "../../hooks/api/ui/fetchCabins.tsx";
import {useLocation} from "react-router-dom";
import {CabinCard} from "../Cards/CabinCard.tsx";
import {Link} from "react-router-dom";

export function FilterResults() {

    const [cabins, setCabins] = useState([]);
    const [filteredCabins, setFilteredCabins] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
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
            <div className={"flex flex-col items-center gap-4 font-primary mt-[74px]"}>
                <h1 className={"text-2xl font-medium"}>Filter Results for <span
                    className={"font-bold"}>{queryLocation}</span></h1>
                <div className={"text-gray-500 font-medium"}>Filter results: <span
                    className={"font-medium text-gray-600"}>{filteredCabins.length}</span></div>
            </div>
            <div className={"flex flex-wrap p-[74px] gap-[46px] items-center justify-center"}>
                {filteredCabins.length > 0 ? (
                    filteredCabins.map((cabin) => (
                        <Link to={"/cabin/" + cabin._id} key={cabin._id}>
                            <CabinCard
                                beds={cabin.facilities.beds}
                                image={cabin.images[0].imgURL}
                                city={cabin.location.city}
                                country={cabin.location.country}
                                title={cabin.title}
                                price={cabin.pricePerNight}
                                smokingAllowed={cabin.facilities.smokingAllowed}
                                petsAllowed={cabin.facilities.petsAllowed}
                                wifi={cabin.facilities.wifi}
                                electricity={cabin.facilities.electricity}
                            />
                        </Link>
                    ))
                ) : (
                    <p>No cabins found matching your search.</p>
                )}
            </div>
        </>
    )
}