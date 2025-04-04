import {
    LiaBedSolid,
    LiaBoltSolid,
    LiaHotTubSolid,
    LiaPawSolid,
    LiaSmokingBanSolid,
    LiaSmokingSolid,
    LiaUserFriendsSolid,
    LiaWaterSolid,
    LiaWifiSolid,
} from 'react-icons/lia';

interface FacilitiesProps {
    beds: number;
    capacity: number;
    electricity: boolean;
    jacuzzi: boolean;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    water: boolean;
    wifi: boolean;
}

export function Facilities({
    beds,
    capacity,
    electricity,
    jacuzzi,
    petsAllowed,
    smokingAllowed,
    water,
    wifi,
}:FacilitiesProps) {
    return (
        <div>
            <ul className="lg:w-[575px] w-[70vw] grid grid-cols-3 lg:grid-cols-4 gap-x-[32px] gap-y-[16px] pt-[20px]">
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaBedSolid /> <span className="text-[10px]">{beds} Beds</span>
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaUserFriendsSolid /> <span className="text-[10px]">Capacity {capacity}</span>
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    {smokingAllowed ? (
                        <>
                            <LiaSmokingSolid /> <span className="text-[10px]">Smoking allowed</span>
                        </>
                    ) : (
                        <>
                            <LiaSmokingBanSolid /> <span className="text-[10px]">Not allowed</span>
                        </>
                    )}
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaPawSolid />
                    {petsAllowed ? <span className="text-[10px]">Pets Allowed</span> : <span className="text-[10px]">Pets Not Allowed</span>}
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaWaterSolid />
                    {water ? <span className="text-[10px]">Water</span> : <span className="text-[10px]">No Water</span>}
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaWifiSolid />
                    {wifi ? <span className="text-[10px]">WiFi</span> : <span className="text-[10px]">No WiFi</span>}
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaBoltSolid />
                    {electricity ? <span className="text-[10px]">Electricity</span> : <span className="text-[10px]">No Electricity</span>}
                </li>
                <li className="text-[16px] font-light flex items-center gap-[4px]">
                    <LiaHotTubSolid />
                    {jacuzzi ? <span className="text-[10px]">Jacuzzi</span> : <span className="text-[10px]">No Jacuzzi</span>}
                </li>
            </ul>

        </div>
    );
}
