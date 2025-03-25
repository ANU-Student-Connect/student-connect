import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    friend_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Virtual attribute, the username in friend_id can be obtained through friend.friendUsername (if needed)
friendSchema.virtual('friendUsername').get(function () {
    return this.friend_id?.username;
});

//Configure toJSON Include virtual attributes when exporting
friendSchema.set('toJSON', {
    virtuals: true,
});

export default mongoose.model('Friend', friendSchema);