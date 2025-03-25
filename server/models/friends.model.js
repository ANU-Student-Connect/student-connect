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
        unique: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted'],
        defaultValue: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

friendSchema.set('toJSON', {
    virtuals: ['friendUsername'],
});

friendSchema.virtual('friendUsername').get(function () {
    return this.friend_id; // Adjust according to actual needs
});

const Friend = mongoose.model('Friend', friendSchema);

export default Friend;