const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

//CONFIG
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

//ROUTERS
app.use(userRouter);
app.use(taskRouter);

//SERVER INIT
app.listen(port, () => console.log('app listen on port ' + port));