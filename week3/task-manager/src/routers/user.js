const express = require('express');
const router = new express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');

//Create User
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        // await user.save();
        const token = await user.generateAuthToken(); // this method also saves the user
        res.status(201).send({ user, token });

    } catch (error) {
        res.status(400).send(error);
    }
});

//User Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });

    } catch (error) {
        res.status(400).send();
    }
});

//Get users
router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);

    } catch (error) {
        res.status(500).send();
    }
});

//Get user by id
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send();
        }

        res.status(200).send(user);

    } catch (error) {
        res.status(500).send()
    }
});

//update user
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        res.send(user);

    } catch (error) {
        res.status(400).send(error);
    }
});

//delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(404).send()
        }

        res.send(user);

    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;