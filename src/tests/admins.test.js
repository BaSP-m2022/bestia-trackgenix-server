import request from 'supertest';
import app from '../app';
import admins from '../models/Admins';
import adminSeed from '../seeds/admins';

beforeAll(async () => {
  await admins.collection.insertMany(adminSeed);
});

const adminId = '6283e77c10c72da6c2064590';

describe('GET /admins', () => {
  describe('Get all admins', () => {
    test('It should get status 200', async () => {
      const response = await request(app).get('/admins');
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('All Admins are:');
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.error).toBe(false);
    });
    test('It should get status 400', async () => {
      const response = await request(app).get('/admins?firstName=Pepito');
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Cannot show the list of admins.');
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBe(undefined);
    });
  });
  describe('Get admin by Id', () => {
    test('It should get admin by Id', async () => {
      const response = await request(app).get('/admins/6283e77c10c72da6c2064590');
      expect(response.body.message).toEqual('The admin is:');
      expect(response.status).toBe(200);
      expect(response.body.error).toBe(false);
    });
    test('It should get status 400', async () => {
      const response = await request(app).get('/admins/6283e00c00c72da6c2064590');
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Admin was not found.');
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBe(undefined);
    });
    test('It should get status 404', async () => {
      const response = await request(app).get('/admins/1234');
      expect(response.body.message).toBe('An error has occurred.');
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBe(undefined);
    });
  });
});

describe('PUT /admins/:id', () => {
  test('It should get status 200', async () => {
    const response = await request(app).put('/admins/6283e77c10c72da6c2064590').send(
      {
        firstName: 'melina',
        lastName: 'giacone',
        email: 'melinabgiacone@gmail.com',
        password: 'abcde123',
        active: true,
      },
    );
    expect(response.body.msg).toBe('Admin updated');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).not.toBe(undefined);
  });
  test('It should get status 404', async () => {
    const response = await request(app).put('/admins/6283e77c10c72da6c2060000').send({
      firstName: 'melina',
      lastName: 'Giacone',
      email: 'melinabgiacone@gmail.com',
      password: 'abcde123',
      active: true,
    });
    expect(response.body.msg).toBe('Admin not found');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
  });
});

describe('DELETE /admins/:id', () => {
  test('It should delete admin', async () => {
    const response = await request(app).delete(`/admins/${adminId}`).send();
    expect(response.body.message).toBe('Admin deleted successfully.');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toEqual(expect.anything());
  });
  test('It should return status 404', async () => {
    const response = await request(app).delete('/admins/628a59c9f67d45161581886a').send();
    expect(response.body.message).toBe('The Admin has not been found');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
});

describe('POST /admins/:id', () => {
  test('It should get status 200', async () => {
    const response = await request(app).post('/admins/').send(
      {
        firstName: 'antonia',
        lastName: 'giaco',
        email: 'melinabgne@gmail.com',
        password: 'abcde123',
        active: true,
      },
    );
    expect(response.body.message).toBe('Admin created successfully.');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
});
