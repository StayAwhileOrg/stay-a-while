import {API_REGISTER} from "../../../utility/constants.tsx";

export async function fetchRegister(firstName: string, lastName: string, email: string, password: string, phone: number, imgUrl: string, bio: string){
    try {
        const res:Response = await fetch(API_REGISTER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": { "firstName": firstName,  "lastName": lastName,},
                "email": email,
                "password": password,
                "phone": phone,
                "image": { "imgUrl": imgUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
                    "imgAlt": "Profile picture",
                },
                "bio": bio
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

        return data;
    }catch (error){
        console.error(error)
        throw error;
    }
}
