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

// Post tests
describe('POST /projects', () => {
  test('response should return a 400 status', async () => {
    const response = await request(app).post('/projects').send({});
    console.log(response);
    expect(response.status).toBe(400);
  });
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
  test('response should return error validation', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Avengers Initiative',
      description: 'The mightiest heroes on the planet',
      //   startDate: '2022-03-21T18:02:23.412+00:00',
      clientName: 'Nick Fury',
      employees: mongoose.Types.ObjectId('62842cca8deb423ec414a09f'),
    });
    console.log(response);
    expect(response.body.error).toBe(true);
  });
});

// Delete tests
describe('DELETE /projects/:id', () => {
  test('Response should return a status 404', async () => {
    const response = await request(app).delete('/projects/').send();
    console.log(response);
    expect(response.status).toBe(404);
  });
  test('Response should return a status 400', async () => {
    const response = await request(app).delete('/projects/62000f17').send();
    console.log(response);
    expect(response.status).toBe(400);
  });
  test('Response should return a error true', async () => {
    const response = await request(app).delete('/projects/63368d18482f9756687f5b41').send();
    console.log(response);
    expect(response.body.error).toBe(true);
  });
  test('Response should return a data undefined', async () => {
    const response = await request(app).delete('/projects/63368d18482f9756687f5b41').send();
    console.log(response);
    expect(response.body.data).toBeUndefined();
  });
  test('Response should return a non empty message', async () => {
    const response = await request(app).delete('/projects/63368d18482f9756687f5b41').send();
    console.log(response);
    expect(response.body.message.length).toBeGreaterThan(5);
  });
});
