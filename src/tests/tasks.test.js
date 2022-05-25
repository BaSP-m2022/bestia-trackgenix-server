import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import taskSeed from '../seeds/tasks';

beforeAll(async () => {
  await Tasks.collection.insertMany(taskSeed);
});

describe('GET /tasks', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/tasks').send();
    await expect(response.status).toBe(200);
  });

  test('Response should return false error', async () => {
    const response = await request(app).get('/api-tasks').send();
    await expect(response.status).toBe(404);
  });

  test('Response should return false error', async () => {
    const response = await request(app).get('/tasks').send();
    await expect(response.error).toBe(false);
  });

  test('Response should return message for succes', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.message).not.toEqual('Tasks was not found');
  });
});
