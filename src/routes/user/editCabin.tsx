import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchSingleCabin } from '../../hooks/api/ui/fetchSingleCabin.tsx';
import { EditCabinForm } from '../../components/forms/EditCabinForm.tsx';

interface Cabin {
    _id: string;
    title: string;
    images: { _id?: string; imgURL: string; imgAlt?: string }[];
    location: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    description: string;
    pricePerNight: number;
    owner: { name: { firstName: string; lastName: string } };
    facilities: {
        beds: number;
        capacity: number;
        electricity: boolean;
        jacuzzi: boolean;
        petsAllowed: boolean;
        smokingAllowed: boolean;
        water: boolean;
        wifi: boolean;
    };
}

export function RenderEditCabin() {
    const { id } = useParams<{ id: string }>();
    const [cabin, setCabin] = useState<Cabin | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;

        const fetchCabin = async () => {
            try {
                setLoading(true);
                const data = (await fetchSingleCabin(id)) as Cabin;
                setCabin(data);
            } catch (error) {
                console.error('Error fetching cabin:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCabin();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!cabin) return <div>Cabin not found</div>;

    return <EditCabinForm cabin={cabin} />;
}
