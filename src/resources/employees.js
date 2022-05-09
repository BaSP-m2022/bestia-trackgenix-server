const employees = require('../data/employees.json');

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

module.exports = {
  getAll,
  getEmployeeById,
  filterByStatus,
};
