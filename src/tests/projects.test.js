import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

import ProjectsModel from '../models/Projects';
import EmployeesModel from '../models/Employees';
import projectsSeed from '../seeds/projects';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await ProjectsModel.collection.insertMany(projectsSeed);
  await EmployeesModel.collection.insertMany(employeesSeed);
});

// GET Test:
describe('Test GET /', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });
  test('Response should return false error', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.error).toBeFalsy();
  });
  test('Response should return at least one project', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data).not.toBe(null);
  });
  test('Response should return the message: Project found', async () => {
    const response = await request(app).get('/projects/628aba63452c2aa098ff50e2').send();
    expect(response.body.message).toBe('Project found');
  });
});

// PUT Test:
const fullBody = {
  name: 'The Justice League',
  description: 'The mightiest heroes on the planet',
  startDate: '2022-03-21T18:02:23.412+00:00',
  clientName: 'Nick Fury',
  employees: mongoose.Types.ObjectId('62842cca8deb423ec414a09f'),
};

const incompleteBody = {
  description: 'The mightiest heroes on the planet',
  startDate: '2022-03-21T18:02:23.412+00:00',
  clientName: 'Nick Fury',
  employees: mongoose.Types.ObjectId('62842cca8deb423ec414a09f'),
};

describe('Test PUT /projects', () => {
  test('Response should return a 200 status, error: false', async () => {
    const response = await request(app).put('/projects/628aba63452c2aa098ff50e2').send(fullBody);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('Project should not be updated when body content is empty', async () => {
    const response = await request(app).put('/projects/628aba63452c2aa098ff50e2').send();
    expect(response.status).toBe(400);
  });

  test('Response should return a 400 status, error: true if at least one required field is empty', async () => {
    const response = await request(app).put('/projects/628aba63452c2aa098ff50e2').send(incompleteBody);
    expect(response.status).toBe(400);
  });

  test('Response should return a 404 status, error: true', async () => {
    const response = await request(app).put('/projects/555aba63452c2aa098ff50e2').send(fullBody);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});