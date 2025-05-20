import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
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
    isVerified: {
        type: Boolean,
        default: false,
    },
    isFirstLogin: {
        type: Boolean,
        default: true, 
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    profile: {
      avatar_url: { type: String, default: '' },
      uid: { type: String, default: '' },
      phone: { type: String, default: '' },
      bio: { type: String, default: '' },
      major: { type: String, default: '' },
      social_media: {
        instagram: { type: String, default: '' },
        facebook: { type: String, default: '' },
        discord: { type: String, default: '' },
        slack:{ type: String, default: '' },
      }
    }
    //createdAt, updatedAt
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);
export default User;