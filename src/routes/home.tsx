import {useEffect, useState} from "react";
import {getCabins} from "../api/fetchCabins.tsx";

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
        <>
            {cabins.length ? (
                cabins.map((cabin) => (
                    <div key={cabin._id}>
                        <h1>{cabin.location.city}, {cabin.location.country}</h1>
                    </div>
                ))
            ): (
                "loading"
            )}
        </>
    )
}