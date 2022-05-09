const express = require('express');
const employees = require('../data/employees.json');

const router = express.Router();

// get all employees
router.get('/getAll', (req, res) => {
  res.send(employees);
});

// get employee by id
router.get('/getById/:id', (req, res) => {
  const employeeId = req.params.id;
  const employee = employees.find((e) => e.id === employeeId);
  if (employee) {
    res.send(employee);
  } else {
    res.send('Employee not found');
  }
});

// filter employees by status
router.get('/getbyStatus', (req, res) => {
  const employeeStatus = req.query.active;
  const filteredEmployees = employees.filter((employee) => employee.active === employeeStatus);
  if (filteredEmployees.length > 0) {
    res.send(filteredEmployees);
  } else {
    res.send('Employee not found');
  }
});

module.exports = router;
