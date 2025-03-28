import {API_CABIN} from "../../../utility/constants.tsx";

export async function deleteCabin(cabinId){
    const token = localStorage.getItem("token")

    const res = await fetch(API_CABIN + cabinId,{
       method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

    });
    const data = await res.json();
    return data;
}