import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";

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

// Get all messages between the current user and the specified friend, and return a structure that is easy to display on the front end
export const getMessages = async (req, res) => {
    try {
        const { id: friendId } = req.params; // Here, friendId is the friend id passed in after clicking the friend card
        const currentUserId = req.user._id;

        // Query all messages between the current user and friends, sorted in ascending order by creation time
        const messages = await Message.find({
            $or: [
                { senderId: currentUserId, receiverId: friendId },
                { senderId: friendId, receiverId: currentUserId }
            ]
        }).sort({ createdAt: 1 }).lean(); // Use lean() to convert to pure JS object for subsequent data processing

        // Add a side field to each message: if the message comes from the current user, mark it as "right", otherwise mark it as "left"
        const chatMessages = messages.map(msg => ({
            ...msg,
            side: msg.senderId.toString() === currentUserId.toString() ? "right" : "left"
        }));

        // The returned data structure also carries the current user id, and the front end can determine the display style based on the id
        res.status(200).json({
            currentUserId,
            messages: chatMessages
        });
    } catch (error) {
        console.error("Error in getMessages controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add friend card interface: query all relevant messages of the current user and retrieve the last message corresponding to each friend
export const getFriendCards = async (req, res) => {
    try {
        const userId = req.user._id;
        // Process using aggregation pipeline:
        const friendCards = await Message.aggregate([
            {
                // Filter out messages where the current user is the sender or receiver
                $match: {
                    $or: [
                        { senderId: mongoose.Types.ObjectId(userId) },
                        { receiverId: mongoose.Types.ObjectId(userId) }
                    ]
                }
            },
            {
                // Add field friendId: if the current user is the sender, friendId is receiverId, otherwise it is senderId
                $addFields: {
                    friendId: {
                        $cond: [
                            { $eq: ["$senderId", mongoose.Types.ObjectId(userId)] },
                            "$receiverId",
                            "$senderId"
                        ]
                    }
                }
            },
            {
                // Sort in descending order by time, making sure the latest message is at the front
                $sort: { createdAt: -1 }
            },
            {
                // Group by friendId, take the first record in each group (i.e. the latest message)
                $group: {
                    _id: "$friendId",
                    lastMessage: { $first: "$message" },
                    lastMessageTime: { $first: "$createdAt" },
                    lastSenderId: { $first: "$senderId" },
                    lastReceiverId: { $first: "$receiverId" }
                }
            },
            {
                // Associated query User collection to get friend information (such as email or name)
                $lookup: {
                    from: "users", // Note: collection The name is usually the lowercase plural form of the model name
                    localField: "_id",
                    foreignField: "_id",
                    as: "friend"
                }
            },
            {
                $unwind: "$friend"
            },
            {
                // Final output of required fields
                $project: {
                    _id: 0,
                    friendId: "$_id",
                    friendName: "$friend.name",
                    lastMessage: 1,
                    lastMessageTime: 1,
                    lastSenderId: 1,
                    lastReceiverId: 1
                }
            }
        ]);
        res.status(200).json(friendCards);
    } catch (error) {
        console.error("Error in getFriendCards: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};