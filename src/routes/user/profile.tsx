import { useEffect, useState } from "react";
import { fetchProfile } from "../../hooks/api/profile/fetchProfile";
import { Profile } from "../../components/UI/Profile";

fetchProfile()

export function RenderProfile() {
    const [profile, setProfile] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await fetchProfile();                
                setProfile(data);
            } catch (err) {
                setError("Failed to load profile.");
                console.error(err);
            }
        }
        loadProfile();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Profile profile={profile} />
        </div>
    );
}