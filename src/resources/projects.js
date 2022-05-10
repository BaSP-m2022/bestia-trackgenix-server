const express = require('express');
const fs = require('fs');

const router = express.Router();

const projects = require('../data/projects.json');

// Create a project:
router.post('/add', (req, res) => {
  const projectData = req.body;
  if (projectData.id
        && projectData.name
        && projectData.description
        && projectData.startDate
        && projectData.endDate
        && projectData.clientName
        && projectData.state
        && projectData.employees) {
    projects.push(projectData);
    fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send('New project created');
      }
    });
  } else {
    res.send('You need to fill all the fields');
  }
});

// Delete a project by ID:
router.delete('/delete/:id', (req, res) => {
  const projectId = req.params.id;
  const projectSearch = projects.filter((projectFilter) => projectFilter.id === projectId);
  if (projectSearch) {
    res.json({
      msg: 'Project deleted',
      projectDeleted: projects.filter((projectsDel) => projectsDel.id === projectId),
      projectsLeft: projects.filter((projectsRemain) => projectsRemain.id !== projectId),
    });
  } else {
    res.send('Error. We could not delete this project');
  }
});

/// FILTERS:

// Filter project by name:
router.get('/getByName/:name', (req, res) => {
  const filterNameProject = req.params.name;
  const projectNamed = projects.filter((project) => project.name === filterNameProject);
  if (projectNamed.length > 0) {
    res.send(projectNamed);
  } else {
    res.send(`There is no project with "${filterNameProject}" name`);
  }
});

// Filter project by start date:
router.get('/getByStartDate/:startDate', (req, res) => {
  const filterStartDateProject = req.params.startDate;
  const projectStarted = projects.filter((project) => project.startDate === filterStartDateProject);
  if (projectStarted.length > 0) {
    res.send(projectStarted);
  } else {
    res.send(`There is no project with "${filterStartDateProject}" that start date`);
  }
});

// Filter project by end date:
router.get('/getByEndDate/:endDate', (req, res) => {
  const filterEndDateProject = req.params.endDate;
  const projectEnded = projects.filter((project) => project.endDate === filterEndDateProject);
  if (projectEnded.length > 0) {
    res.send(projectEnded);
  } else {
    res.send(`There is no project with "${filterEndDateProject}" that end date`);
  }
});

// Filter project by client name:
router.get('/getByClientName/:clientName', (req, res) => {
  const filterClientNameProject = req.params.clientName;
  const projectClientNamed = projects.filter((project) => project.clientName
  === filterClientNameProject);
  if (projectClientNamed.length > 0) {
    res.send(projectClientNamed);
  } else {
    res.send(`There is no project with "${filterClientNameProject}" name`);
  }
});

// Filter project by state (active/finished):
router.get('/getByState/:state', (req, res) => {
  const filterStateProject = req.params.state;
  const projectState = projects.filter((project) => project.state === filterStateProject);
  if (projectState.length > 0) {
    res.send(projectState);
  } else {
    res.send(`There are no projects "${filterStateProject}"`);
  }
});

module.exports = router;
