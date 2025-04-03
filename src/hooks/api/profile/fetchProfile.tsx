import { API_PROFILE } from "../../../utility/constants.tsx";

export async function fetchProfile(){

    const userId: string | null = JSON.parse(localStorage.getItem("user") ?? "null")?.userId ?? null;

    if (!userId) {
        throw new Error("User ID not found in localStorage");
    }
    
    
    try {
        const res:Response = await fetch(`${API_PROFILE}${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })

        if (!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data =  await res.json();
        
        return data;
    }catch (error){
        console.error(error)
        throw error;
    }
}

