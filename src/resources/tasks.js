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
    res.send(`Employee with ID number "${emplId}" does not exist`);
  }
});

// Delete a task
router.delete('/task/:taskID', (req, res) => {
  const tasksId = req.params.taskID;
  const idOfTasks = tasks.filter((task) => task.taskID !== tasksId);
  if (tasks.length === idOfTasks.length) {
    res.send('This task could not be found');
  } else {
    fs.writeFile('src/data/tasks.json', JSON.stringify(idOfTasks), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Task succesfully deleted');
      }
    });
  }
});

// Create a task
router.post('/task', (req, res) => {
  const taskData = req.body;
  const taskFound = tasks.find((task) => task.taskID === taskData.taskID);
  if (taskData.taskID && taskData.taskName && taskData.taskDescription
    && taskData.status && taskData.employeeID && !taskFound) {
    tasks.push(taskData);
    fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Task succesfully created');
      }
    });
  } else {
    res.send('Task cannot be created. Review fields.');
  }
});

module.exports = router;
