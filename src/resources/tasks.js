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

// Obtain tasks by Employee
router.get('/employee/:employeeID', (req, res) => {
  const emplId = req.params.employeeID;
  const idOfEmployee = tasks.filter((task) => task.employeeID === emplId);
  if (idOfEmployee.length > 0) {
    res.send(idOfEmployee);
  } else {
    res.send(`Eemployee with ID number "${emplId}" does not exist`);
  }
});

module.exports = router;
