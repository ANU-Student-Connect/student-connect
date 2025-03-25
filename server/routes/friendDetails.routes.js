import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import {
    getFriendDetails, // Get friend details (including unread status)
    markMessageAsRead, // Mark message as read
} from '../controllers/friendDetails.controller.js';

const router = express.Router();

// Get friend details of a specified user (authentication required)
router.get('/friends/:userId/detail', protectRoute, getFriendDetails);

// Mark message as read (authentication required)
router.put('/messages/:messageId/read', protectRoute, markMessageAsRead);

export default router;