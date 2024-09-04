import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User already exists" });
        }
        
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ email, password: hashedPassword });

        if (newUser) { 
            // Generate JWT token and set cookie
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({ 
                _id: newUser._id,
                email: newUser.email,
            });
        }

    } catch (error) {
        console.log("Error signing up controller", error.message);
        res.status(500).json({ message: 'Server Error Signing Up' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");

        if (!user || !isPasswordCorrect) {
            res.status(400).send({ message: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            email: user.email,
        });
    } catch (error) {
        console.log("Error logging controller", error.message);
        res.status(500).send({ message: 'Server Error Logging In' });
    }
}

export const logout = async (req, res) => {
    res.send('logout');
}