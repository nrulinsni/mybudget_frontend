import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

import ProfilePhotoUpload from '../../components/Settings/ProfilePhotoUpload';
import UpdateProfileForm from '../../components/Settings/UpdateProfileForm';
import ChangePasswordForm from '../../components/Settings/ChangePasswordForm';

const Settings = () => {
    useUserAuth();
    const { user, updateUser } = React.useContext(UserContext);

    const handleUpdateProfile = async (formData) => {
        try {
            const response = await axiosInstance.put(API_PATHS.USER.UPDATE_PROFILE, formData);
            toast.success("Profile updated successfully!");
            updateUser(response.data.user);
            window.location.reload(); // <-- TAMBAHKAN INI UNTUK REFRESH
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile.");
        }
    };

    const handleChangePassword = async ({ currentPassword, newPassword }) => {
        if (newPassword.length < 6) {
            return toast.error("New password must be at least 6 characters long.");
        }
        try {
            await axiosInstance.post(API_PATHS.USER.CHANGE_PASSWORD, { currentPassword, newPassword });
            toast.success("Password changed successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to change password.");
        }
    };

const handlePhotoUpload = async (file) => {
    const formData = new FormData();
    formData.append('photo', file);

    try {
        const response = await axiosInstance.post(API_PATHS.USER.UPLOAD_PHOTO, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success("Profile photo updated!");

        // Tambahkan string acak (timestamp) untuk "menipu" cache browser
        const imageUrlWithCacheBuster = `${response.data.imageUrl}?t=${new Date().getTime()}`;
        
        updateUser({ ...user, profileImageUrl: imageUrlWithCacheBuster });
        
        // Refresh halaman untuk memastikan semua komponen mendapat URL baru
        window.location.reload();

    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to upload photo.");
    }
};

    return (
        <DashboardLayout activeMenu="Settings">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8">
                <div className="lg:col-span-1 space-y-8">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center">
                            <h2 className="card-title text-primary">Profile Photo</h2>
                            <ProfilePhotoUpload user={user} onPhotoUpload={handlePhotoUpload} />
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary">Change Password</h2>
                            <ChangePasswordForm onChangePassword={handleChangePassword} />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-primary">Profile Information</h2>
                        <UpdateProfileForm user={user} onUpdate={handleUpdateProfile} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;