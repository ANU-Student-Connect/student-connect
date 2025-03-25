import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import {
    sendMessage, // Send message
    getMessages, // Get all messages (need to be extended)
} from '../controllers/message.controller.js';

const router = express.Router();

// Get all messages of the current user (need authentication)
router.get('/:id', protectRoute, getMessages);

// Send a new message (need authentication)
router.post('/send/:id', protectRoute, sendMessage);

export default router;