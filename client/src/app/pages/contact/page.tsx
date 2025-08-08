'use client';

import { useState, useEffect } from 'react';
import GoogleMapComponent from '@/components/GoogleMap/GoogleMap';

// Lib
import RippleEffect from '@/lib/RippleEffect';
// icons
import { MdPayment } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineFileText, AiOutlineTable } from 'react-icons/ai';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { BiArrowFromLeft, BiArrowFromRight } from 'react-icons/bi';
import { IoWatchOutline } from 'react-icons/io5';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '', company: '', phone: '', subject: '' });
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [location, setLocation] = useState<string>('Fetching location...');
    const [locationError, setLocationError] = useState<string>('');
    const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(null);

    // IMPORTANT: Move API keys to environment variables (.env.local) for security
    const GOOGLE_API_KEY = 'AIzaSyAuIR2zgDpOIjcAS3DlQ31HjbQHeloSd_I';
    const OPENCAGE_API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY || '';

    const handleMapPick = async (lat: number, lng: number) => {
        setLatlng({ lat, lng });
        setLocation('Fetching location...');
        setLocationError('');
        try {
            const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}`);
            const data = await res.json();
            if (data.results && data.results.length > 0) {
                const components = data.results[0].components || {};
                const city = components.city || components.town || components.village || '';
                const state = components.state || '';
                const country = components.country || '';
                setLocation(`${city}${city ? ', ' : ''}${state}${state ? ', ' : ''}${country}`);
            } else {
                throw new Error('No results found');
            }
        } catch {
            setLocationError('Failed to fetch location details.');
            setLocation('Location unavailable');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, location: locationError ? 'Location denied' : location }),
            });
            if (res.ok) {
                setStatus('Message sent successfully!');
                setForm({ name: '', email: '', message: '', company: '', phone: '', subject: '' });
            } else {
                const errorData = await res.json();
                setStatus(errorData.message || 'Failed to send message. Please try again.');
            }
        } catch {
            setStatus('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    handleMapPick(latitude, longitude);
                },
                () => {
                    setLocationError('User denied location access.');
                    setLocation('Location unavailable');
                    // Fallback to a default location if needed
                    setLatlng({ lat: 51.5074, lng: -0.1278 });
                }
            );
        } else {
            setLocationError('Geolocation not supported by this browser.');
            setLocation('Location unavailable');
            // Fallback to a default location
            setLatlng({ lat: 51.5074, lng: -0.1278 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="rs-contact-page">
            {/* Header */}
            <section className="section-hero">
                <div className="container">
                    <a href="#" className="alert" role="alert">
                        <span className="alert-badge">New</span>
                        <span className="alert-text">Flowbite is out! See what's new</span>
                        <svg className="alert-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>

                    <h1 className="hero-title">We invest in the world’s potential</h1>

                    <p className="hero-subtitle">
                        Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive
                        economic growth.
                    </p>

                    <div className="hero-buttons">
                        <RippleEffect>
                            <button className="rs-btn rs-btn-primary">
                                Learn more <BiArrowFromLeft />
                            </button>
                        </RippleEffect>

                        <RippleEffect>
                            <button className="rs-btn rs-btn-secondary">
                                <IoWatchOutline />
                                Watch video
                            </button>
                        </RippleEffect>
                    </div>

                    <div className="featured-section">
                        <span className="featured-label">FEATURED IN</span>

                        <div className="featured-logos">
                            <a href="#" className="featured-logo" aria-label="GitHub">
                                <svg
                                    className="logo-svg"
                                    viewBox="0 0 132 29"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    role="img"
                                >
                                    <path
                                        fill="#181616"
                                        d="M66 0C29.5 0 0 29.5 0 66c0 29.1 18.9 53.8 45.1 62.6 3.3.6 4.5-1.4 4.5-3.2 0-1.6-.1-7-...
          /* truncated for brevity */
        "
                                    />
                                </svg>
                            </a>

                            <a href="#" className="featured-logo" aria-label="LinkedIn">
                                <svg
                                    className="logo-svg"
                                    viewBox="0 0 208 42"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    role="img"
                                >
                                    <rect width="34" height="34" rx="4" fill="#0A66C2" />
                                    <path
                                        fill="#fff"
                                        d="M10 12h6v18h-6v-18zm3-9a3 3 0 110 6 3 3 0 010-6zM20 18c0-2.3 2-4 4-4 2.2 0 3 1.3 3.5 2v-1.7h6v13h-6v-8c0-1.7-...
          /* truncated for brevity */
        "
                                    />
                                </svg>
                            </a>

                            <a href="#" className="featured-logo" aria-label="Dribbble">
                                <svg
                                    className="logo-svg"
                                    viewBox="0 0 120 41"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    role="img"
                                >
                                    <circle cx="20" cy="20" r="18" stroke="#EA4C89" strokeWidth="4" />
                                    <path
                                        d="M7 12c4 2 11 12 18 18 5 4 10 5 15 5"
                                        stroke="#EA4C89"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>
            </section>

            {/* Form + Info */}
            <section className="contact-section">
                <div className="info-card">
                    <h3>Get in touch</h3>
                    <p>Our team is ready to assist you. Reach out through any of the methods below.</p>
                    <ul>
                        <li>
                            <FaMapMarkerAlt className="icon" />
                            <strong>Location:</strong> {location || locationError}
                        </li>
                        <li>
                            <FaEnvelope className="icon" />
                            <strong>Email:</strong> support@yourdomain.com
                        </li>
                        <li>
                            <FaPhoneAlt className="icon" />
                            <strong>Call us:</strong> +1 234 567 890
                        </li>
                    </ul>
                    <div className="social">
                        <a href="#" aria-label="Facebook">
                            <FaFacebookF className="icon social-icon" />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <FaInstagram className="icon social-icon" />
                        </a>
                        <a href="#" aria-label="Twitter">
                            <FaTwitter className="icon social-icon" />
                        </a>
                    </div>
                </div>

                <div className="form-card">
                    <h3>Send us a message</h3>
                    <p>Fill out the form and we'll get back to you within 24 hours.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company" className="form-label">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={form.company}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Enter your company"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Enter your Phone"
                                    required
                                />
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
                                    placeholder="Enter your Email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject" className="form-label">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Subject"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Your message..."
                                required
                            />
                        </div>

                        <RippleEffect>
                            <button type="submit" className="rs-btn rs-btn-primary  w-100" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </RippleEffect>
                    </form>
                    {status && <div className={`status ${status.includes('successfully') ? 'success' : 'error'}`}>{status}</div>}
                </div>
            </section>

            {/* Map */}
            <section className="map-section">
                {latlng && <GoogleMapComponent latlng={latlng} onPick={handleMapPick} apiKey={GOOGLE_API_KEY} />}
                {!latlng && <div>Loading Map...</div>}
            </section>
        </div>
    );
}
