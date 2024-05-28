import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Message', messageSchema);