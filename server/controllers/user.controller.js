import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import fs from "fs";
import path from "path";
import { FILE_UPLOAD_PATH } from "../config/config.js";

// @desc Get current user profile
// @route GET /api/user/profile
// @access Private
export const getCurrentUserProfile = async (req, res, next) => {
    try {
        const user = await User.findOne({ user_id: req.user.user_id });
        if (!user) { 
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            user: {
                user_id: user.user_id,
                email: user.email,
                profile: user.profile,
                interests: user.interests,
                matches: user.matches
            }
        });
    } catch (error) {
        console.error("Error in getCurrentUserProfile: ", error.message);
        next(error);
    }
};

// @desc Get specific user profile
// @route GET /api/user/profile/:user_id
// @access Private
export const getUserProfile = async (req, res, next) => { 
    try {
        const user = await User.findOne({ user_id: req.params.user_id });
        if (!user) { 
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        
        // return limited profile info for other users
        res.status(200).json({
            status: 'success',
            user: {
                user_id: user.user_id,
                profile: {
                    name: user.profile.name,
                    avatar_url: user.profile.avatar_url,
                    bio: user.profile.bio,
                    major: user.profile.major,
                    social_media: user.profile.social_media,
                    last_active: user.profile.last_active
                }
            }
        });
    } catch(error) { 
        console.error("Error in getUserProfile: ", error.message);
        next(error);
    }
};

// @desc Update current user profile
// @route PUT /api/user/profile
// @access Private
export const updateUserProfile = async (req, res, next) => { 
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                errors: errors.array()
            });
        }

        const { name, bio, phone, major, social_media } = req.body;

        const user = await User.findOne({ user_id: req.user.user_id });
        if (!user) { 
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Update profile fields
        if (name) user.profile.name = name;
        if (bio) user.profile.bio = bio;
        if (phone) user.profile.phone = phone;
        if (major) user.profile.major = major;
        if (social_media) {
            if (social_media.instagram) user.profile.social_media.instagram = social_media.instagram;
            if (social_media.facebook) user.profile.social_media.facebook = social_media.facebook;
            if (social_media.discord) user.profile.social_media.discord = social_media.discord;
        }

        await user.save();

        res.status(200).json({
            status: 'success',
            data: {
                user_id: user.user_id,
                profile: user.profile
            }
        });
    } catch(error) { 
        console.error("Error in updateUserProfile: ", error.message);
        next(error);
    }
};

// @desc Update user avatar
// @route PUT /api/user/avatar
// @access Private
export const updateUserAvatar = async (req, res, next) => { 
    try {
        if (!req.file) { 
            return res.status(400).json({
                status: 'error',
                message: 'No file uploaded'
            });
        }

        const user = await User.findOne({ user_id: req.user.user_id });
        if (!user) { 
            fs.unlinkSync(req.file.path);
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Delete old avatar if it exists
        if (user.profile.avatar_url) { 
            const oldAvatarPath = path.join(FILE_UPLOAD_PATH, path.basename(user.profile.avatar_url));
            if (fs.existsSync(oldAvatarPath)) { 
                fs.unlinkSync(oldAvatarPath);
            }
        }

        // update avatar
        user.profile.avatar_url = `/uploads/${req.file.filename}`;
        await user.save();

        res.status(200).json({
            status: 'success',
            data: {
                avatar_url: user.profile.avatar_url
            }
        })
    } catch (error) {
        console.error("Error in updateUserAvatar: ", error.message);
        if (req.file) { 
            fs.unlinkSync(req.file.path);
        }

        next(error);
    }
}