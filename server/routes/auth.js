const express = require('express');
const router = express.Router();
const { checkEmailExists, isANUEmail, sendVerificationEmail } = require('../utils/authHelpers');
const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcrypt'); // Make sure to install bcrypt for password hashing


// user signin POST route for fake login data
router.post('/signin', (req, res, next) => {
    const { email, password } = req.body;

    // there is no specific logic here as user should login using any email address and password
    if (email && password) {

        // setting cookie to rememebr user's login status
        res.cookie('user', email, { httpOnly: true });
        return res.status(200).json({ message: 'Sign in successful', redirectUrl: '/home' });
    } else {
        return res.status(400).json({ message: 'Email and password required' });
    }
});

// user sign up POST route
router.post('/signup', async (req, res) => {
    const { email, password, fullName, studentId } = req.body;

    try {
        // this will check if the email is already registered
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // this is to validate ANU email domain
        if (!isANUEmail(email)) {
            return res.status(400).json({ message: 'Invalid email domain. Only ANU emails are allowed.' });
        }

        // this will hash the password before storing it
        const passwordHash = await bcrypt.hash(password, 10);

        // this is to generate a verification code
        const verificationCode = crypto.randomBytes(3).toString('hex');

        // this is to create a new user object for sign up
        const newUser = new User({
            email,
            password_hash: passwordHash, // stores the hashed password
            full_name: fullName,
            student_id: studentId,
            verification_code: verificationCode,
            is_verified: false // email verification pending
        });

        // this saves the user to the database
        await newUser.save();

        // to send the verification email
        await sendVerificationEmail(email, verificationCode);

        return res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
