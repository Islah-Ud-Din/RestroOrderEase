'use client';
import React, { useState, useEffect } from 'react';

// Navigation
import { useRouter } from 'next/navigation';

// icons
import { UtensilsCrossed } from 'lucide-react';

// CustomHooks
import useApi from '@/hooks/useApi';

// Components
import VerifyOtp from '@/components/verify/VerifyOtp';

const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    country: '',
    role: '',
};

const SignUpPage = () => {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false);
    const [form, setForm] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            await postMethod('/api/signup', {
                email: form.email,
                password: form.password,
                username: form.email,
                firstName: form.firstName,
                lastName: form.lastName,
                country: form.country,
                role: form.role,
            });
            if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
                setSuccess(data.message);
                setShowOtpModal(true);
            } else {
                setSuccess('Registration successful!');
                setShowOtpModal(true);
            }
            setForm(initialFormState);
        } catch (error) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpVerified = (success: boolean) => {
        console.log('handleOtpVerified called with:', success);
        if (success) {
            setSuccess('Email verified successfully!');
            setShowOtpModal(false);
            setIsVerified(true);
            router.push('/pages/login');
        } else {
            setError('Verification failed. Please try again.');
        }
    };

    useEffect(() => {
        if (isVerified) {
            setShowOtpModal(false);
            const timeout = setTimeout(() => {
                router.push('/pages/login');
            }, 300);

            return () => clearTimeout(timeout);
        }
    }, [isVerified, router]);

    return (
        <div className="modern-signup-page">
            <div className="signup-container">
                {/* Left Side - Promotional Content */}
                <div className="signup-promo-section">
                    <div className="promo-content">
                        <div className="logo-section">
                            <div className="logo-icon">
                                <UtensilsCrossed />
                            </div>
                            <div className="logo-text">
                                <span className="logo-primary">RestaurantHub</span>
                            </div>
                        </div>

                        <h2 className="promo-title">Your place to work, Plan, Create, Control</h2>
                        <p className="promo-description">
                            Join thousands of restaurants already using our platform to streamline their operations, manage orders
                            efficiently, and grow their business with powerful analytics and insights.
                        </p>

                        {/* Feature Highlights */}
                        <div className="feature-highlights">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M9 12L11 14L15 10"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </div>
                                <div className="feature-text">
                                    <h4>Easy Order Management</h4>
                                    <p>Streamline your order process with our intuitive interface</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M12 2L2 7L12 12L22 7L12 2Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M2 17L12 22L22 17"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M2 12L12 17L22 12"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div className="feature-text">
                                    <h4>Inventory Tracking</h4>
                                    <p>Keep track of your stock levels in real-time</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M13.73 21A2 2 0 0 1 12 23A2 2 0 0 1 10.27 21"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div className="feature-text">
                                    <h4>Analytics & Reports</h4>
                                    <p>Get insights into your business performance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="signup-form-section">
                    <div className="signup-form-wrapper">
                        {/* Header */}
                        <div className="form-header">
                            <h1 className="form-title">Create a New Account</h1>
                            <p className="form-subtitle">Join us and start managing your restaurant efficiently</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="signup-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName" className="form-label">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="First Name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName" className="form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Create a password"
                                        required
                                    />
                                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2 17 2 12C2 7 7 4 12 4C17 4 22 7 22 12C22 17 20.94 17.94 17.94 17.94Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M2 2L22 22"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm" className="form-label">
                                    Confirm Password
                                </label>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirm"
                                        name="confirm"
                                        value={form.confirm}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2 17 2 12C2 7 7 4 12 4C17 4 22 7 22 12C22 17 20.94 17.94 17.94 17.94Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M2 2L22 22"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="country" className="form-label">
                                    Country
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                >
                                    <option value="">Select your country</option>
                                    <option value="USA">USA</option>
                                    <option value="India">India</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="UK">UK</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="France">France</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="role" className="form-label">
                                    Role
                                </label>
                                <select id="role" name="role" value={form.role} onChange={handleChange} className="form-input" required>
                                    <option value="">Select your role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            {/* Error and Success Messages */}
                            {error && (
                                <div className="error-message">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                        <path
                                            d="M15 9L9 15"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9 9L15 15"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="success-message">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M22 11.08V12A10 10 0 1 1 5.68 3.57"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M22 4L12 14.01L9 11.01"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    {success}
                                </div>
                            )}

                            {/* Sign Up Button */}
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? (
                                    <div className="loading-spinner">
                                        <div className="spinner"></div>
                                        Creating account...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="divider">
                                <span className="divider-text">OR</span>
                            </div>

                            {/* Social Signup Buttons */}
                            <div className="social-login">
                                <button type="button" className="btn-social btn-google">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Sign up with Google
                                </button>
                                <button type="button" className="btn-social btn-facebook">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Sign up with Facebook
                                </button>
                            </div>

                            {/* Login Link */}
                            <div className="login-link">
                                <span>Already have an account?</span>
                                <a href="/pages/login">Sign in</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* OTP Verification Modal */}
            <VerifyOtp visible={showOtpModal} onClose={() => setShowOtpModal(false)} email={userEmail} onVerified={handleOtpVerified} />
        </div>
    );
};

export default SignUpPage;
