import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchSingleCabin} from "../../hooks/api/ui/fetchSingleCabin.tsx";

export function RenderCabin() {
    const { id } = useParams();
    const [cabin, setCabin] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchCabin = async () => {
            try {
                const data = await fetchSingleCabin(id);
                setCabin(data);
            } catch (error) {
                console.error("Error fetching cabin:", error);
            }
        };

        fetchCabin();
    }, [id]);

    return (
        <div>
            <h1>Cabin Listing</h1>
            {cabin ?
                <div>
                    <h2>{cabin.title}</h2>
                    <img src={cabin.images[0].imgURL} alt=""/>
                </div>
                : <p>Loading...</p>}
        </div>
    );
}
