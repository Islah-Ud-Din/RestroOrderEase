'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Context
import { useUser } from '@/contexts/UserContext';

// Custom Hook
import useApi from '@/hooks/useApi';

interface LoginFormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const router = useRouter();
    const { setUser } = useUser();
    const { postMethod } = useApi();

    const [form, setForm] = useState<LoginFormValues>({ email: '', password: '' });
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const [data, setData] = useState<{ expenses: number; profit: number }[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setRemember(checked);
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
        setError('');
    };

    const validate = () => {
        if (!form.email) return 'Email is required';
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Invalid email format';
        if (!form.password) return 'Password is required';
        if (form.password.length < 6) return 'Password must be at least 6 characters';
        return '';
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            const response: { accessToken?: string; message?: string } = await postMethod('/api/login', {
                email: form.email,
                password: form.password,
            });

            if (response?.accessToken) {
                setUser(response.accessToken);
                localStorage.setItem('authToken', response.accessToken);
                router.push('/pages/dashboard');
            } else {
                setError(response?.message || 'Invalid login response.');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Generate random data only on the client
        const randomData = months.map(() => ({
            expenses: 60 + Math.random() * 30,
            profit: 40 + Math.random() * 40,
        }));
        setData(randomData);
    }, []);

    return (
        <div className="modern-login-page">
            <div className="login-container">
                {/* Left Side - Login Form */}
                <div className="login-form-section">
                    <div className="login-form-wrapper">
                        {/* Logo */}
                        <div className="logo-section">
                            <div className="logo-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9 22V12H15V22"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="logo-text">
                                <span className="logo-primary">Restaurant</span>
                                <span className="logo-secondary">Pay</span>
                            </div>
                        </div>

                        {/* Header */}
                        <div className="form-header">
                            <h1 className="form-title">Sign In</h1>
                            <p className="form-subtitle">Welcome back! Please enter your details</p>
                        </div>

                        {/* Form */}
                        <form className="login-form" onSubmit={handleLogin} autoComplete="off">
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
                                        placeholder="Enter your password"
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

                            {/* Remember and Forgot Password */}
                            <div className="form-options">
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" checked={remember} onChange={handleChange} className="checkbox-input" />
                                    <span className="checkbox-custom"></span>
                                    <span className="checkbox-label">Remember for 30 days</span>
                                </label>
                                <a href="#" className="forgot-password">
                                    Forgot password
                                </a>
                            </div>

                            {/* Error Message */}
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

                            {/* Sign In Button */}
                            <button className="btn-primary" type="submit" disabled={loading}>
                                {loading ? (
                                    <div className="loading-spinner">
                                        <div className="spinner"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign in'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="divider">
                                <span className="divider-text">OR</span>
                            </div>

                            {/* Social Login Buttons */}
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

                            {/* Sign Up Link */}
                            <div className="signup-link">
                                <span>Don't have an account?</span>
                                <a href="/pages/SignUp">Sign up</a>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side - Promotional Content */}
                <div className="login-promo-section">
                    <div className="promo-content">
                        <h2 className="promo-title">
                            Welcome back! Please sign in to your <span className="promo-highlight">Restaurant Pay</span> account
                        </h2>
                        <p className="promo-description">
                            Streamline your restaurant operations with our comprehensive management system. Track orders, manage inventory,
                            and grow your business with powerful analytics.
                        </p>

                        {/* Mock Dashboard Preview */}
                        <div className="dashboard-preview">
                            <div className="chart-container">
                                <div className="chart-header">
                                    <h4>Sales Report</h4>
                                    <div className="chart-legend">
                                        <span className="legend-item">
                                            <span className="legend-dot profit"></span>
                                            Profit
                                        </span>
                                        <span className="legend-item">
                                            <span className="legend-dot expenses"></span>
                                            Expenses
                                        </span>
                                    </div>
                                </div>
                                <div className="chart-bars">
                                    {months.map((month, index) => (
                                        <div key={month} className="chart-bar-group">
                                            <div className="bar-label">{month}</div>
                                            <div className="bars">
                                                <div
                                                    className="bar expenses"
                                                    style={{ height: data[index]?.expenses ? `${data[index].expenses}%` : 0 }}
                                                ></div>
                                                <div
                                                    className="bar profit"
                                                    style={{ height: data[index]?.profit ? `${data[index].profit}%` : 0 }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="categories-card">
                                <h4>Popular Categories</h4>
                                <div className="donut-chart">
                                    <div className="donut-ring">
                                        <div className="donut-hole">
                                            <span>Total Categories</span>
                                            <strong>248k</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="category-legend">
                                    <div className="category-item">
                                        <span className="category-dot mobile"></span>
                                        <span>Mobile</span>
                                    </div>
                                    <div className="category-item">
                                        <span className="category-dot laptop"></span>
                                        <span>Laptop</span>
                                    </div>
                                    <div className="category-item">
                                        <span className="category-dot electronics"></span>
                                        <span>Electronics</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
