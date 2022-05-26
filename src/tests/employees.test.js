/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

let employeeId;

describe('GET /employees', () => {
  test('Response should return a status 200', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
  });

  test('Response should return a false error', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.error).not.toBe(true);
  });

  test('Response should return at least one employee', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('Response should return a status 404', async () => {
    const response = await request(app).get('/employeesss').send();
    expect(response.status).toBe(404);
  });
});

describe('GET BY ID /employees/:id', () => {
  test('Incorrect route the response should return a status 404', async () => {
    const response = await request(app).get('/employeess/62842cca8deb423ec414a09f').send();
    expect(response.status).toBe(404);
  });

  test('Incorrect id the response should return a status 400', async () => {
    const response = await request(app).get('/employees/f0lseid4324').send();
    expect(response.status).toBe(400);
  });

  test('Non existent id the response should return a status 400', async () => {
    const response = await request(app).get('/employees/56865d17382y7759987f5b80').send();
    expect(response.status).toBe(400);
  });

  test('Correct id the response should return a status 200', async () => {
    const response = await request(app).get('/employees/62842cca8deb423ec414a09f').send();
    expect(response.status).toBe(200);
  });

  test('Correct id the response should return a error false', async () => {
    const response = await request(app).get('/employees/62842cca8deb423ec414a09f').send();
    expect(response.body.error).not.toBe(true);
  });
});

describe('POST /employees', () => {
  test('Correct user the response should return a status 201', async () => {
    const response = await request(app).post('/employees/create').send({
      firstName: 'Javier',
      lastName: 'Lazzarini',
      phone: 3412510021,
      email: 'javier.lazzarini@gmail.com',
      password: '1234qwer',
      active: true,
    });
    employeeId = response.body.data._id;
    expect(response.status).toBe(201);
  });
  test('Correct user the response should return a error false', async () => {
    const response = await request(app).post('/employees/create').send({
      firstName: 'Javier',
      lastName: 'Lazzarini',
      phone: 3412510021,
      email: 'javier.lazzarillo@gmail.com',
      password: '1234qwer',
      active: true,
    });
    expect(response.body.error).toBe(false);
  });

  test('Correct user the response should return a correct message', async () => {
    const response = await request(app).post('/employees/create').send({
      firstName: 'Javier',
      lastName: 'Lazzarini',
      phone: 3412510021,
      email: 'javier.lazzarillodetorres@gmail.com',
      password: '1234qwer',
      active: true,
    });
    expect(response.body.message).toEqual('New employee created');
  });
});

describe('PUT /employees/:id', () => {
  test('Status 200 if the employee was modified', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Lucas',
    });
    expect(response.status).toEqual(200);
  });
  test('Invalid name returns a status 400', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: '',
    });
    expect(response.status).toBe(400);
  });

  test('Invalid last name returns me an undefined data', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      lastName: 'Lazzari%i',
    });
    expect(response.body.msg).toEqual(undefined);
  });

  test('Return a true error if not id', async () => {
    const response = await request(app).put('/employees/').send();
    expect(response.status).toBe(404);
  });
});

describe('DELETE /employees/:id', () => {
  test('Incorrect id the response should return a status 400', async () => {
    const response = await request(app).delete('/employees/82383sdhsdjasa').send();
    expect(response.status).toBe(400);
  });

  test('Incorrect route the response should return a status 404', async () => {
    const response = await request(app).delete('/employeee/12345614882f8759987f5bj8').send();
    expect(response.status).toBe(404);
  });

  test('Nonexist id the response should return a status 400', async () => {
    const response = await request(app).delete('/employees/12rfit14882f8759987f5b50').send();
    expect(response.status).toBe(400);
  });

  test('Nonexistent id the response should return a error true', async () => {
    const response = await request(app).delete('/employees/1l3a5j74882f8759987f5b50').send();
    expect(response.body.error).toBe(true);
  });

  test('Correct id the response should return a status 204', async () => {
    const response = await request(app).delete(`/employees/${employeeId}`).send();
    expect(response.status).toBe(204);
  });
});
