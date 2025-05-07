import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/config.js';
const { Schema } = mongoose;

const SocialMediaSchema = new Schema({
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    discord: { type: String, default: '' }
}, { _id: false });

const ProfileSchema = new Schema({
    name: { type: String, required: true },
    avatar_url: { type: String, default: '' },
    uid: { type: String, unique: true, default: '' },
    phone: { type: String },
    bio: { type: String },
    major: { type: String },
    social_media: { type: SocialMediaSchema, default: {} },
    created_at: { type: Date, default: Date.now },
    last_active: { type: Date, default: Date.now }
}, { _id: false});

const InterestCategorySchema = new Schema({
    category_id: { type: String, required: true },
    subcategories: [{ type: String }]
}, { _id: false });

const InterestsSchema = new Schema({
    categories: [InterestCategorySchema]
}, { _id: false });

const MatchesSchema = new Schema({
    matched_users: [{ type: String, ref: 'User' }],
    compatibility_score: { type: Number, min: 0, max: 100 },
    matched_interests: [{ type: String }],
    created_at: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'pending' }
}, { _id: false });

const UserSchema = new Schema({
    user_id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password_hash: { type: String, required: true },
    profile: { type: ProfileSchema, required: true },
    interests: { type: InterestsSchema, default: { categories: [] } },
    matches: { type: MatchesSchema, default: {} },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true });

// Create indexes for frequently used queries
UserSchema.index({ 'user_id': 1, 'email': 1 }, { unique: true });
UserSchema.index({ 'profile.uid': 1 });
UserSchema.index({ 'matches.matched_users': 1 });
UserSchema.index({ 'interests.categories.category_id': 1 });

// Encrypt password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password_hash')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
});

// Sign JWT and return
UserSchema.methods.generateAuthToken = function () { 
    return jwt.sign({ id: this._id, user_id: this.user_id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Compare password with hashed password
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password_hash);
};

// update last active timestamp
UserSchema.methods.updateLastActive = async function () {
    this.last_active = Date.now();
    await this.save();
};

const User = mongoose.model("User", UserSchema);

export default User;