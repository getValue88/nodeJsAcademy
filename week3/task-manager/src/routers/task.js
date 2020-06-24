const express = require('express');
const Task = require('../models/Task');
const auth = require('../middlewares/auth');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();

//multer config
const imageUpload = multer({
    // dest: 'images', // <-- folder to save the files
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

//Create Task
router.post('/tasks', auth, imageUpload.single('image'), async (req, res) => {
    let image;

    try {
        if (req.file) {
            image = await sharp(req.file.buffer)
                .resize({ width: 50, height: 50 })
                .png()
                .toBuffer();
        }

        const jsonTask = await JSON.parse(req.body.task);
        const task = new Task({
            ...jsonTask,
            image,
            owner: req.user._id
        });

        await task.save();
        res.status(201).send(task);

    } catch (error) {
        res.status(400).send(error);
    }
});

//get tasks
//  querystring ie:
//      ?completed=true --> filter by completed field
//      ?page=2&limit=5 --> pagination
//      ?sortBy=createdAt:desc --> sort by createdAt timestamp
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};
    let skip = 0;

    //pagination
    if (req.query.page && req.query.limit) {
        skip = parseInt(req.query.limit) * (parseInt(req.query.page) - 1);
    }

    //filter tasks by completed field
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    //sort tasks by
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip,
                sort
            }
        }).execPopulate();

        res.status(200).send(req.user.tasks);

    } catch (error) {
        res.status(500).send();
    }
});

//get task by id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.status(200).send(task);

    } catch (error) {
        res.status(500).send();
    }
});

//update task
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.send(task);

    } catch (error) {
        res.status(400).send(error);
    }
});

//delete task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            res.status(404).send();
        }

        res.send(task);

    } catch (error) {
        res.status(500).send();
    }
});

router.get('/task/:id/image', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task || !task.image) {
            throw new Error();
        }

        res.set('Content-type', 'image/png');
        res.send(task.image);
    } catch (error) {
        res.status(404).send();
    }
});

module.exports = router;