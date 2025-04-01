import React from 'react';

interface ProfileFormData {
    image: {
        imgUrl: string;
    };
    bio: string;
}

interface ProfileFormComponentProps {
    formData: ProfileFormData;
    isSubmitting: boolean;
    error: string | null;
    success: string | null;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const ProfileFormComponent: React.FC<ProfileFormComponentProps> = ({
    formData,
    isSubmitting,
    error,
    success,
    onChange,
    onSubmit,
}) => {
    return (
        <div className="profile-form-container py-6">
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="form-group flex flex-col">
                    <label htmlFor="imageUrl" className="text-gray-600">
                        Profile Image URL
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="image.imgUrl"
                        value={formData.image.imgUrl}
                        onChange={onChange}
                        placeholder="Enter image URL"
                        className="form-input border p-2 w-full rounded"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group flex flex-col">
                    <label htmlFor="bio" className="text-gray-600">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={onChange}
                        placeholder="Tell us about yourself (max 400 characters)"
                        maxLength={400}
                        rows={4}
                        className="form-textarea border p-2 w-full rounded"
                        disabled={isSubmitting}
                    />
                    <small>{formData.bio.length}/400 characters</small>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button px-8 py-2 rounded-[12px] hover:bg-[#2D4B4870] hover:cursor-pointer bg-[#2D4B48] text-white">
                    {isSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default ProfileFormComponent;
