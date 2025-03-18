import {
    LiaBedSolid,
    LiaSmokingSolid,
    LiaSmokingBanSolid,
    LiaPawSolid,
    LiaWifiSolid,
    LiaBoltSolid,
    LiaCheckSolid,
    LiaBanSolid
} from "react-icons/lia";

export function CabinCard({image, imageAlt, title, city, country, price, beds, smokingAllowed, petsAllowed, wifi, electricity}){
    return (
        <div className={"h-[407px] w-[280px] flex flex-col relative"}>
            <img src={image} alt={imageAlt} className={"min-h-[280px] w-[280px] object-cover rounded-[12px]"}/>
            <div className={"bg-white absolute left-[20px] top-[20px] h-[24px] w-[96px] text-sm rounded-[4px] flex items-center justify-center"}>
                RatingPlaceholder
            </div>
            <ul className={"max-w-[260px] flex gap-[24px] overflow-clip px-[10px] py-[8px]"}>
                <li className={"text-[10px] font-light flex items-center gap-[4px]"}><LiaBedSolid /> {beds}</li>
                <li className={"text-[10px] font-light flex items-center gap-[4px]"}>{smokingAllowed ? <LiaSmokingSolid /> : <LiaSmokingBanSolid />}</li>
                <li className={"text-[10px] font-light flex items-center gap-[4px]"}><LiaPawSolid/>{petsAllowed ? <LiaCheckSolid /> : <LiaBanSolid />}</li>
                <li className={"text-[10px] font-light flex items-center gap-[4px]"}><LiaWifiSolid /> {wifi ? <LiaCheckSolid /> : <LiaBanSolid />}</li>
                <li className={"text-[10px] font-light flex items-center gap-[4px]"}><LiaBoltSolid />{electricity ? <LiaCheckSolid /> : <LiaBanSolid />}</li>
            </ul>
            <div className={"flex flex-col p-[10px] gap-[10px]"}>
                <p className={"text-[15px] font-light"}>{city}, {country}</p>
                <h2 className={"text-[24px] font-md"}>{title}</h2>
                <p className={"text-[20px]"}>{price} NOK</p>
            </div>
        </div>
    );
}