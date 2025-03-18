import {API_LOGIN} from "../../../utility/constants.tsx";

export async function fetchLogin(email: string, password: string){
    try {
        const res:Response = await fetch(API_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })

        if (!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data =  await res.json();
        console.log(data)
        return data;
    }catch (error){
        console.error(error)
        throw error;
    }
}