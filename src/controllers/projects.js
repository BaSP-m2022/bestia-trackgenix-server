// const express = require('express');
// const fs = require('fs');
// const router = express.Router();
// const projects = require('../data/projects.json');

import Project from '../models/Projects';

// const projects = [];

const create = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      state: req.body.state,
      employees: req.body.employees,
    });
    await project.save();
    return res.status(201).json({
      message: 'Project was created',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const deleteById = async (req, res) => {
  const projectId = req.params.id;
  try {
    if (!projectId) {
      return res.status(400).send({
        message: 'Missing ID parameter',
        data: undefined,
        error: true,
      });
    }
    const searchProject = await Project.findByIdAndDelete(projectId);
    return res.status(204).send({
      message: 'Project was deleted',
      data: searchProject,
      error: false,
    });
  } catch (error) {
    return res.send({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await Project.findById(req.params.id);
      if (!project) {
        res.status(404).json({
          message: 'Project not found',
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
        message: 'Project found',
        data: project,
        error: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const put = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'Id not found',
        data: undefined,
        error: true,
      });
    }
    const updateProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updateProject) {
      return res.status(404).json({
        msg: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Project updated',
      data: updateProject,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};
// // Create a project:
// router.post('/add', (req, res) => {
//   const projectData = req.body;
//   if (projectData.id
//         && projectData.name
//         && projectData.description
//         && projectData.startDate
//         && projectData.endDate
//         && projectData.clientName
//         && projectData.state
//         && projectData.employees) {
//     projects.push(projectData);
//     fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (error) => {
//       if (error) {
//         res.send(error);
//       } else {
//         res.send('New project created');
//       }
//     });
//   } else {
//     res.send('You need to fill all the fields');
//   }
// });

// // Delete a project by ID:
// router.delete('/delete/:id', (req, res) => {
//   const projectId = req.params.id;
//   const projectSearch = projects.filter((projectFilter) => projectFilter.id === projectId);
//   if (projectSearch) {
//     res.json({
//       msg: 'Project deleted',
//       projectDeleted: projects.filter((projectsDel) => projectsDel.id === projectId),
//       projectsLeft: projects.filter((projectsRemain) => projectsRemain.id !== projectId),
//     });
//   } else {
//     res.send('Error. We could not delete this project');
//   }
// });

// /// FILTERS:

// // Filter project by name:
// router.get('/getByName/:name', (req, res) => {
//   const filterNameProject = req.params.name;
//   const projectNamed = projects.filter((project) => project.name === filterNameProject);
//   if (projectNamed.length > 0) {
//     res.send(projectNamed);
//   } else {
//     res.send(`There is no project with "${filterNameProject}" name`);
//   }
// });

// // Filter project by start date:
// router.get('/getByStartDate/:startDate', (req, res) => {
//   const filterStartDateProject = req.params.startDate;
//   const projectStarted = projects.filter((project)
// => project.startDate === filterStartDateProject);
//   if (projectStarted.length > 0) {
//     res.send(projectStarted);
//   } else {
//     res.send(`There is no project with "${filterStartDateProject}" that start date`);
//   }
// });

// // Filter project by end date:
// router.get('/getByEndDate/:endDate', (req, res) => {
//   const filterEndDateProject = req.params.endDate;
//   const projectEnded = projects.filter((project) => project.endDate === filterEndDateProject);
//   if (projectEnded.length > 0) {
//     res.send(projectEnded);
//   } else {
//     res.send(`There is no project with "${filterEndDateProject}" that end date`);
//   }
// });

// // Filter project by client name:
// router.get('/getByClientName/:clientName', (req, res) => {
//   const filterClientNameProject = req.params.clientName;
//   const projectClientNamed = projects.filter((project) => project.clientName
//   === filterClientNameProject);
//   if (projectClientNamed.length > 0) {
//     res.send(projectClientNamed);
//   } else {
//     res.send(`There is no project with "${filterClientNameProject}" name`);
//   }
// });

// // Filter project by state (active/finished):
// router.get('/getByState/:state', (req, res) => {
//   const filterStateProject = req.params.state;
//   const projectState = projects.filter((project) => project.state === filterStateProject);
//   if (projectState.length > 0) {
//     res.send(projectState);
//   } else {
//     res.send(`There are no projects "${filterStateProject}"`);
//   }
// });

// router.get('/getAll', (req, res) => {
//   res.send(projects);
// });

// router.get('/getById/:id', (req, res) => {
//   const projectid = req.params.id;
//   const project = projects.find((proj) => proj.id === projectid);
//   if (project) {
//     res.send(project);
//   } else {
//     res.send('proyect not found');
//   }
// });

// /* router.put('/:id', (req, res) => {
//   const found = projects.some((p) => p.id === String(req.params.id));
//   if (found) {
//     const updProject = req.body;
//     projects.forEach((p) => {
//       if (p.id === String(req.params.id)) {
//         projects.id = updProject.id ? updProject.id : p.id;
//         projects.name = updProject.name ? updProject.name : p.name;
//         projects.startDate = updProject.startDate ? updProject.startDate : p.startDate;
//         projects.endDate = updProject.endDate ? updProject.endDate : p.endDate;
//         projects.clientName = updProject.clientName ? updProject.clientName : p.clientName;
//         projects.active = updProject.active ? updProject.active : p.active;
//         projects.employees = updProject.employees ? updProject.employees : p.employees;

//         res.json({ msg: 'project updated', p });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No projects with the id of ${req.params.id}` });
//   }
// }); */

// router.put('/edit/:id', (req, res) => {
//   const projectId = req.params.id;
//   const found = projects.some((pro) => pro.id === projectId);
//   if (found) {
//     const updProject = req.body;
//     projects.forEach((pr) => {
//       const pr2 = pr;
//       if (pr2.id === projectId) {
//         pr2.id = updProject.id ? updProject.id : pr2.id;
//         pr2.name = updProject.name ? updProject.name : pr2.name;
//         pr2.startDate = updProject.startDate ? updProject.startDate : pr2.startDate;
//         pr2.endDate = updProject.endDate ? updProject.endDate : pr2.endDate;
//         pr2.clientName = updProject.clientName ? updProject.clientName : pr2.clientName;
//         pr2.active = updProject.active ? updProject.active : pr2.active;
//         pr2.employees = updProject.employees ? updProject.employees : pr2.employees;
//         pr2.role = updProject.role ? updProject.role : pr2.role;
//         fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (err) => {
//           if (err) {
//             res.send(err);
//           } else {
//             res.json({ msg: 'Project Updated', pr2 });
//           }
//         });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No projects with the id of "${projectId}"` });
//   }
// });

// // Assign an Employee to a Project with a role (QA, PM, DEV, TL):

// router.post('/assignEmployee/:id', (req, res) => {
//   const projectId = req.params.id;
//   const found = projects.some((p) => p.id === projectId);
//   if (found) {
//     const assingEmployee = req.body;
//     projects.forEach((e) => {
//       if (e.id === projectId) {
//         const employee = { employeeId: assingEmployee.employeeId, role: assingEmployee.role };
//         e.employees.push(employee);
//         fs.writeFile('./src/data/projects.json', JSON.stringify(projects), (err) => {
//           if (err) {
//             res.send(err);
//           } else {
//             res.json({ msg: 'Employee role updated', e });
//           }
//         });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `Employee not found with the id: "${projectId}"` });
//   }
// });

// module.exports = router;

export default {
  create,
  //   getAll,
  getById,
  deleteById,
  put,
};
