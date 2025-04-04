import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCabins } from '../hooks/api/ui/fetchCabins.tsx';
import { Link } from 'react-router-dom';
import { CabinCard } from '../components/Cards/CabinCard.tsx';
import { Pagination } from "../components/UI/Pagination.tsx";
import { Hero } from "../components/UI/Hero.tsx";

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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const navigate = useNavigate();

    const fetchCabins = (page: number) => {
        getCabins({ page: String(page), itemsPerPage: '10' })
            .then((data: { cabins: Cabin[]; pagination: { totalPages: number } }) => {
                setCabins(data.cabins); // Set the cabin data
                setTotalPages(data.pagination.totalPages);
            })
            .catch((error: unknown) => {
                console.error('Error getting cabins', error);
            });
    };

    useEffect(() => {
        document.title = 'Stay A While';

        const token = localStorage.getItem('token');
        if (token) {
            const justLoggedIn = localStorage.getItem('justLoggedIn');
            if (justLoggedIn === 'true') {
                localStorage.removeItem('justLoggedIn');
                window.location.reload();
            } else {
                fetchCabins(currentPage);
            }
        } else {
            fetchCabins(currentPage);
        }
    }, [navigate, currentPage]);

    return (
        <div>
            <Hero />
            <div className={'flex flex-wrap p-[74px] gap-[46px] justify-center'}>
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
                                jacuzzi={false}                            />
                        </Link>
                    ))
                    : 'loading'}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
}
