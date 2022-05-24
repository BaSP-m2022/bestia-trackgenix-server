import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

let projectId;

// GET Test:
describe('Test GET /', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/').send();
    expect(response.status).toBe(200);
  });
  test('Response should return false error', async () => {
    const response = await request(app).get('/').send();
    expect(response.error).toBeFalsy();
  });
  test('Response should return at least one project', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data).toBeGreaterThan(0);
  });
  test('Response should return the message: Project found', async () => {
    const response = await request(app).get('/projects/628424c0f931e340851841ff').send();
    expect(response.body.message).toBe('Project found');
  });
});

// PUT Test:
describe('Test PUT /', () => {
  test('Project should be updated', async () => {
    const response = await request(app).put('/628424c0f931e340851841ff').send({
      name: 'The Justice League',
      description: 'The mightiest heroes on the planet',
      startDate: '2022-03-21T18:02:23.412+00:00',
      endDate: '2022-05-21T18:02:23.412+00:00',
      clientName: 'Nick Fury',
      state: 'Active',
      employees: [
        {
          role: 'DEV',
          rate: '10',
          _id: '62842ad08deb423ec414a097',
        },
      ],
    });
    expect(response.status).toBe(200);
  });

  test('Response should return error false', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'The Justice League',
      description: 'The mightiest heroes on the planet',
      startDate: '2022-03-21T18:02:23.412+00:00',
      endDate: '2022-05-21T18:02:23.412+00:00',
      clientName: 'Nick Fury',
      employees: [
        {
          role: 'DEV',
          rate: '10',
          _id: '62842ad08deb423ec414a097',
        },
      ],
    });
    expect(response.error).toBeFalsy();
  });

  test('Response should return message: Project has been successfully updated', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'The Justice League',
      description: 'The mightiest heroes on the planet',
      startDate: '2022-03-21T18:02:23.412+00:00',
      endDate: '2022-05-21T18:02:23.412+00:00',
      clientName: 'Nick Fury',
      employees: [
        {
          role: 'DEV',
          rate: '10',
          _id: '62842ad08deb423ec414a097',
        },
      ],
    });
    expect(response.body.message).toBe('Project has been successfully updated');
  });

  test('Project name should be required', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      description: 'The mightiest heroes on the planet',
      startDate: '2022-03-21T18:02:23.412+00:00',
      endDate: '2022-05-21T18:02:23.412+00:00',
      clientName: 'Nick Fury',
      employees: [
        {
          role: 'DEV',
          rate: '10',
          _id: '62842ad08deb423ec414a097',
        },
      ],
    });
    expect(response.status).toBe(400);
  });

  test('A valid start date is required', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'The Justice League',
      description: 'The mightiest heroes on the planet',
      startDate: 'sarasa',
      endDate: '2022-05-21T18:02:23.412+00:00',
      clientName: 'Nick Fury',
      employees: [
        {
          role: 'DEV',
          rate: '10',
          _id: '62842ad08deb423ec414a097',
        },
      ],
    });
    expect(response.status).toBe(400);
  });

  test('Employee id should be required', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'The Justice League',
      description: 'The mightiest heroes on the planet',
      startDate: '2022-03-21T18:02:23.412+00:00',
      endDate: '2022-05-21T18:02:23.412+00:00',
      clientName: 'Nick Fury',
      employees: [
        {
          role: 'DEV',
          rate: '10',
        },
      ],
    });
    expect(response.status).toBe(400);
  });

  test('Project name should not be longer than 50 characters', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'The Justice League: Green Lantern, Flash, Superman, Batman, Wonder Woman, Aquaman and Martian Manhunter',
      description: 'The mightiest heroes on the planet',
      startDate: '2022-03-21T18:02:23.412+00:00',
      endDate: '2022-05-21T18:02:23.412+00:00',
      clientName: 'Nick Fury',
      employees: [
        {
          role: 'DEV',
          rate: '10',
          _id: '62842ad08deb423ec414a097',
        },
      ],
    });
    expect(response.status).toBe(400);
  });

  test('Project should not be found', async () => {
    const wrongProjectId = 'p6283baefcd44998f831522aa';
    const response = await request(app).put(`/projects/${wrongProjectId}`).send({
      name: 'The Justice League',
      description: 'The mightiest heroes on the planet',
      startDate: '2022-03-21T18:02:23.412+00:00',
      endDate: '2022-05-21T18:02:23.412+00:00',
      clientName: 'Nick Fury',
      employees: [
        {
          role: 'DEV',
          rate: '10',
          _id: '62842ad08deb423ec414a097',
        },
      ],
    });
    expect(response.status).toBe(404);
  });
});
