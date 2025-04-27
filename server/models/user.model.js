import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    name: {
        type: String,
        default: 'Anonymous'
    },
    avatar: {
        type: String,
        default: ''
    },
    club: {
        type: String,
        default: ''
    },
    socialMedia: {
        type: String,
        enum: ["WeChat", "Discord", "Slack", "Facebook"],
        default: "WeChat"
    },
    major: {
        type: String,
        default: ""
    },
    interests: {
        type: [String],
        default: []
    },
    friends: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    //createdAt, updatedAt
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;