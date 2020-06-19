const request = require('supertest');
const Task = require('../src/models/Task');
const app = require('../src/app');
const { userOne, userTwo, taskOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app).post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Testing task 1'
        })
        .expect(201)

    const task = await Task.findById(response.body._id);

    //Assert that task was saved into database
    expect(task).not.toBeNull();

    //Assert that default value was assigned to the completed field
    expect(task.completed).toBe(false)
});

test('Should get all tasks for userOne', async () => {
    const response = await request(app).get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // Assert to get 2 tasks 
    expect(response.body.length).toBe(2);
});

test('Should not delete a task from other owner', async () => {
    await request(app).delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);

    const task = await Task.findById(taskOne._id);

    //Assert that task is still in the database
    expect(task).not.toBeNull();
});