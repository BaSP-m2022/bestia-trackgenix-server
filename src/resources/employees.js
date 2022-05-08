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
/* function getByFilter(req, res) {
  const { status } = req.params;
  const em = employees.filter((proj) => proj.id === parseInt(id, 10));
  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ msg: 'Project not found' });
  }
} */
module.exports = {
  deleteEmployeeId,
  putEmployeeId,
  createEmployee,
};
