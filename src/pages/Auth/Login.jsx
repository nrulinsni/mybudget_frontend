import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from "../../utils/helper";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            return setError("Please enter a valid email address.");
        }
        if (!password) {
            return setError("Please enter the password.");
        }
        setError(null);

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                updateUser(response.data.user);
                toast.success("Login successful!");
                navigate("/dashboard");
            }

        } catch (err) {
            // Bagian ini akan menangkap dan menampilkan SEMUA pesan error dari backend
            // termasuk pesan "Account is not active"
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <AuthLayout>
            <div className="flex flex-col justify-center h-full">
                <h3 className="text-2xl font-bold">Welcome Back</h3>
                <p className="text-base-content/70 mt-2 mb-8">
                    Please enter your details to login.
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="john@example.com"
                        type="text"
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                    />

                    {error && <p className="text-sm text-error mt-2">{error}</p>}
                    
                    <button type="submit" className="btn btn-primary w-full mt-6">
                        LOGIN
                    </button>
                    
                    <p className="text-sm text-center mt-4">
                        Don't have an account?{" "}
                        <Link className="font-medium text-primary hover:underline" to="/signup">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;