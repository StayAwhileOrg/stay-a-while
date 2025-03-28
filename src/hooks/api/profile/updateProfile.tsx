import { API_PROFILE } from '../../../utility/constants';

interface ProfileData {
    image?: {
        imgUrl?: string;
        imgAlt?: string;
    };
    bio?: string;
}

export async function updateProfile(profileData: ProfileData) {
    try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user.userId;

        if (!userId) {
            throw new Error('You need to be logged in to change the profile');
        }

        const payload: ProfileData = {
            ...(profileData.image?.imgUrl && {
                image: {
                    imgUrl: profileData.image.imgUrl,
                    imgAlt: profileData.image.imgAlt || 'Profile image',
                },
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
        console.log('Profile updated:', result);
        return result;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}
