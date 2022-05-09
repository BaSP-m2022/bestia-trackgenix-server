const express = require('express');
const fs = require('fs');

const router = express.Router();

const projects = require('../data/projects.json');

// Obtain all projects:
router.get('/getAll', (req, res) => {
  res.send(projects);
});

// Obtain a project by ID:
router.get('/getById/:id', (req, res) => {
  const projectId = req.params.id;
  const projectSearch = projects.find((projectFind) => projectFind.id === projectId);
  if (projectSearch) {
    res.send(projectSearch);
  } else {
    res.send('Project not found');
  }
});

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
    res.send('New project created');
  } else {
    res.send('Error. You need to fill all the fields');
  }
});

/* router.post('/add', (req, res) => {
    const projectData = req.body;
    if (projectData.id) {
        projects.push(projectData);
        fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send('Project added');
            }
        });
    }
}); */

// Edit a project:
router.put('/:id', (req, res) => {
  const found = projects.some((p) => p.id === String(req.params.id));
  if (found) {
    const updProject = req.body;
    projects.forEach((p) => {
      if (p.id === String(req.params.id)) {
        projects.id = updProject.id ? updProject.id : p.id;
        projects.name = updProject.name ? updProject.name : p.name;
        projects.startDate = updProject.startDate ? updProject.startDate : p.startDate;
        projects.endDate = updProject.endDate ? updProject.endDate : p.endDate;
        projects.clientName = updProject.clientName ? updProject.clientName : p.clientName;
        projects.active = updProject.active ? updProject.active : p.active;
        projects.employees = updProject.employees ? updProject.employees : p.employees;
        res.json({ msg: 'project updated', p });
      }
    });
  } else {
    res.status(400).json({ msg: `No projects with the id of "${req.params.id}"` });
  }
});

// Delete a project by ID:
router.delete('/delete/:id', (req, res) => {
  const projectId = req.params.id;
  const projectSearch = projects.filter((projectFilter) => projectFilter.id === projectId);
  if (projectSearch) {
    res.json({
      msg: 'Project deleted',
      projectDeleted: projects.filter((projects) => projects.id === projectId),
      projectsLeft: projects.filter((projects) => projects.id !== projectId),
    });
  } else {
    res.send('Error. We could not delete this project');
  }
});

/// /FILTERS:

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
  const projectClientNamed = projects.filter((project) => project.clientName ===
  filterClientNameProject);
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

/* if (projects.includes(projectId.value)) {
    res.send('Error. We could not find the project'); */

/* res.status(404).json({
    msg: 'The project with ID ${id} does not exist',
});

res.status(200).json({
    data: project,
});
 */
