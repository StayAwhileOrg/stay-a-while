import { useEffect, useState } from 'react';
import { getCabins } from '../hooks/api/ui/fetchCabins.tsx';
import { Link } from 'react-router-dom';
import { CabinCard } from '../components/Cards/CabinCard.tsx';

type Cabin = {
  _id: string;
  title: string;
  pricePerNight: number;
  location: {
    city: string;
    country: string;
  };
  images: {
    imgURL: string;
    imgAlt?: string;
  }[];
  facilities: {
    beds: number;
    smokingAllowed: boolean;
    petsAllowed: boolean;
    wifi: boolean;
    electricity: boolean;
  };
};

export function RenderHome() {
  const [cabins, setCabins] = useState<Cabin[]>([]);

  useEffect(() => {
    getCabins()
      .then((data: unknown) => {
        setCabins(data as Cabin[]);
      })
      .catch((error: unknown) => {
        console.error('Error getting cabins', error);
      });
  }, []);

  return (
    <div className={'flex flex-wrap p-[74px] gap-[46px]'}>
      {cabins.length
        ? cabins.map((cabin) => (
            <Link to={'/cabin/' + cabin._id} key={cabin._id}>
              <CabinCard
                beds={cabin.facilities.beds}
                image={cabin.images[0].imgURL}
                city={cabin.location.city}
                country={cabin.location.country}
                title={cabin.title}
                price={cabin.pricePerNight}
                smokingAllowed={cabin.facilities.smokingAllowed}
                petsAllowed={cabin.facilities.petsAllowed}
                wifi={cabin.facilities.wifi}
                electricity={cabin.facilities.electricity}
                imageAlt={cabin.images[0].imgAlt || ''}
              />
            </Link>
          ))
        : 'loading'}
    </div>
  );
}
