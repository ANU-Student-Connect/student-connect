const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true},
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    full_name: { type: String, required: true },
    student_id: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    last_login: { type: Date },
    interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interest' }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
    profile_picture: { type: String },
    is_verified: { type: Boolean, default: false },
    verification_code: { type: String },
    notifications_enabled: { type: Boolean, default: true },
    meetups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meetup' }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;