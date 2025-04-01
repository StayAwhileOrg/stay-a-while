import { API_PROFILE } from '../../../utility/constants';

interface ProfileData {
    image?: {
        imgUrl?: string;
    };
    bio?: string;
}

export async function updateProfile(profileData: ProfileData) {
    try {
        const userFromStorage = JSON.parse(
            localStorage.getItem('user') || '{}'
        );
        const userId = userFromStorage.userId;

        if (!userId) {
            throw new Error('You need to be logged in to change the profile');
        }

        const payload = {
            ...(profileData.image?.imgUrl && {
                'image.imgUrl': profileData.image.imgUrl,
            }),
            ...(profileData.bio && { bio: profileData.bio }),
        };

        const response = await fetch(`${API_PROFILE}${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update profile');
        }

        const result = await response.json();

        const oldUser = localStorage.getItem('user');
        let user = oldUser ? JSON.parse(oldUser) : {};
        user.imgUrl = result.profile.image.imgUrl;
        user.bio = result.profile.bio;
        localStorage.setItem('user', JSON.stringify(user));

        window.location.reload();

        return result;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}
