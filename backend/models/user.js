import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    badges: {
        type: Array,
        required: false,
    },
    streak: {
        type: Number,
        required: false,
    },
    lastLogin: {
        type: String,
        required: false,
    },
});

export default mongoose.model('User', userSchema);