'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import RippleEffect from '../../lib/RippleEffect';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [blur, setBlur] = useState(false);
    const [navOpen, setNavOpen] = useState(false); // for mobile nav
    const [isMobile, setIsMobile] = useState(false);
    const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);

    // Blur effect on scroll
    useEffect(() => {
        const handleScroll = () => {
            setBlur(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 992);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Dropdown handlers
    const openDropdown = () => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setShowDropdown(true);
    };
    const closeDropdown = () => {
        dropdownTimeout.current = setTimeout(() => setShowDropdown(false), 120);
    };
    const toggleDropdown = () => setShowDropdown((prev) => !prev);

    // Hamburger toggle
    const toggleNav = () => setNavOpen((prev) => !prev);

    return (
        <header className={`rs-header${blur ? ' blur-bg' : ''}`} ref={headerRef}>
            <div className="rs-container">
                <div className="rs-logo">🍽️ Restaurant</div>
                <button className="rs-hamburger" onClick={toggleNav} aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav className={`rs-nav${navOpen ? ' active' : ''}`}>
                    <RippleEffect className="rs-link">
                        <Link href="/">Home</Link>
                    </RippleEffect>
                    {isMobile ? (
                        <>
                            <RippleEffect className="rs-link">
                                <Link href="/pages/about">Our Story</Link>
                            </RippleEffect>
                            <RippleEffect className="rs-link">
                                <Link href="/pages/team">Our Team</Link>
                            </RippleEffect>
                            <RippleEffect className="rs-link">
                                <Link href="/pages/careers">Careers</Link>
                            </RippleEffect>
                        </>
                    ) : (
                        <div className="rs-dropdown" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                            <span
                                className="rs-dropdown-toggle"
                                tabIndex={0}
                                onClick={toggleDropdown}
                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleDropdown()}
                                aria-haspopup="true"
                                aria-expanded={showDropdown}
                                role="button"
                            >
                                About ⏷
                            </span>
                            {showDropdown && (
                                <div className="rs-dropdown-menu" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                                    <RippleEffect className="rs-dropdown-item">
                                        <Link href="/pages/about">Our Story</Link>
                                    </RippleEffect>
                                    <RippleEffect className="rs-dropdown-item">
                                        <Link href="/pages/team">Our Team</Link>
                                    </RippleEffect>
                                    <RippleEffect className="rs-dropdown-item">
                                        <Link href="/pages/careers">Careers</Link>
                                    </RippleEffect>
                                </div>
                            )}
                        </div>
                    )}
                    <RippleEffect className="rs-link">
                        <Link href="/pages/contact">Contact</Link>
                    </RippleEffect>
                    <RippleEffect className="rs-link">
                        <Link href="/pages/payment">Payment</Link>
                    </RippleEffect>
                </nav>
            </div>
        </header>
    );
};

export default Header;
