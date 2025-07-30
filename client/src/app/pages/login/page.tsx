'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { Form, Input, Button, Typography, message, Checkbox } from 'antd';

// Context
import { useUser } from '@/contexts/UserContext';

// Custom Hook
import useApi from '@/hooks/useApi';
import RippleEffect from '@/lib/RippleEffect';

// Assets
// import MainMockup from '@/public/file.svg';
// import Logo from '@/public/vercel.svg';

// const { Title, Link } = Typography;

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
    

    return (
        <div className="signup-page">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 signup-left mb-5 mb-lg-0" style={{ paddingRight: '40px' }}>
                        <div className="sl-logo d-flex align-items-center mb-3">
                            {/* <Image className="img-fluid" src={Logo} alt="Logo" width={40} height={40} /> */}
                            <h3 style={{ marginLeft: '10px' }}>TravelSol</h3>
                        </div>
                        <h2 className="mb-5">Your place to work, Plan, Create, Control</h2>
                        {/* <Image className="img-fluid" src={MainMockup} alt="Main" width={500} height={500} /> */}
                    </div>
                    <div className="col-lg-6 login-content" style={{ paddingLeft: '40px', maxWidth: '500px', width: '100%' }}>
                        <h4 className="text-center mb-4">Login to Your Account</h4>
                        <form className="login-form" onSubmit={handleLogin} autoComplete="off">
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="youremail@gmail.com"
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
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <div className="form-group form-check" style={{ marginBottom: 16 }}>
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    checked={remember}
                                    onChange={handleChange}
                                    className="form-check-input"
                                />
                                <label htmlFor="remember" className="form-check-label">
                                    Remember me
                                </label>
                            </div>

                            <button className="btn btn-primary btn-block" type="submit">Login</button>

                            {error && (
                                <div className="error-message" style={{ color: 'red', marginTop: 10 }}>
                                    {error}
                                </div>
                            )}
                        </form>
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <a href="/pages/SignUp">Don’t have an account? Sign up here.</a>
                        </div>
                        <p style={{ marginTop: '20px', textAlign: 'center' }}>
                            <strong>Login</strong> with Others
                        </p>
                        <div style={{ marginTop: 16, maxWidth: 400, marginInline: 'auto' }}>
                            <button
                                className="btn btn-outline-primary btn-block"
                                style={{ marginBottom: 8 }}
                                type="button"
                                onClick={() => console.log('Google Login')}
                            >
                                Login with Google
                            </button>
                            <button
                                className="btn btn-outline-primary btn-block"
                                type="button"
                                onClick={() => console.log('Facebook Login')}
                            >
                                Login with Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
