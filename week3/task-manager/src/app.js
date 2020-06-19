const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

//CONFIG
const app = express();
app.use(express.json());

//MIDDLEWARES
/* app.use((req, res, next) => {
    res.status(503).send('Server is under maintenance');
}); */

//ROUTERS
app.use(userRouter);
app.use(taskRouter);

app.get('', (req, res) => {
    res.send('Welcome to the Task Manager API');
});


module.exports = app;