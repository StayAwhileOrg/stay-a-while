import {API_BASE} from "../../../utility/constants.tsx";

export async function getCabins (){
    try {
        const res:Response = await fetch(`${API_BASE}/cabin`);
        const data = await res.json();
        console.log(data)
        return data;
    }catch (error) {
        console.error("There was an error fetching cabins", error)
        throw error;
    }
}