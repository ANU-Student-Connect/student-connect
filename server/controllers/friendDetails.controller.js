import User from '../models/user.model'; // Make sure the path is correct
import Friend from '../models/friends.model'; // Fix the file name (original friend.model → friend.model.js)
import Message from '../models/message.model';

// Get friend details (including the last message and unread status)
export const getFriendDetails = async (req, res) => {
    const userId = req.params.userId;

    try {
// Query the list of accepted friends (Mongoose style)
        const friends = await Friend.find({
            where: {
                user_id: userId, // Make sure the field name is consistent with the model (user_id instead of userId)
                status: 'accepted',
            },
            include: [
                {
                    model: User,
                    as: 'friend', // The association alias is consistent with the as defined in the model
                    attributes: ['_id', 'username', 'avatar_url'], // Use _id instead of id
                },
            ],
        });

// Process the last message and unread status of each friend in parallel
        const friendDetails = await Promise.all(friends.map(async (friend) => {
            const lastMessage = await Message.findOne({
                where: {
                    $or: [ // Mongoose uses $or instead of Op.or
                        { sender: userId, receiver: friend.friend_id },
                        { sender: friend.friend_id, receiver: userId },
                    ],
                },
                sort: { createdAt: -1 }, // Mongoose sorting syntax
                select: ['content', 'createdAt', 'is_read'], // Selective query field
            });

// Count the number of unread messages (Mongoose countDocuments)
            const unreadCount = await Message.countDocuments({
                $and: [
                    {
                        $or: [
                            { sender: userId, receiver: friend.friend_id },
                            { sender: friend.friend_id, receiver: userId },
                        ],
                    },
                    { is_read: false },
                ],
            });

            return {
                friendId: friend.friend_id, // Ensure field names are consistent
                username: friend.friend.username, // Fix friend.friend → friend.friend (alias association)
                avatar: friend.friend.avatar_url, // Fix avatar_url → avatar_url (model attribute name)
                lastMessage: lastMessage ? lastMessage.toObject({ plain: true }) : null, // Use toObject conversion
                isRead: lastMessage?.is_read || false,
                unreadCount: unreadCount,
            };
        }));

        res.status(200).json({ data: friendDetails });
    } catch (error) {
        console.error('Error in getFriendDetails:', error.message);
        res.status(500).json({ error: 'Server internal error' });
    }
};

// Mark message as read
export const markMessageAsRead = async (req, res) => {
    const messageId = req.params.messageId;
    const currentUser = req.user.id;

    try {
        await Message.updateOne( // Mongoose uses updateOne instead of update
            { _id: messageId, $or: [ // use _id and $or
                    { sender: currentUser },
                    { receiver: currentUser },
                ]},
            { is_read: true }
        );

        res.status(200).json({ code: 200, message: 'Message marked as read' }); } catch (error) {
        console.error('Error in markMessageAsRead:', error.message);
        res.status(500).json({ error: 'Failed to mark message' });
    }
};