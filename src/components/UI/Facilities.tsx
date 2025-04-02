import {
    LiaBedSolid,
    LiaBoltSolid,
    LiaHotTubSolid,
    LiaPawSolid,
    LiaSmokingBanSolid,
    LiaSmokingSolid,
    LiaUserFriendsSolid,
    LiaWaterSolid,
    LiaWifiSolid
} from "react-icons/lia";

export function Facilities({beds, capacity, electricity, jacuzzi, petsAllowed, smokingAllowed, water, wifi}) {
    return(
        <div>
            <ul className="lg:w-[575px] w-[70vw] flex justify-center overflow-clip pt-[20px] flex-wrap gap-y-[16px] gap-x-[32px]">
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaBedSolid /> <span className="text-[10px]">{beds} Beds</span>
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaUserFriendsSolid /> <span className="text-[10px]">Capacity {capacity}</span>
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    {smokingAllowed ? (
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
                    {petsAllowed ? (
                        <span className="text-[10px]">Pets Allowed</span>
                    ) : (
                        <span className="text-[10px]">Pets Not Allowed</span>
                    )}
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaWaterSolid />
                    {water ? (
                        <span className="text-[10px]">Water Available</span>
                    ) : (
                        <span className="text-[10px]">No Water</span>
                    )}
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaWifiSolid />
                    {wifi ? (
                        <span className="text-[10px]">WiFi Available</span>
                    ) : (
                        <span className="text-[10px]">No WiFi</span>
                    )}
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaBoltSolid />
                    {electricity ? (
                        <span className="text-[10px]">Electricity Available</span>
                    ) : (
                        <span className="text-[10px]">No Electricity</span>
                    )}
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaHotTubSolid />
                    {jacuzzi ? (
                        <span className="text-[10px]">Jacuzzi Available</span>
                    ) : (
                        <span className="text-[10px]">No jacuzzi</span>
                    )}
                </li>
            </ul>
        </div>
    )
}
