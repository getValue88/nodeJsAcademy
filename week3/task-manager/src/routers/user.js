const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');

//multer config
const avatarUpload = multer({
    // dest: 'avatars', <-- folder to save the files
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
            return cb(new Error('Allowed extensions: jpg jpeg png svg'));
        }

        cb(undefined, true);
    }
});


//Create User
router.post('/', async (req, res) => {
    const user = new User(req.body);

    try {
        // await user.save();
        const token = await user.generateAuthToken(); // this method also saves the user
        // sendWelcomeEmail(user.email, user.name);

        res.status(201).send({ user, token });

    } catch (error) {
        res.status(400).send(error);
    }
});

//User Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });

    } catch (error) {
        res.status(400).send();
    }
});

//User Logout
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();

    } catch (error) {
        res.status(500).send();
    }
});

//User logoutAll
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();

    } catch (error) {
        res.status(500).send();
    }
});

//Get user
router.get('/me', auth, async (req, res) => {
    res.send(req.user);
});

//update user
router.patch('/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);

    } catch (error) {
        res.status(400).send(error);
    }
});

//delete user
router.delete('/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        sendCancelationEmail(req.user.email, req.user.name);

        res.send(req.user);

    } catch (error) {
        res.status(500).send();
    }
});

//upload avatar
router.post('/me/avatar', auth, avatarUpload.single('avatar'), async (req, res) => {
    try {
        req.user.avatar = await sharp(req.file.buffer)
            .resize({ width: 250, height: 250 })
            .png()
            .toBuffer();

        await req.user.save();
        res.send();

    } catch (error) {
        res.status(400).send();
    }

    //multer error handling
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

//delete avatar
router.delete('/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send();

    } catch (error) {
        res.status(500).send();
    }
});

//get avatar by user id
router.get('/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-type', 'image/png');
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
});

module.exports = router;