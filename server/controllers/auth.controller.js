import bcrypt from 'bcryptjs';

import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../resend/email.js';

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmedPassword } = req.body;

    try {
        // CHECK ALL FIELDS ARE FILLED
        if (!firstName || !lastName || !email || !password || !confirmedPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // CHECK IF PASSWORD ARE CONFIRMED CORRECTLY
        if (password !== confirmedPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // CHECK ANU EMAIL DOMAIN
        // Only allow emails ending in @anu.edu.au (case-insensitive)
        const anuEmailRegex = /^[^\s@]+@anu\.edu\.au$/i;
        if (!anuEmailRegex.test(email)) {
            return res.status(400).json({ message: 'Sign-ups are restricted to ANU email addresses.' });
        }

        // CHECK FOR EXISTING USER
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.isVerified) {
                // Already verified → full account exists
                return res.status(400).json({ message: 'User already exists' });
            }
            // Signed up but never verified → remove the old record so we can re-signup
            await existingUser.deleteOne();
        }

        // HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // CREATE VERIFICATION TOKEN
        const verificationToken = generateVerificationToken();

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });

        newUser.profile.avatar_url = process.env.DEFAULT_AVATAR_URL;

        if (newUser) {
            // GENERATE JWT TOKEN
            await newUser.save();
            generateTokenAndSetCookie(res, newUser._id);

            // SEND VERIFICATION EMAIL
            await sendVerificationEmail(newUser.email, verificationToken)

            res.status(201).json({
                success: true,
                message: "User created successfully.",
                user: {
                    ...newUser._doc,
                    password: undefined
                }
            });

        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        console.error("Error in signup controller.", error.message);
        //res.status(500).json({error: 'Internal server error'});
        res.status(400).json({ success: false, message: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code." });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationToken = undefined;

        await user.save();
        await sendWelcomeEmail(user.email, user.firstName);

        res.status(200).json({ success: true, message: "Email verified successfully." });

    } catch (error) {
        console.log("error verifying email", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found.' });
        }

        res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
    } catch (error) {
        console.log("Error checking auth", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        const isVerified = user.isVerified;
        if (!isVerified) {
            return res.status(400).json({ message: 'Email not verified.' });
        }

        generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            success: true,
            user:user,
            message: "Login successfully.",
        });

    } catch (error) {
        console.error("Error in login controller: ", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error("Error in logout controller: ", error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: 'User not found.' });
        }
        const resetPasswordToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour to expire

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpiresAt = resetPasswordExpiresAt;

        await user.save();
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);
        res.status(200).json({ success: true, message: 'Password reset email sent successfully.' });
    } catch (error) {
        console.error("Error sending password reset email.", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        })

        if (!user) {
            res.status(400).json({ success: false, message: "Invalid or expired reset token." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();
        await sendResetSuccessEmail(user.email);
        res.status(200).json({ success: true, message: 'Password reset successfully.' });
    } catch (error) {
        console.error("Error resetting password.", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}