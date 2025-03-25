import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => { 
    try { 
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) { 
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) { 
            conversation.messages.push(newMessage._id);
        }

        // SOCKET IO FUNCTIONALITY

        // parallel running
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) { 
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessages = async (req, res) => { 
    try { 
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // not refs, but actual messages

        if (!conversation) { 
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        res.status(200).json(messages);

    } catch (error) { 
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllMessages = async (req, res) => {
    const userId = req.user.id;

    try {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { sender_id: userId },
                    { receiver_id: userId },
                ],
            },
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'username'],
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'username'],
                },
            ],
            order: { createdAt: 'DESC' },
            group: ['sender_id', 'receiver_id'], // group by conversation
        });

// convert to a more readable format
        const formattedMessages = messages.reduce((acc, message) => {
            const key = `${message.sender_id}-${message.receiver_id}`;
            if (!acc[key]) {
                acc[key] = {
                    participants: [
                        message.sender_id === userId ? message.sender : message.receiver,
                        message.sender_id === userId ? message.receiver : message.sender,
                    ],
                    messages: [],
                };
            }
            acc[key].messages.push(message);
            return acc;
        }, {});

        res.status(200).json({ data: Object.values(formattedMessages) });
    } catch (error) {
        console.error('Error in getAllMessages:', error.message);
        res.status(500).json({ error: 'Server internal error' }); }
};