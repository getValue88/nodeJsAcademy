const express = require('express');
const User = require('./models/User');
const Task = require('./models/Task');
const { findByIdAndDelete } = require('./models/User');
require('./db/mongoose');

//CONFIG
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


//ENDPOINTS

//Create User
app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);

    } catch (error) {
        res.status(400).send(error);
    }
});

//Get users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);

    } catch (error) {
        res.status(500).send();
    }
});

//Get user by id
app.get('/users/:id', async (req, res) => {
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
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

//delete user
app.delete('/users/:id', async (req, res) => {
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

//Create Task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);

    } catch (error) {
        res.status(400).send(error);
    }
});

//get tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);

    } catch (error) {
        res.status(500).send();
    }
});

//get task by id
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);

        if (!task) {
            return res.status(404).send();
        }

        res.status(200).send(task);

    } catch (error) {
        res.status(500).send();
    }
});

//update task
app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

//delete task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            res.status(404).send()
        }

        res.send(task);

    } catch (error) {
        res.status(500).send();
    }
});

//SERVER INIT
app.listen(port, () => console.log('app listen on port ' + port));