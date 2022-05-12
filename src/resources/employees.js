const fs = require('fs');
const employees = require('../data/employees.json');

function createEmployee(req, res) {
  const {
    id, firstName, lastName, phone, email, password, active,
  } = req.body;
  if (id && firstName && lastName && phone && email && password && active) {
    const newEmployee = {
      id: parseInt(id, 10),
      firstName: firstName || '',
      lastName: lastName || '',
      phone: phone || '',
      email: email || '',
      password: password || '',
      active: active || '',
    };
    employees.push(newEmployee);
    fs.writeFile('./src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.status(404).json({ msg: err });
      } else {
        res.status(201).json({ msg: 'Employee created', newEmployee });
      }
    });
  } else {
    res.status(404).json({ msg: 'Data missing' });
  }
}

function putEmployeeId(req, res) {
  const { id } = req.params;
  const {
    firstName, lastName, phone, email, password, active,
  } = req.body;
  const updatedEmployee = {
    id: parseInt(id, 10),
    firstName: firstName || '',
    lastName: lastName || '',
    phone: phone || '',
    email: email || '',
    password: password || '',
    active: active || '',
  };
  const employeeIndex = employees.findIndex((employee) => employee.id === parseInt(id, 10));
  if (employeeIndex !== -1) {
    employees[employeeIndex] = updatedEmployee;
    fs.writeFileSync('./src/data/employees.json', JSON.stringify(employees));
    res.status(200).json({ msg: 'Employee updated', updatedEmployee });
  } else {
    res.status(404).json({ msg: 'Employee not found' });
  }
}

function deleteEmployeeId(req, res) {
  const { id } = req.params;
  const employeeIndex = employees.findIndex((employee) => employee.id === parseInt(id, 10));
  if (employeeIndex !== -1) {
    employees.splice(employeeIndex, 1);
    fs.writeFileSync('./src/data/employees.jason', JSON.stringify(employees));
    res.status(200).json({ msg: 'Employee deleted', employees });
  } else {
    res.status(404).json({ msg: 'Employee not found' });
  }
}
function getAll(req, res) {
  res.status(200).json(employees);
}

function getEmployeeById(req, res) {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === id);
  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).json({ msg: 'Employee not found.' });
  }
}

function filterByStatus(req, res) {
  const status = req.query.active;
  const active = employees.filter((e) => e.active.toString() === status);
  if (active.length > 0) {
    res.status(200).json(active);
  } else {
    res.status(404).json({ msg: 'Employees not found.' });
  }
}

function filterByLName(req, res) {
  const lName = req.query.lastName;
  const lastName = employees.filter((e) => e.lastName.toString() === lName);
  if (lastName.length > 0) {
    res.status(200).json(lastName);
  } else {
    res.status(404).json({ msg: 'Employees not found.' });
  }
}
module.exports = {
  getAll,
  deleteEmployeeId,
  putEmployeeId,
  createEmployee,
  getEmployeeById,
  filterByStatus,
  filterByLName,
};
