
import Task from '../models/Tasks';

const createTask = async (req, res) => {
  try {
    const task = new Task({
      parentProject: req.body.parentProject,
      taskCreatorId: req.body.taskCreatorId,
      taskName: req.body.taskName,
      taskDescription: req.body.taskDescription,
      assignedEmployee: req.body.assignedEmployee,
      startDate: req.body.startDate,
      status: req.body.status,
    });
    const result = await task.save();
    return res.status(201).json({
      message: 'Task has been created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `The task with ID: ${req.params.id} hasn't been found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'The task has been successfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export default {
  createTask,
  deleteTask,
};
/*const express = require('express');
const fs = require('fs');
const { default: mongoose } = require('mongoose');
const tasks = require('../data/tasks.json');
const validations = require('../validations/tasks.js')

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

// Edit a task
router.put('/task/:taskID', (req, res) => {
  let tasksId = req.params.taskID;
  const jsonData = fs.readFileSync('src/data/tasks.json');
  const data = JSON.parse(jsonData);
  const filterTasks = tasks.find((task) => task.taskID === tasksId);
  if (filterTasks) {
    tasksId -= 1;
    data[tasksId].taskName = req.body.taskName;
    data[tasksId].taskDescription = req.body.taskDescription;
    data[tasksId].status = req.body.status;
    data[tasksId].employeeID = req.body.employeeID;
    fs.writeFileSync('src/data/tasks.json', JSON.stringify(data));
    res.json(data);
  } else {
    res.send('Task not found');
  }
});

module.exports = router;*/
