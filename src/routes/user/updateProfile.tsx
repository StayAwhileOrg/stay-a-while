// containers/ProfileForm.tsx
import { useState } from 'react';
import { updateProfile } from '../../hooks/api/profile/updateProfile';
import ProfileFormComponent from '../../components/forms/ProfileForm';

interface ProfileFormData {
    image: {
        imgUrl: string;
        imgAlt: string;
    };
    bio: string;
}

const ProfileForm = () => {
    const [formData, setFormData] = useState<ProfileFormData>({
        image: {
            imgUrl: '',
            imgAlt: '',
        },
        bio: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name.startsWith('image.')) {
            const field = name.split('.')[1] as keyof ProfileFormData['image'];
            setFormData((prev) => ({
                ...prev,
                image: {
                    ...prev.image,
                    [field]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const result = await updateProfile(formData);
            setSuccess('Profile updated successfully!');
            setFormData({
                image: {
                    imgUrl: '',
                    imgAlt: '',
                },
                bio: '',
            });
            console.log('Profile update result:', result);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'An error occurred while updating the profile'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ProfileFormComponent
            formData={formData}
            isSubmitting={isSubmitting}
            error={error}
            success={success}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
};

export default ProfileForm;
