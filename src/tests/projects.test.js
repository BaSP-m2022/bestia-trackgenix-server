import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import ProjectsModel from '../models/Projects';
import EmployeesModel from '../models/Employees';
import projectsSeed from '../seeds/projects';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await ProjectsModel.collection.insertMany(projectsSeed);
  await EmployeesModel.collection.insertMany(employeesSeed);
});

describe('POST /projects', () => {
  test('response should return a 201 status', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Avengers Initiative',
      description: 'The mightiest heroes on the planet',
      startDate: '2022-03-21T18:02:23.412+00:00',
      clientName: 'Nick Fury',
      employees: mongoose.Types.ObjectId('62842cca8deb423ec414a09f'),
    });
    console.log(response);
    expect(response.status).toBe(201);
  });
  test('response should return false error', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Avengers Initiative',
      description: 'The mightiest heroes on the planet',
      startDate: '2022-03-21T18:02:23.412+00:00',
      clientName: 'Nick Fury',
      employees: mongoose.Types.ObjectId('62842cca8deb423ec414a09f'),
    });
    console.log(response);
    expect(response.error).toBe(false);
  });
});
