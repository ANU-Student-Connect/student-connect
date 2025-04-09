import express from 'express';
import { getMessages, sendMessage, getFriendCards } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// Add friend card interface to get the latest message records between the current user and each friend
router.get('/friend-cards', protectRoute, getFriendCards);
// Get all messages between a certain user
router.get('/:id', protectRoute, getMessages);
// Send message interface
router.post('/send/:id', protectRoute, sendMessage);


export default router;