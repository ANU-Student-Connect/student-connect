const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type:String, required:true},
    email:{type:String, require: true, unique: true},
    full_name:{type:String,require: true },
    create_at:{type:Date, default: Date.now}
})

const User = mongoose.model('User', userSchema);
module.exports = User;
