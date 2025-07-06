import React, { useState, useEffect } from 'react';
import Input from '../Inputs/Input';

const UpdateProfileForm = ({ user, onUpdate }) => {
    const [formData, setFormData] = useState({ fullName: '', email: '', bio: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                bio: user.bio || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Full Name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
            />
            <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <div>
                <label className="label">
                    <span className="label-text">Bio</span>
                </label>
                <textarea
                    name="bio"
                    className="textarea textarea-bordered w-full"
                    placeholder="Tell us about yourself"
                    value={formData.bio}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
        </form>
    );
};

export default UpdateProfileForm;