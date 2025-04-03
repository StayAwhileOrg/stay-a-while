import { API_RATE } from "../../../utility/constants.tsx";

export async function postRating(cabinId: string, rating: number): Promise<any> {
    const res = await fetch(`${API_RATE}${cabinId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token") || ''}`,
        },
        body: JSON.stringify({ rating }),
    });

    if (!res.ok) {
        throw new Error("Failed to submit rating");
    }

    const result = await res.json();
    return result;
}