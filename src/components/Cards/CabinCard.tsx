export function CabinCard({image, imageAlt, title, city, country, price, capacity, beds, smokingAllowed, petsAllowed, jacuzzi, wifi}){
    return (
        <div className={"h-[407px] w-[280px] flex flex-col relative"}>
            <img src={image} alt={imageAlt} className={"h-[280px] w-[280px] object-cover rounded-[12px]"}/>
            <div className={"bg-white absolute left-[20px] top-[20px] h-[24px] w-[96px] text-sm rounded-[4px] flex items-center justify-center"}>
                Rating 2/5
            </div>
            <ul className={"max-w-[260px] flex gap-[20px] overflow-clip px-[10px] py-[8px]"}>
                <li className={"text-[10px] font-light"}>beds: {capacity}</li>
                <li className={"text-[10px] font-light"}>beds: {capacity}</li>
                {/*<li>Beds: {beds}</li>*/}
                {/*<li>Smoking: {smokingAllowed ? 'allowed' : 'not allowed'}</li>*/}
                {/*<li>Pets: {petsAllowed ? 'allowed' : 'not allowed'}</li>*/}
                {/*<li>Jacuzzi: {jacuzzi ? 'yes' : 'no'}</li>*/}
                {/*<li>WiFi: {wifi ? 'yes' : 'no'}</li>*/}
            </ul>
            <div className={"flex flex-col p-[10px] gap-[10px]"}>
                <p className={"text-[15px] font-light"}>{city}, {country}</p>
                <h2 className={"text-[24px] font-md"}>{title}</h2>
                <p className={"text-[20px]"}>{price} NOK</p>
            </div>
        </div>
    );
}