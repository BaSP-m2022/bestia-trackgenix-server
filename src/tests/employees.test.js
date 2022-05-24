import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

/* describe('GET /employees', () => {
  test('Response should return a status 200', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(400);
  });

  test('Response should return a false error', async () => {
      const response = await request(app).get('/employees').send();
      expect(response.error).not.toBe(true);
  })

  test( 'Response should return at least one employee', async () => {
      const response = await request(app).get('/employees').send();
      console.log(response)
      expect(response.body.data.length).toBeGreaterThan(0);
  })

  test('Response should return a status 404', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(404);
  });
}); */

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

/* let idNewEmployeeCreated; */

describe('POST /employees', () => {
  test('Correct user the response should return a status 201', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Javier',
      lastName: 'Lazzarini',
      email: 'javier.lazzarini@gmail.com',
      password: '1234qwer',
      dni: 37727529,
      address: 'Castagnino 327',
      city: 'Rosario',
      zip: 2000,
      status: true,
      role: 'QA',
      projects: ['62842e50199c1bb10f30d420'],
    });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    /*     idNewEmployeeCreated = response.body.data._id; */
  });

  test('Correct user the response should return a error false', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Javier',
      lastName: 'Lazzarini',
      email: 'javier.lazzarini@gmail.com',
      password: '1234qwer',
      dni: 37727529,
      address: 'Castagnino 327',
      city: 'Rosario',
      zip: 2000,
      status: true,
      role: 'QA',
      projects: ['62842e50199c1bb10f30d421'],
    });
    expect(response.body.error).toBe(false);
  });

  test('Correct user the response should return a correct message', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Javier',
      lastName: 'Lazzarini',
      email: 'javier.lazzarini@gmail.com',
      password: '1234qwer',
      dni: 37727529,
      address: 'Castagnino 327',
      city: 'Rosario',
      zip: 2000,
      status: true,
      role: 'QA',
      projects: ['62842e50199c1bb10f30d312'],
    });
    expect(response.body.message).toEqual('New employee created');
  });
});
