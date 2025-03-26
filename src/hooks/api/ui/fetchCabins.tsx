import {API_BASE} from "../../../utility/constants.tsx";

export async function getCabins(params){
    try {
        const searchParams = new URLSearchParams(params).toString();
        const res:Response = await fetch(`${API_BASE}/cabin?${searchParams}`);
        const data = await res.json();
        console.log(data)
        return data.data;
    }catch (error) {
        console.error("There was an error fetching cabins", error)
        throw error;
    }
}