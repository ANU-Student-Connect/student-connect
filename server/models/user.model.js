import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@anu.edu.au$/,
            'Please provide a valid ANU email address',
        ],
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false,
    },

    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },

    avatar: {
        type: String,
        default: ''
    },

    major: {
        type: String,
        trim: true
    },

    club: {
        type: String,
        trim: true
    },

    socialMedia: {
        instagram: {
            type: String,
            trim: true
        },
        facebook: {
            type: String,
            trim: true
        },
        linkedin: {
            type: String,
            trim: true
        },
    }

    //createdAt, updatedAt
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;