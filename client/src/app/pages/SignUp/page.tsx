'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import MainMockup from '@/public/file.svg';
// import Logo from '@/public/vercel.svg';
import useApi from '@/hooks/useApi';

const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    country: '',
};

const SignUpPage = () => {
    const router = useRouter();
    const [form, setForm] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const { data, postMethod } = useApi();

    // Basic validation
    const validate = () => {
        if (!form.firstName) return 'First Name is required';
        if (!form.lastName) return 'Last Name is required';
        if (!form.email) return 'Email is required';
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Invalid email address';
        if (!form.password) return 'Password is required';
        if (form.password.length < 6) return 'Password must be at least 6 characters';
        if (!form.confirm) return 'Please confirm your password';
        if (form.password !== form.confirm) return 'Passwords do not match';
        if (!form.country) return 'Country is required';
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        setLoading(true);
        setUserEmail(form.email);
        try {
            await postMethod('http://localhost:3670/api/register', {
                email: form.email,
                password: form.password,
                username: form.email, // or use another field if you have username
                firstName: form.firstName,
                lastName: form.lastName,
                country: form.country,
            });
            if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
                setSuccess(data.message);
                setShowOtpModal(true);
                // router.push('/pages/login');
            } else {
                setSuccess('Registration successful!');
            }
            setForm(initialFormState);
        } catch (error) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 signup-left">
                        <div className="sl-logo d-flex ">
                            {/* <Image className="img-fluid" src={Logo} alt="Main" width={40} height={40} /> */}
                            <h3>TravelSol</h3>
                        </div>
                        <h2 className="mb-5">Your place to work, Plan, Create, Control</h2>
                        {/* <Image className="img-fluid" src={MainMockup} alt="Main" width={500} height={500} /> */}
                    </div>
                    <div className="col-lg-5 offset-lg-1  signup-right">
                        <div className="flex items-center justify-center min-h-screen">
                            <form onSubmit={handleSubmit} className="signup-form" style={{ maxWidth: 430, width: '100%' }}>
                                <h3 className="text-center mb-6">Create a New Account</h3>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="First Name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirm">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirm"
                                        name="confirm"
                                        value={form.confirm}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">Country</label>
                                    <select
                                        id="country"
                                        name="country"
                                        value={form.country}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    >
                                        <option value="">Select your country</option>
                                        <option value="USA">USA</option>
                                        <option value="India">India</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="UK">UK</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                                {error && <div className="error-message" style={{ color: 'red', marginTop: 10 }}>{error}</div>}
                                {success && <div className="success-message" style={{ color: 'green', marginTop: 10 }}>{success}</div>}
                            </form>
                            {/*
                            <VerifyOtp visible={showOtpModal} onClose={() => setShowOtpModal(false)} email={userEmail} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
