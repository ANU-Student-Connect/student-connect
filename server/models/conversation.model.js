import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    photo: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/9790/9790561.png',
    },
    chatName: {
        type: String,
    },
    isGroup: {
        type: Boolean,
        default: false,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        },
    ],
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;