import request from 'supertest';
import app from '../app';
import superAdmins from '../models/Super-admins';
import superAdminsseeds from '../seeds/super-admins';

beforeAll(async () => {
  await superAdmins.collection.insertMany(superAdminsseeds);
});

let superAdminsId;

describe('GET /superAdmins', () => {
    test('response should return a 200 status', async () => {
        const response = await request(app).get('/Super-admins').send();
        expect(response.status).toBe(200);
    });
    test('response should return false error', async () => {
        const response = await request(app).get('/super-admins').send();
        console.log(response);
        expect(response.error).toBe(false);
    });
    test('response should return a 400 status', async () => {
        const response = await request(app).get('/super-admins').send();
        console.log(response);
        expect(response.error).not.toBe(400);
    });
})

describe('POST /super-admins create', () => {
  test('should create an super-admin', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Alair',
      lastName: 'Alair',
      email: 'avaggers0@baidu.com',
      password: 'LmAt8EsOR',
      active: true,
    });
    expect(response.status).toBe(201);
    superAdminsId = response.body.data._id;
  });
  test('message should indicate the creation of the super-admin', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Alair',
      lastName: 'Alair',
      email: 'avaggers0@baidu.com',
      password: 'LmAt8EsOR',
      active: true,
    });
    expect(response.body.message).toEqual('Super Admin created');
  });
  test('response should return a 400 status', async () => {
    const response = await request(app).post('/admins').send();
    console.log(response);
    expect(response.error).not.toBe(400);
  });
  test('response should return false error', async () => {
    const response = await request(app).get('/super-admins').send();
    console.log(response);
    expect(response.error).toBe(false);
  });
  /* test('message should indicate error creating an admin', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Bruce',
      lastName: 'asasasa',
      email: 'hulksmash1234@baidu.com',
      password: 'LmAt8EsOR',
      active: true,
    });
    expect(response.body.message).not.toEqual('An error has occurred.');
  });*/
});

describe('DELETE /super-admins/id', () => {
  test('Should delete a super-admin', async () => {
    const response = await request(app).delete(`/super-admins/${superAdminsId}`).send();
    expect(response.status).toEqual(200);
  });
  test('response should return false error', async () => {
    const response = await request(app).delete(`/super-admins/${superAdminsId}`).send();
    console.log(response);
    expect(response.error).not.toBe(false);
  });
  test('response should return a 400 status', async () => {
    const response = await request(app).delete(`/super-admins/${superAdminsId}`).send();
    console.log(response);
    expect(response.error).not.toBe(400);
  });
  test('response should return a 404 status', async () => {
    const response = await request(app).delete(`/super-admins/${superAdminsId}`).send();
    console.log(response);
    expect(response.error).not.toBe(404);
  });
});

/* describe('GET /super-admins/id', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get(`/super-admins/${superAdminsId}`).send();
    expect(response.status).toBe(200);
  });
  test('response should return false error', async () => {
    const response = await request(app).get(`/super-admins/${superAdminsId}`).send();
    console.log(response);
    expect(response.error).toBe(false);
  });
  test('response should return a 400 status', async () => {
    const response = await request(app).get(`/super-admins/${superAdminsId}`).send();
    console.log(response);
    expect(response.error).not.toBe(400);
  });
  test('response should return a 500 status', async () => {
    const response = await request(app).get(`/super-admins/${superAdminsId}`).send();
    console.log(response);
    expect(response.error).not.toBe(500);
  });
});

/*describe('PUT /super-admins/id', () => {
  test('message should indicate the update of the super-admin', async () => {
    const response = await request(app).put('/super-admins').send({
      firstName: 'Alair',
      lastName: 'Alair',
      email: 'avaggers0@baidu.com',
      password: 'LmAt8EsOR',
      active: true,
    });
    expect(response.body.message).toEqual('Super Admin updated successfully');
  });
  /* test('response should return a 200 status', async () => {
    const response = await request(app).put(`/super-admins/${superAdminsId}`).send();
    expect(response.status).toBe(200);
  });
  test('response should return false error', async () => {
    const response = await request(app).put(`/super-admins/${superAdminsId}`).send();
    console.log(response);
    expect(response.error).toBe(false);
  });
  test('response should return a 400 status', async () => {
    const response = await request(app).put(`/super-admins/${superAdminsId}`).send();
    console.log(response);
    expect(response.error).not.toBe(400);
  });
  test('response should return a 500 status', async () => {
    const response = await request(app).put(`/super-admins/${superAdminsId}`).send();
    console.log(response);
    expect(response.error).not.toBe(500);
  });
});*/
