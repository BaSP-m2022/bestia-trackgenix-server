import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import taskSeed from '../seeds/tasks';

let taskId;

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

describe('GetById /tasks', () => {
  test('get task by id, incorrect id format', async () => {
    const response = await request(app).get('/tasks/aabbcc').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
});

describe('DELETE /tasks', () => {
  test('Delete a task', async () => {
    // eslint-disable-next-line no-undef
    const response = await request(app).delete('/tasks/6286dcbff65be15e3d9e70b5').send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('The task has been successfully deleted');
    expect(response.body.error).toBe(false);
  });
});
