import {
  LiaBedSolid,
  LiaSmokingSolid,
  LiaPawSolid,
  LiaWifiSolid,
  LiaBoltSolid,
} from 'react-icons/lia';
import { RatingComponent } from "../UI/RatingComponent.tsx";

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
  jacuzzi: boolean;
  averageRating: number;
};

const capitalizeWords = (str: string): string => {
  if (!str) return str;
  return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
    <div className={'h-[407px] w-[280px] flex flex-col relative group'}>
      <div className={'w-[280px] h-[280px] overflow-hidden rounded-[12px]'}>
        <img
            src={image}
            alt={imageAlt}
            className={'min-h-[280px] w-[280px] object-cover transition-transform duration-300 group-hover:scale-105'}
        />
      </div>
      <div
        className={
          'bg-white/85 absolute left-[20px] top-[20px] h-[24px] px-[8px] w-[112px] text-sm rounded-[4px] flex items-center justify-center'
        }
      >
        <RatingComponent
            rating={averageRating}
            readOnly={true}
        />
      </div>
      <ul
        className={
          'max-w-[260px] flex overflow-clip px-[10px] py-[8px]'
        }
      >
        <li className={'text-[18px] font-light flex items-center mr-[16px]'}>
          <LiaBedSolid /> <div className={"text-[14px] pl-[6px]"}>{beds}</div>
        </li>
        <li className={"flex items-center"}>
          {smokingAllowed ? <LiaSmokingSolid className={'text-[18px] font-light flex items-center mr-[16px]'}/> : ""}
        </li>
        <li className={"flex items-center"}>
          {petsAllowed ?  <LiaPawSolid className={'text-[18px] font-light mr-[16px]'} /> : ""}
        </li>
        <li className={"flex items-center"}>
          {wifi ? <LiaWifiSolid className={'text-[18px] font-light flex items-center mr-[16px]'}/> : ""}
        </li>
        <li className={"flex items-center"}>
          {electricity ? <LiaBoltSolid className={'text-[18px] font-light flex items-center mr-[16px]'}/> : ""}
        </li>
      </ul>
      <div className={'flex flex-col p-[10px] gap-[10px] font-primary'}>
        <p className={'text-[15px] font-light'}>
          {capitalizeWords(city)}, {capitalizeWords(country)}
        </p>
        <h2 className={'text-[24px] font-bold truncate'}>{capitalizeWords(title)}</h2>
        <p className={'text-[20px]'}>{price} NOK</p>
      </div>
    </div>
  );
}
