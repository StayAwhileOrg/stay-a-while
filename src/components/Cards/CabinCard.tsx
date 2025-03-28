import {
  LiaBedSolid,
  LiaSmokingSolid,
  LiaSmokingBanSolid,
  LiaPawSolid,
  LiaWifiSolid,
  LiaBoltSolid,
  LiaCheckSolid,
  LiaBanSolid,
} from 'react-icons/lia';
import {RatingComponent} from "../UI/RatingComponent.tsx";

type CabinCardProps = {
  image: string;
  imageAlt: string;
  title: string;
  city: string;
  country: string;
  price: number;
  beds: number;
  smokingAllowed: boolean;
  petsAllowed: boolean;
  wifi: boolean;
  electricity: boolean;
  averageRating: number;
};

export function CabinCard({
  image,
  imageAlt,
  title,
  city,
  country,
  price,
  beds,
  smokingAllowed,
  petsAllowed,
  wifi,
  electricity,
  averageRating,
}: CabinCardProps) {
  return (
    <div className={'h-[407px] w-[280px] flex flex-col relative'}>
      <img
        src={image}
        alt={imageAlt}
        className={'min-h-[280px] w-[280px] object-cover rounded-[12px]'}
      />
      <div
        className={
          'bg-white absolute left-[20px] top-[20px] h-[24px] w-[96px] text-sm rounded-[4px] flex items-center justify-center'
        }
      >
        <RatingComponent
            rating={averageRating}
            readOnly={true}
        />
      </div>
      <ul
        className={
          'max-w-[260px] flex gap-4 overflow-clip px-[10px] py-[8px]'
        }
      >
        <li className={'text-[14px] font-light flex items-center gap-[4px]'}>
          <LiaBedSolid /> {beds}
        </li>
        <li className={'text-[18px] font-light flex items-center gap-[2px]'}>
          {smokingAllowed ? <LiaSmokingSolid /> : <LiaSmokingBanSolid className={"text-red-900"} />}
        </li>
        <li className={'text-[20px] font-light flex items-center gap-[4px]'}>
          <LiaPawSolid />
          {petsAllowed ? <LiaCheckSolid className={"text-[14px] text-green-800"} /> : <LiaBanSolid className={"text-[14px] text-red-900"} />}
        </li>
        <li className={'text-[20px] font-light flex items-center gap-[2px]'}>
          <LiaWifiSolid /> {wifi ? <LiaCheckSolid className={"text-[14px] text-green-800"} /> : <LiaBanSolid className={"text-[14px] text-red-900"} />}
        </li>
        <li className={'text-[20px] font-light flex items-center gap-[2px]'}>
          <LiaBoltSolid />
          {electricity ? <LiaCheckSolid className={"text-[14px] text-green-800"} /> : <LiaBanSolid className={"text-[14px] text-red-900"} />}
        </li>
      </ul>
      <div className={'flex flex-col p-[10px] gap-[10px]'}>
        <p className={'text-[15px] font-light'}>
          {city}, {country}
        </p>
        <h2 className={'text-[24px] font-md'}>{title}</h2>
        <p className={'text-[20px]'}>{price} NOK</p>
      </div>
    </div>
  );
}
