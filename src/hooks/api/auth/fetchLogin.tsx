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
        const user = {
            firstName: data.user.name.firstName,
            lastName: data.user.name.lastName,
            email: data.user.email,
            bio: data.user.bio,
            imgUrl: data.user.image.imgUrl,
            userId: data.user._id,
            averageRating: data.user.averageRating
        };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", data.token);
        window.location.reload();
        return data;
    }catch (error){
        console.error(error)
        throw error;
    }
}