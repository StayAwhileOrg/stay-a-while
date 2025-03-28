import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCabins } from '../hooks/api/ui/fetchCabins.tsx';
import { Link } from 'react-router-dom';
import { CabinCard } from '../components/Cards/CabinCard.tsx';

type Cabin = {
  _id: string;
  title: string;
  pricePerNight: number;
  averageRating: number;
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
  const navigate = useNavigate();

  const fetchCabins = () => {
      getCabins()
          .then((data: unknown) => {
              setCabins(data as Cabin[]);
          })
          .catch((error: unknown) => {
              console.error('Error getting cabins', error);
          });
  };

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          const justLoggedIn = localStorage.getItem('justLoggedIn');
          if (justLoggedIn === 'true') {
              localStorage.removeItem('justLoggedIn');
              window.location.reload();
          } else {
              fetchCabins();
          }
      } else {
          fetchCabins();
      }
  }, [navigate]);

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
                averageRating={cabin.averageRating}
              />
            </Link>
          ))
        : 'loading'}
    </div>
  );
}
