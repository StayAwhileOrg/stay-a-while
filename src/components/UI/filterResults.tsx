import {useEffect, useState} from "react";
import {getCabins} from "../../hooks/api/ui/fetchCabins.tsx";
import {useLocation} from "react-router-dom";
import {CabinCard} from "../Cards/CabinCard.tsx";
import {Link} from "react-router-dom";

interface Location {
    city: string;
    country: string;
}

interface Image {
    imgURL: string;
}

interface Facilities {
    beds: number;
    capacity: number;
    petsAllowed?: boolean;
    smokingAllowed?: boolean;
    electricity?: boolean;
    water?: boolean;
    wifi?: boolean;
    jacuzzi?: boolean;
}

interface Cabin {
    _id: string;
    title: string;
    pricePerNight: number;
    location: Location;
    images: Image[];
    facilities: Facilities;
}

export function FilterResults() {
    const [cabins, setCabins] = useState<Cabin[]>([]);
    const [filteredCabins, setFilteredCabins] = useState<Cabin[]>([]);


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const queryLocation = searchParams.get("location") || "";
    const queryGuests = searchParams.get("guests") || "";

    const queryPets = searchParams.get("petsAllowed") === "true";
    const querySmoking = searchParams.get("smokingAllowed") === "true";
    const queryElectricity = searchParams.get("electricity") === "true";
    const queryWater = searchParams.get("water") === "true";
    const queryWifi = searchParams.get("wifi") === "true";
    const queryJacuzzi = searchParams.get("jacuzzi") === "true";

    useEffect(() => {
        getCabins()
            .then((data) => {
                const transformedData = data.map((cabin) => ({
                    ...cabin,
                    facilities: {
                        ...cabin.facilities,
                        capacity: cabin.facilities.capacity ?? 0, // Ensure capacity exists
                    },
                }));
                setCabins(transformedData);
            })
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
            const guests = parseInt(queryGuests);
            filtered = filtered.filter((cabin) => {
                const capacity = cabin.facilities?.capacity ?? 0;
                return capacity >= guests;
            });
        }

        if (queryPets) {
            filtered = filtered.filter((cabin) => cabin.facilities?.petsAllowed === true);
        }
        if (querySmoking) {
            filtered = filtered.filter((cabin) => cabin.facilities?.smokingAllowed === true);
        }
        if (queryElectricity) {
            filtered = filtered.filter((cabin) => cabin.facilities?.electricity === true);
        }
        if (queryWater) {
            filtered = filtered.filter((cabin) => cabin.facilities?.water === true);
        }
        if (queryWifi) {
            filtered = filtered.filter((cabin) => cabin.facilities?.wifi === true);
        }
        if (queryJacuzzi) {
            filtered = filtered.filter((cabin) => cabin.facilities?.jacuzzi === true);
        }

        setFilteredCabins(filtered);
    }, [
        queryLocation,
        queryGuests,
        queryPets,
        querySmoking,
        queryElectricity,
        queryWater,
        queryWifi,
        queryJacuzzi,
        cabins,
    ]);


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
                                smokingAllowed={cabin.facilities.smokingAllowed ?? false}
                                petsAllowed={cabin.facilities.petsAllowed ?? false}
                                wifi={cabin.facilities.wifi ?? false}
                                electricity={cabin.facilities.electricity ?? false} 
                                imageAlt={""} 
                                averageRating={0}                            />
                        </Link>
                    ))
                ) : (
                    <p>No cabins found matching your search.</p>
                )}
            </div>
        </>
    )
}