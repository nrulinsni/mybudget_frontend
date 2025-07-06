import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';
import { toast } from 'react-hot-toast';

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);

        if (!fullName) return setError("Please enter your name");
        if (!validateEmail(email)) return setError("Please enter a valid email address");
        if (!password || password.length < 6) return setError("Password must be at least 6 characters");

        const loadingToast = toast.loading("Creating your account...");
        
        try {
            let profileImageUrl = "";
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });
            
            toast.dismiss(loadingToast);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                updateUser(response.data.user);
                toast.success("Account created successfully!");
                navigate("/dashboard");
            }
        } catch (err) {
            toast.dismiss(loadingToast);
            const errorMessage = err.response?.data?.message || "An error occurred.";
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <AuthLayout>
            <div className="flex flex-col justify-center h-full">
                <h3 className="text-2xl font-bold">Create An Account</h3>
                <p className="text-base-content/70 mt-2 mb-6">
                    Join us today by entering your details below.
                </p>
                <form onSubmit={handleSignup} className="space-y-4">
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    <Input value={fullName} onChange={({ target }) => setFullName(target.value)} label="Full Name" type="text" />
                    <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" type="text" />
                    <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" type="password" />

                    {error && <p className="text-sm text-error mt-2">{error}</p>}
                    
                    <button type="submit" className="btn btn-primary w-full mt-4">
                        SIGN UP
                    </button>
                    
                    <p className="text-sm text-center pt-2">
                        Already have an account?{" "}
                        <Link className="font-medium text-primary hover:underline" to="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUp;