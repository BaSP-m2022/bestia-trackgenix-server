const express = require('express');
const fs = require('fs');

const router = express.Router();
const projects = require('../data/projects.json');

router.get('/getAll', (req, res) => {
  res.send(projects);
});

router.get('/getById/:id', (req, res) => {
  const projectid = req.params.id;
  const project = projects.find((p) => p.id === projectid);
  if (project) {
    res.send(project);
  } else {
    res.send('proyect not found');
  }
});

router.post('/Add', (req, res) => {
  const projectData = req.body;
  projects.push(projectData);
  fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Project added');
    }
  });
});

module.exports = router;
