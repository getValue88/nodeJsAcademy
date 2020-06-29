const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

//CONFIG
const app = express();
app.use(express.json());

//MIDDLEWARES
/*app.use((req, res, next) => {
    res.status(503).send('Server is under maintenance');
}); */

//ROUTERS
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('', (req, res) => {
    res.send('Welcome to the Task Manager API');
});


module.exports = app;