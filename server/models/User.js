const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    full_name: { type: String, required: true },
    student_id: { type: String, required: true },

});

const User = mongoose.model('User', UserSchema);
module.exports = User;
