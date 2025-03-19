import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchSingleCabin} from "../../hooks/api/ui/fetchSingleCabin.tsx";
import {
    LiaBanSolid,
    LiaBedSolid, LiaBoltSolid,
    LiaCheckSolid,
    LiaPawSolid,
    LiaSmokingBanSolid,
    LiaSmokingSolid,
    LiaStar, LiaWifiSolid
} from "react-icons/lia";

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
            {cabin ?
                <div className={"flex gap-[61px]"}>
                    <div>
                        <img src={cabin.images[0].imgURL} alt="" className={"w-[580px] h-[389px] object-cover rounded-[12px]"}/>
                        <div className={"flex justify-between max-w-[580px] pt-[44px] items-center"}>
                            <h2 className={"text-[36px] font-semibold"}>{cabin.location.city}, {cabin.location.country}</h2>
                            <div className={"flex"}><LiaStar /><LiaStar /><LiaStar /><LiaStar /><LiaStar /></div>
                        </div>
                        <p className={"pt-[20px]"}>{cabin.description}</p>

                        <div>
                            <ul className="w-[575px] flex justify-between overflow-clip pt-[20px] flex-wrap gap-[16px]">
                                <li className="text-[16px] font-light flex items-center gap-[4px]">
                                    <LiaBedSolid /> <span className="text-[10px]">{cabin.facilities.beds} Beds</span>
                                </li>

                                <li className="text-[16px] font-light flex items-center gap-[4px]">
                                    {cabin.facilities.smokingAllowed ? (
                                        <>
                                            <LiaSmokingSolid /> <span className="text-[10px]">Smoking Allowed</span>
                                        </>
                                    ) : (
                                        <>
                                            <LiaSmokingBanSolid /> <span className="text-[10px]">Smoking Not Allowed</span>
                                        </>
                                    )}
                                </li>

                                <li className="text-[16px] font-light flex items-center gap-[4px]">
                                    <LiaPawSolid />
                                    {cabin.facilities.petsAllowed ? (
                                        <span className="text-[10px]">Pets Allowed</span>
                                    ) : (
                                        <span className="text-[10px]">Pets Not Allowed</span>
                                    )}
                                </li>

                                <li className="text-[16px] font-light flex items-center gap-[4px]">
                                    <LiaWifiSolid />
                                    {cabin.facilities.wifi ? (
                                        <span className="text-[10px]">WiFi Available</span>
                                    ) : (
                                        <span className="text-[10px]">No WiFi</span>
                                    )}
                                </li>

                                <li className="text-[16px] font-light flex items-center gap-[4px]">
                                    <LiaBoltSolid />
                                    {cabin.facilities.electricity ? (
                                        <span className="text-[10px]">Electricity Available</span>
                                    ) : (
                                        <span className="text-[10px]">No Electricity</span>
                                    )}
                                </li>

                            </ul>
                        </div>


                    </div>
                    <div className={"flex flex-col gap-[44px]"}>
                        <div className={"w-[338px] h-[389px] border rounded-[12px]"}></div>
                        <div className={"w-[338px] h-[126px] border rounded-[12px]"}></div>
                    </div>
                </div>
                : <p>Loading...</p>}
        </div>
    );
}
