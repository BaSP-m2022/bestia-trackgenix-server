const express = require('express');
const fs = require('fs');

const router = express.Router();
const projects = require('../data/projects.json');

router.get('/getAll', (req, res) => {
  res.send(projects);
});

router.get('/getById/:id', (req, res) => {
  const projectid = req.params.id;
  const project = projects.find((proj) => proj.id === projectid);
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

/* router.put('/:id', (req, res) => {
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
    res.status(400).json({ msg: `No projects with the id of ${req.params.id}` });
  }
}); */

router.put('/edit/:id', (req, res) => {
  const projectId = req.params.id;
  const found = projects.some((pro) => pro.id === projectId);
  if (found) {
    const updProject = req.body;
    projects.forEach((pr) => {
      const pr2 = pr;
      if (pr2.id === projectId) {
        pr2.id = updProject.id ? updProject.id : pr2.id;
        pr2.name = updProject.name ? updProject.name : pr2.name;
        pr2.startDate = updProject.startDate ? updProject.startDate : pr2.startDate;
        pr2.endDate = updProject.endDate ? updProject.endDate : pr2.endDate;
        pr2.clientName = updProject.clientName ? updProject.clientName : pr2.clientName;
        pr2.active = updProject.active ? updProject.active : pr2.active;
        pr2.employees = updProject.employees ? updProject.employees : pr2.employees;
        pr2.role = updProject.role ? updProject.role : pr2.role;
        fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.json({ msg: 'Project Updated', pr2 });
          }
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No projects with the id of "${projectId}"` });
  }
});

// Assign an Employee to a Project with a role (QA, PM, DEV, TL):

router.post('/assignEmployee/:id', (req, res) => {
  const projectId = req.params.id;
  const found = projects.some((p) => p.id === projectId);
  if (found) {
    const assingEmployee = req.body;
    projects.forEach((e) => {
      if (e.id === projectId) {
        const employee = { employeeId: assingEmployee.employeeId, role: assingEmployee.role };
        e.employees.push(employee);
        fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.json({ msg: 'Employee role updated', e });
          }
        });
      }
    });
  } else {
    res.status(400).json({ msg: `Employee not found with the id: "${projectId}"` });
  }
});

module.exports = router;
