import {useEffect, useState} from "react";
import {getCabins} from "../hooks/api/ui/fetchCabins.tsx";
import {Link} from "react-router-dom";
import {CabinCard} from "../components/Cards/CabinCard.tsx";

export function RenderHome(){
    const [cabins, setCabins] = useState([]);

    useEffect(() => {
        getCabins()
            .then((data) => {
                setCabins(data);
            })
            .catch((error) => {
                console.error("Error getting cabins")
            });
    },[]);

    return(
        <div className={"flex flex-wrap p-[74px] gap-[46px]"}>
            {cabins.length ? (
                cabins.map((cabin) => (
                   <Link to={"/cabin/" + cabin._id}
                   key={cabin._id}
                   >
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
            ): (
                "loading"
            )}
        </div>
    )
}