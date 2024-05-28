import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import messagesRouter from './routes/messages.js';
import cors from "cors";

app.listen(process.env.PORT, () => {
    console.log('app is listeingi');
});

app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/messages', messagesRouter);

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));