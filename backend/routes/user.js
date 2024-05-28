import express from 'express';
const router = express.Router();
import bcrypt, { hash } from 'bcrypt';
import user from '../models/user.js';

router.get('/all', async (req, res) => {
    try {
        const allUsers = await user.find();
        res.status(200).send(allUsers);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.get('/login', async (req, res) => {
    const { username, password } = req.query;

    try {
        const foundUser = await user.findOne({ username: username });

        if (!foundUser) {
            return res.status(404).send({ message: 'Username not found' });
        }

        const result = await bcrypt.compare(password, foundUser.password);
        if (result) {
            return res.status(200).send({ message: 'Login successful', data: {id: foundUser._id}});
        } else {
            return res.status(401).send({ message: 'Incorrect password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.get('/home/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const foundUser = await user.findById(id);
        if (!foundUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({data: foundUser});
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const foundUser = await user.findOne({ username });
        if (!foundUser) {
            return res.status(404).send({ message: 'Username not found' });
        }
        res.status(200).send({id: foundUser._id});
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);

        const newUser = new user({
            username: username,
            email: email,
            password: hash
        });

        await newUser.save();

        res.status(200).send({ message: 'User added', data: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await user.findByIdAndDelete(id);
        res.status(200).send({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.delete('/all', async (req, res) => {
    try {
        await user.deleteMany();
        res.status(200).send({ message: 'All users deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.patch('/:id', async (req, res) => {
    const {id} = req.params;
    const {username, password, email} = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        const updatedUser = await user.findByIdAndUpdate(id, 
            {username: username, email: email, password: hash}, {new: true});
        res.status(200).send({message: 'updated user', data: updatedUser});
        
    } catch(err) {
        console.error(err);
        res.status(500).send({message: 'internal server error'})
    }
});

router.patch('/addbadge/:id', async (req, res) => {
    const {id} = req.params;
    const {badge} = req.body;

    try {
        const updatedUser = await user.findByIdAndUpdate(id, 
            {$push: {badges: badge}}, {new: true});
        res.status(200).send({message: 'badge added', data: updatedUser});
    } catch(err) {
        console.error(err);
        res.status(500).send({message: 'internal server error'})
    }
});
router.patch('/addstreak/:id', async (req, res) => {
    const {id} = req.params;
    const {streak} = req.body;

    try {
        const updatedUser = await user.findByIdAndUpdate(id, 
            {streak: streak}, {new: true});
        res.status(200).send({message: 'streak added', data: updatedUser});
    } catch(err) {
        console.error(err);
        res.status(500).send({message: 'internal server error'})
    }
});

router.patch('/lastlogin/:id', async (req, res) => {
    const {id} = req.params;
    const {lastLogin} = req.body;

    try {
        const updatedUser = await user.findByIdAndUpdate(id, 
            {lastLogin: lastLogin}, {new: true});
        res.status(200).send({message: 'last login added', data: updatedUser});
    } catch(err) {
        console.error(err);
        res.status(500).send({message: 'internal server error'})
    }
});

export default router;