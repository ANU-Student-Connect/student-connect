// import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
// import generateTokenAndSetCookie from '../utils/generateToken.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// @desc Register a new user
// @route POST /api/auth/signup
// @access Public
export const signup = async (req, res, next) => { 
    try { 
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) { 
            return res.status(400).json({
                status: 'error',
                errors: errors.array()
            });
        }

        // Extract validated data
        const {firstName, lastName, email, verificationCode, password, confirmedPassword, termsOfService, receiveEmails} = req.body;
        if (password !== confirmedPassword) { 
            return res.status(400).json({message: 'Passwords do not match'});
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) { 
            return res.status(400).json({message: 'User already exists'});
        }

        // Generate user_id
        const user_id = `u${crypto.randomBytes(4).toString('hex')}`;

        // Create user
        user = await User.create({
            user_id,
            email,
            password_hash: password, // will be hashed in the pre save hook
            profile: {
                name: `${firstName} ${lastName}`,
                avatar_url: '',
                bio: '',
                major: '',
                social_media: {},
                created_at: Date.now(),
                last_active: Date.now(),
            },
        });

        // Generate JWT token
        // generateTokenAndSetCookie(user._id, res);
        const token = user.getSignedJwtToken();
        res.status(201).json({
            status: 'success',
            token,
            user: {
                user_id: user.user_id,
                email: user.email,
                profile: user.profile,
            }
        });
        

        // // HASH PASSWORD HERE
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // const newUser = new User({
        //     email,
        //     password: hashedPassword,
        // });


        // if (newUser) { 
        //     // Generate JWT token here
        //     generateTokenAndSetCookie(newUser._id, res);
        //     await newUser.save();

        //     res.status(201).json({
        //         _id: newUser._id,
        //         email: newUser.email,
        //     });

        // } else {
        //     res.status(400).json({message: 'Invalid user data'});
        // }
    }
    catch (error) { 
        console.error("Error in signup controller: ", error.message);
        // res.status(500).json({error: 'Internal server error'});
        next(error);
    }
}

// @desc Login a user
// @route POST /api/auth/login
// @access Public
export const login = async (req, res, next) => { 
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) { 
            return res.status(400).json({
                status: 'error',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password_hash');
        if (!user) {
            return res.status(400).json({message: 'Invalid username', error: 'User not found'});
        }
        // const isPasswordCorrect = await bcrypt.compare(password, user.password || '');
        // if (!isPasswordCorrect) {
        //     return res.status(400).json({message: 'Invalid password', error: 'Password is incorrect'});
        // }
        // generateTokenAndSetCookie(user._id, res);

        // res.status(200).json({
        //     _id: user._id,
        //     email: user.email,
        // });
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({message: 'Invalid password', error: 'Password is incorrect'});
        }
        
        user.profile.last_active = Date.now();
        await user.save();

        const token = user.getSignedJwtToken();
        res.status(200).json({
            status: 'success',
            token,
            user: {
                user_id: user.user_id,
                email: user.email,
                profile: user.profile,
            }
        })
    } catch (error) {
        console.error("Error in login controller: ", error.message);
        // res.status(500).json({error: 'Internal server error'});
        next(error);
    }
}

// @desc Logout a user / Clear the JWT cookie
// @route POST /api/auth/logout
// @access Private
export const logout = (req, res, next) => {  
    try {
        // res.cookie('jwt', '', { maxAge: 0 });
        if (req.cookies.token) { 
            res.clearCookie('token');
        }
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error("Error in logout controller: ", error.message);
        // res.status(500).json({error: 'Internal server error'});
        next(error);
    }
}