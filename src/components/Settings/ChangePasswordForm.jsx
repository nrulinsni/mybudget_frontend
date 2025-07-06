import React, { useState } from 'react';
import Input from '../Inputs/Input';

const ChangePasswordForm = ({ onChangePassword }) => {
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onChangePassword(passwords);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Current Password"
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleChange}
            />
            <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
            />
            <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">Change Password</button>
            </div>
        </form>
    );
};

export default ChangePasswordForm;