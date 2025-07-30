const express = require('express');
const router = express.Router();
const { pool } = require('./db.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'islahuddin795@gmail.com',
        pass: 'hutj oeqz lykq iont',
    },
});

// POST /api/signup - User Registration with OTP
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, country } = req.body;

    if (!firstName || !lastName || !email || !password || !country) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: 'Email already in use!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(10000 + Math.random() * 90000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await pool.query(
            `INSERT INTO users (first_name, last_name, email, password, country, otp, otp_expiry, is_verified)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [firstName, lastName, email, hashedPassword, country, otp, otpExpiry, false]
        );

        const mailOptions = {
            from: '"Restaurant Management" <islahuddin795@gmail.com>',
            to: email,
            subject: 'Verify Your Email Address - Restaurant Management System',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 24px; background: #fafbfc;">
                    <h2 style="color: #2d3748;">Welcome to Restaurant Management System, ${firstName}!</h2>
                    <p>Thank you for registering. To complete your sign up, please verify your email address using the OTP below:</p>
                    <div style="text-align: center; margin: 32px 0;">
                        <span style="display: inline-block; font-size: 2rem; letter-spacing: 4px; background: #f0f4f8; padding: 12px 32px; border-radius: 6px; color: #2b6cb0; font-weight: bold;">
                            ${otp}
                        </span>
                    </div>
                    <p style="color: #718096;">This OTP is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
                    <p>Best regards,<br/>Restaurant Management Team</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Registration successful! Please verify your email.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
});

// POST /api/login - Login and Generate Tokens
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'Account does not exist. Please create an account.' });
        }

        const user = userResult.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });

        const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

        await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [refreshToken, user.id]);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/api/refresh-token',
        });

        res.status(200).json({ accessToken });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/verify - Verify Email OTP
router.post('/verify', async (req, res) => {
    const { email, token } = req.body;

    if (!email || !token) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
        const result = await pool.query('SELECT otp, otp_expiry FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result.rows[0];

        if (user.otp !== token) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (new Date() > new Date(user.otp_expiry)) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        await pool.query('UPDATE users SET is_verified = true, otp = NULL, otp_expiry = NULL WHERE email = $1', [email]);

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (err) {
        console.error('OTP verification error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
