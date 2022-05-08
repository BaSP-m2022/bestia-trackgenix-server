import express from 'express';
import fs from 'fs';

const timesheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/', (req, res) => res.send(timesheets));

// POST METHOD

router.post('/addTimesheet', (req, res) => {
  const newTimesheet = req.body;
  timesheets.push(newTimesheet);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send('New timesheet created');
    }
  });
});

// PUT METHOD

export default router;
