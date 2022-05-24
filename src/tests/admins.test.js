import request from 'supertest';
import app from '../app';
import admins from '../models/Admins';
import adminSeed from '../seeds/admins';

beforeAll(async () => {
  await admins.collection.insertMany(adminSeed);
});

const adminId = '628280bb5f3eb70e3a651724';

describe('GET /admins', () => {
  describe('Get all admins', () => {
    test('It should get all admins', async () => {
      const response = await request(app).get('/admins').send();
      expect(response.status).toBe(200);
      expect(response.body.msg).toEqual('All Admins are:');
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.error).toBe(false);
    });
    test('It should get status 400', async () => {
      const response = await request(app).get('/admins?firstName=nwkwm');
      expect(response.status).toBe(400);
      expect(response.body.msg).toEqual('An error has ocurred.');
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBe(undefined);
    });
  });
  describe('Get admin by Id', () => {
    test('It should get admin by Id', async () => {
      const response = await request(app).get(`/admins/${adminId}`);
      expect(response.status).toBe(200);
      expect(response.body.msg).toEqual(`The admin with id ${adminId} is:`);
      expect(response.body.error).toBe(false);
    });
    test('It should get status 400', async () => {
      const response = await request(app).get('/admins');
      expect(response.status).toBe(400);
      expect(response.body.msg).toEqual(`Admin with id ${adminId} was not found.`);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBe(undefined);
    });
    test('It should get status 404', async () => {
      const response = await request(app).get('/admins');
      expect(response.body.message).toBe('An error has occurred.');
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBe(undefined);
    });
  });
});
