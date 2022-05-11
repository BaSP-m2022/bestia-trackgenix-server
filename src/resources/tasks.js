const express = require('express');
const fs = require('fs');
const tasks = require('../data/tasks.json');

const router = express.Router();

// Show Tasks
router.get('/getAll', (req, res) => {
  res.send(tasks);
});

// Obtain a task by ID
router.get('/taskId/:taskID', (req, res) => {
  const findTask = req.params.taskID;
  const taskFound = tasks.find((task) => task.taskID === findTask);
  if (taskFound) {
    res.send(taskFound);
  } else {
    res.send('Task not found');
  }
});

// Obtain a task by Name
router.get('/taskName/:taskName', (req, res) => {
  const nameTask = req.params.taskName;
  const taskNamed = tasks.filter((task) => task.taskName === nameTask);
  if (taskNamed.length > 0) {
    res.send(taskNamed);
  } else {
    res.send(`"${nameTask}" is not a defined task`);
  }
});

module.exports = router;
