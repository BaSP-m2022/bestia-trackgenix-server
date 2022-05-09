import express from 'express';
import fs from 'fs';

const timesheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/', (req, res) => res.send(timesheets));

// POST METHOD

router.post('/add', (req, res) => {
  const newTimesheet = req.body;
  if (newTimesheet.id && newTimesheet.description && newTimesheet.day && newTimesheet.role
    && newTimesheet.project && newTimesheet.task && newTimesheet.validated
    && newTimesheet.projectId && newTimesheet.projectManager) {
    timesheets.push(newTimesheet);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send('New timesheet created');
      }
    });
    res.send('New timesheet created');
  } else {
    res.send('need more data');
  }
});

// DELETE METHOD

router.delete('/delete/:id', (req, res) => {
  const timesheetId = req.params.id;
  const filteredTimesheets = timesheets.filter((f) => f.id !== timesheetId);
  if (timesheets.length === filteredTimesheets.length) {
    res.send('could not delate user because does not exist');
  } else {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTimesheets), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send('Timesheet deleted');
      }
    });
  }
});

// GET METHOD

router.get('/getById/:id', (req, res) => {
  const timesheetId = req.params.id;
  // eslint-disable-next-line no-shadow
  const getById = timesheets.find((getById) => getById.id === timesheetId);
  if (getById) {
    res.send(getById);
  } else {
    res.send('Timesheet not found');
  }
});

// PUT METHOD

router.put('/updated/:id', (req, res) => {
  const timesheetId = req.params.id;
  const id = timesheets.find((u) => u.id === timesheetId);
  if (id) {
    const updatedId = req.body;
    const newTimesheet = {};
    newTimesheet.id = timesheetId;
    newTimesheet.description = updatedId.description ? updatedId.description : id.description;
    newTimesheet.day = updatedId.day ? updatedId.day : id.day;
    newTimesheet.role = updatedId.role ? updatedId.role : id.role;
    newTimesheet.project = updatedId.project ? updatedId.project : id.project;
    newTimesheet.task = updatedId.task ? updatedId.task : id.task;
    newTimesheet.validated = updatedId.validated ? updatedId.validated : id.validated;
    newTimesheet.projectId = updatedId.projectId ? updatedId.projectId : id.projectId;
    // eslint-disable-next-line max-len
    newTimesheet.projectManager = updatedId.projectManager ? updatedId.projectManager : id.projectManager;
    const newUpdatedId = timesheets.filter((p) => p.id !== timesheetId);
    newUpdatedId.push(newTimesheet);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(newUpdatedId), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send('Timesheet updated');
      }
    });
  } else {
    res.send('Timesheet not found');
  }
});

export default router;
