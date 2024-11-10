const request = require('supertest');
const app = require('../app'); // Assuming you have an Express app in app.js

describe('User Controller', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'testuser', password: 'password' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('should not create a user with an existing username', async () => {
    await request(app)
      .post('/api/users')
      .send({ username: 'testuser', password: 'password' });
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'testuser', password: 'password' });
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('message', 'Username already exists.');
  });
});