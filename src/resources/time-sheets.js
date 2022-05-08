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

// PUT METHOD

export default router;
