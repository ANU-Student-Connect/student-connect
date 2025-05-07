import { validationResult } from 'express-validator';
import User from '../models/user.model.js';
import Interest from '../models/interest.model.js';

// @desc Get current user's interests
// @route GET /api/user/interests
// @access Private
export const getCurrentUserInterests = async (req, res, next) => {
    try {
        const user = await User.findOne({ user_id: req.user.user_id });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error("Error in getCurrentUserInterests: ", error.message);
        next(error);
    }
}

// @desc Update current user's interests
// @route PUT /api/user/interests
// @access Private
export const updateCurrentUserInterests = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                
            })
        }
    } catch (error) {
        console.error("Error in updateCurrentUserInterests: ", error.message);
        next(error);
    }
}

async function updateUserInterests(userId) {

}