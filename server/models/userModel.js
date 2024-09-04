import { MongoClient } from 'mongodb';

const userSchema = {
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
};

// const User = MongoClient.userSchema('User', userSchema);
export default userSchema;