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

export default router;
