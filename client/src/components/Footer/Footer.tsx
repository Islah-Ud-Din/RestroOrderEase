import React from 'react';

const Footer = () => (
  <footer className="rs-footer">
    <div className="rs-footer-content">
      <div className="rs-footer-brand">
        <span className="rs-footer-logo">🍽️ Restaurant Management System</span>
      </div>
      <nav className="rs-footer-nav">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy Policy</a>
      </nav>
      <div className="rs-footer-social">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </div>
    <div className="rs-footer-bottom">
      &copy; {new Date().getFullYear()} Restaurant Management System. All rights reserved.
    </div>
  </footer>
);

export default Footer;
