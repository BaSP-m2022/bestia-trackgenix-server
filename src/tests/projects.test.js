import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

describe('POST /projects', () => {
  test('response should return a 201 status', async () => {
    const response = await request(app).post('/projects').send();
    console.log(response);
    expect(response.status).toBe(201);
  });
  test('response should return false error', async () => {
    const response = await request(app).post('/projects').send();
    console.log(response);
    expect(response.error).toBe(false);
  });
});
