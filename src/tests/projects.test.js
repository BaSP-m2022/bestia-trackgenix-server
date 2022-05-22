import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

describe('POST /', () => {
  test('response should return a 201 status', async () => {
    const response = await request(app).post('/').send();
    expect(response.status).toBe(201);
    console.log('todo bien, todo correcto, y yo que me alegro');
  });
  test('response should return false error', async () => {
    const response = await request(app).post('/').send();
    expect(response.error).toBe(false);
    console.log('todo bien, todo correcto, y yo que me alegro');
  });
});
