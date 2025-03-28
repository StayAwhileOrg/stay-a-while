import React from 'react';

interface ProfileFormData {
    image: {
        imgUrl: string;
        imgAlt: string;
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
        <div className="profile-form-container">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="imageUrl">Profile Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="image.imgUrl"
                        value={formData.image.imgUrl}
                        onChange={onChange}
                        placeholder="Enter image URL"
                        className="form-input border"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageAlt">Image Alt Text</label>
                    <input
                        type="text"
                        id="imageAlt"
                        name="image.imgAlt"
                        value={formData.image.imgAlt}
                        onChange={onChange}
                        placeholder="Enter image description"
                        className="form-input border"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={onChange}
                        placeholder="Tell us about yourself (max 400 characters)"
                        maxLength={400}
                        rows={4}
                        className="form-textarea border"
                        disabled={isSubmitting}
                    />
                    <small>{formData.bio.length}/400 characters</small>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button">
                    {isSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default ProfileFormComponent;
