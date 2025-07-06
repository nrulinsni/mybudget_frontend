import React, { useState, useRef } from 'react';
import { LuCamera } from 'react-icons/lu';
import CharAvatar from '../Cards/CharAvatar';

const ProfilePhotoUpload = ({ user, onPhotoUpload }) => {
    const [preview, setPreview] = useState(user?.profileImageUrl || null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onPhotoUpload(file);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="avatar relative">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {preview ? (
                        <img src={preview} alt="Profile Preview" />
                    ) : (
                        <CharAvatar fullName={user?.fullName} style="text-4xl" />
                    )}
                </div>
                <button
                    className="btn btn-secondary btn-circle btn-sm absolute bottom-0 right-0"
                    onClick={() => fileInputRef.current.click()}
                >
                    <LuCamera />
                </button>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ProfilePhotoUpload;