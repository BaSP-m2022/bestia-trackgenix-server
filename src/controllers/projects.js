// const express = require('express');
// const fs = require('fs');
// const router = express.Router();
// const projects = require('../data/projects.json');

// import Projects from '../models/Projects';

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

// export default {
//   create,
//   getAll,
//   getById,
//   deleteById,
//   put,
// };
