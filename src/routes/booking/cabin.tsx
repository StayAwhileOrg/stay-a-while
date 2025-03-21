import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleCabin } from "../../hooks/api/ui/fetchSingleCabin.tsx";
import {
    LiaBanSolid,
    LiaBedSolid,
    LiaBoltSolid,
    LiaCheckSolid,
    LiaPawSolid,
    LiaSmokingBanSolid,
    LiaSmokingSolid,
    LiaStar,
    LiaWifiSolid
} from "react-icons/lia";
import {BookingForm} from "../../components/forms/BookingForm.tsx";
import {Facilities} from "../../components/UI/Facilities.tsx";
export function RenderCabin() {
    const { id } = useParams();
    const [cabin, setCabin] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchCabin = async () => {
            try {
                const data = await fetchSingleCabin(id);
                setCabin(data);
            } catch (error) {
                console.error("Error fetching cabin:", error);
            }
        };

        fetchCabin();
    }, [id]);

    return (
        <div className={"w-screen flex justify-center pt-[120px]"}>
            {cabin ? (
                <div className={"flex gap-[61px]"}>
                    <div>
                        <img
                            src={cabin.images[0].imgURL}
                            alt=""
                            className={"w-[580px] h-[389px] object-cover rounded-[12px]"}
                        />
                        <div className={"flex justify-between max-w-[580px] pt-[44px] items-center"}>
                            <h2 className={"text-[36px] font-semibold"}>
                                {cabin.location.city}, {cabin.location.country}
                            </h2>
                            <div className={"flex"}>
                                <LiaStar />
                                <LiaStar />
                                <LiaStar />
                                <LiaStar />
                                <LiaStar />
                            </div>
                        </div>
                        <p className={"pt-[20px]"}>{cabin.description}</p>

                        <Facilities
                        beds={cabin.facilities.beds}
                        capacity={cabin.facilities.capacity}
                        electricity={cabin.facilities.electricity}
                        jacuzzi={cabin.facilities.jacuzzi}
                        petsAllowed={cabin.facilities.petsAllowed}
                        smokingAllowed={cabin.facilities.smokingAllowed}
                        water={cabin.facilities.water}
                        wifi={cabin.facilities.wifi}
                        />

                    </div>
                    <BookingForm
                        price={cabin.pricePerNight}
                        id={id}
                        ownerFirst={cabin.owner.name.firstName}
                        ownerLast={cabin.owner.name.lastName}
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}