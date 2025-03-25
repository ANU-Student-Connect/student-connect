import User from '../models/user.model';
import Friend from '../models/friends.model';
import Message from '../models/message.model';

// Get friend details (including the last message and the number of unread messages)
export const getFriendDetails = async (req, res) => {
    const userId = req.params.userId;

    try {
// Query accepted friends and get the corresponding user information through populate
        const friends = await Friend.find({
            user_id: userId,
            status: 'accepted'
        }).populate('friend_id', '_id username avatar_url');

// Get the last message and unread count for each friend
        const friendDetails = await Promise.all(friends.map(async (friend) => {
            const friendUser = friend.friend_id;
            const lastMessage = await Message.findOne({
                $or: [
                    { sender: userId, receiver: friendUser._id },
                    { sender: friendUser._id, receiver: userId }
                ]
            })
                .sort({ createdAt: -1 })
                .select('content createdAt is_read');

            const unreadCount = await Message.countDocuments({
                $and: [
                    {
                        $or: [
                            { sender: userId, receiver: friendUser._id },
                            { sender: friendUser._id, receiver: userId }
                        ]
                    },
                    { is_read: false }
                ]
            });

            return {
                friendId: friendUser._id,
                username: friendUser.username,
                avatar: friendUser.avatar_url,
                lastMessage: lastMessage ? lastMessage.toObject() : null,
                isRead: lastMessage? lastMessage.is_read: false,
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
        awaitMessage.updateOne(
            { _id: messageId, $or: [
                    { sender: currentUser },
                    { receiver: currentUser },
                ]
            },
            { is_read: true }
        );

        res.status(200).json({ code: 200, message: 'Message marked as read' });
    } catch (error) {
        console.error('Error in markMessageAsRead:', error.message);
        res.status(500).json({ error: 'Failed to mark message' });
    }
};