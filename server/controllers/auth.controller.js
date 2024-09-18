import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => { 
    try { 
        const { email, password, confirmedPassword} = req.body;
        if (password !== confirmedPassword) { 
            return res.status(400).json({message: 'Passwords do not match'});
        }

        const user = await User.findOne({ email });
        
        if (user) { 
            return res.status(400).json({message: 'User already exists'});
        }

        // HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
        });


        if (newUser) { 
            // Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
            });

        } else {
            res.status(400).json({message: 'Invalid user data'});
        }
    }
    catch (error) { 
        console.error("Error in signup controller: ", error.message);
        res.status(500).json({error: 'Internal server error'});
    }
}

export const login = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user.password || '');
        
        if (!user || !isPasswordCorrect) { 
            return res.status(400).json({message: 'Invalid username or password'});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            email: newUser.email,
        });

    } catch (error) {
        console.error("Error in login controller: ", error.message);
        res.status(500).json({error: 'Internal server error'});
    }
}

export const logout = (req, res) => {  
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        console.error("Error in logout controller: ", error.message);
        res.status(500).json({error: 'Internal server error'});
    }
}