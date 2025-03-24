// hooks/api/post/postCabin.tsx
import {API_CABIN} from "../../../utility/constants.tsx";

interface CabinData {
    title: string;
    description: string;
    images: { imgURL: string; imgAlt: string }[];
    location: { street: string; city: string; postalCode: string; country: string };
    pricePerNight: number;
    facilities: {
        capacity: number;
        petsAllowed: boolean;
        smokingAllowed: boolean;
        electricity: boolean;
        water: boolean;
        wifi: boolean;
        jacuzzi: boolean;
        beds: number;
    };
    owner?: string;
}

export const createCabin = async (cabinData: CabinData) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.userId;

    const payload = {
        ...cabinData,
        owner: userId,
    };

    try {
        const response = await fetch(API_CABIN + userId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Failed to create cabin");
        }

        const result = await response.json();
        console.log("Cabin created:", result);
        return result;
    } catch (error) {
        console.error("Error creating cabin:", error);
        throw error;
    }
};