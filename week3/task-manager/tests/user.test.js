const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const { userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);


test('Should signup a new user', async () => {
    const response = await request(app).post('/users')
        .send({
            name: 'Jose',
            email: 'jose@example.com',
            password: 'asd1234'
        })
        .expect(201);

    // Assert tha database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Jose',
            email: 'jose@example.com',
        },
        token: user.tokens[0].token
    });

    expect(user.password).not.toBe('asd1234');
});

test('Should login an existing user', async () => {
    const response = await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);

    const user = await User.findById(userOne._id);

    //Assert that new token was created and saved into database
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login')
        .send({
            email: 'nonexisting@example.com',
            password: 'someWeirdPw'
        })
        .expect(400);
});

test('Should get profile for user', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app).get('/users/me')
        .send()
        .expect(401);
});

test('Should delete account for user', async () => {
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOne._id);

    //Assert that user was removed
    expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
    await request(app).delete('/users/me')
        .send()
        .expect(401);
});

test('Should upload avatar image', async () => {
    await request(app).post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/Familia_Simpson.png')
        .expect(200)

    const user = await User.findById(userOne._id);

    //Assert that the value saved into database is a buffer
    expect(user.avatar).toEqual(expect.any(Buffer))
});

test('Should update user name', async () => {
    const response = await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ name: 'notMike' })
        .expect(200)

    const user = await User.findById(userOne._id);

    //Assert that name was changed in the database
    expect(user.name).toBe(response.body.name);
});

test('Should not update invalid user fields', async () => {
    const response = await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ location: 'Argentina' })
        .expect(400);
});