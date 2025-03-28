import { JSX } from "react";
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
  } from "react-icons/lia";
  
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
  }: FacilitiesProps) {
    return (
      <div>
        <ul className="w-[575px] flex justify-between overflow-clip pt-[20px] flex-wrap gap-y-[16px] gap-x-[32px]">
          <FacilityItem icon={<LiaBedSolid />} label={`${beds} Beds`} />
          <FacilityItem icon={<LiaUserFriendsSolid />} label={`Capacity ${capacity}`} />
          <FacilityItem
            icon={smokingAllowed ? <LiaSmokingSolid /> : <LiaSmokingBanSolid />}
            label={smokingAllowed ? "Smoking Allowed" : "Smoking Not Allowed"}
          />
          <FacilityItem
            icon={<LiaPawSolid />}
            label={petsAllowed ? "Pets Allowed" : "Pets Not Allowed"}
          />
          <FacilityItem
            icon={<LiaWaterSolid />}
            label={water ? "Water Available" : "No Water"}
          />
          <FacilityItem
            icon={<LiaWifiSolid />}
            label={wifi ? "WiFi Available" : "No WiFi"}
          />
          <FacilityItem
            icon={<LiaBoltSolid />}
            label={electricity ? "Electricity Available" : "No Electricity"}
          />
          <FacilityItem
            icon={<LiaHotTubSolid />}
            label={jacuzzi ? "Jacuzzi Available" : "No Jacuzzi"}
          />
        </ul>
      </div>
    );
  }
  
  interface FacilityItemProps {
    icon: JSX.Element;
    label: string;
  }
  
  function FacilityItem({ icon, label }: FacilityItemProps) {
    return (
      <li className="text-[16px] font-light flex items-center gap-[4px]">
        {icon} <span className="text-[10px]">{label}</span>
      </li>
    );
  }
  