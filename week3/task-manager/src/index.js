const express = require('express');
const User = require('./models/User');
const Task = require('./models/Task');
require('./db/mongoose');

//CONFIG
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


//ENDPOINTS

//Create User
app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => res.status(201).send(user)).catch(e => res.status(400).send(e));
});

//Create Task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => res.status(201).send(task)).catch(e => res.status(400).send(e));
});


//SERVER INIT
app.listen(port, () => console.log('app listen on port ' + port));