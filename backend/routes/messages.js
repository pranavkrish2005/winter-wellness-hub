import express from 'express';
const router = express.Router();
import messages from '../models/messages.js';

router.get('/all', async (req, res) => {
    try {
        const allMessages = await messages.find();
        res.status(200).send({allMessages: allMessages});
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.get('/:sender', async (req, res) => {
    const { sender } = req.params;

    try {
        const foundMessages = await messages.find({ sender: sender });
        res.status(200).send({message: 'Messages found', data: foundMessages});
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.get('/recipient/:sender/:recipient', async (req, res) => {
    const { sender, recipient } = req.params;

    try {
        const foundMessages = await messages.find({ sender: sender, recipient: recipient });
        res.status(200).send({message: 'Messages found', data: foundMessages});
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { sender, receiver, message } = req.body;

    try {
        const newMessage = new messages({
            sender: sender,
            recipient: receiver,
            content: message
        });

        await newMessage.save();
        res.status(200).send({ message: 'Message added', data: newMessage });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.delete('/all', async (req, res) => {
    try {
        await messages.deleteMany();
        res.status(200).send({ message: 'All messages deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await messages.findByIdAndDelete(id);
        res.status(200).send({ message: 'Message deleted' });
    } catch(error) {
        console.log(error);
        res.status(500).send({message: 'internal server error'})
    }
});

export default router;